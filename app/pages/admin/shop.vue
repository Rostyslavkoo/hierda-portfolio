<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title">Shop</h1>
      <p class="page__sub">Original paintings available for acquisition.</p>
    </div>

    <!-- Add painting form -->
    <details class="add-form" :open="formOpen">
      <summary class="add-form__toggle" @click.prevent="formOpen = !formOpen">
        {{ formOpen ? 'Cancel' : '+ Add painting' }}
      </summary>

      <form class="add-form__body" @submit.prevent="handleCreate">
        <!-- Image drop -->
        <div
          class="upload-zone"
          :class="{ 'upload-zone--over': dragOver, 'upload-zone--has': !!newImagePreview }"
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="onDrop"
          @click="fileInput?.click()"
        >
          <input ref="fileInput" type="file" accept="image/*" class="upload-zone__input" @change="onFileChange" />
          <img v-if="newImagePreview" :src="newImagePreview" class="upload-zone__preview" alt="preview" />
          <template v-else>
            <span class="upload-zone__text">Drop image or click to select</span>
          </template>
        </div>

        <div class="add-form__fields">
          <AppInput v-model="newTitle"       label="Title"       placeholder="Umbral" />
          <AppInput v-model="newPrice"       label="Price (€)"   placeholder="1400" type="number" />
          <AppInput v-model="newDescription" label="Medium · Dimensions" placeholder="Oil on linen · 90×120 cm" />
        </div>

        <p v-if="createError" class="page__error">{{ createError }}</p>

        <AppButton variant="solid" size="md" as="button" type="submit" :disabled="creating || !newFile">
          {{ creating ? 'Uploading…' : 'Add painting' }}
        </AppButton>
      </form>
    </details>

    <p v-if="error" class="page__error">{{ error }}</p>
    <div v-if="loading && !paintings.length" class="page__loading">Loading…</div>

    <!-- Paintings list -->
    <div v-else-if="paintings.length" class="paintings">
      <div v-for="p in paintings" :key="p.id" class="painting-row">
        <img :src="p.url" :alt="p.title" class="painting-row__img" />
        <div class="painting-row__body">
          <span class="painting-row__title">{{ p.title }}</span>
          <span class="painting-row__meta">{{ p.description }}</span>
          <span class="painting-row__price">€ {{ p.price?.toLocaleString('de-DE') }}</span>
        </div>
        <div class="painting-row__actions">
          <button
            class="painting-row__avail"
            :class="{ 'painting-row__avail--off': !p.available }"
            @click="toggleAvailable(p)"
          >
            {{ p.available ? 'Available' : 'Sold' }}
          </button>
          <button class="painting-row__del" @click="handleRemove(p)" aria-label="Delete">×</button>
        </div>
      </div>
    </div>

    <p v-else class="page__empty">No paintings yet.</p>
  </div>
</template>

<script setup lang="ts">
import type { Painting } from '~/types/database'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { paintings, loading, error, fetch, create, toggleAvailable, remove } = usePaintings()

await fetch()

// ── Add form ──────────────────────────────────────────
const formOpen       = ref(false)
const fileInput      = ref<HTMLInputElement | null>(null)
const dragOver       = ref(false)
const newFile        = ref<File | null>(null)
const newImagePreview = ref<string | null>(null)
const newTitle       = ref('')
const newPrice       = ref('')
const newDescription = ref('')
const creating       = ref(false)
const createError    = ref<string | null>(null)

function setFile(file: File) {
  newFile.value = file
  newImagePreview.value = URL.createObjectURL(file)
}
function onDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file?.type.startsWith('image/')) setFile(file)
}
function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) setFile(file)
}

async function handleCreate() {
  if (!newFile.value) return
  creating.value   = true
  createError.value = null

  const { error: err } = await create(newFile.value, {
    title:       newTitle.value,
    price:       parseFloat(newPrice.value) || 0,
    description: newDescription.value,
  })

  if (err) {
    createError.value = err
  } else {
    formOpen.value     = false
    newFile.value      = null
    newImagePreview.value = null
    newTitle.value     = ''
    newPrice.value     = ''
    newDescription.value = ''
  }
  creating.value = false
}

