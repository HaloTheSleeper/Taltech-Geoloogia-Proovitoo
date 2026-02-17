<script setup lang="ts">
import type { BoreholeLocalitiesCmsData } from "~/types/borehole-localities"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"

const PAGE_SIZE = 20

const props = defineProps<{
  page: number
  totalPages: number
  labels: BoreholeLocalitiesCmsData["pagination"]
}>()

defineEmits<{
  "update:page": [page: number]
}>()

const pageInfo = computed(() =>
  props.labels.pageInfo
    .replace("{page}", String(props.page))
    .replace("{totalPages}", String(props.totalPages)),
)
</script>

<template>
  <Pagination
    :page="page"
    :total="totalPages * PAGE_SIZE"
    :items-per-page="PAGE_SIZE"
    :sibling-count="1"
    @update:page="$emit('update:page', $event)"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious as="button">
        {{ labels.previous }}
      </PaginationPrevious>

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
          as="button"
        >
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" />
      </template>

      <PaginationNext as="button">
        {{ labels.next }}
      </PaginationNext>
    </PaginationContent>

    <p class="mt-2 text-center text-sm text-muted-foreground">
      {{ pageInfo }}
    </p>
  </Pagination>
</template>
