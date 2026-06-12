<template>
  <section id="parametry" class="parametry">
    <div class="bleed-section">
      <h2 class="bleed-title" aria-hidden="true">PARAMETERS</h2>
    </div>

    <div class="parametry__inner">
      <div class="parametry__card">
        <div class="parametry__card-head">
          <span class="parametry__card-name">Hierda Karlson</span>
          <span class="parametry__card-occ">Model · Madrid</span>
        </div>

        <dl class="parametry__grid">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="parametry__cell"
            :class="{ 'parametry__cell--full': stat.span }"
          >
            <dt class="parametry__key">{{ stat.key }}</dt>
            <dd class="parametry__val">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const supabase = useSupabase()

const { data: dbStats } = await useAsyncData('stats', async () => {
  const { data } = await supabase.from('stats').select('*').limit(1).single()
  return data
})

const stats = computed(() => {
  const s = dbStats.value
  if (!s) return []
  return [
    { key: 'Height',   value: s.height  ?? '', span: false },
    { key: 'Bust',     value: s.bust    ?? '', span: false },
    { key: 'Waist',    value: s.waist   ?? '', span: false },
    { key: 'Hips',     value: s.hips    ?? '', span: false },
    { key: 'Clothing', value: 'XS / 34', span: false },
    { key: 'Shoe',     value: s.shoes   ?? '', span: false },
    { key: 'Eyes',     value: s.eyes    ?? '', span: false },
    { key: 'Hair',     value: s.hair    ?? '', span: false },
    { key: 'Location', value: `${s.location ?? 'Madrid'}, Spain · Available worldwide`, span: true },
  ]
})
</script>

<style scoped>
.parametry {
  padding: var(--section-pad-y) 0;
}

.bleed-section {
  overflow: hidden;
  margin-bottom: var(--space-9);
}

.bleed-title {
  font-family: var(--font-bleed);
  font-size: clamp(4rem, 18vw, 16rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--text-strong);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

.parametry__inner {
  padding: 0 var(--gutter);
  max-width: 540px;
}

.parametry__card {
  border: 1px solid var(--border-hair);
  overflow: hidden;
}

.parametry__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-7);
  background: var(--text-strong);
}

.parametry__card-name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--bg-base);
}

.parametry__card-occ {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--bg-base);
  opacity: 0.6;
}

.parametry__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.parametry__cell {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5) var(--space-7);
  border-bottom: 1px solid var(--border-hair);
  border-right: 1px solid var(--border-hair);
}

.parametry__cell:nth-child(even) {
  border-right: none;
}

.parametry__cell--full {
  grid-column: 1 / -1;
  border-right: none;
}

.parametry__cell:last-child,
.parametry__cell--full {
  border-bottom: none;
}

.parametry__key {
  font-family: var(--font-body);
  font-size: var(--text-2xs, 0.65rem);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

.parametry__val {
  font-family: var(--font-display);
  font-size: var(--display-md);
  font-weight: var(--weight-light);
  color: var(--text-strong);
  letter-spacing: 0.02em;
  line-height: 1.2;
}
</style>
