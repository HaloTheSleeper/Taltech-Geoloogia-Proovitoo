import type { BoreholeLocalitiesResponse } from "~/types/api"

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const baseUrl = config.boreholeLocalitiesApiUrl as string

    const query = getQuery(event)

    try {
      return await $fetch<BoreholeLocalitiesResponse>(baseUrl, {
        params: {
          limit: query.limit,
          offset: query.offset,
          ...(query.name__icontains ? { name__icontains: query.name__icontains } : {}),
          ...(query.expand ? { expand: query.expand } : {}),
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
      const query = getQuery(event)
      return `borehole-localities:${query.limit}:${query.offset}:${query.name__icontains || ""}:${query.expand || ""}`
    },
  },
)
