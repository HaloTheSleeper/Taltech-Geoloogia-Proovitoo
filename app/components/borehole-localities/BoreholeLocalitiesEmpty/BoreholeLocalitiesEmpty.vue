<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="py-12 text-center">
    <h2 class="font-heading text-xl font-semibold text-muted-foreground">
      {{ title }}
    </h2>
    <p class="mt-2 text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
