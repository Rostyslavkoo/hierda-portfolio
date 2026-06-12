import { ref } from 'vue'
import type { Digital } from '~/types/database'

export function useDigitals() {
  const supabase = useSupabase()
  const digitals = ref<Digital[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const LABELS = ['Face', 'Front', '3/4', 'Crouching', 'Seated', 'Full length'] as const

  async function fetch() {
    loading.value = true
    const { data, error: err } = await supabase
      .from('digitals')
      .select('*')
      .order('sort_order')
    if (err) error.value = err.message
    else digitals.value = data ?? []
    loading.value = false
  }

  async function upload(file: File, label: string) {
    const { thumb, full, ext } = await compressImage(file)
    const stamp = Date.now()
    const fullPath = `${stamp}.${ext}`
    const thumbPath = `${stamp}_thumb.${ext}`

    const [up1, up2] = await Promise.all([
      supabase.storage.from('digitals').upload(fullPath, full, { cacheControl: '3600', upsert: false, contentType: full.type }),
      supabase.storage.from('digitals').upload(thumbPath, thumb, { cacheControl: '3600', upsert: false, contentType: thumb.type }),
    ])
    if (up1.error) return { error: up1.error.message }
    if (up2.error) return { error: up2.error.message }

    const fullUrl = supabase.storage.from('digitals').getPublicUrl(fullPath).data.publicUrl
    const thumbUrl = supabase.storage.from('digitals').getPublicUrl(thumbPath).data.publicUrl

    const { data, error: insertErr } = await supabase
      .from('digitals')
      .insert({ url: fullUrl, thumb_url: thumbUrl, label, sort_order: digitals.value.length })
      .select()
      .single()

    if (insertErr) return { error: insertErr.message }

    digitals.value.push(data)
    return { data }
  }

  async function remove(digital: Digital) {
    const paths = [digital.url, digital.thumb_url]
      .filter((u): u is string => !!u)
      .map(u => new URL(u).pathname.split('/').pop()!)
    await supabase.storage.from('digitals').remove(paths)
    const { error: err } = await supabase.from('digitals').delete().eq('id', digital.id)
    if (!err) digitals.value = digitals.value.filter(d => d.id !== digital.id)
    return { error: err?.message }
  }

  return { digitals, loading, error, LABELS, fetch, upload, remove }
}
