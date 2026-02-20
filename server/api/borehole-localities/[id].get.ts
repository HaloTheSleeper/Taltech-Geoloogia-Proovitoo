import type { BoreholeLocality } from "~/types/api"

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const baseUrl = config.boreholeLocalitiesApiUrl as string
    const id = getRouterParam(event, "id")

    const detailUrl = baseUrl.endsWith("/") ? `${baseUrl}${id}/` : `${baseUrl}/${id}/`

    try {
      return await $fetch<BoreholeLocality>(detailUrl, {
        params: {
          expand: "country",
        },
      })
    } catch (error) {
      const status = (error as { response?: { status?: number } })?.response?.status
      throw createError({
        statusCode: status === 404 ? 404 : 502,
        statusMessage: status === 404 ? "Resource not found" : "Failed to fetch from external API",
      })
    }
  },
  {
    maxAge: 60 * 60,
    getKey: (event) => {
      const id = getRouterParam(event, "id")
      return `borehole-locality:${id}`
    },
  },
)
