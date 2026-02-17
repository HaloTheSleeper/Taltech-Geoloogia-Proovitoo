// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts"],
  fonts: {
    families: [
      { name: "Montserrat", provider: "google", weights: [400, 500, 600, 700] },
      { name: "Inter", provider: "google", weights: [400, 500, 600, 700] },
    ],
  },
  css: ["~/assets/css/main.css"],
})
