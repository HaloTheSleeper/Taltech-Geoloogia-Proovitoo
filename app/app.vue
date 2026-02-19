<script setup lang="ts">
const { data: layout, error, refresh } = await useLayoutData()

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <template v-if="error">
      <div class="content-container py-8">
        <SharedErrorAlert
          title="Andmete laadimine ebaõnnestus"
          description="Lehekülge ei õnnestunud laadida. Palun proovige uuesti."
          retry-label="Proovi uuesti"
          @retry="refresh()"
        />
      </div>
    </template>
    <template v-else>
      <LayoutAppNavbar
        v-if="layout"
        :title="layout.navbar.title"
        :search-placeholder="layout.navbar.searchPlaceholder"
      />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <LayoutAppFooter v-if="layout" :copyright="layout.footer.copyright" />
    </template>
  </div>
</template>
