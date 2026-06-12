/**
 * Collects every image URL the public site will render, in one place, so a
 * preloader can fetch them all before revealing the page. Cached via
 * useAsyncData('site-photos') and reused by the sections' own queries hit the
 * same Supabase cache, so this adds no extra round-trips on the client.
 */
export function useSitePhotos() {
  const supabase = useSupabase()

  return useAsyncData('site-photos', async () => {
    const [photos, digitals, paintings] = await Promise.all([
      supabase.from('photos').select('url, thumb_url').order('sort_order'),
      supabase.from('digitals').select('url, thumb_url').order('sort_order'),
      supabase.from('paintings').select('url, thumb_url').eq('available', true).order('sort_order'),
    ])

    // Preload only the lightweight thumbnails the public grids actually render;
    // full-res images load on demand in the lightbox.
    const urls = [
      ...(photos.data ?? []),
      ...(digitals.data ?? []),
      ...(paintings.data ?? []),
    ]
      .map(r => r.thumb_url ?? r.url)
      .filter((u): u is string => !!u)

    return [...new Set(urls)]
  })
}
