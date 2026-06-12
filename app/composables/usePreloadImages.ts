import { ref } from 'vue'

/**
 * Preloads a list of image URLs in the browser, reporting progress.
 * Each image is fetched via `new Image()`, which warms the HTTP cache so the
 * subsequent <img> render is instant. Resolves (done = true) once all images
 * have settled — whether they loaded or errored — so a broken URL never blocks
 * the site forever.
 */
export function usePreloadImages() {
  const total = ref(0)
  const loaded = ref(0)
  const done = ref(false)
  const progress = ref(0) // 0–100

  function preload(urls: string[]): Promise<void> {
    if (import.meta.server) {
      done.value = true
      return Promise.resolve()
    }

    const list = [...new Set(urls)].filter(Boolean)
    total.value = list.length

    if (list.length === 0) {
      progress.value = 100
      done.value = true
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      let settled = 0

      const tick = () => {
        settled++
        loaded.value = settled
        progress.value = Math.round((settled / list.length) * 100)
        if (settled >= list.length) {
          done.value = true
          resolve()
        }
      }

      for (const url of list) {
        const img = new Image()
        img.onload = tick
        img.onerror = tick
        img.src = url
      }
    })
  }

  return { total, loaded, progress, done, preload }
}
