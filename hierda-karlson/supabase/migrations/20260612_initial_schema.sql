-- Hierda Karlson Portfolio — initial schema
-- Run in Supabase Dashboard → SQL Editor

-- ─────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────

create table if not exists public.stats (
  id         uuid primary key default gen_random_uuid(),
  height     text,
  bust       text,
  waist      text,
  hips       text,
  shoes      text,
  eyes       text,
  hair       text,
  location   text default 'Madrid',
  updated_at timestamptz default now()
);

create table if not exists public.photos (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  category    text check (category in ('editorial', 'commercial', 'portrait')),
  sort_order  int default 0,
  created_at  timestamptz default now()
);

create table if not exists public.digitals (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  label       text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

create table if not exists public.paintings (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  price       numeric(10,2),
  description text,
  url         text not null,
  available   boolean default true,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────

alter table public.stats     enable row level security;
alter table public.photos    enable row level security;
alter table public.digitals  enable row level security;
alter table public.paintings enable row level security;

-- Public anonymous SELECT
create policy "public_read" on public.stats
  for select using (true);

create policy "public_read" on public.photos
  for select using (true);

create policy "public_read" on public.digitals
  for select using (true);

create policy "public_read" on public.paintings
  for select using (true);

-- Authenticated users (admin) full access
create policy "auth_all" on public.stats
  for all using (auth.role() = 'authenticated');

create policy "auth_all" on public.photos
  for all using (auth.role() = 'authenticated');

create policy "auth_all" on public.digitals
  for all using (auth.role() = 'authenticated');

create policy "auth_all" on public.paintings
  for all using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Storage buckets
-- ─────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values
  ('portfolio', 'portfolio', true),
  ('digitals',  'digitals',  true),
  ('paintings', 'paintings',  true)
on conflict (id) do nothing;

-- Public read for all storage buckets
create policy "public_read" on storage.objects
  for select using (bucket_id in ('portfolio', 'digitals', 'paintings'));

-- Auth upload/delete
create policy "auth_upload" on storage.objects
  for insert with check (
    auth.role() = 'authenticated'
    and bucket_id in ('portfolio', 'digitals', 'paintings')
  );

create policy "auth_delete" on storage.objects
  for delete using (
    auth.role() = 'authenticated'
    and bucket_id in ('portfolio', 'digitals', 'paintings')
  );

-- ─────────────────────────────────────────────
-- Seed: initial stats row
-- ─────────────────────────────────────────────

insert into public.stats (height, bust, waist, hips, shoes, eyes, hair, location)
select '178 cm', '84 cm', '61 cm', '89 cm', 'EU 39', 'Green', 'Brown', 'Madrid'
where not exists (select 1 from public.stats);
