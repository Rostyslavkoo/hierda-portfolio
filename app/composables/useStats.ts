import { ref } from 'vue'
import type { Stats } from '~/types/database'

export function useStats() {
  const supabase = useSupabase()
  const stats = ref<Stats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    const { data, error: err } = await supabase
      .from('stats')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (err) error.value = err.message
    else stats.value = data
    loading.value = false
  }

  async function save(updates: Partial<Omit<Stats, 'id' | 'updated_at'>>) {
    if (!stats.value) return { error: 'No stats row found' }

    const { data, error: err } = await supabase
      .from('stats')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', stats.value.id)
      .select()
      .single()

    if (!err && data) stats.value = data
    return { error: err?.message }
  }

  return { stats, loading, error, fetch, save }
}
