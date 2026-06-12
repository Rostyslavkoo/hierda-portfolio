import { ref, onScopeDispose, isRef } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { GalleryPhoto } from '~/data/gallery'

type PhotoSource = GalleryPhoto[] | Ref<GalleryPhoto[]> | ComputedRef<GalleryPhoto[]>

export function useLightbox(source: PhotoSource) {
  const isOpen = ref(false)
  const currentIndex = ref(0)

  function getPhotos(): GalleryPhoto[] {
    return isRef(source) ? source.value : source
  }

  function open(index: number) {
    currentIndex.value = index
    isOpen.value = true
    if (import.meta.client) document.body.style.overflow = 'hidden'
  }

  function close() {
    isOpen.value = false
    if (import.meta.client) document.body.style.overflow = ''
  }

  function prev() {
    const len = getPhotos().length
    currentIndex.value = (currentIndex.value - 1 + len) % len
  }

  function next() {
    const len = getPhotos().length
    currentIndex.value = (currentIndex.value + 1) % len
  }

  function onKeydown(e: KeyboardEvent) {
    if (!isOpen.value) return
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape')     close()
  }

  // Wire the listener directly rather than via onMounted: GallerySection calls
  // this after an `await` in its setup, by which point the active component
  // instance is gone and onMounted would warn + no-op. onScopeDispose is bound
  // to the setup scope (not the mount lifecycle), so cleanup still runs.
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
    onScopeDispose(() => {
      window.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    })
  }

  return { isOpen, currentIndex, open, close, prev, next }
}
