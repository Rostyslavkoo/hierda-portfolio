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
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('digitals')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (uploadErr) return { error: uploadErr.message }

    const { data: urlData } = supabase.storage.from('digitals').getPublicUrl(path)

    const { data, error: insertErr } = await supabase
      .from('digitals')
      .insert({ url: urlData.publicUrl, label, sort_order: digitals.value.length })
      .select()
      .single()

    if (insertErr) return { error: insertErr.message }

    digitals.value.push(data)
    return { data }
  }

  async function remove(digital: Digital) {
    const path = new URL(digital.url).pathname.split('/').pop()!
    await supabase.storage.from('digitals').remove([path])
    const { error: err } = await supabase.from('digitals').delete().eq('id', digital.id)
    if (!err) digitals.value = digitals.value.filter(d => d.id !== digital.id)
    return { error: err?.message }
  }

  return { digitals, loading, error, LABELS, fetch, upload, remove }
}
