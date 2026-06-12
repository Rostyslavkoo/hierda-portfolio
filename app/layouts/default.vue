<template>
  <div>
    <ClientOnly>
      <ThePreloader />
    </ClientOnly>
    <TheNav />
    <slot />
    <TheFooter />
  </div>
</template>
