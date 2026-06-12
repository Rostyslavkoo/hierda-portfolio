<template>
  <footer class="footer">
    <span class="footer__c">© {{ year }} Hierda Karlson · Madrid</span>
    <a :href="model.instagram" target="_blank" rel="noopener noreferrer" class="footer__r">
      Instagram ↗
    </a>
  </footer>
</template>

<script setup lang="ts">
import { model } from '~/data/model'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-7) var(--gutter);
  border-top: 1px solid var(--border-hair);
}

.footer__c,
.footer__r {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-muted);
}

.footer__r {
  transition: color var(--dur-fast) var(--ease-soft);
}
.footer__r:hover { color: var(--text-strong); }
</style>
