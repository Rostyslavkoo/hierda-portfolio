<template>
  <section id="shop" class="shop">
    <div class="bleed-section">
      <h2 class="bleed-title" aria-hidden="true">ORIGINAL WORKS</h2>
    </div>

    <div class="shop__inner">
      <p class="shop__acq">Paintings available for acquisition</p>

      <div class="shop__grid">
        <article
          v-for="painting in paintings"
          :key="painting.id"
          class="painting"
        >
          <AppImage class="painting__frame" :src="painting.src" :alt="painting.alt" ratio="3 / 4" />
          <div class="painting__body">
            <div class="painting__row">
              <h3 class="painting__title">{{ painting.title }}</h3>
              <span class="painting__price">{{ painting.price }}</span>
            </div>
            <p class="painting__meta">{{ painting.medium }} · {{ painting.dimensions }}</p>
            <a
              :href="`mailto:${model.email}?subject=Inquiry — ${painting.title}`"
              class="link-arrow"
            >
              Inquire <span class="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { model } from '~/data/model'

const supabase = useSupabase()

const { data: dbPaintings } = await useAsyncData('paintings', async () => {
  const { data } = await supabase
    .from('paintings')
    .select('id, title, description, price, url, thumb_url')
    .eq('available', true)
    .order('sort_order')
  return data ?? []
})

const paintings = computed(() =>
  (dbPaintings.value ?? []).map(p => ({
    id:         p.id,
    title:      p.title,
    medium:     p.description ?? '',
    dimensions: '',
    price:      p.price ? `€ ${p.price.toLocaleString('de-DE')}` : '',
    src:        p.thumb_url ?? p.url,
    alt:        `Painting — ${p.title}`,
  }))
)
</script>

<style scoped>
.shop {
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

.shop__inner {
  padding: 0 var(--gutter);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.shop__acq {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

.shop__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-7);
}

.painting__frame {
  border: 1px solid var(--border-hair);
  margin-bottom: var(--space-5);
}

.painting__frame :deep(img) {
  filter: grayscale(0.12);
  transition: transform 1.1s var(--ease-editorial), filter 1.1s var(--ease-editorial), opacity 0.5s var(--ease-editorial);
}

.painting:hover .painting__frame :deep(img) {
  transform: scale(1.04);
  filter: grayscale(0);
}

.painting__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.painting__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.painting__title {
  font-family: var(--font-display);
  font-size: var(--display-md);
  font-weight: var(--weight-light);
  font-style: italic;
  color: var(--text-strong);
  letter-spacing: var(--tracking-tight);
}

.painting__price {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--text-strong);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.painting__meta {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-muted);
  text-transform: uppercase;
}

.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-body);
  transition: color var(--dur-fast) var(--ease-soft);
  margin-top: var(--space-2);
}

.link-arrow:hover { color: var(--text-strong); }

.arr {
  display: inline-block;
  transition: transform var(--dur-fast) var(--ease-soft);
}
.link-arrow:hover .arr {
  transform: translateX(7px);
}

@media (max-width: 768px) {
  .shop__grid { grid-template-columns: 1fr; }
}
</style>
