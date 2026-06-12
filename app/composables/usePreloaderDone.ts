import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks when the preloader curtain has lifted. ThePreloader dispatches the
 * `preloader:done` window event on hide; consumers use the returned `done` ref
 * to trigger the site's scale-in reveal (and anything else gated on entry).
 *
 * SSR-safe: starts false, only wires up the listener on the client. A timeout
 * fallback flips it true even if the preloader is absent or stalls, so content
 * is never left scaled/hidden.
 */
export function usePreloaderDone() {
  const done = ref(false)

  function flip() { done.value = true }

  onMounted(() => {
    if (done.value) return
    window.addEventListener('preloader:done', flip, { once: true })
    // Safety net mirrors the preloader's own 8s ceiling.
    const t = setTimeout(flip, 8500)
    onUnmounted(() => {
      window.removeEventListener('preloader:done', flip)
      clearTimeout(t)
    })
  })

  return { done }
}
