import type { LayoutData } from "~/types/layout"
import { fetchCmsData } from "~/lib/cms"

export const useLayoutData = () => {
  return useAsyncData("layout", () => fetchCmsData<LayoutData>("layout.json"))
}
