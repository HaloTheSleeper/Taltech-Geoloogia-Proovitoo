<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton"
</script>

<template>
  <div class="space-y-6">
    <!-- Page title -->
    <Skeleton class="h-8 w-1/3" />

    <!-- Info card -->
    <div class="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 14" :key="i">
          <Skeleton class="mb-2 h-4 w-24" />
          <Skeleton class="h-4 w-32" />
        </div>

        <!-- Full-width fields (remarks) -->
        <div v-for="i in 2" :key="`wide-${i}`" class="sm:col-span-2 lg:col-span-3">
          <Skeleton class="mb-2 h-4 w-24" />
          <Skeleton class="h-4 w-2/3" />
        </div>
      </div>
    </div>

    <!-- Map placeholder -->
    <div>
      <Skeleton class="mb-3 h-6 w-20" />
      <Skeleton class="h-[400px] w-full rounded-lg" />
    </div>
  </div>
</template>
