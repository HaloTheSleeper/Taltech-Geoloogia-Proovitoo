<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core"
import Input from "~/components/ui/input/Input.vue"

defineProps<{
  title: string
  searchPlaceholder: string
}>()

const route = useRoute()
const localSearch = ref((route.query.search as string) || "")

const debouncedNavigate = useDebounceFn((value: string) => {
  navigateTo({
    path: route.path,
    query: {
      ...route.query,
      search: value || undefined,
      page: undefined,
    },
  })
}, 400)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  localSearch.value = value
  debouncedNavigate(value)
}
</script>

<template>
  <nav class="bg-primary text-primary-foreground">
    <div class="content-container py-3">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="min-w-0 truncate font-heading text-lg font-semibold 2xl:text-xl">
          {{ title }}
        </h1>
        <div class="w-full sm:max-w-sm 2xl:max-w-md">
          <Input
            :model-value="localSearch"
            :placeholder="searchPlaceholder"
            class="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/50"
            @input="handleInput"
          />
        </div>
      </div>
    </div>
  </nav>
</template>
