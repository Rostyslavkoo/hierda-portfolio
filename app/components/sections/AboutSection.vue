<template>
  <section id="about" class="about bleed-section">
    <div class="bleed-title">ABOUT ME</div>

    <div class="about__inner">
      <figure class="about__polaroid">
        <AppImage :src="aboutPhoto.src" :alt="aboutPhoto.alt" ratio="3 / 4" />
        <figcaption class="about__polaroid-cap">{{ aboutPhoto.label }}</figcaption>
      </figure>

      <div class="about__text">
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
      .select('url, thumb_url')
      .eq('category', 'about')
      .order('sort_order')
      .limit(1)
      .single()
    return data
  }),
])

const aboutPhoto = computed(() => ({
  src: dbAboutPhoto.value?.thumb_url ?? dbAboutPhoto.value?.url ?? '',
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
/* Visual styling comes from the global portfolio.css reference sheet.
 * The polaroid caption is positioned within the frame's bottom padding. */
.about__polaroid { margin: 0; }
.about__polaroid blockquote { margin: 0; }
</style>
