<template>
  <section id="snepi" class="snepi">
    <div class="bleed-section">
      <h2 class="bleed-title" aria-hidden="true">DIGITALS</h2>
    </div>

    <div class="snepi__inner">
      <div class="snepi__grid">
        <figure
          v-for="photo in displayPhotos"
          :key="photo.src"
          class="snepi__item"
        >
          <AppImage class="snepi__photo" :src="photo.src" :alt="photo.alt" ratio="3 / 4" />
          <figcaption class="snepi__label">{{ photo.label }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const supabase = useSupabase()

const { data: dbDigitals } = await useAsyncData('digitals', async () => {
  const { data } = await supabase.from('digitals').select('url, thumb_url, label').order('sort_order')
  return data ?? []
})

const displayPhotos = computed(() =>
  (dbDigitals.value ?? []).map(d => ({
    src: d.thumb_url ?? d.url,
    alt: `Hierda Karlson — ${d.label ?? 'digital'}`,
    label: d.label ?? '',
  }))
)
</script>

<style scoped>
.snepi {
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
  color: var(--text-strong);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

.snepi__inner {
  padding: 0 var(--gutter);
}

.snepi__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-4);
}

.snepi__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.snepi__photo {
  border: 1px solid var(--border-hair);
}

.snepi__photo :deep(img) {
  filter: grayscale(0.12);
  transition: transform 1.1s var(--ease-editorial), filter 1.1s var(--ease-editorial), opacity 0.5s var(--ease-editorial);
}

.snepi__item:hover .snepi__photo :deep(img) {
  transform: scale(1.04);
  filter: grayscale(0);
}

.snepi__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .snepi__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 500px) {
  .snepi__grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
