<script setup lang="ts">
defineProps<{
  copyright: string
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-muted text-muted-foreground">
    <div class="content-container py-4 text-center text-sm">
      &copy; {{ currentYear }} {{ copyright }}
    </div>
  </footer>
</template>
