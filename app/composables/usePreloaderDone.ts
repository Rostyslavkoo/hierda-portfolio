import { onMounted, onUnmounted } from 'vue'

/**
 * Tracks when the preloader curtain has lifted, as shared Nuxt state so the
 * signal can't be missed by a late listener. ThePreloader flips `done` true on
 * hide; the layout uses it to trigger the site's scale-in reveal.
 *
 * Using useState (not a one-shot window event) fixes a deploy-only race: in
 * production the preloader can finish and emit before the layout has mounted
 * its listener, stranding the page at opacity:0. Shared state has no ordering
 * dependency — whoever reads it last still sees the final value.
 *
 * A timeout fallback flips it true even if the preloader is absent or stalls,
 * so content is never left scaled/hidden.
 */
export function usePreloaderDone() {
  const done = useState('preloader-done', () => false)

  onMounted(() => {
    if (done.value) return
    // Safety net mirrors the preloader's own 8s ceiling.
    const t = setTimeout(() => { done.value = true }, 8500)
    onUnmounted(() => clearTimeout(t))
  })

  return { done }
}
