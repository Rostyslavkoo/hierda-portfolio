<template>
  <div class="field">
    <label v-if="label" :for="fieldId" class="field__label">{{ label }}</label>
    <input
      :id="fieldId"
      class="field__input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  id?: string
  type?: string
  placeholder?: string
}>(), { type: 'text' })

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

.field__input {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-strong);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-hair);
  padding: 10px 0;
  outline: none;
  transition: border-color var(--dur-base) var(--ease-editorial);
  width: 100%;
}

.field__input::placeholder {
  color: var(--text-faint);
}

.field__input:focus {
  border-bottom-color: var(--accent);
}
</style>
