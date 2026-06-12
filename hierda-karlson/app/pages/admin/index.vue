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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const cards = [
  { to: '/admin/stats',     label: 'Parameters',  desc: 'Height, measurements, clothing, shoes, eyes, hair' },
  { to: '/admin/portfolio', label: 'Portfolio',    desc: 'Gallery photos — upload, reorder, delete' },
  { to: '/admin/digitals',  label: 'Digitals',     desc: 'Comp card snaps with labels' },
  { to: '/admin/shop',      label: 'Shop',         desc: 'Original paintings — add, price, toggle availability' },
]
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

@media (max-width: 600px) {
  .dash__grid { grid-template-columns: 1fr; }
}
</style>
