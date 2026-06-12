<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title">Parameters</h1>
      <p class="page__sub">Model comp card — shown in Parameters and About sections.</p>
    </div>

    <div v-if="loading" class="page__loading">Loading…</div>

    <form v-else-if="stats" class="stats-form" @submit.prevent="handleSave">
      <div class="stats-form__grid">
        <AppInput v-model="form.height" label="Height"   placeholder="178 cm" />
        <AppInput v-model="form.bust"   label="Bust"     placeholder="84 cm" />
        <AppInput v-model="form.waist"  label="Waist"    placeholder="61 cm" />
        <AppInput v-model="form.hips"   label="Hips"     placeholder="89 cm" />
        <AppInput v-model="form.shoes"  label="Shoe size" placeholder="EU 39" />
        <AppInput v-model="form.eyes"   label="Eyes"     placeholder="Green" />
        <AppInput v-model="form.hair"   label="Hair"     placeholder="Brown" />
        <AppInput v-model="form.location" label="Location" placeholder="Madrid" />
      </div>

      <div class="stats-form__footer">
        <p v-if="saveError" class="stats-form__error">{{ saveError }}</p>
        <p v-if="saved" class="stats-form__ok">Saved.</p>
        <AppButton variant="solid" size="md" as="button" type="submit" :disabled="saving">
          {{ saving ? 'Saving…' : 'Save changes' }}
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const { stats, loading, fetch, save } = useStats()

const saving   = ref(false)
const saved    = ref(false)
const saveError = ref<string | null>(null)

const form = reactive({
  height:   '',
  bust:     '',
  waist:    '',
  hips:     '',
  shoes:    '',
  eyes:     '',
  hair:     '',
  location: '',
})

await fetch()

watchEffect(() => {
  if (!stats.value) return
  form.height   = stats.value.height   ?? ''
  form.bust     = stats.value.bust     ?? ''
  form.waist    = stats.value.waist    ?? ''
  form.hips     = stats.value.hips     ?? ''
  form.shoes    = stats.value.shoes    ?? ''
  form.eyes     = stats.value.eyes     ?? ''
  form.hair     = stats.value.hair     ?? ''
  form.location = stats.value.location ?? ''
})

async function handleSave() {
  saving.value   = true
  saved.value    = false
  saveError.value = null

  const { error } = await save({ ...form })

  if (error) saveError.value = error
  else {
    saved.value = true
    setTimeout(() => { saved.value = false }, 2500)
  }
  saving.value = false
}
</script>

<style scoped>
.page__head {
  margin-bottom: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.page__title {
  font-family: var(--font-display);
  font-size: var(--display-xl);
  font-weight: var(--weight-light);
  color: var(--text-strong);
  letter-spacing: var(--tracking-tight);
}

.page__sub {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.page__loading {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.stats-form__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-7) var(--space-8);
  max-width: 640px;
  margin-bottom: var(--space-8);
}

.stats-form__footer {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.stats-form__error {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: #b04040;
}

.stats-form__ok {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: #4a8a5a;
  font-weight: var(--weight-medium);
}

@media (max-width: 600px) {
  .stats-form__grid { grid-template-columns: 1fr; }
}
</style>
