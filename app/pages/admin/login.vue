<template>
  <div class="login">
    <div class="login__card">
      <div class="login__brand">
        <span class="login__mono">HK</span>
        <p class="login__sub">Admin access</p>
      </div>

      <form class="login__form" @submit.prevent="submit">
        <AppInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="studio@hierdakarlson.com"
          autocomplete="email"
        />
        <AppInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
        />

        <p v-if="error" class="login__error">{{ error }}</p>

        <AppButton variant="solid" size="md" as="button" type="submit" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, loading, error } = useAuth()

const email    = ref('')
const password = ref('')

async function submit() {
  const ok = await login(email.value, password.value)
  if (ok) await navigateTo('/admin')
}
</script>

<style scoped>
.login {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
  padding: var(--space-6);
}

.login__card {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.login__brand {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.login__mono {
  font-family: var(--font-handwritten);
  font-size: 3rem;
  color: var(--text-strong);
  line-height: 1;
}

.login__sub {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--text-muted);
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.login__error {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: #b04040;
  padding: var(--space-3) var(--space-4);
  border: 1px solid rgba(176, 64, 64, 0.2);
  border-radius: var(--radius-sm);
}
</style>
