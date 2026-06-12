<template>
  <component
    :is="as"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--disabled': disabled }]"
    :disabled="as === 'button' ? disabled : undefined"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'solid' | 'ghost' | 'line'
  size?: 'sm' | 'md' | 'lg'
  as?: string
  disabled?: boolean
}>(), {
  variant: 'line',
  size: 'md',
  as: 'button',
  disabled: false,
})
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  text-decoration: none;
  border-radius: var(--radius-xs);
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    color var(--dur-fast) var(--ease-soft),
    background var(--dur-fast) var(--ease-soft),
    border-color var(--dur-fast) var(--ease-soft),
    opacity var(--dur-fast) var(--ease-soft);
}

.btn--disabled { opacity: 0.4; cursor: not-allowed; }

/* Sizes */
.btn--sm { font-size: var(--text-xs);  padding: 10px 18px; letter-spacing: 0.20em; }
.btn--md { font-size: var(--text-sm);  padding: 14px 28px; letter-spacing: 0.22em; }
.btn--lg { font-size: var(--text-base); padding: 18px 40px; letter-spacing: 0.24em; }

/* Variants */
.btn--solid {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.btn--solid:hover:not(.btn--disabled) {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.btn--ghost {
  background: transparent;
  color: var(--text-strong);
  border-color: var(--border-hair);
}
.btn--ghost:hover:not(.btn--disabled) {
  border-color: var(--accent);
  color: var(--text-accent);
}

.btn--line {
  background: transparent;
  color: var(--text-strong);
  border-color: transparent;
  border-bottom: 1px solid var(--accent);
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
}
.btn--line:hover:not(.btn--disabled) {
  color: var(--text-accent);
}

.btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}
</style>
