<template>
  <section id="snepi" class="snepi bleed-section">
    <div class="bleed-title" data-aos="reveal-fade">DIGITALS</div>

    <div class="snepi__grid">
      <figure
        v-for="(photo, i) in displayPhotos"
        :key="photo.src"
        class="snepi__item"
        data-aos="reveal-up"
        :data-aos-delay="i * 80"
      >
        <AppImage class="snepi__photo" :src="photo.src" :alt="photo.alt" ratio="2 / 3" object-position="50% 8%" />
        <figcaption class="snepi__label">{{ photo.label }}</figcaption>
      </figure>
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
/* Visual styling comes from global portfolio.css. <figure> needs its default
 * margin reset, and AppImage's hover transform is driven from the item. */
.snepi__item { margin: 0; }
.snepi__item:hover .snepi__photo :deep(img) { transform: scale(1.02); }
</style>
