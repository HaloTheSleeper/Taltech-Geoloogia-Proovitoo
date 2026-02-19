<script setup lang="ts">
import type { BoreholeLocality } from "~/types/api"
import type { BoreholeLocalitiesCmsData } from "~/types/cms"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

defineProps<{
  localities: BoreholeLocality[]
  columns: BoreholeLocalitiesCmsData["columns"]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{{ columns.id }}</TableHead>
          <TableHead>{{ columns.name }}</TableHead>
          <TableHead>{{ columns.country }}</TableHead>
          <TableHead class="hidden sm:table-cell">{{ columns.latitude }}</TableHead>
          <TableHead class="hidden sm:table-cell">{{ columns.longitude }}</TableHead>
          <TableHead>{{ columns.depth }}</TableHead>
          <TableHead class="hidden sm:table-cell">{{ columns.elevation }}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="locality in localities" :key="locality.id">
          <TableCell class="font-medium">{{ locality.id }}</TableCell>
          <TableCell>{{ locality.name_en || locality.name || "–" }}</TableCell>
          <TableCell>{{ locality.country?.name_en || locality.country?.name || "–" }}</TableCell>
          <TableCell class="hidden sm:table-cell">{{ locality.latitude ?? "–" }}</TableCell>
          <TableCell class="hidden sm:table-cell">{{ locality.longitude ?? "–" }}</TableCell>
          <TableCell>{{ locality.depth ?? "–" }}</TableCell>
          <TableCell class="hidden sm:table-cell">{{ locality.elevation ?? "–" }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
