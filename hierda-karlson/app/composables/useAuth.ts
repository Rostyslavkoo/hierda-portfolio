import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const supabase = useSupabase()
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function init() {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) error.value = err.message
    else user.value = data.user
    loading.value = false
    return !err
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
    await navigateTo('/admin/login')
  }

  return { user, loading, error, init, login, logout }
}
