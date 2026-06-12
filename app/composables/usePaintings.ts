import { ref } from 'vue'
import type { Painting } from '~/types/database'

export function usePaintings() {
  const supabase = useSupabase()
  const paintings = ref<Painting[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    const { data, error: err } = await supabase
      .from('paintings')
      .select('*')
      .order('sort_order')
    if (err) error.value = err.message
    else paintings.value = data ?? []
    loading.value = false
  }

  async function create(file: File, payload: { title: string; price: number; description: string }) {
    const { thumb, full, ext } = await compressImage(file)
    const stamp = Date.now()
    const fullPath = `${stamp}.${ext}`
    const thumbPath = `${stamp}_thumb.${ext}`

    const [up1, up2] = await Promise.all([
      supabase.storage.from('paintings').upload(fullPath, full, { cacheControl: '3600', upsert: false, contentType: full.type }),
      supabase.storage.from('paintings').upload(thumbPath, thumb, { cacheControl: '3600', upsert: false, contentType: thumb.type }),
    ])
    if (up1.error) return { error: up1.error.message }
    if (up2.error) return { error: up2.error.message }

    const fullUrl = supabase.storage.from('paintings').getPublicUrl(fullPath).data.publicUrl
    const thumbUrl = supabase.storage.from('paintings').getPublicUrl(thumbPath).data.publicUrl

    const { data, error: insertErr } = await supabase
      .from('paintings')
      .insert({ ...payload, url: fullUrl, thumb_url: thumbUrl, sort_order: paintings.value.length })
      .select()
      .single()

    if (insertErr) return { error: insertErr.message }

    paintings.value.push(data)
    return { data }
  }

  async function toggleAvailable(painting: Painting) {
    const { error: err } = await supabase
      .from('paintings')
      .update({ available: !painting.available })
      .eq('id', painting.id)

    if (!err) {
      const idx = paintings.value.findIndex(p => p.id === painting.id)
      if (idx !== -1) paintings.value[idx].available = !painting.available
    }
    return { error: err?.message }
  }

  async function remove(painting: Painting) {
    const paths = [painting.url, painting.thumb_url]
      .filter((u): u is string => !!u)
      .map(u => new URL(u).pathname.split('/').pop()!)
    await supabase.storage.from('paintings').remove(paths)
    const { error: err } = await supabase.from('paintings').delete().eq('id', painting.id)
    if (!err) paintings.value = paintings.value.filter(p => p.id !== painting.id)
    return { error: err?.message }
  }

  return { paintings, loading, error, fetch, create, toggleAvailable, remove }
}
