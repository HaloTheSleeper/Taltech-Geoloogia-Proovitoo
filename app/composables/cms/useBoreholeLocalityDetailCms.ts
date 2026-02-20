import type { BoreholeLocalityDetailCmsData } from "~/types/cms"
import { fetchCmsData } from "~/lib/cms"

export const useBoreholeLocalityDetailCms = () => {
  return useAsyncData("borehole-locality-detail-cms", () =>
    fetchCmsData<BoreholeLocalityDetailCmsData>("borehole-locality-detail.json"),
  )
}
