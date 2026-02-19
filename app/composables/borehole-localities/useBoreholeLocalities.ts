import type { BoreholeLocalitiesResponse } from "~/types/api"

const PAGE_SIZE = 20

export const useBoreholeLocalities = () => {
  const route = useRoute()

  const page = computed(() => {
    const p = Number(route.query.page)
    return p > 0 ? p : 1
  })

  const searchQuery = computed(() => {
    return (route.query.search as string) || ""
  })

  const { data, status, error, refresh } = useAsyncData(
    "borehole-localities",
    () =>
      $fetch<BoreholeLocalitiesResponse>("/api/borehole-localities", {
        params: {
          limit: PAGE_SIZE,
          offset: (page.value - 1) * PAGE_SIZE,
          name__icontains: searchQuery.value || undefined,
          expand: "country",
        },
      }),
    {
      watch: [page, searchQuery],
    },
  )

  const localities = computed(() => data.value?.results ?? [])
  const totalCount = computed(() => data.value?.count ?? 0)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / PAGE_SIZE)))

  return {
    localities,
    totalCount,
    totalPages,
    page,
    searchQuery,
    isLoading: computed(() => status.value === "pending"),
    error,
    refresh,
  }
}
