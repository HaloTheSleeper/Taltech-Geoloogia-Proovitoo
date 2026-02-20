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
          <TableHead
            ><span class="block max-w-[60px] truncate">{{ columns.id }}</span></TableHead
          >
          <TableHead
            ><span class="block max-w-[180px] truncate">{{ columns.name }}</span></TableHead
          >
          <TableHead
            ><span class="block max-w-[100px] truncate">{{ columns.country }}</span></TableHead
          >
          <TableHead class="hidden sm:table-cell"
            ><span class="block max-w-[100px] truncate">{{ columns.latitude }}</span></TableHead
          >
          <TableHead class="hidden sm:table-cell"
            ><span class="block max-w-[100px] truncate">{{ columns.longitude }}</span></TableHead
          >
          <TableHead
            ><span class="block max-w-[100px] truncate">{{ columns.depth }}</span></TableHead
          >
          <TableHead class="hidden sm:table-cell"
            ><span class="block max-w-[100px] truncate">{{ columns.elevation }}</span></TableHead
          >
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="locality in localities" :key="locality.id">
          <TableCell class="font-medium max-w-[60px] truncate">{{ locality.id }}</TableCell>
          <TableCell>
            <span class="block max-w-[180px] truncate">{{
              locality.name || locality.name_en || "–"
            }}</span>
          </TableCell>
          <TableCell>
            <span class="block max-w-[100px] truncate">{{
              locality.country?.name || locality.country?.name_en || "–"
            }}</span>
          </TableCell>
          <TableCell class="hidden sm:table-cell max-w-[100px] truncate">{{
            locality.latitude ?? "–"
          }}</TableCell>
          <TableCell class="hidden sm:table-cell max-w-[100px] truncate">{{
            locality.longitude ?? "–"
          }}</TableCell>
          <TableCell>{{ locality.depth ?? "–" }}</TableCell>
          <TableCell class="hidden sm:table-cell max-w-[100px] truncate">{{
            locality.elevation ?? "–"
          }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
