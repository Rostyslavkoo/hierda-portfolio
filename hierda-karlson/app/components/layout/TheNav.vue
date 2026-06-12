<template>
  <header>
    <div class="progress-bar" :style="{ width: progress + '%' }" />

    <nav class="nav" :class="{ 'nav--scrolled': isScrolled }">
      <a href="#cover" class="nav__mono" aria-label="Hierda Karlson — home">HK</a>

      <ul class="nav__links">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="nav__link" @click="menuOpen = false">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <button class="nav__star-btn" @click="menuOpen = true" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2 L11.8 8.2 L18 8.2 L13 12 L14.8 18.2 L10 14.5 L5.2 18.2 L7 12 L2 8.2 L8.2 8.2 Z"
                stroke="currentColor" stroke-width="1" fill="none" />
        </svg>
      </button>
    </nav>

    <div v-if="menuOpen" class="mobile-menu" @click.self="menuOpen = false">
      <button class="mobile-menu__close" @click="menuOpen = false" aria-label="Close menu">×</button>
      <nav>
        <a
          v-for="(link, i) in navLinks"
          :key="link.href"
          :href="link.href"
          class="mobile-menu__link"
          :style="{ animationDelay: `${i * 0.06}s` }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
      </nav>
      <span class="mobile-menu__city">Madrid</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollProgress } from '~/composables/useScrollProgress'
import { navLinks } from '~/data/nav'

const { progress, isScrolled } = useScrollProgress()
const menuOpen = ref(false)

// SSR-safe: suppress hydration mismatch on dynamic scroll-state attributes
const isClient = import.meta.client
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 1px;
  background: var(--accent);
  z-index: 200;
  transition: width 0.1s linear;
  pointer-events: none;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--gutter);
  transition: background var(--dur-fast) var(--ease-soft), backdrop-filter var(--dur-fast) var(--ease-soft);
  mix-blend-mode: difference;
}

.nav--scrolled {
  background: var(--bg-scrim);
  backdrop-filter: blur(12px);
  mix-blend-mode: normal;
}

.nav__mono {
  font-family: var(--font-handwritten);
  font-size: 1.4rem;
  color: var(--text-strong);
  letter-spacing: 0.04em;
}

.nav__links {
  display: flex;
  gap: var(--space-7);
}

.nav__link {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-strong);
  transition: color var(--dur-fast) var(--ease-soft);
}

.nav__link:hover { color: var(--text-accent); }

.nav__star-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-strong);
  padding: var(--space-1);
}

/* Mobile menu */
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--bg-scrim);
  backdrop-filter: blur(16px);
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  animation: mMenuIn var(--dur-fast) var(--ease-editorial);
}

.mobile-menu__close {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  font-family: var(--font-display);
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-strong);
  line-height: 1;
}

.mobile-menu__link {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-strong);
  opacity: 0;
  animation: gFadeUp var(--dur-fast) var(--ease-editorial) forwards;
}

.mobile-menu__link:hover { color: var(--text-accent); }

.mobile-menu__city {
  position: absolute;
  bottom: var(--space-8);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

@keyframes mMenuIn {
  from { opacity: 0; transform: translateY(-18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .nav__links    { display: none; }
  .nav__star-btn { display: flex; }
}
</style>
