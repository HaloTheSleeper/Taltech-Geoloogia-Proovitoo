import { describe, it, expect, vi, beforeEach } from "vitest"
import { ref, computed, watch } from "vue"
import { flushPromises } from "@vue/test-utils"
import type { BoreholeLocality, BoreholeLocalitiesResponse } from "~/types/api"

// Stub Vue reactivity as Nuxt globals
vi.stubGlobal("ref", ref)
vi.stubGlobal("computed", computed)
vi.stubGlobal("watch", watch)

const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)

// Controlled route query — update before each test case
let mockQuery: Record<string, string> = {}
vi.stubGlobal("useRoute", () => ({ query: mockQuery, path: "/" }))

// Simplified useAsyncData: calls the handler immediately (mirrors SSR behaviour),
// returns reactive data/status/error and a functional refresh.
// Note: the `watch` option is not exercised here — reactivity to route changes
// is covered by the watch: [page, searchQuery] in the composable itself, which
// would require a full Nuxt testing environment to verify.
vi.stubGlobal("useAsyncData", (_key: string, handler: () => Promise<unknown>) => {
  const data = ref<unknown>(null)
  const status = ref<"pending" | "success" | "error">("pending")
  const error = ref<unknown>(null)

  const execute = async () => {
    status.value = "pending"
    try {
      data.value = await handler()
      status.value = "success"
    } catch (e) {
      error.value = e
      status.value = "error"
    }
  }

  const refresh = vi.fn(execute)
  execute()

  return { data, status, error, refresh }
})

import { useBoreholeLocalities } from "~/composables/borehole-localities/useBoreholeLocalities"

// ── Helpers ────────────────────────────────────────────────────────────────────

const makeLocality = (overrides: Partial<BoreholeLocality> = {}): BoreholeLocality => ({
  id: 1,
  name: "Puurauk",
  name_en: "Puurauk",
  country: null,
  depth: null,
  elevation: null,
  latitude: null,
  longitude: null,
  number: null,
  area: null,
  code: null,
  coordx: null,
  coordy: null,
  coordinate_system: null,
  epsg: null,
  land_board_id: null,
  municipality: null,
  remarks: null,
  remarks_location: null,
  stratigraphy_base_text: null,
  stratigraphy_top_text: null,
  coordinate_agent: null,
  coordinate_method: null,
  coordinate_precision: null,
  parent: null,
  type: null,
  settlement: null,
  stratigraphy_base: null,
  stratigraphy_top: null,
  date_added: null,
  date_changed: null,
  ...overrides,
})

const makeResponse = (
  overrides: Partial<BoreholeLocalitiesResponse> = {},
): BoreholeLocalitiesResponse => ({
  count: 0,
  next: null,
  previous: null,
  results: [],
  ...overrides,
})

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("useBoreholeLocalities", () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockQuery = {}
    mockFetch.mockResolvedValue(makeResponse())
  })

  describe("fetch params", () => {
    it("fetches with limit=20, offset=0 and expand=country by default", async () => {
      useBoreholeLocalities()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/borehole-localities",
        expect.objectContaining({
          params: expect.objectContaining({ limit: 20, offset: 0, expand: "country" }),
        }),
      )
    })

    it("calculates offset from page query param (page 3 → offset 40)", async () => {
      mockQuery = { page: "3" }
      useBoreholeLocalities()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/borehole-localities",
        expect.objectContaining({
          params: expect.objectContaining({ offset: 40 }),
        }),
      )
    })

    it("passes search term as name__icontains param", async () => {
      mockQuery = { search: "puurauk" }
      useBoreholeLocalities()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/borehole-localities",
        expect.objectContaining({
          params: expect.objectContaining({ name__icontains: "puurauk" }),
        }),
      )
    })
  })

  describe("derived state", () => {
    it("page is 1 when query param is absent", () => {
      const { page } = useBoreholeLocalities()
      expect(page.value).toBe(1)
    })

    it("page is 1 when query param is not a valid number", () => {
      mockQuery = { page: "abc" }
      const { page } = useBoreholeLocalities()
      expect(page.value).toBe(1)
    })

    it("page reflects valid page query param", () => {
      mockQuery = { page: "4" }
      const { page } = useBoreholeLocalities()
      expect(page.value).toBe(4)
    })

    it("searchQuery reflects search query param", () => {
      mockQuery = { search: "rõuge" }
      const { searchQuery } = useBoreholeLocalities()
      expect(searchQuery.value).toBe("rõuge")
    })

    it("searchQuery is empty string when param is absent", () => {
      const { searchQuery } = useBoreholeLocalities()
      expect(searchQuery.value).toBe("")
    })

    it("localities is derived from API response results", async () => {
      mockFetch.mockResolvedValue(
        makeResponse({ count: 1, results: [makeLocality({ id: 42, name: "Rõuge" })] }),
      )

      const { localities } = useBoreholeLocalities()
      await flushPromises()

      expect(localities.value).toHaveLength(1)
      expect(localities.value[0].id).toBe(42)
      expect(localities.value[0].name).toBe("Rõuge")
    })

    it("localities is an empty array before data resolves", () => {
      mockFetch.mockReturnValue(new Promise(() => {}))

      const { localities } = useBoreholeLocalities()
      expect(localities.value).toEqual([])
    })

    it("totalCount reflects API response count", async () => {
      mockFetch.mockResolvedValue(makeResponse({ count: 150 }))

      const { totalCount } = useBoreholeLocalities()
      await flushPromises()

      expect(totalCount.value).toBe(150)
    })

    it("totalPages is derived from count divided by page size (20)", async () => {
      mockFetch.mockResolvedValue(makeResponse({ count: 100 }))

      const { totalPages } = useBoreholeLocalities()
      await flushPromises()

      expect(totalPages.value).toBe(5)
    })

    it("totalPages is at least 1 when count is 0", async () => {
      mockFetch.mockResolvedValue(makeResponse({ count: 0 }))

      const { totalPages } = useBoreholeLocalities()
      await flushPromises()

      expect(totalPages.value).toBe(1)
    })
  })

  describe("loading state", () => {
    it("isLoading is true while fetch is pending", () => {
      mockFetch.mockReturnValue(new Promise(() => {}))

      const { isLoading } = useBoreholeLocalities()
      expect(isLoading.value).toBe(true)
    })

    it("isLoading is false after fetch resolves", async () => {
      const { isLoading } = useBoreholeLocalities()
      await flushPromises()

      expect(isLoading.value).toBe(false)
    })
  })

  describe("error state", () => {
    it("error is set when fetch rejects", async () => {
      const fetchError = new Error("Network error")
      mockFetch.mockRejectedValue(fetchError)

      const { error } = useBoreholeLocalities()
      await flushPromises()

      expect(error.value).toBe(fetchError)
    })

    it("refresh re-executes the fetch", async () => {
      const { refresh } = useBoreholeLocalities()
      await flushPromises()

      mockFetch.mockResolvedValue(makeResponse({ count: 5 }))
      await refresh()

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
})
