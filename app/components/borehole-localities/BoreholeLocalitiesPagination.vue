<script setup lang="ts">
import type { BoreholeLocalitiesCmsData } from "~/types/cms"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import { PAGE_SIZE } from "~/lib/constants"

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
  <div class="flex flex-col items-center">
    <Pagination
      :page="page"
      :total="totalPages * PAGE_SIZE"
      :items-per-page="PAGE_SIZE"
      :sibling-count="1"
      @update:page="$emit('update:page', $event)"
    >
      <PaginationContent v-slot="{ items }" class="flex-wrap gap-1.5 sm:gap-1">
        <PaginationPrevious as="button" class="block max-w-[100px] truncate">
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

        <PaginationNext as="button" class="block max-w-[100px] truncate">
          {{ labels.next }}
        </PaginationNext>
      </PaginationContent>
    </Pagination>
    <p class="mt-2 text-center text-sm text-muted-foreground block max-w-[150px] truncate">
      {{ pageInfo }}
    </p>
  </div>
</template>
