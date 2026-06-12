<template>
  <section id="parametry" class="parametry bleed-section">
    <div class="bleed-title">PARAMETERS</div>

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
/* All visual styling comes from the global portfolio.css reference sheet.
 * Reset the default <dd> indent so the data-list matches the reference markup. */
.parametry__grid dd { margin: 0; }
</style>
