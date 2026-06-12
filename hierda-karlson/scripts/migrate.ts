// Run: npx tsx scripts/migrate.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL ?? ''
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY ?? ''

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const SQL = /* sql */`
-- Stats table
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  height text,
  bust text,
  waist text,
  hips text,
  shoes text,
  eyes text,
  hair text,
  location text default 'Madrid',
  updated_at timestamptz default now()
);

-- Photos (portfolio gallery)
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text check (category in ('editorial', 'commercial', 'portrait')),
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Digitals (snaps / comp card photos)
create table if not exists digitals (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  label text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Paintings (shop)
create table if not exists paintings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price numeric(10,2),
  description text,
  url text not null,
  available boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RLS: public read, no public write
alter table stats     enable row level security;
alter table photos    enable row level security;
alter table digitals  enable row level security;
alter table paintings enable row level security;

-- Allow anonymous SELECT on all tables
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'stats' and policyname = 'public_read'
  ) then
    create policy public_read on stats     for select using (true);
    create policy public_read on photos    for select using (true);
    create policy public_read on digitals  for select using (true);
    create policy public_read on paintings for select using (true);
  end if;
end $$;

-- Seed initial stats row if empty
insert into stats (height, bust, waist, hips, shoes, eyes, hair, location)
select '178 cm', '84 cm', '61 cm', '89 cm', 'EU 39', 'Green', 'Brown', 'Madrid'
where not exists (select 1 from stats);
`

async function run() {
  console.log('Running migration…')

  const { error } = await supabase.rpc('exec_sql' as never, { sql: SQL })

  if (error) {
    // exec_sql not available — fall back to individual statements via pg REST
    console.log('exec_sql not available, running via HTTP…')
    await runViaRest()
    return
  }

  console.log('Migration complete.')
}

async function runViaRest() {
  const url = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`
  // Supabase doesn't expose raw SQL via REST by default — use the Management API
  const mgmtUrl = `https://api.supabase.com/v1/projects/qlnvlmtiqvhjuhpxnblr/database/query`

  // Split into individual statements and run each
  const statements = SQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  for (const stmt of statements) {
    const res = await fetch(mgmtUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: stmt + ';' }),
    })

    const text = await res.text()
    let json: unknown
    try { json = JSON.parse(text) } catch { json = text }

    if (!res.ok) {
      console.error(`Statement failed (${res.status}):`, stmt.slice(0, 80))
      console.error('Response:', json)
    } else {
      console.log('OK:', stmt.slice(0, 60).replace(/\n/g, ' ') + '…')
    }
  }
}

run().catch(console.error)
