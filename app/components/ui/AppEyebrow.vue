<template>
  <span class="eyebrow">
    <span v-if="rule" class="eyebrow__rule" aria-hidden="true" />
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ rule?: boolean }>(), { rule: true })
</script>

<style scoped>
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-accent);
}

.eyebrow__rule {
  width: 32px;
  height: 1px;
  background: var(--accent);
  flex: none;
}
</style>
