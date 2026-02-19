import type { BoreholeLocalitiesParams, BoreholeLocalitiesResponse } from "~/types/api"

export const fetchBoreholeLocalities = async (
  baseUrl: string,
  params: BoreholeLocalitiesParams,
): Promise<BoreholeLocalitiesResponse> => {
  return $fetch<BoreholeLocalitiesResponse>(baseUrl, {
    params: {
      limit: params.limit,
      offset: params.offset,
      ...(params.name__icontains ? { name__icontains: params.name__icontains } : {}),
      ...(params.expand ? { expand: params.expand } : {}),
    },
  })
}
