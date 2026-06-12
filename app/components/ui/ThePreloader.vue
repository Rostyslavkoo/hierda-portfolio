<template>
  <Transition name="preloader">
    <div v-if="visible" class="preloader" role="status" aria-live="polite">
      <div class="preloader__inner">
        <span class="preloader__mono">HK</span>
        <div class="preloader__bar">
          <div class="preloader__fill" :style="{ width: progress + '%' }" />
        </div>
        <span class="preloader__pct">{{ progress }}%</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSitePhotos } from '~/composables/useSitePhotos'
import { usePreloadImages } from '~/composables/usePreloadImages'
import { usePreloaderDone } from '~/composables/usePreloaderDone'

const visible = ref(true)
const { progress, preload } = usePreloadImages()
const { done } = usePreloaderDone()

function hide() {
  if (!visible.value) return
  visible.value = false
  // Flip shared state so the layout's scale-in reveal triggers even if it
  // mounted after us — shared state, unlike a one-shot event, can't be missed.
  done.value = true
  // Signal scroll-reveal (AOS) to init now that the curtain is lifting and the
  // page is laid out — element offsets are only measurable once we're visible.
  window.dispatchEvent(new Event('preloader:done'))
}

onMounted(async () => {
  // Safety net: never trap the user behind the curtain if something stalls.
  const safety = setTimeout(hide, 8000)

  try {
    const { data: urls } = await useSitePhotos()
    await preload(urls.value ?? [])
  } catch (err) {
    // Missing Supabase config or a failed fetch must never wedge the curtain —
    // lift it and let the page render with its static fallback data.
    console.error('[preloader] failed to load site photos:', err)
    clearTimeout(safety)
    hide()
    return
  }

  clearTimeout(safety)
  // Brief hold at 100% so the bar visibly completes before the curtain lifts.
  setTimeout(hide, 350)
})
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--bg-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  width: min(260px, 60vw);
}

.preloader__mono {
  font-family: var(--font-handwritten);
  font-size: 2.4rem;
  color: var(--text-strong);
  letter-spacing: 0.04em;
}

@media (prefers-reduced-motion: no-preference) {
  .preloader__inner {
    animation: gFadeUp 0.8s var(--ease-editorial) both;
  }
  .preloader__mono {
    animation: monoBreath 2.6s var(--ease-editorial) infinite;
  }
}

@keyframes monoBreath {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
}

.preloader__bar {
  width: 100%;
  height: 1px;
  background: var(--border-hair);
  overflow: hidden;
}

.preloader__fill {
  height: 100%;
  background: var(--text-strong);
  transition: width 0.3s var(--ease-editorial);
}

.preloader__pct {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.preloader-leave-active {
  transition: opacity 0.6s var(--ease-editorial);
}
.preloader-leave-to {
  opacity: 0;
}
</style>
