<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton"
</script>

<template>
  <div class="space-y-3">
    <Skeleton class="h-10 w-full" />
    <Skeleton v-for="i in 20" :key="i" class="h-8 w-full" />
  </div>
</template>
