<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet"

defineProps<{
  latitude: number
  longitude: number
  title: string
}>()
</script>

<template>
  <div>
    <h3 class="mb-3 font-heading text-lg font-semibold">{{ title }}</h3>
    <div class="overflow-hidden rounded-lg border border-border">
      <LMap
        :zoom="10"
        :center="[latitude, longitude]"
        :use-global-leaflet="false"
        style="height: 400px; width: 100%"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="[latitude, longitude]" />
      </LMap>
    </div>
  </div>
</template>
