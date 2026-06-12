<template>
  <div
    class="app-img"
    :class="{ 'app-img--loaded': loaded }"
    :style="ratioStyle"
  >
    <img
      ref="imgEl"
      :src="src"
      :alt="alt"
      :style="{ objectPosition }"
      decoding="async"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  /** intrinsic aspect ratio, e.g. "3 / 4". Reserves space → zero layout shift. */
  ratio?: string
  /** object-position for the image */
  objectPosition?: string
  /** load immediately at high priority (above-the-fold) */
  eager?: boolean
}>(), {
  ratio: '3 / 4',
  objectPosition: '50% 50%',
  eager: false,
})

const loaded = ref(false)
const imgEl = ref<HTMLImageElement | null>(null)
const ratioStyle = computed(() => ({ aspectRatio: props.ratio }))

// A cached image may finish loading before Vue binds @load on hydration, so the
// event is missed. Check img.complete on mount to avoid being stuck invisible.
onMounted(() => {
  if (imgEl.value?.complete && imgEl.value.naturalWidth > 0) loaded.value = true
})
</script>

<style scoped>
.app-img {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  background: var(--bg-raised);
}

.app-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s var(--ease-editorial);
}

.app-img--loaded img {
  opacity: 1;
}
</style>
