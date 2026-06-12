<template>
  <section id="contact" class="contact">
    <div class="contact__bleed-title">CONTACT</div>

    <div class="contact__inner">
      <div class="contact__left">
        <AppEyebrow>Get in touch</AppEyebrow>
        <p class="contact__sub">{{ model.location }}</p>

        <div class="contact__links">
          <a :href="model.instagram" target="_blank" rel="noopener noreferrer" class="contact__link">
            Instagram <span class="arr" aria-hidden="true">→</span>
          </a>
          <a :href="`mailto:${model.email}`" class="contact__link">
            {{ model.email }} <span class="arr" aria-hidden="true">→</span>
          </a>
          <a href="#" class="contact__link">
            Agency <span class="arr" aria-hidden="true">→</span>
          </a>
        </div>

        <div class="contact__flower" aria-hidden="true">
          <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 140 C60 140 20 100 20 70 C20 47 38 30 60 30 C82 30 100 47 100 70 C100 100 60 140 60 140Z"
                  stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.5"/>
            <path d="M60 30 C60 30 40 10 60 5 C80 10 60 30 60 30Z"
                  stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.4"/>
            <path d="M30 70 C30 70 10 55 15 40 C25 25 40 35 30 70Z"
                  stroke="currentColor" stroke-width="0.7" fill="none" opacity="0.35"/>
            <path d="M90 70 C90 70 110 55 105 40 C95 25 80 35 90 70Z"
                  stroke="currentColor" stroke-width="0.7" fill="none" opacity="0.35"/>
            <line x1="60" y1="140" x2="60" y2="158" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
          </svg>
        </div>
      </div>

      <div class="contact__right">
        <div v-if="submitted" class="contact__thanks">
          <p>Thank you — I'll be in touch.</p>
        </div>

        <form v-else class="contact__form" @submit="submit" novalidate>
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
  color: var(--bg-raised);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  margin-bottom: var(--space-9);
}

.contact__inner {
  padding: 0 var(--gutter);
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-10);
  align-items: start;
}

.contact__left {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.contact__sub {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-body);
  transition: color var(--dur-fast) var(--ease-soft);
}

.contact__link:hover {
  color: var(--text-strong);
}

.arr {
  display: inline-block;
  transition: transform var(--dur-fast) var(--ease-soft);
}
.contact__link:hover .arr {
  transform: translateX(4px);
}

.contact__flower {
  color: var(--text-muted);
  opacity: 0.28;
  margin-top: var(--space-4);
}

.contact__right {
  padding-top: var(--space-2);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.contact__thanks {
  font-family: var(--font-display);
  font-size: var(--display-md);
  font-style: italic;
  color: var(--text-strong);
  padding: var(--space-8) 0;
}

@media (max-width: 768px) {
  .contact__inner { grid-template-columns: 1fr; }
}
</style>
