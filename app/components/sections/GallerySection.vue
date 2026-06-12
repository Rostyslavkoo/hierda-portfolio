<template>
  <section id="portfolio" class="gallery bleed-section">
    <div class="bleed-title">PORTFOLIO</div>

    <template v-if="row1.length > 0">
      <div class="gallery__spread">
        <button
          v-for="(photo, i) in row1"
          :key="photo.src"
          class="gallery__item"
          :class="`gallery__item--${photo.cls}`"
          @click="open(i)"
          :aria-label="photo.label"
        >
          <img :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
          <span class="gallery__label">{{ photo.label }}</span>
        </button>
      </div>

      <div class="gallery__row2">
        <button
          v-for="(photo, i) in row2"
          :key="photo.src"
          class="gallery__item"
          @click="open(row1.length + i)"
          :aria-label="photo.label"
        >
          <img :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
          <span class="gallery__label">{{ photo.label }}</span>
        </button>
      </div>
    </template>
  </section>

  <TheLightbox
    :photos="lightboxPhotos"
    :current-index="currentIndex"
    :is-open="isOpen"
    @close="close"
    @prev="prev"
    @next="next"
  />
</template>

<script setup lang="ts">
import { useLightbox } from '~/composables/useLightbox'

const supabase = useSupabase()

const { data: dbPhotos } = await useAsyncData('photos', async () => {
  const { data } = await supabase
    .from('photos')
    .select('url, thumb_url, category')
    .not('category', 'in', '("cover","about")')
    .order('sort_order')
  return data ?? []
})

// Grid uses the lightweight thumb; full-res is reserved for the lightbox.
const allPhotos = computed(() =>
  (dbPhotos.value ?? []).map((p, i) => ({
    src: p.thumb_url ?? p.url,
    full: p.url,
    alt: `Hierda Karlson — ${p.category ?? 'photo'} ${i + 1}`,
    label: p.category ?? '',
  }))
)

// Reference layout: an asymmetric 4-tile spread (hero / a / b / c) followed by
// a 3-tile second row. Indices stay continuous so the lightbox maps cleanly.
const row1 = computed(() =>
  allPhotos.value.slice(0, 4).map((p, i) => ({
    ...p,
    cls: (['hero', 'a', 'b', 'c'] as const)[i],
  }))
)
const row2 = computed(() => allPhotos.value.slice(4))

// Lightbox shows full-resolution images.
const lightboxPhotos = computed(() =>
  allPhotos.value.map(p => ({ ...p, src: p.full }))
)

const { isOpen, currentIndex, open, close, prev, next } = useLightbox(allPhotos)
</script>

<style scoped>
/* Grid, hover and label styling come from the global portfolio.css reference.
 * Tiles are <button>s here (for accessible click-to-open), so neutralise the
 * default button chrome that the reference <div>s never had. */
.gallery__item {
  border: none;
  background: var(--bg-raised);
  font: inherit;
  text-align: left;
  -webkit-appearance: none;
  appearance: none;
}
</style>
