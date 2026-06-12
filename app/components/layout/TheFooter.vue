<template>
  <footer class="footer">
    <span>© {{ year }} Hierda Karlson</span>
    <span class="footer__c">Madrid</span>
    <a :href="model.instagram" target="_blank" rel="noopener noreferrer" class="footer__r">
      Instagram ↗
    </a>
  </footer>
</template>

<script setup lang="ts">
import { model } from '~/data/model'

const year = new Date().getFullYear()
</script>

<!-- Footer styling comes from the global portfolio.css reference sheet. -->
