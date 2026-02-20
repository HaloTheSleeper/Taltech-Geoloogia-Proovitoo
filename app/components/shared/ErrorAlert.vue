<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import Button from "~/components/ui/button/Button.vue"

withDefaults(
  defineProps<{
    title: string
    description: string
    retryLabel?: string
  }>(),
  {
    retryLabel: "Proovi uuesti",
  },
)

defineEmits<{
  retry: []
}>()
</script>

<template>
  <Alert class="border-accent/30 bg-accent/5">
    <AlertTitle class="font-heading text-xl font-semibold text-accent sm:text-2xl">
      {{ title }}
    </AlertTitle>
    <AlertDescription class="mt-2 text-base text-muted-foreground">
      {{ description }}
    </AlertDescription>
    <Button
      variant="default"
      size="lg"
      class="mt-4 block max-w-[300px] truncate"
      @click="$emit('retry')"
    >
      {{ retryLabel }}
    </Button>
  </Alert>
</template>
