import type { BoreholeLocalitiesResponse } from "~/types/api"

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const baseUrl = config.boreholeLocalitiesApiUrl as string

    const query = getQuery(event)

    return $fetch<BoreholeLocalitiesResponse>(baseUrl, {
      params: {
        limit: query.limit,
        offset: query.offset,
        ...(query.name__icontains ? { name__icontains: query.name__icontains } : {}),
        ...(query.expand ? { expand: query.expand } : {}),
      },
    })
  },
  {
    maxAge: 60 * 60,
    varies: ["x-query"],
    getKey: (event) => {
      const query = getQuery(event)
      return `borehole-localities:${query.limit}:${query.offset}:${query.name__icontains || ""}:${query.expand || ""}`
    },
  },
)
