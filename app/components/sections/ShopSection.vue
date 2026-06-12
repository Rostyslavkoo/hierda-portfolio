<template>
  <section id="shop" class="shop bleed-section">
    <div class="bleed-title" data-aos="reveal-fade">ORIGINAL WORKS</div>
    <p class="shop__sub" data-aos="reveal-up">Paintings available for acquisition</p>

    <div class="shop__grid">
      <article
        v-for="(painting, i) in paintings"
        :key="painting.id"
        class="painting"
        data-aos="reveal-up"
        :data-aos-delay="i * 90"
      >
        <AppImage class="painting__frame" :src="painting.src" :alt="painting.alt" ratio="4 / 5" />
        <div class="painting__body">
          <div class="painting__row">
            <h3 class="painting__title">{{ painting.title }}</h3>
            <span class="painting__price">{{ painting.price }}</span>
          </div>
          <p class="painting__meta">{{ painting.meta }}</p>
          <a :href="mailto(painting)" class="link-arrow">
            Inquire <span class="arr" aria-hidden="true">——›</span>
          </a>
        </div>
      </article>
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
    id:    p.id,
    title: p.title,
    meta:  p.description ?? '',
    price: p.price ? `€ ${p.price.toLocaleString('de-DE')}` : '',
    src:   p.thumb_url ?? p.url,
    alt:   `Painting — ${p.title}`,
  }))
)

const mailto = (p: { title: string; price: string }) =>
  `mailto:${model.email}?subject=${encodeURIComponent(`Inquiry — "${p.title}" (${p.price})`)}` +
  `&body=${encodeURIComponent(`Hello,\n\nI'd like to inquire about the painting "${p.title}" listed at ${p.price}.\n\nThank you,`)}`
</script>

<style scoped>
/* All visual styling comes from the global portfolio.css reference sheet. */
.painting:hover .painting__frame :deep(img) { transform: scale(1.04); }
</style>
