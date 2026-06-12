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
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('portfolio')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (uploadErr) return { error: uploadErr.message }

    const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(path)

    const { data, error: insertErr } = await supabase
      .from('photos')
      .insert({ url: urlData.publicUrl, category, sort_order: photos.value.length })
      .select()
      .single()

    if (insertErr) return { error: insertErr.message }

    photos.value.push(data)
    return { data }
  }

  async function remove(photo: Photo) {
    const path = new URL(photo.url).pathname.split('/').pop()!

    await supabase.storage.from('portfolio').remove([path])

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
