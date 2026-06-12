<template>
  <section id="parametry" class="parametry">
    <div class="bleed-section">
      <h2 class="bleed-title" aria-hidden="true">PARAMETERS</h2>
    </div>

    <div class="parametry__inner">
      <div class="parametry__card">
        <div class="parametry__card-head">
          <span class="parametry__card-name">Hierda Karlson</span>
          <span class="parametry__card-occ">Model · Artist</span>
        </div>

        <dl class="parametry__grid">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="parametry__cell"
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
    { key: 'Height',       value: s.height   ?? '' },
    { key: 'Bust',         value: s.bust      ?? '' },
    { key: 'Waist',        value: s.waist     ?? '' },
    { key: 'Hips',         value: s.hips      ?? '' },
    { key: 'Shoe',         value: s.shoes     ?? '' },
    { key: 'Eyes',         value: s.eyes      ?? '' },
    { key: 'Hair',         value: s.hair      ?? '' },
    { key: 'Location',     value: s.location  ?? '' },
    { key: 'Availability', value: 'Worldwide' },
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
  color: var(--bg-raised);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

.parametry__inner {
  padding: 0 var(--gutter);
  max-width: 900px;
}

.parametry__card {
  border: 1px solid var(--border-hair);
  padding: var(--space-8);
}

.parametry__card-head {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-7);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-hair);
}

.parametry__card-name {
  font-family: var(--font-display);
  font-size: var(--display-lg);
  font-weight: var(--weight-light);
  color: var(--text-strong);
  letter-spacing: var(--tracking-wide);
}

.parametry__card-occ {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

.parametry__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-6) var(--space-7);
}

.parametry__cell {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.parametry__key {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
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
