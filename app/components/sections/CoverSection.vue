<template>
  <section id="cover" class="cover">
    <div class="cover__photos">
      <div
        v-for="(photo, i) in coverPhotos"
        :key="photo.src"
        class="cover__photo-wrap"
      >
        <img
          :src="photo.src"
          :alt="photo.alt"
          :style="{ objectPosition: photo.objectPosition }"
          :loading="i === 0 ? 'eager' : 'lazy'"
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
    .select('url')
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
</script>

<style scoped>
.cover {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 600px;
  overflow: hidden;
}

.cover__photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  gap: 2px;
}

.cover__photo-wrap {
  position: relative;
  overflow: hidden;
}

.cover__photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.12);
  transform: scale(1);
  transition: transform 1.3s var(--ease-editorial);
}

@media (prefers-reduced-motion: no-preference) {
  .cover__photo-wrap img {
    animation: kenBurns 22s var(--ease-editorial) infinite alternate;
  }

  .cover__photo-wrap:nth-child(2) img { animation-delay: -7s; }
  .cover__photo-wrap:nth-child(3) img { animation-delay: -14s; }
}

.cover__photo-wrap:hover img {
  transform: scale(1.04);
  filter: grayscale(0);
}

.cover__identity {
  position: absolute;
  bottom: var(--space-9);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  pointer-events: none;
}

.cover__pills {
  display: flex;
  gap: var(--space-3);
  pointer-events: all;
}

.cover__pill {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-strong);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  padding: 8px 20px;
  transition: background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft);
  mix-blend-mode: difference;
}
.cover__pill:hover {
  background: var(--accent);
  color: var(--on-accent);
}

.cover__name-line {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
  mix-blend-mode: difference;
}

@media (max-width: 600px) {
  .cover__photos {
    grid-template-columns: 1fr;
  }
  .cover__photos .cover__photo-wrap:not(:first-child) {
    display: none;
  }
}
</style>
