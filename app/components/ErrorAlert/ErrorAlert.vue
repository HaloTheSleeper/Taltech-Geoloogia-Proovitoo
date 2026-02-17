<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import Button from "~/components/ui/button/Button.vue"

defineProps<{
  title: string
  description: string
  retryLabel: string
}>()

defineEmits<{
  retry: []
}>()
</script>

<template>
  <Alert class="border-accent/30 bg-accent/5">
    <AlertTitle class="font-heading text-2xl font-semibold text-accent">
      {{ title }}
    </AlertTitle>
    <AlertDescription class="mt-2 text-base text-muted-foreground">
      {{ description }}
    </AlertDescription>
    <Button variant="default" size="lg" class="mt-4" @click="$emit('retry')">
      {{ retryLabel }}
    </Button>
  </Alert>
</template>
