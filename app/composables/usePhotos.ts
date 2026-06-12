import { ref } from 'vue'
import type { Photo } from '~/types/database'
import { galleryPhotos as fallback } from '~/data/gallery'

export function usePhotos() {
  const supabase = useSupabase()
  const photos = ref<Photo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    const { data, error: err } = await supabase
      .from('photos')
      .select('*')
      .order('sort_order')
    if (err) {
      error.value = err.message
    } else {
      photos.value = data ?? []
    }
    loading.value = false
  }

  async function upload(file: File, category: Photo['category']) {
    const { thumb, full, ext } = await compressImage(file)
    const stamp = Date.now()
    const fullPath = `${stamp}.${ext}`
    const thumbPath = `${stamp}_thumb.${ext}`

    const [up1, up2] = await Promise.all([
      supabase.storage.from('portfolio').upload(fullPath, full, { cacheControl: '3600', upsert: false, contentType: full.type }),
      supabase.storage.from('portfolio').upload(thumbPath, thumb, { cacheControl: '3600', upsert: false, contentType: thumb.type }),
    ])
    if (up1.error) return { error: up1.error.message }
    if (up2.error) return { error: up2.error.message }

    const fullUrl = supabase.storage.from('portfolio').getPublicUrl(fullPath).data.publicUrl
    const thumbUrl = supabase.storage.from('portfolio').getPublicUrl(thumbPath).data.publicUrl

    const { data, error: insertErr } = await supabase
      .from('photos')
      .insert({ url: fullUrl, thumb_url: thumbUrl, category, sort_order: photos.value.length })
      .select()
      .single()

    if (insertErr) return { error: insertErr.message }

    photos.value.push(data)
    return { data }
  }

  async function remove(photo: Photo) {
    const paths = [photo.url, photo.thumb_url]
      .filter((u): u is string => !!u)
      .map(u => new URL(u).pathname.split('/').pop()!)

    await supabase.storage.from('portfolio').remove(paths)

    const { error: err } = await supabase
      .from('photos')
      .delete()
      .eq('id', photo.id)

    if (!err) photos.value = photos.value.filter(p => p.id !== photo.id)
    return { error: err?.message }
  }

  async function reorder(ordered: Photo[]) {
    photos.value = ordered
    const updates = ordered.map((p, i) => ({ id: p.id, sort_order: i }))
    for (const u of updates) {
      await supabase.from('photos').update({ sort_order: u.sort_order }).eq('id', u.id)
    }
  }

  return { photos, loading, error, fetch, upload, remove, reorder, fallback }
}
