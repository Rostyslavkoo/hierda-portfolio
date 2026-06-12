<template>
  <div class="stat" :class="`stat--${align}`">
    <span class="stat__value">{{ value }}</span>
    <span class="stat__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: string
  label: string
  align?: 'left' | 'center' | 'right'
}>(), { align: 'left' })
</script>

<style scoped>
.stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat--left  { text-align: left;   align-items: flex-start; }
.stat--center{ text-align: center; align-items: center; }
.stat--right { text-align: right;  align-items: flex-end; }

.stat__value {
  font-family: var(--font-display);
  font-size: var(--display-md);
  font-weight: var(--weight-medium);
  color: var(--text-strong);
  letter-spacing: 0.02em;
  line-height: 1;
}

.stat__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
}
</style>
