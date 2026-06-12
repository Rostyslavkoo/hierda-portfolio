<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title">Digitals</h1>
      <p class="page__sub">Comp card snaps — face, front, 3/4, etc. Shown in the Digitals section.</p>
    </div>

    <!-- Upload -->
    <div
      class="upload-zone"
      :class="{ 'upload-zone--over': dragOver }"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        class="upload-zone__input"
        @change="onFileChange"
      />
      <span class="upload-zone__text">Drop snaps here or click to select</span>
      <span class="upload-zone__hint">JPG, PNG, WEBP</span>
    </div>

    <!-- Pending -->
    <div v-if="pending.length" class="pending">
      <h2 class="pending__title">Ready to upload ({{ pending.length }})</h2>
      <div class="pending__grid">
        <div v-for="(item, i) in pending" :key="i" class="pending__item">
          <img :src="item.preview" :alt="item.label" class="pending__thumb" />
          <select v-model="item.label" class="pending__select">
            <option v-for="l in LABELS" :key="l" :value="l">{{ l }}</option>
          </select>
          <button class="pending__remove" @click="pending.splice(i, 1)" aria-label="Remove">×</button>
        </div>
      </div>
      <div class="pending__actions">
        <AppButton variant="solid" size="md" as="button" :disabled="uploading" @click="uploadAll">
          {{ uploading ? `Uploading ${uploadProgress}…` : `Upload ${pending.length}` }}
        </AppButton>
        <AppButton variant="ghost" size="md" as="button" @click="pending = []">Cancel</AppButton>
      </div>
    </div>

    <p v-if="error" class="page__error">{{ error }}</p>
    <div v-if="loading && !digitals.length" class="page__loading">Loading…</div>

    <!-- Grid -->
    <div v-else-if="digitals.length" class="photo-grid">
      <div v-for="d in digitals" :key="d.id" class="photo-grid__item">
        <img :src="d.url" :alt="d.label ?? ''" class="photo-grid__img" />
        <div class="photo-grid__meta">
          <span class="photo-grid__cat">{{ d.label ?? '—' }}</span>
          <button class="photo-grid__del" @click="handleRemove(d)" aria-label="Delete">×</button>
        </div>
      </div>
    </div>

    <p v-else class="page__empty">No digitals yet.</p>
  </div>
</template>

<script setup lang="ts">
import type { Digital } from '~/types/database'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { digitals, loading, error, LABELS, fetch, upload, remove } = useDigitals()

await fetch()

const fileInput  = ref<HTMLInputElement | null>(null)
const dragOver   = ref(false)
const uploading  = ref(false)
const uploadProgress = ref('')

interface PendingItem { file: File; preview: string; label: string }
const pending = ref<PendingItem[]>([])

function preparePending(files: File[]) {
  files.filter(f => f.type.startsWith('image/')).forEach((file, i) => {
    pending.value.push({
      file,
      preview: URL.createObjectURL(file),
      label: LABELS[i % LABELS.length],
    })
  })
}
function onDrop(e: DragEvent) {
  dragOver.value = false
  if (e.dataTransfer?.files) preparePending(Array.from(e.dataTransfer.files))
}
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) preparePending(Array.from(files))
}
async function uploadAll() {
  uploading.value = true
  for (let i = 0; i < pending.value.length; i++) {
    const item = pending.value[i]
    uploadProgress.value = `${i + 1}/${pending.value.length}`
    await upload(item.file, item.label)
  }
  pending.value = []
  uploading.value = false
}
async function handleRemove(d: Digital) {
  if (!confirm('Delete this digital?')) return
  await remove(d)
}
</script>

<style scoped>
.page__head { margin-bottom: var(--space-7); display: flex; flex-direction: column; gap: var(--space-3); }
.page__title { font-family: var(--font-display); font-size: var(--display-xl); font-weight: var(--weight-light); color: var(--text-strong); letter-spacing: var(--tracking-tight); }
.page__sub { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); }
.page__loading, .page__empty { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-7); }
.page__error { font-family: var(--font-body); font-size: var(--text-sm); color: #b04040; margin: var(--space-4) 0; }

.upload-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-9) var(--space-6);
  border: 1px dashed var(--border-accent);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-soft);
  margin-bottom: var(--space-7);
}
.upload-zone:hover, .upload-zone--over { background: var(--bg-inset); border-color: var(--accent); }
.upload-zone__input { position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.upload-zone__text { font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); }
.upload-zone__hint { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: var(--tracking-wide); color: var(--text-muted); }

.pending { margin-bottom: var(--space-8); }
.pending__title { font-family: var(--font-body); font-size: var(--text-xs); font-weight: var(--weight-medium); letter-spacing: var(--tracking-wider); text-transform: uppercase; color: var(--text-muted); margin-bottom: var(--space-5); }
.pending__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6); }
.pending__item { position: relative; display: flex; flex-direction: column; gap: var(--space-2); }
.pending__thumb { width: 100%; aspect-ratio: 3/4; object-fit: cover; border: 1px solid var(--border-hair); }
.pending__select { font-family: var(--font-body); font-size: var(--text-xs); color: var(--text-body); background: var(--bg-inset); border: 1px solid var(--border-hair); padding: var(--space-2) var(--space-3); border-radius: var(--radius-xs); cursor: pointer; }
.pending__remove { position: absolute; top: var(--space-2); right: var(--space-2); width: 24px; height: 24px; background: rgba(10,10,10,0.7); color: #fff; border: none; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; }
.pending__actions { display: flex; gap: var(--space-4); }

.photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--space-4); margin-top: var(--space-6); }
.photo-grid__item { border: 1px solid var(--border-hair); }
.photo-grid__img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
.photo-grid__meta { display: flex; align-items: center; justify-content: space-between; padding: var(--space-2) var(--space-3); background: var(--bg-raised); }
.photo-grid__cat { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: var(--tracking-wide); color: var(--text-muted); text-transform: uppercase; }
.photo-grid__del { background: none; border: none; cursor: pointer; color: var(--text-faint); font-size: 1.1rem; line-height: 1; padding: 2px 4px; transition: color var(--dur-fast) var(--ease-soft); }
.photo-grid__del:hover { color: #b04040; }
</style>
