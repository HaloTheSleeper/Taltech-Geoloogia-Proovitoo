import type { BoreholeLocalitiesResponse } from "~/types/api"
import { PAGE_SIZE } from "~/lib/constants"

export const useBoreholeLocalities = () => {
  const route = useRoute()

  const page = computed(() => {
    const p = Number(route.query.page)
    return p > 0 ? Math.trunc(p) : 1
  })

  const searchQuery = computed(() => (route.query.search as string) || "")

  const params = computed(() => ({
    limit: PAGE_SIZE,
    offset: (page.value - 1) * PAGE_SIZE,
    name__icontains: searchQuery.value || undefined,
    expand: "country",
  }))

  const key = computed(() => `borehole-localities:${page.value}:${searchQuery.value}`)

  const { data, status, error, refresh } = useAsyncData(
    key,
    () => $fetch<BoreholeLocalitiesResponse>("/api/borehole-localities", { params: params.value }),
    {
      dedupe: "cancel",
    },
  )

  return {
    localities: computed(() => data.value?.results ?? []),
    totalCount: computed(() => data.value?.count ?? 0),
    totalPages: computed(() => Math.max(1, Math.ceil((data.value?.count ?? 0) / PAGE_SIZE))),
    page,
    searchQuery,
    isLoading: computed(() => status.value === "pending"),
    error,
    refresh,
  }
}
