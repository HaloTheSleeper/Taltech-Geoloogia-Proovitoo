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
            ><span class="block max-w-[180px] truncate 2xl:max-w-xs">{{
              columns.name
            }}</span></TableHead
          >
          <TableHead
            ><span class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
              columns.country
            }}</span></TableHead
          >
          <TableHead class="hidden sm:table-cell"
            ><span class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
              columns.latitude
            }}</span></TableHead
          >
          <TableHead class="hidden sm:table-cell"
            ><span class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
              columns.longitude
            }}</span></TableHead
          >
          <TableHead
            ><span class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
              columns.depth
            }}</span></TableHead
          >
          <TableHead class="hidden sm:table-cell"
            ><span class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
              columns.elevation
            }}</span></TableHead
          >
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="locality in localities"
          :key="locality.id"
          class="cursor-pointer transition-colors hover:bg-muted/50"
          @click="navigateTo(`/borehole-localities/${locality.id}`)"
        >
          <TableCell class="font-medium max-w-[60px] truncate">{{ locality.id }}</TableCell>
          <TableCell>
            <span class="block max-w-[180px] truncate 2xl:max-w-xs">{{
              locality.name || locality.name_en || "–"
            }}</span>
          </TableCell>
          <TableCell>
            <span class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
              locality.country?.name || locality.country?.name_en || "–"
            }}</span>
          </TableCell>
          <TableCell class="hidden sm:table-cell max-w-[100px] truncate 2xl:max-w-[150px]">{{
            locality.latitude || "–"
          }}</TableCell>
          <TableCell class="hidden sm:table-cell max-w-[100px] truncate 2xl:max-w-[150px]">{{
            locality.longitude || "–"
          }}</TableCell>
          <TableCell class="block max-w-[100px] truncate 2xl:max-w-[150px]">{{
            locality.depth || "–"
          }}</TableCell>
          <TableCell class="hidden sm:table-cell max-w-[100px] truncate 2xl:max-w-[150px]">{{
            locality.elevation || "–"
          }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
