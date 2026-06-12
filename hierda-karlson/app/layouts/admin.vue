<template>
  <div class="admin">
    <aside class="admin__sidebar">
      <a href="/" class="admin__brand" target="_blank" rel="noopener">
        <span class="admin__brand-mono">HK</span>
        <span class="admin__brand-label">Portfolio</span>
      </a>

      <nav class="admin__nav">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="admin__link"
          active-class="admin__link--active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button class="admin__logout" @click="logout">
        Sign out
      </button>
    </aside>

    <main class="admin__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()

const links = [
  { to: '/admin',           label: 'Dashboard' },
  { to: '/admin/stats',     label: 'Parameters' },
  { to: '/admin/portfolio', label: 'Portfolio' },
  { to: '/admin/digitals',  label: 'Digitals' },
  { to: '/admin/shop',      label: 'Shop' },
]
</script>

<style scoped>
.admin {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100svh;
  background: var(--bg-base);
}

.admin__sidebar {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  padding: var(--space-8) var(--space-6);
  border-right: 1px solid var(--border-hair);
  background: var(--bg-raised);
}

.admin__brand {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-9);
  text-decoration: none;
}

.admin__brand-mono {
  font-family: var(--font-handwritten);
  font-size: 1.5rem;
  color: var(--text-strong);
}

.admin__brand-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
}

.admin__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.admin__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  color: var(--text-muted);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft);
}

.admin__link:hover {
  color: var(--text-strong);
  background: var(--bg-inset);
}

.admin__link--active {
  color: var(--text-strong);
  background: var(--bg-inset);
}

.admin__logout {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-faint);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-3) var(--space-4);
  text-align: left;
  transition: color var(--dur-fast) var(--ease-soft);
}
.admin__logout:hover { color: var(--text-muted); }

.admin__main {
  padding: var(--space-9) var(--space-8);
  max-width: 900px;
}

@media (max-width: 768px) {
  .admin {
    grid-template-columns: 1fr;
  }
  .admin__sidebar {
    position: static;
    height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--space-4) var(--space-5);
    gap: var(--space-4);
  }
  .admin__brand { margin-bottom: 0; }
  .admin__nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-1);
    flex: none;
  }
  .admin__logout { margin-left: auto; }
  .admin__main { padding: var(--space-6) var(--space-5); }
}
</style>
