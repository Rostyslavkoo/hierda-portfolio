<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title">Portfolio</h1>
      <p class="page__sub">
        Gallery photos shown on the public site. Drag to reorder.
        Set category to <strong>Cover</strong> for the 3 homepage hero photos,
        or <strong>About portrait</strong> for the About section image.
      </p>
    </div>

    <!-- Upload zone -->
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
      <span class="upload-zone__text">
        Drop photos here or click to select
      </span>
      <span class="upload-zone__hint">JPG, PNG, WEBP</span>
    </div>

    <!-- Category selector for pending uploads -->
    <div v-if="pending.length" class="pending">
      <h2 class="pending__title">Ready to upload ({{ pending.length }})</h2>
      <div class="pending__grid">
        <div v-for="(item, i) in pending" :key="i" class="pending__item">
          <img :src="item.preview" :alt="item.file.name" class="pending__thumb" />
          <select v-model="item.category" class="pending__select">
            <option value="cover">Cover (top 3)</option>
            <option value="editorial">Editorial</option>
            <option value="commercial">Commercial</option>
            <option value="portrait">Portrait</option>
            <option value="about">About portrait</option>
          </select>
          <button class="pending__remove" @click="pending.splice(i, 1)" aria-label="Remove">×</button>
        </div>
      </div>
      <div class="pending__actions">
        <AppButton variant="solid" size="md" as="button" :disabled="uploading" @click="uploadAll">
          {{ uploading ? `Uploading ${uploadProgress}…` : `Upload ${pending.length} photo${pending.length > 1 ? 's' : ''}` }}
        </AppButton>
        <AppButton variant="ghost" size="md" as="button" @click="pending = []">Cancel</AppButton>
      </div>
    </div>

    <!-- Error -->
    <p v-if="error" class="page__error">{{ error }}</p>

    <!-- Photo grid -->
    <div v-if="loading && !photos.length" class="page__loading">Loading…</div>

    <div v-else-if="photos.length" class="photo-grid">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="photo-grid__item"
        draggable="true"
        @dragstart="dragStart(photo)"
        @dragover.prevent
        @drop.prevent="dropOnto(photo)"
      >
        <img :src="photo.url" :alt="`Photo ${photo.id}`" class="photo-grid__img" />
        <div class="photo-grid__meta">
          <span class="photo-grid__cat">{{ photo.category ?? '—' }}</span>
          <button class="photo-grid__del" @click="handleRemove(photo)" aria-label="Delete photo">×</button>
        </div>
      </div>
    </div>

    <p v-else class="page__empty">No photos yet. Upload some above.</p>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '~/types/database'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { photos, loading, error, fetch, upload, remove, reorder } = usePhotos()

await fetch()

// ── Upload ──────────────────────────────────────────
const fileInput  = ref<HTMLInputElement | null>(null)
const dragOver   = ref(false)
const uploading  = ref(false)
const uploadProgress = ref('')

interface PendingItem {
  file: File
  preview: string
  category: NonNullable<Photo['category']>
}
const pending = ref<PendingItem[]>([])

function preparePending(files: File[]) {
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    pending.value.push({
      file,
      preview: URL.createObjectURL(file),
      category: 'editorial',
    })
  }
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
    await upload(item.file, item.category)
  }
  pending.value = []
  uploading.value = false
  uploadProgress.value = ''
}

// ── Delete ──────────────────────────────────────────
async function handleRemove(photo: Photo) {
  if (!confirm(`Delete this photo?`)) return
  await remove(photo)
}

// ── Reorder (drag) ──────────────────────────────────
let draggedPhoto: Photo | null = null

function dragStart(photo: Photo) {
  draggedPhoto = photo
}

function dropOnto(target: Photo) {
  if (!draggedPhoto || draggedPhoto.id === target.id) return
  const from = photos.value.findIndex(p => p.id === draggedPhoto!.id)
  const to   = photos.value.findIndex(p => p.id === target.id)
  const copy = [...photos.value]
  copy.splice(from, 1)
  copy.splice(to, 0, draggedPhoto)
  reorder(copy)
  draggedPhoto = null
}
</script>

<style scoped>
.page__head {
  margin-bottom: var(--space-7);
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
.page__loading, .page__empty {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-7);
}
.page__error {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: #b04040;
  margin: var(--space-4) 0;
}

/* Upload zone */
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
  transition: background var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft);
  margin-bottom: var(--space-7);
}
.upload-zone:hover, .upload-zone--over {
  background: var(--bg-inset);
  border-color: var(--accent);
}
.upload-zone__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  pointer-events: none;
}
.upload-zone__text {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-body);
}
.upload-zone__hint {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-muted);
}

/* Pending */
.pending { margin-bottom: var(--space-8); }
.pending__title {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--space-5);
}
.pending__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
.pending__item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.pending__thumb {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border: 1px solid var(--border-hair);
}
.pending__select {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-body);
  background: var(--bg-inset);
  border: 1px solid var(--border-hair);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-xs);
  cursor: pointer;
}
.pending__remove {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 24px;
  height: 24px;
  background: rgba(10,10,10,0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pending__actions {
  display: flex;
  gap: var(--space-4);
}

/* Photo grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-6);
}
.photo-grid__item {
  position: relative;
  border: 1px solid var(--border-hair);
  cursor: grab;
  transition: opacity var(--dur-fast) var(--ease-soft);
}
.photo-grid__item:active { cursor: grabbing; opacity: 0.7; }
.photo-grid__img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;
}
.photo-grid__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  background: var(--bg-raised);
}
.photo-grid__cat {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--text-muted);
  text-transform: uppercase;
}
.photo-grid__del {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-faint);
  font-size: 1.1rem;
  line-height: 1;
  padding: 2px 4px;
  transition: color var(--dur-fast) var(--ease-soft);
}
.photo-grid__del:hover { color: #b04040; }

@media (max-width: 600px) {
  .upload-zone { padding: var(--space-7) var(--space-5); }
  .pending__grid { grid-template-columns: repeat(2, 1fr); }
  .pending__actions { flex-direction: column; align-items: stretch; }
  .photo-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
  /* larger touch targets for delete on touch screens */
  .photo-grid__del { font-size: 1.4rem; padding: 4px 8px; }
}
</style>
