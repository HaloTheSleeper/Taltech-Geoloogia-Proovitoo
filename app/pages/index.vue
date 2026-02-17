<script setup lang="ts">
const { data: cms } = await useBoreholeLocalitiesCms()
const { localities, totalCount, totalPages, page, isLoading, error, refresh } =
  useBoreholeLocalities()

const route = useRoute()

const handlePageChange = (newPage: number) => {
  navigateTo({
    path: route.path,
    query: { ...route.query, page: newPage > 1 ? String(newPage) : undefined },
  })
}
</script>

<template>
  <div class="content-container py-8">
    <h2 v-if="cms" class="font-heading text-2xl font-semibold">
      {{ cms.pageTitle }}
    </h2>

    <div class="mt-6">
      <BoreholeLocalitiesLoading v-if="isLoading" />

      <ErrorAlert
        v-else-if="error && cms"
        :title="cms.error.title"
        :description="cms.error.description"
        :retry-label="cms.error.retryLabel"
        @retry="refresh()"
      />

      <template v-else-if="cms">
        <BoreholeLocalitiesEmpty
          v-if="totalCount === 0"
          :title="cms.emptyState.title"
          :description="cms.emptyState.description"
        />

        <template v-else>
          <BoreholeLocalitiesTable :localities="localities" :columns="cms.columns" />

          <div class="mt-6">
            <BoreholeLocalitiesPagination
              :page="page"
              :total-pages="totalPages"
              :labels="cms.pagination"
              @update:page="handlePageChange"
            />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
