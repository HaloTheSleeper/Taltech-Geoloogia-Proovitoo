import type { BoreholeLocalitiesCmsData } from "~/types/cms"
import { fetchCmsData } from "~/lib/cms"

export const useBoreholeLocalitiesCms = () => {
  return useAsyncData("borehole-localities-cms", () =>
    fetchCmsData<BoreholeLocalitiesCmsData>("borehole-localities.json"),
  )
}
