<template>
  <section id="about" class="about">
    <div class="bleed-section">
      <h2 class="bleed-title" aria-hidden="true">ABOUT</h2>
    </div>

    <div class="about__inner">
      <figure class="about__polaroid">
        <img
          :src="aboutPhoto.src"
          :alt="aboutPhoto.alt"
          loading="lazy"
        />
        <figcaption class="about__polaroid-cap">{{ aboutPhoto.label }}</figcaption>
      </figure>

      <div class="about__text">
        <AppEyebrow>About me</AppEyebrow>
        <blockquote class="about__quote">
          "{{ model.quote }}"
        </blockquote>
        <p class="about__body">{{ model.bio }}</p>

        <div class="about__stats">
          <AppStat
            v-for="stat in aboutStats"
            :key="stat.key"
            :value="stat.value"
            :label="stat.key"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { model } from '~/data/model'

const supabase = useSupabase()

const [{ data: dbStats }, { data: dbAboutPhoto }] = await Promise.all([
  useAsyncData('stats', async () => {
    const { data } = await supabase.from('stats').select('*').limit(1).single()
    return data
  }),
  useAsyncData('about-photo', async () => {
    const { data } = await supabase
      .from('photos')
      .select('url')
      .eq('category', 'about')
      .order('sort_order')
      .limit(1)
      .single()
    return data
  }),
])

const aboutPhoto = computed(() => ({
  src: dbAboutPhoto.value?.url ?? '',
  alt: 'Hierda Karlson — portrait',
  label: 'Madrid, 2025',
}))

const aboutStats = computed(() => {
  if (!dbStats.value) return model.aboutStats
  const s = dbStats.value
  return [
    { key: 'Height',              value: s.height ?? '' },
    { key: 'Bust · Waist · Hips', value: [s.bust, s.waist, s.hips].filter(Boolean).join(' · ') },
    { key: 'Shoe',                value: s.shoes  ?? '' },
    { key: 'Eyes',                value: s.eyes   ?? '' },
  ]
})
</script>

<style scoped>
.about {
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

.about__inner {
  padding: 0 var(--gutter);
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-10);
  align-items: start;
}

.about__polaroid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
}

.about__polaroid img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  filter: grayscale(0.1);
  box-shadow: inset 0 0 0 12px var(--border-soft);
  transition: filter var(--dur-base) var(--ease-editorial);
}

.about__polaroid:hover img {
  filter: grayscale(0);
}

.about__polaroid-cap {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding-top: var(--space-6);
}

.about__quote {
  font-family: var(--font-display);
  font-size: var(--display-lg);
  font-weight: var(--weight-light);
  font-style: italic;
  color: var(--text-strong);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  max-width: var(--measure);
}

.about__body {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--text-body);
  max-width: var(--measure);
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-7);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-hair);
}

@media (max-width: 768px) {
  .about__inner { grid-template-columns: 1fr; }
}
</style>
