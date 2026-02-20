<script setup lang="ts">
import type { BoreholeLocality } from "~/types/api"
import type { BoreholeLocalityDetailCmsData } from "~/types/cms"

defineProps<{
  locality: BoreholeLocality
  labels: BoreholeLocalityDetailCmsData["fields"]
}>()
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-4 sm:p-6">
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.id }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.id }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.name }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.name || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.nameEn }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.name_en || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.country }}</dt>
        <dd class="mt-1 truncate text-sm">
          {{ locality.country?.name || locality.country?.name_en || "–" }}
        </dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.latitude }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.latitude ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.longitude }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.longitude ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.depth }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.depth ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.elevation }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.elevation ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.number }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.number || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.code }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.code || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.coordx }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.coordx ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.coordy }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.coordy ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.epsg }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.epsg ?? "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.landBoardId }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.land_board_id || "–" }}</dd>
      </div>

      <div class="sm:col-span-2 lg:col-span-3">
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.remarks }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.remarks || "–" }}</dd>
      </div>

      <div class="sm:col-span-2 lg:col-span-3">
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.remarksLocation }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.remarks_location || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">
          {{ labels.stratigraphyTopText }}
        </dt>
        <dd class="mt-1 truncate text-sm">{{ locality.stratigraphy_top_text || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">
          {{ labels.stratigraphyBaseText }}
        </dt>
        <dd class="mt-1 truncate text-sm">{{ locality.stratigraphy_base_text || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.dateAdded }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.date_added || "–" }}</dd>
      </div>

      <div>
        <dt class="text-sm font-medium text-muted-foreground">{{ labels.dateChanged }}</dt>
        <dd class="mt-1 truncate text-sm">{{ locality.date_changed || "–" }}</dd>
      </div>
    </dl>
  </div>
</template>
