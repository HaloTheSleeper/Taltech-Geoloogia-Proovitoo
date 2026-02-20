import { describe, it, expect, vi, beforeEach } from "vitest"
import { ref, computed } from "vue"
import { flushPromises } from "@vue/test-utils"
import type { BoreholeLocality } from "~/types/api"

// Stub Vue reactivity as Nuxt globals
vi.stubGlobal("ref", ref)
vi.stubGlobal("computed", computed)

const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)

// Controlled route params — update before each test case
let mockParams: Record<string, string> = { id: "42" }
vi.stubGlobal("useRoute", () => ({ params: mockParams }))

// Simplified useAsyncData: calls the handler immediately
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

import { useBoreholeLocalityDetail } from "~/composables/borehole-localities/useBoreholeLocalityDetail"

// ── Helpers ────────────────────────────────────────────────────────────────────

const makeLocality = (overrides: Partial<BoreholeLocality> = {}): BoreholeLocality => ({
  id: 42,
  name: "Puurauk",
  name_en: "Borehole",
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

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("useBoreholeLocalityDetail", () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockParams = { id: "42" }
    mockFetch.mockResolvedValue(makeLocality())
  })

  describe("fetch params", () => {
    it("fetches the correct API endpoint with expand=country", async () => {
      useBoreholeLocalityDetail()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/borehole-localities/42",
        expect.objectContaining({
          params: expect.objectContaining({ expand: "country" }),
        }),
      )
    })

    it("uses the id from route params", async () => {
      mockParams = { id: "99" }
      useBoreholeLocalityDetail()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith("/api/borehole-localities/99", expect.anything())
    })
  })

  describe("derived state", () => {
    it("locality contains the fetched data", async () => {
      mockFetch.mockResolvedValue(makeLocality({ id: 42, name: "Rõuge" }))

      const { locality } = useBoreholeLocalityDetail()
      await flushPromises()

      expect(locality.value).not.toBeNull()
      expect(locality.value!.id).toBe(42)
      expect(locality.value!.name).toBe("Rõuge")
    })

    it("locality is null before data resolves", () => {
      mockFetch.mockReturnValue(new Promise(() => {}))

      const { locality } = useBoreholeLocalityDetail()
      expect(locality.value).toBeNull()
    })
  })

  describe("loading state", () => {
    it("isLoading is true while fetch is pending", () => {
      mockFetch.mockReturnValue(new Promise(() => {}))

      const { isLoading } = useBoreholeLocalityDetail()
      expect(isLoading.value).toBe(true)
    })

    it("isLoading is false after fetch resolves", async () => {
      const { isLoading } = useBoreholeLocalityDetail()
      await flushPromises()

      expect(isLoading.value).toBe(false)
    })
  })

  describe("error state", () => {
    it("error is set when fetch rejects", async () => {
      const fetchError = new Error("Not found")
      mockFetch.mockRejectedValue(fetchError)

      const { error } = useBoreholeLocalityDetail()
      await flushPromises()

      expect(error.value).toBe(fetchError)
    })

    it("refresh re-executes the fetch", async () => {
      const { refresh } = useBoreholeLocalityDetail()
      await flushPromises()

      mockFetch.mockResolvedValue(makeLocality({ id: 42 }))
      await refresh()

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
})
