<template>
  <section id="portfolio" class="gallery">
    <div class="bleed-section">
      <h2 class="bleed-title" aria-hidden="true">PORTFOLIO</h2>
    </div>

    <div class="gallery__inner">
      <AppEyebrow>Portfolio</AppEyebrow>

      <div class="gallery__spread">
        <button
          class="gallery__item gallery__item--hero"
          @click="open(0)"
          :aria-label="allPhotos[0].label"
        >
          <img :src="allPhotos[0].src" :alt="allPhotos[0].alt" loading="lazy" />
          <span class="gallery__label">{{ allPhotos[0].label }}</span>
        </button>

        <div class="gallery__col">
          <button
            v-for="(photo, i) in allPhotos.slice(1, 4)"
            :key="photo.src"
            class="gallery__item"
            :class="`gallery__item--${photo.variant}`"
            @click="open(i + 1)"
            :aria-label="photo.label"
          >
            <img :src="photo.src" :alt="photo.alt" loading="lazy" />
            <span class="gallery__label">{{ photo.label }}</span>
          </button>
        </div>
      </div>

      <div class="gallery__row2">
        <button
          v-for="(photo, i) in allPhotos.slice(4)"
          :key="photo.src"
          class="gallery__item"
          @click="open(i + 4)"
          :aria-label="photo.label"
        >
          <img :src="photo.src" :alt="photo.alt" loading="lazy" />
          <span class="gallery__label">{{ photo.label }}</span>
        </button>
      </div>
    </div>
  </section>

  <TheLightbox
    :photos="allPhotos"
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
    .select('url, category')
    .not('category', 'in', '("cover","about")')
    .order('sort_order')
  return data ?? []
})

const allPhotos = computed(() =>
  (dbPhotos.value ?? []).map((p, i) => ({
    src: p.url,
    alt: `Hierda Karlson — ${p.category ?? 'photo'} ${i + 1}`,
    label: p.category ?? '',
    variant: (['hero', 'a', 'b', 'c'] as const)[i] as string | undefined,
  }))
)

const { isOpen, currentIndex, open, close, prev, next } = useLightbox(allPhotos)
</script>

<style scoped>
.gallery {
  padding: var(--section-pad-y) 0;
}

.bleed-section {
  overflow: hidden;
  margin-bottom: var(--space-9);
}

.bleed-title {
  font-family: var(--font-bleed);
  font-size: clamp(4rem, 18vw, 16rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--bg-raised);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

.gallery__inner {
  padding: 0 var(--gutter);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.gallery__spread {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--space-4);
}

.gallery__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.gallery__row2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.gallery__item {
  position: relative;
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: block;
  border: 1px solid var(--border-soft);
}

.gallery__item--hero {
  aspect-ratio: 3 / 4;
}

.gallery__item:not(.gallery__item--hero) {
  aspect-ratio: 4 / 3;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.12);
  transition: transform 1.1s var(--ease-editorial), filter 1.1s var(--ease-editorial);
}

.gallery__item:hover img {
  transform: scale(1.04);
  filter: grayscale(0);
}

.gallery__label {
  position: absolute;
  bottom: var(--space-4);
  left: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--paper-200);
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-soft);
}

.gallery__item:hover .gallery__label {
  opacity: 1;
}

@media (max-width: 768px) {
  .gallery__spread { grid-template-columns: 1fr; }
  .gallery__row2   { grid-template-columns: 1fr 1fr; }
}
</style>
