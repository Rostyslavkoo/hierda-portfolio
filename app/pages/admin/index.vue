<template>
  <div class="dash">
    <h1 class="dash__title">Dashboard</h1>

    <div class="dash__grid">
      <NuxtLink
        v-for="card in cards"
        :key="card.to"
        :to="card.to"
        class="dash__card"
      >
        <span class="dash__card-label">{{ card.label }}</span>
        <span class="dash__card-desc">{{ card.desc }}</span>
        <span class="dash__card-arrow">→</span>
      </NuxtLink>
    </div>

    <div class="dash__site">
      <a href="/" target="_blank" rel="noopener" class="dash__site-link">
        View live site ↗
      </a>
    </div>

    <div class="dash__danger">
      <p class="dash__danger-title">Danger zone</p>
      <p class="dash__danger-desc">
        Permanently delete every photo, digital and painting — both database rows
        and storage files. Use this to clear old un-optimised media before
        re-uploading. This cannot be undone.
      </p>

      <button
        v-if="!confirming"
        class="dash__danger-btn"
        :disabled="busy"
        @click="confirming = true"
      >
        Wipe all media
      </button>

      <div v-else class="dash__danger-confirm">
        <span class="dash__danger-ask">Are you sure? This deletes everything.</span>
        <button class="dash__danger-btn dash__danger-btn--go" :disabled="busy" @click="onWipe">
          {{ busy ? 'Wiping…' : 'Yes, delete all' }}
        </button>
        <button class="dash__danger-cancel" :disabled="busy" @click="confirming = false">
          Cancel
        </button>
      </div>

      <ul v-if="log.length" class="dash__danger-log">
        <li v-for="(line, i) in log" :key="i">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWipeMedia } from '~/composables/useWipeMedia'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const cards = [
  { to: '/admin/stats',     label: 'Parameters',  desc: 'Height, measurements, clothing, shoes, eyes, hair' },
  { to: '/admin/portfolio', label: 'Portfolio',    desc: 'Gallery photos — upload, reorder, delete' },
  { to: '/admin/digitals',  label: 'Digitals',     desc: 'Comp card snaps with labels' },
  { to: '/admin/shop',      label: 'Shop',         desc: 'Original paintings — add, price, toggle availability' },
]

const confirming = ref(false)
const { busy, log, wipeAll } = useWipeMedia()

async function onWipe() {
  await wipeAll()
  confirming.value = false
}
</script>

<style scoped>
.dash__title {
  font-family: var(--font-display);
  font-size: var(--display-xl);
  font-weight: var(--weight-light);
  color: var(--text-strong);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-8);
}

.dash__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.dash__card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-7);
  border: 1px solid var(--border-hair);
  background: var(--bg-raised);
  border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft);
}
.dash__card:hover {
  border-color: var(--border-accent);
  background: var(--bg-inset);
}

.dash__card-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-strong);
}

.dash__card-desc {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
}

.dash__card-arrow {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  color: var(--text-faint);
  font-size: var(--text-lg);
  transition: transform var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft);
}
.dash__card:hover .dash__card-arrow {
  transform: translateX(4px);
  color: var(--text-muted);
}

.dash__site {
  margin-top: var(--space-8);
}

.dash__site-link {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--dur-fast) var(--ease-soft);
}
.dash__site-link:hover { color: var(--text-strong); }

/* Danger zone */
.dash__danger {
  margin-top: var(--space-10);
  padding: var(--space-7);
  border: 1px solid var(--border-hair);
  border-radius: var(--radius-sm);
}

.dash__danger-title {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-strong);
  margin-bottom: var(--space-3);
}

.dash__danger-desc {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
  max-width: 52ch;
  margin-bottom: var(--space-5);
}

.dash__danger-btn {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-strong);
  background: transparent;
  border: 1px solid var(--text-strong);
  border-radius: var(--radius-xs);
  padding: var(--space-3) var(--space-5);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft);
}
.dash__danger-btn:hover:not(:disabled) {
  background: var(--text-strong);
  color: var(--bg-base);
}
.dash__danger-btn:disabled { opacity: 0.5; cursor: default; }

.dash__danger-btn--go {
  border-color: #a3322b;
  color: #a3322b;
}
.dash__danger-btn--go:hover:not(:disabled) {
  background: #a3322b;
  color: var(--bg-base);
}

.dash__danger-confirm {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.dash__danger-ask {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-strong);
}

.dash__danger-cancel {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-soft);
}
.dash__danger-cancel:hover:not(:disabled) { color: var(--text-strong); }

.dash__danger-log {
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--border-hair);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.dash__danger-log li {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .dash__grid { grid-template-columns: 1fr; }
}
</style>
