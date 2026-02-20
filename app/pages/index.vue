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
  <section class="content-container py-6 sm:py-8">
    <h2 v-if="cms" class="truncate font-heading text-xl font-semibold sm:text-2xl 2xl:text-3xl">
      {{ cms.pageTitle }}
    </h2>

    <div class="mt-4 sm:mt-6">
      <BoreholeLocalitiesLoading v-if="isLoading" />

      <SharedErrorAlert
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
  </section>
</template>
