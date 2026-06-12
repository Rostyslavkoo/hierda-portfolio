<template>
  <div>
    <ThePreloader />
    <TheNav />
    <div
      class="site-reveal"
      :class="{ 'site-reveal--in': revealed, 'site-reveal--settled': settled }"
      @transitionend="onSettled"
    >
      <slot />
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePreloaderDone } from '~/composables/usePreloaderDone'

// While the preloader is up, the content sits slightly enlarged + faded; when
// the curtain lifts it eases back to scale(1) so the site appears to emerge
// from behind it. See .site-reveal styles below.
const { done: revealed } = usePreloaderDone()

// Once the scale-in finishes we drop the transform entirely. A lingering
// `transform` (even scale(1)) makes this element a containing block, which
// would re-anchor descendant `position: fixed` elements (the lightbox) to it
// instead of the viewport. `--settled` removes the transform so they break free.
const settled = ref(false)
function onSettled(e: TransitionEvent) {
  if (e.propertyName === 'transform') settled.value = true
}
</script>

<style scoped>
.site-reveal {
  /* Pre-reveal resting state: pushed in a touch. transform-origin top keeps the
   * cover anchored under the nav while it scales.
   *
   * NOTE: opacity stays 1 here. The content must never depend on the preloader
   * to become visible — if the preloader stalls, the page is still readable
   * under (or instead of) the curtain. The reveal is now purely a scale easing;
   * the opaque preloader overlay hides the pre-scaled state until it lifts. */
  transform: scale(1.1);
  transform-origin: 50% 0;
  will-change: transform;
}

.site-reveal--in {
  transform: scale(1);
}

/* Animation done — drop the transform so descendant position:fixed (lightbox)
 * anchors to the viewport again, and release the compositor hint. */
.site-reveal--settled {
  transform: none;
  will-change: auto;
}

@media (prefers-reduced-motion: no-preference) {
  .site-reveal {
    transition: transform 1.2s var(--ease-editorial);
  }
}

/* Reduced motion: no scale, content is simply present. */
@media (prefers-reduced-motion: reduce) {
  .site-reveal {
    transform: none;
  }
}
</style>
