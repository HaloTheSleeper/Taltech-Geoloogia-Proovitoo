import type { BoreholeLocality } from "~/types/api"

export const useBoreholeLocalityDetail = () => {
  const route = useRoute()

  const id = computed(() => route.params.id as string)

  const { data, status, error, refresh } = useAsyncData(
    () => `borehole-locality-${id.value}`,
    () =>
      $fetch<BoreholeLocality>(`/api/borehole-localities/${id.value}`, {
        params: {
          expand: "country",
        },
      }),
    {
      watch: [id],
    },
  )

  return {
    locality: computed(() => data.value ?? null),
    isLoading: computed(() => status.value === "pending"),
    error,
    refresh,
  }
}
