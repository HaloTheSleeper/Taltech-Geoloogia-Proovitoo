<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="py-8 text-center sm:py-12">
    <h2 class="font-heading text-lg font-semibold text-muted-foreground sm:text-xl">
      {{ title }}
    </h2>
    <p class="mt-2 text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
