import type { BoreholeLocality } from "~/types/api"

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const baseUrl = config.boreholeLocalitiesApiUrl as string
    const id = getRouterParam(event, "id")

    const detailUrl = baseUrl.endsWith("/") ? `${baseUrl}${id}/` : `${baseUrl}/${id}/`

    return $fetch<BoreholeLocality>(detailUrl, {
      params: {
        expand: "country",
      },
    })
  },
  {
    maxAge: 60 * 60,
    getKey: (event) => {
      const id = getRouterParam(event, "id")
      return `borehole-locality:${id}`
    },
  },
)
