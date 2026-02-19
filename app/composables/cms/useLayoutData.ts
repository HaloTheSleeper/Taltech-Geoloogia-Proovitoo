import type { LayoutData } from "~/types/cms"
import { fetchCmsData } from "~/lib/cms"

export const useLayoutData = () => {
  return useAsyncData("layout", () => fetchCmsData<LayoutData>("layout.json"))
}