async function handleRemove(p: Painting) {
  if (!confirm(`Delete "${p.title}"?`)) return
  await remove(p)
}
</script>

<style scoped>
.page__head { margin-bottom: var(--space-7); display: flex; flex-direction: column; gap: var(--space-3); }
.page__title { font-family: var(--font-display); font-size: var(--display-xl); font-weight: var(--weight-light); color: var(--text-strong); letter-spacing: var(--tracking-tight); }
.page__sub { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); }
.page__loading, .page__empty { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-7); }
.page__error { font-family: var(--font-body); font-size: var(--text-sm); color: #b04040; margin: var(--space-4) 0; }

/* Add form */
.add-form { margin-bottom: var(--space-8); border: 1px solid var(--border-hair); border-radius: var(--radius-sm); }
.add-form__toggle { font-family: var(--font-body); font-size: var(--text-xs); font-weight: var(--weight-medium); letter-spacing: var(--tracking-wider); text-transform: uppercase; color: var(--text-body); padding: var(--space-5) var(--space-6); cursor: pointer; list-style: none; transition: color var(--dur-fast) var(--ease-soft); }
.add-form__toggle:hover { color: var(--text-strong); }
.add-form__body { padding: var(--space-6); border-top: 1px solid var(--border-hair); display: flex; flex-direction: column; gap: var(--space-6); }
.add-form__fields { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5) var(--space-7); }

.upload-zone {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  border: 1px dashed var(--border-accent);
  border-radius: var(--radius-sm);
  cursor: pointer;
  overflow: hidden;
  transition: background var(--dur-fast) var(--ease-soft);
}
.upload-zone:hover, .upload-zone--over { background: var(--bg-inset); border-color: var(--accent); }
.upload-zone--has { border-style: solid; }
.upload-zone__input { position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.upload-zone__text { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); }
.upload-zone__preview { width: 100%; height: 100%; object-fit: cover; max-height: 240px; }

/* Paintings list */
.paintings { display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-6); }
.painting-row {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--space-5);
  align-items: center;
  padding: var(--space-5);
  border: 1px solid var(--border-hair);
  border-radius: var(--radius-sm);
  background: var(--bg-raised);
}
.painting-row__img { width: 80px; height: 100px; object-fit: cover; border: 1px solid var(--border-soft); }
.painting-row__body { display: flex; flex-direction: column; gap: var(--space-2); }
.painting-row__title { font-family: var(--font-display); font-size: var(--display-md); font-weight: var(--weight-light); font-style: italic; color: var(--text-strong); }
.painting-row__meta { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: var(--tracking-wide); color: var(--text-muted); text-transform: uppercase; }
.painting-row__price { font-family: var(--font-body); font-size: var(--text-base); font-weight: var(--weight-medium); color: var(--text-body); font-variant-numeric: tabular-nums; }
.painting-row__actions { display: flex; flex-direction: column; align-items: flex-end; gap: var(--space-3); }
.painting-row__avail {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-xs);
  background: none;
  cursor: pointer;
  color: var(--text-body);
  transition: all var(--dur-fast) var(--ease-soft);
}
.painting-row__avail:hover { background: var(--bg-inset); }
.painting-row__avail--off { color: var(--text-faint); border-color: var(--border-soft); }
.painting-row__del { background: none; border: none; cursor: pointer; color: var(--text-faint); font-size: 1.2rem; line-height: 1; padding: var(--space-2); transition: color var(--dur-fast) var(--ease-soft); }
.painting-row__del:hover { color: #b04040; }

@media (max-width: 600px) {
  .add-form__body { padding: var(--space-5); }
  .add-form__fields { grid-template-columns: 1fr; }
  .upload-zone__preview { max-height: 200px; }
  .painting-row {
    grid-template-columns: 64px 1fr;
    gap: var(--space-4);
    padding: var(--space-4);
  }
  .painting-row__img { width: 64px; height: 80px; }
  .painting-row__actions {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    grid-column: 1 / -1;
    margin-top: var(--space-2);
  }
  .painting-row__avail { flex: 1; text-align: center; }
}
</style>
