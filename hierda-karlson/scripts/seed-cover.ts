// npx tsx scripts/seed-cover.ts
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = '<set-in-env>'
const SERVICE_KEY  = '<set-in-env>'
const PHOTOS_DIR   = join(process.cwd(), 'public/photos')

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const COVER = [
  '8I5A9442-retouched.jpg',
  '8I5A9370-retouched.jpg',
  '8I5A9476-retouched.jpg',
]

async function run() {
  // Remove existing cover rows
  await sb.from('photos').delete().eq('category', 'cover')
  console.log('Cleared existing cover rows.')

  for (let i = 0; i < COVER.length; i++) {
    const file    = COVER[i]
    const objName = `cover-${file}`
    process.stdout.write(`[${i + 1}/3] ${file} … `)

    const buffer = readFileSync(join(PHOTOS_DIR, file))

    const { error: uploadErr } = await sb.storage
      .from('portfolio')
      .upload(objName, buffer, { contentType: 'image/jpeg', upsert: true })

    if (uploadErr) { console.error('upload error:', uploadErr.message); continue }

    const { data: { publicUrl } } = sb.storage.from('portfolio').getPublicUrl(objName)

    const { error: insertErr } = await sb.from('photos').insert({
      url: publicUrl,
      category: 'cover',
      sort_order: i,
    })

    if (insertErr) console.error('insert error:', insertErr.message)
    else console.log('OK →', publicUrl.slice(-40))
  }

  const { count } = await sb.from('photos').select('*', { count: 'exact', head: true }).eq('category', 'cover')
  console.log(`\nCover photos in DB: ${count} ✓`)
}

run().catch(e => { console.error(e); process.exit(1) })
