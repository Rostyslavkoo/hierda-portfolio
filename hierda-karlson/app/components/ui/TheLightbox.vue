<template>
  <Teleport v-if="mounted" to="body">
    <div v-if="isOpen" class="lightbox" @click.self="close">
      <button class="lightbox__close" @click="close" aria-label="Close lightbox">×</button>

      <button class="lightbox__nav lightbox__nav--prev" @click="prev" aria-label="Previous photo">&#8592;</button>
      <button class="lightbox__nav lightbox__nav--next" @click="next" aria-label="Next photo">&#8594;</button>

      <div class="lightbox__stage">
        <img
          :src="current.src"
          :alt="current.alt"
          class="lightbox__img"
        />
      </div>

      <span class="lightbox__count">{{ currentIndex + 1 }} / {{ total }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { GalleryPhoto } from '~/data/gallery'

const mounted = ref(false)
onMounted(() => { mounted.value = true })

const props = defineProps<{
  photos: GalleryPhoto[]
  currentIndex: number
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

const current = computed(() => props.photos[props.currentIndex])
const total   = computed(() => props.photos.length)

function close() { emit('close') }
function prev()  { emit('prev') }
function next()  { emit('next') }
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.96);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: gFadeIn var(--dur-fast) var(--ease-soft);
}

.lightbox__close {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--paper-200);
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  opacity: 0.7;
  transition: opacity var(--dur-fast) var(--ease-soft);
}
.lightbox__close:hover { opacity: 1; }

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-xl);
  color: var(--paper-200);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-5);
  opacity: 0.5;
  transition: opacity var(--dur-fast) var(--ease-soft);
}
.lightbox__nav:hover { opacity: 1; }
.lightbox__nav--prev { left: var(--space-5); }
.lightbox__nav--next { right: var(--space-5); }

.lightbox__stage {
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  box-shadow: var(--shadow-lift);
}

.lightbox__count {
  position: absolute;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--paper-400);
  text-transform: uppercase;
}
</style>
