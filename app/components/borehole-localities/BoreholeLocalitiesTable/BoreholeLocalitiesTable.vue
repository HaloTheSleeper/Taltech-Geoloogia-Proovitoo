<script setup lang="ts">
import type { BoreholeLocality, BoreholeLocalitiesCmsData } from "~/types/borehole-localities"
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
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>{{ columns.id }}</TableHead>
        <TableHead>{{ columns.name }}</TableHead>
        <TableHead>{{ columns.country }}</TableHead>
        <TableHead>{{ columns.latitude }}</TableHead>
        <TableHead>{{ columns.longitude }}</TableHead>
        <TableHead>{{ columns.depth }}</TableHead>
        <TableHead>{{ columns.elevation }}</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="locality in localities" :key="locality.id">
        <TableCell class="font-medium">{{ locality.id }}</TableCell>
        <TableCell>{{ locality.name_en || locality.name || "–" }}</TableCell>
        <TableCell>{{ locality.country?.name_en || locality.country?.name || "–" }}</TableCell>
        <TableCell>{{ locality.latitude ?? "–" }}</TableCell>
        <TableCell>{{ locality.longitude ?? "–" }}</TableCell>
        <TableCell>{{ locality.depth ?? "–" }}</TableCell>
        <TableCell>{{ locality.elevation ?? "–" }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
