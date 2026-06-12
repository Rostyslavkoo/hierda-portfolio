export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  // Auth runs entirely client-side: the session lives in localStorage.
  if (import.meta.server) return

  const supabase = useSupabase()
  // getSession() reads the persisted session from localStorage (no network round-trip).
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    return navigateTo('/admin/login')
  }
})
