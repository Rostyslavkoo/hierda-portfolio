<template>
  <header>
    <div class="progress-bar" :style="{ width: progress + '%' }" />

    <nav class="nav" :class="{ scrolled: isScrolled }">
      <button class="nav__star-btn" @click="menuOpen = true" aria-label="Open menu">
        <svg width="34" height="46" viewBox="0 0 34 46" fill="none" aria-hidden="true">
          <path
            d="M17 2 L20.5 12 L29 10.5 L23 18.5 L26.5 28 L17 43 L7.5 28 L11 18.5 L5 10.5 L13.5 12 Z"
            fill="var(--text-strong)"
          />
          <line x1="8.5" y1="15" x2="25.5" y2="15" stroke="var(--bg-base)" stroke-width="1.25" />
          <line x1="7.5" y1="19.5" x2="26.5" y2="19.5" stroke="var(--bg-base)" stroke-width="1.25" />
          <line x1="9" y1="24" x2="25" y2="24" stroke="var(--bg-base)" stroke-width="1.25" />
        </svg>
      </button>

      <a href="#cover" class="nav__mono" aria-label="Hierda Karlson — home">HK</a>
    </nav>

    <div v-if="menuOpen" class="mobile-menu" role="dialog" aria-modal="true" @click.self="menuOpen = false">
      <button class="mobile-menu__close" @click="menuOpen = false" aria-label="Close menu">×</button>
      <nav>
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="mobile-menu__link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
      </nav>
      <p class="mobile-menu__city">Madrid · Worldwide</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollProgress } from '~/composables/useScrollProgress'
import { navLinks } from '~/data/nav'

const { progress, isScrolled } = useScrollProgress()
const menuOpen = ref(false)
</script>

<style scoped>
/* Nav, progress bar and mobile menu are all styled by the global portfolio.css
 * reference sheet (.nav, .nav__star-btn, .nav__mono, .mobile-menu*). */
.mobile-menu nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
</style>
