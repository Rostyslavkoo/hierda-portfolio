import { ref, onMounted, onUnmounted, isRef } from 'vue'
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

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    if (import.meta.client) document.body.style.overflow = ''
  })

  return { isOpen, currentIndex, open, close, prev, next }
}
