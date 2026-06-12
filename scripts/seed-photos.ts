// npx tsx scripts/seed-photos.ts
import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL  = process.env.SUPABASE_URL ?? ''
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_KEY ?? ''
const PHOTOS_DIR    = join(process.cwd(), 'public/photos')

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── Photo assignments ────────────────────────────────
// Cover photos used as gallery, digitals mapped to labels
const GALLERY_PHOTOS: { file: string; category: 'editorial' | 'commercial' | 'portrait' }[] = [
  { file: '8I5A9681-retouched.jpg', category: 'editorial' },
  { file: '8I5A9625-retouched.jpg', category: 'editorial' },
  { file: '8I5A9637-retouched.jpg', category: 'editorial' },
  { file: '8I5A9785-retouched.jpg', category: 'portrait'  },
  { file: '8I5A9386-retouched.jpg', category: 'editorial' },
  { file: '8I5A9445-retouched.jpg', category: 'portrait'  },
  { file: '8I5A9476-retouched.jpg', category: 'portrait'  },
]

const DIGITALS_PHOTOS: { file: string; label: string }[] = [
  { file: '8I5A9442-retouched.jpg', label: 'Face'        },
  { file: '8I5A9370-retouched.jpg', label: 'Front'       },
  { file: '8I5A9476-retouched.jpg', label: '3/4'         },
  { file: '8I5A9443-retouched.jpg', label: 'Crouching'   },
  { file: '8I5A9445-retouched.jpg', label: 'Seated'      },
  { file: '8I5A9619-retouched.jpg', label: 'Full length' },
]

const PAINTINGS: { file: string; title: string; price: number; description: string }[] = [
  { file: '8I5A9619-retouched.jpg', title: 'Umbral',  price: 1400, description: 'Oil on linen · 90×120 cm'    },
  { file: '8I5A9625-retouched.jpg', title: 'Reposo',  price:  980, description: 'Acrylic on canvas · 70×100 cm' },
  { file: '8I5A9637-retouched.jpg', title: 'Marea',   price: 1650, description: 'Mixed media · 100×140 cm'    },
]

async function uploadFile(bucket: string, filename: string): Promise<string> {
  const path    = join(PHOTOS_DIR, filename)
  const buffer  = readFileSync(path)
  const objName = `seed-${filename}`

  // Remove existing to allow re-run
  await sb.storage.from(bucket).remove([objName])

  const { error } = await sb.storage.from(bucket).upload(objName, buffer, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: true,
  })
  if (error) throw new Error(`Upload failed (${bucket}/${filename}): ${error.message}`)

  const { data } = sb.storage.from(bucket).getPublicUrl(objName)
  return data.publicUrl
}

async function run() {
  console.log('\n── Clearing existing rows ───────────────────')
  await sb.from('photos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await sb.from('digitals').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await sb.from('paintings').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  console.log('Done.')

  // ── Gallery photos ──────────────────────────────────
  console.log('\n── Uploading gallery photos ─────────────────')
  for (let i = 0; i < GALLERY_PHOTOS.length; i++) {
    const { file, category } = GALLERY_PHOTOS[i]
    process.stdout.write(`  [${i + 1}/${GALLERY_PHOTOS.length}] ${file} … `)
    const url = await uploadFile('portfolio', file)
    const { error } = await sb.from('photos').insert({ url, category, sort_order: i })
    if (error) console.error('DB insert failed:', error.message)
    else console.log('OK')
  }

  // ── Digitals ────────────────────────────────────────
  console.log('\n── Uploading digitals ───────────────────────')
  for (let i = 0; i < DIGITALS_PHOTOS.length; i++) {
    const { file, label } = DIGITALS_PHOTOS[i]
    process.stdout.write(`  [${i + 1}/${DIGITALS_PHOTOS.length}] ${file} (${label}) … `)
    const url = await uploadFile('digitals', file)
    const { error } = await sb.from('digitals').insert({ url, label, sort_order: i })
    if (error) console.error('DB insert failed:', error.message)
    else console.log('OK')
  }

  // ── Paintings ───────────────────────────────────────
  console.log('\n── Uploading paintings ──────────────────────')
  for (let i = 0; i < PAINTINGS.length; i++) {
    const { file, title, price, description } = PAINTINGS[i]
    process.stdout.write(`  [${i + 1}/${PAINTINGS.length}] ${title} … `)
    const url = await uploadFile('paintings', file)
    const { error } = await sb.from('paintings').insert({
      url, title, price, description, available: true, sort_order: i,
    })
    if (error) console.error('DB insert failed:', error.message)
    else console.log('OK')
  }

  // ── Verify ──────────────────────────────────────────
  console.log('\n── Final counts ─────────────────────────────')
  const [p, d, pa, s] = await Promise.all([
    sb.from('photos').select('*', { count: 'exact', head: true }),
    sb.from('digitals').select('*', { count: 'exact', head: true }),
    sb.from('paintings').select('*', { count: 'exact', head: true }),
    sb.from('stats').select('*', { count: 'exact', head: true }),
  ])
  console.log(`  photos:    ${p.count}`)
  console.log(`  digitals:  ${d.count}`)
  console.log(`  paintings: ${pa.count}`)
  console.log(`  stats:     ${s.count}`)
  console.log('\nDone ✓')
}

run().catch(e => { console.error(e); process.exit(1) })
