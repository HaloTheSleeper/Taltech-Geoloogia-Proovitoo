<script setup lang="ts">
import { ArrowLeft, MapPinOff } from "lucide-vue-next"

const { data: cms } = await useBoreholeLocalityDetailCms()
const { locality, isLoading, error, refresh } = useBoreholeLocalityDetail()

const hasCoordinates = computed(
  () => locality.value?.latitude != null && locality.value?.longitude != null,
)

const handleBack = () => {
  navigateTo("/")
}
</script>

<template>
  <section class="content-container py-6 sm:py-8">
    <div class="mb-6">
      <Button variant="ghost" class="gap-2 px-2" @click="handleBack">
        <ArrowLeft class="h-4 w-4" />
        {{ cms?.backButton }}
      </Button>
    </div>

    <BoreholeLocalitiesLoading v-if="isLoading" />

    <SharedErrorAlert
      v-else-if="error && cms"
      :title="cms.error.title"
      :description="cms.error.description"
      :retry-label="cms.error.retryLabel"
      @retry="refresh()"
    />

    <template v-else-if="locality && cms">
      <h2 class="mb-6 truncate font-heading text-xl font-semibold sm:text-2xl 2xl:text-3xl">
        {{ locality.name || locality.name_en || cms.pageTitle }}
      </h2>

      <div class="space-y-6">
        <BoreholeLocalityDetailInfo :locality="locality" :labels="cms.fields" />

        <BoreholeLocalityDetailMap
          v-if="hasCoordinates"
          :latitude="locality.latitude!"
          :longitude="locality.longitude!"
          :title="cms.mapTitle"
        />

        <div
          v-else
          class="flex items-center gap-3 rounded-lg border border-border bg-muted p-4 sm:p-6"
        >
          <MapPinOff class="h-5 w-5 shrink-0 text-muted-foreground" />
          <p class="text-sm text-muted-foreground">{{ cms.coordinatesNotAvailable }}</p>
        </div>
      </div>
    </template>
  </section>
</template>
