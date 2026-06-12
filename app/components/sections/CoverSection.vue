<template>
  <section id="cover" class="cover">
    <div class="cover__photos">
      <div
        v-for="(photo, i) in coverPhotos"
        :key="photo.src"
        class="cover__photo-wrap"
        :class="{ 'cover__photo-wrap--loaded': loadedSet.has(photo.src) }"
      >
        <img
          :ref="el => registerImg(el as HTMLImageElement | null)"
          :src="photo.src"
          sizes="(max-width: 600px) 100vw, 33vw"
          :alt="photo.alt"
          :style="{ objectPosition: photo.objectPosition }"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          @load="onImgLoad(photo.src)"
        />
      </div>
    </div>

    <div class="cover__identity">
      <div class="cover__pills">
        <a href="#parametry" class="cover__pill">Parameters</a>
        <a href="#snepi"     class="cover__pill">Digitals</a>
      </div>
      <span class="cover__name-line">
        Hierda Karlson · Model · Artist · Madrid
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const supabase = useSupabase()

const { data: dbCover } = await useAsyncData('cover', async () => {
  const { data } = await supabase
    .from('photos')
    .select('url, thumb_url')
    .eq('category', 'cover')
    .order('sort_order')
    .limit(3)
  return data ?? []
})

const coverPhotos = computed(() =>
  (dbCover.value ?? []).map((p, i) => ({
    src: p.url,
    alt: `Hierda Karlson — cover ${i + 1}`,
    objectPosition: ['50% 20%', '50% 10%', '50% 25%'][i] ?? '50% 15%',
  }))
)

const loadedSet = ref(new Set<string>())
function onImgLoad(src: string) { loadedSet.value = new Set([...loadedSet.value, src]) }

// Cached images can finish loading before Vue attaches @load on hydration,
// so the event never fires. Check img.complete on mount and mark them loaded.
function registerImg(el: HTMLImageElement | null) {
  if (el?.complete && el.naturalWidth > 0) onImgLoad(el.src)
}

// Preload the cover photos into <head> so they start downloading during HTML
// parse, before the component even mounts — fastest possible LCP.
useHead(computed(() => ({
  link: coverPhotos.value.map(p => ({
    rel: 'preload',
    as: 'image' as const,
    href: p.src,
    fetchpriority: 'high',
  })),
})))
</script>

<style scoped>
/* Layout & visuals come from the global portfolio.css (reference design).
 * Here we only layer the load-in skeleton + fade so cached/slow images
 * animate cleanly without overriding the reference look. */
.cover__photo-wrap { position: relative; }
.cover__photo-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
  background-size: 200% 100%;
  z-index: 1;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .cover__photo-wrap::before {
    animation: skeleton 1.4s ease-in-out infinite;
  }
}

.cover__photo-wrap--loaded::before {
  display: none;
}

.cover__photo-wrap img {
  opacity: 0;
  transition: transform 1.3s var(--ease-editorial), opacity 0.6s var(--ease-editorial);
}

.cover__photo-wrap--loaded img {
  opacity: 1;
}
</style>
