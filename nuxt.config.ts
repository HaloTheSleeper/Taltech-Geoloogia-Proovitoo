// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  runtimeConfig: {
    boreholeLocalitiesApiUrl: process.env.BOREHOLE_LOCALITIES_API_URL || "",
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts"],
  fonts: {
    families: [
      { name: "Montserrat", provider: "google", weights: [400, 500, 600, 700] },
      { name: "Inter", provider: "google", weights: [400, 500, 600, 700] },
    ],
  },
  imports: {
    dirs: ["composables/**"],
  },
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components/ui",
      pathPrefix: false,
      ignore: ["**/index.ts"],
    },
    {
      path: "~/components/layout",
      prefix: "Layout",
      pathPrefix: true,
    },
    {
      path: "~/components/shared",
      prefix: "Shared",
      pathPrefix: true,
    },
    {
      path: "~/components/borehole-localities",
      pathPrefix: false,
    },
  ],
})
