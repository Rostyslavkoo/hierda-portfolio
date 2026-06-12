<template>
  <section id="contact" class="contact">
    <div class="contact__bleed-title">CONTACT</div>

    <div class="contact__center">
      <p class="contact__sub">Madrid · Available Worldwide</p>

      <div class="contact__ribbon" aria-hidden="true">
        <svg width="260" height="90" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- left bow -->
          <path d="M65 45 C55 20 20 18 18 38 C16 55 50 58 65 45Z" stroke="currentColor" stroke-width="0.9" fill="none"/>
          <path d="M65 45 C55 70 20 72 18 52 C16 35 50 32 65 45Z" stroke="currentColor" stroke-width="0.9" fill="none"/>
          <!-- right bow -->
          <path d="M195 45 C205 20 240 18 242 38 C244 55 210 58 195 45Z" stroke="currentColor" stroke-width="0.9" fill="none"/>
          <path d="M195 45 C205 70 240 72 242 52 C244 35 210 32 195 45Z" stroke="currentColor" stroke-width="0.9" fill="none"/>
          <!-- ribbon line -->
          <path d="M65 45 Q130 32 195 45" stroke="currentColor" stroke-width="0.8" fill="none"/>
          <path d="M65 45 Q130 58 195 45" stroke="currentColor" stroke-width="0.8" fill="none"/>
          <!-- center knot -->
          <circle cx="130" cy="45" r="4" stroke="currentColor" stroke-width="0.8" fill="none"/>
        </svg>
      </div>

      <nav class="contact__links" aria-label="Social links">
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

      <div v-if="submitted" class="contact__thanks">
        <p>Thank you — I'll be in touch.</p>
      </div>

      <form v-else class="contact__form" @submit="submit" novalidate>
        <p class="contact__form-label">Send a message</p>
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
            placeholder="your@email.com"
            :required="true"
          />
        </div>
        <AppTextarea
          v-model="fields.message"
          label="Message"
          placeholder="Tell me about the project…"
          :rows="5"
          :required="true"
        />
        <AppButton variant="solid" size="md" as="button" type="submit">
          Send
        </AppButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { model } from '~/data/model'
import { useContactForm } from '~/composables/useContactForm'

const { fields, submitted, submit } = useContactForm()
</script>

<style scoped>
.contact {
  padding: var(--section-pad-y) 0;
  overflow: hidden;
}

.contact__bleed-title {
  font-family: var(--font-bleed);
  font-size: clamp(4rem, 18vw, 16rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--text-strong);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  text-align: center;
  margin-bottom: var(--space-6);
}

.contact__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-7);
  padding: 0 var(--gutter);
}

.contact__sub {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact__ribbon {
  color: var(--text-muted);
  opacity: 0.45;
}

.contact__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-strong);
  transition: color var(--dur-fast) var(--ease-soft);
}

.contact__link:hover {
  color: var(--text-accent);
}

.arr {
  font-style: normal;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  width: 100%;
  max-width: 760px;
}

.contact__form-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
  align-self: center;
}

.contact__form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
}

.contact__thanks {
  font-family: var(--font-display);
  font-size: var(--display-md);
  font-style: italic;
  color: var(--text-strong);
  padding: var(--space-8) 0;
  text-align: center;
}

@media (max-width: 600px) {
  .contact__form-row { grid-template-columns: 1fr; }
}
</style>
