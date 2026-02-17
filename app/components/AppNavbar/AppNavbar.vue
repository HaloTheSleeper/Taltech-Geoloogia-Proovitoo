<script setup lang="ts">
import Input from "~/components/ui/input/Input.vue"

defineProps<{
  title: string
  searchPlaceholder: string
}>()

const { searchQuery } = useBoreholeSearch()
</script>

<template>
  <nav class="bg-primary text-primary-foreground">
    <div class="content-container flex items-center justify-between py-3">
      <h1 class="font-heading text-lg font-semibold">
        {{ title }}
      </h1>
      <div class="w-full max-w-sm">
        <Input
          v-model="searchQuery"
          :placeholder="searchPlaceholder"
          class="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/50"
        />
      </div>
    </div>
  </nav>
</template>
