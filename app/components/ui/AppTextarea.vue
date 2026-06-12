<template>
  <div class="field">
    <label v-if="label" :for="fieldId" class="field__label">{{ label }}</label>
    <textarea
      :id="fieldId"
      class="field__textarea"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  id?: string
  rows?: number
  placeholder?: string
  required?: boolean
}>(), { rows: 4, required: false })

defineEmits<{
  'update:modelValue': [value: string]
}>()

const fieldId = computed(
  () => props.id ?? (props.label ? `field-${props.label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
)
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
}

.field__textarea {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
  color: var(--text-strong);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-hair);
  padding: 10px 0;
  outline: none;
  resize: vertical;
  transition: border-color var(--dur-base) var(--ease-editorial);
  width: 100%;
}

.field__textarea::placeholder {
  color: var(--text-faint);
}

.field__textarea:focus {
  border-bottom-color: var(--accent);
}
</style>
