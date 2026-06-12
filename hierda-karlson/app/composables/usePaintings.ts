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
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('paintings')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (uploadErr) return { error: uploadErr.message }

    const { data: urlData } = supabase.storage.from('paintings').getPublicUrl(path)

    const { data, error: insertErr } = await supabase
      .from('paintings')
      .insert({ ...payload, url: urlData.publicUrl, sort_order: paintings.value.length })
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
    const path = new URL(painting.url).pathname.split('/').pop()!
    await supabase.storage.from('paintings').remove([path])
    const { error: err } = await supabase.from('paintings').delete().eq('id', painting.id)
    if (!err) paintings.value = paintings.value.filter(p => p.id !== painting.id)
    return { error: err?.message }
  }

  return { paintings, loading, error, fetch, create, toggleAvailable, remove }
}
