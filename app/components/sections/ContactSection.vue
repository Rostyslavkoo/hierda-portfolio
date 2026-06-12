<template>
  <section id="contact" class="contact">
    <h2 class="contact__bleed-title">CONTACT</h2>
    <p class="contact__sub">Madrid · Available worldwide</p>

    <svg
      class="contact__flower"
      width="420" height="120"
      viewBox="0 0 420 120"
      fill="none"
      stroke="#1a1a1a"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      style="opacity: 0.28"
    >
      <path d="M60 118 C58 96 52 80 55 58 C57 42 66 26 62 8" />
      <path d="M62 8 C46 -4 30 6 46 22 C52 28 62 8 62 8" />
      <path d="M62 8 C78 -4 92 6 76 22 C70 28 62 8 62 8" />
      <path d="M62 8 C42 10 36 26 52 28 C58 30 62 8 62 8" />
      <path d="M62 8 C82 12 86 28 70 28 C64 30 62 8 62 8" />
      <path d="M62 8 C62 -10 70 -2 62 8" />
      <path d="M58 64 C42 56 34 66 46 74" />
      <path d="M56 82 C66 70 78 72 70 82" />
      <path d="M62 90 C120 70 190 90 210 60 C230 32 280 50 340 40 C360 36 380 28 360 10" />
      <path d="M360 118 C362 96 368 80 365 58 C363 42 354 26 358 8" />
      <path d="M358 8 C342 -4 326 6 342 22 C348 28 358 8 358 8" />
      <path d="M358 8 C374 -4 388 6 372 22 C366 28 358 8 358 8" />
      <path d="M358 8 C338 10 332 26 348 28 C354 30 358 8 358 8" />
      <path d="M358 8 C378 12 382 28 366 28 C360 30 358 8 358 8" />
      <path d="M358 8 C358 -10 366 -2 358 8" />
      <path d="M362 64 C378 56 386 66 374 74" />
    </svg>

    <nav class="contact__links" aria-label="Contact links">
      <a :href="model.instagram" target="_blank" rel="noopener noreferrer" class="contact__link">
        Instagram <span class="arr" aria-hidden="true">↗</span>
      </a>
      <a :href="`mailto:${model.email}`" class="contact__link">
        Email <span class="arr" aria-hidden="true">↗</span>
      </a>
      <a href="#" class="contact__link">
        Agency <span class="arr" aria-hidden="true">↗</span>
      </a>
    </nav>

    <p class="contact__form-label">Send a message</p>
    <form class="contact__form" @submit="submit" novalidate>
      <div class="contact__form-row">
        <AppInput
          v-model="fields.name"
          label="Name"
          placeholder="Your name"
          :required="true"
        />
        <AppInput
          v-model="fields.email"
          label="Email"
          type="email"
          placeholder="you@studio.com"
          :required="true"
        />
      </div>
      <AppTextarea
        v-model="fields.message"
        label="Message"
        placeholder="Tell me about the project"
        :rows="3"
        :required="true"
      />
      <div class="contact__form-actions">
        <AppButton variant="solid" size="md" as="button" type="submit">
          Send
        </AppButton>
        <span v-if="submitted" class="contact__thanks">
          Thank you — I'll be in touch.
        </span>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { model } from '~/data/model'
import { useContactForm } from '~/composables/useContactForm'

const { fields, submitted, submit } = useContactForm()
</script>

<style scoped>
/* Layout, links and form styling come from the global portfolio.css reference.
 * Only the submit row + acknowledgement (inline-styled in the reference) live here. */
.contact__form-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.contact__thanks {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--text-muted);
}
</style>
