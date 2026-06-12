export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  const supabase = useSupabase()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return navigateTo('/admin/login')
  }
})
