import { describe, it, expect, vi, beforeEach } from "vitest"
import type { BoreholeLocalitiesResponse, BoreholeLocality } from "~/types/api"

// ── Nitro global stubs ───────────────────────────────────────────────────────

const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)

const mockRuntimeConfig = {
  boreholeLocalitiesApiUrl: "https://api.example.com/localities",
}
vi.stubGlobal("useRuntimeConfig", () => mockRuntimeConfig)

let mockQuery: Record<string, string | undefined> = {}
vi.stubGlobal("getQuery", () => mockQuery)

// defineCachedEventHandler: extract the handler and cache options
let handler: (event: unknown) => Promise<unknown>
let cacheOptions: { maxAge: number; getKey: (event: unknown) => string; varies?: string[] }

vi.stubGlobal(
  "defineCachedEventHandler",
  (fn: (event: unknown) => Promise<unknown>, options: typeof cacheOptions) => {
    handler = fn
    cacheOptions = options
    return fn
  },
)

// ── Import the route (triggers defineCachedEventHandler) ─────────────────────

await import("../../../server/api/borehole-localities.get")

// ── Helpers ──────────────────────────────────────────────────────────────────

const fakeEvent = {} as unknown

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

// ── Tests ────────────────────────────────────────────────────────────────────

describe("server/api/borehole-localities.get", () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockQuery = {}
    mockFetch.mockResolvedValue(makeResponse())
  })

  describe("handler", () => {
    it("fetches from the external API URL in runtimeConfig", async () => {
      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/localities",
        expect.objectContaining({ params: expect.any(Object) }),
      )
    })

    it("forwards limit and offset query params", async () => {
      mockQuery = { limit: "20", offset: "40" }

      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({ limit: "20", offset: "40" }),
        }),
      )
    })

    it("forwards name__icontains when present", async () => {
      mockQuery = { limit: "20", offset: "0", name__icontains: "puurauk" }

      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({ name__icontains: "puurauk" }),
        }),
      )
    })

    it("omits name__icontains when not present", async () => {
      mockQuery = { limit: "20", offset: "0" }

      await handler(fakeEvent)

      const params = mockFetch.mock.calls[0][1].params
      expect(params).not.toHaveProperty("name__icontains")
    })

    it("forwards expand when present", async () => {
      mockQuery = { limit: "20", offset: "0", expand: "country" }

      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({ expand: "country" }),
        }),
      )
    })

    it("omits expand when not present", async () => {
      mockQuery = { limit: "20", offset: "0" }

      await handler(fakeEvent)

      const params = mockFetch.mock.calls[0][1].params
      expect(params).not.toHaveProperty("expand")
    })

    it("returns the external API response", async () => {
      const response = makeResponse({
        count: 1,
        results: [makeLocality({ id: 42, name: "Rõuge" })],
      })
      mockFetch.mockResolvedValue(response)

      const result = await handler(fakeEvent)

      expect(result).toEqual(response)
    })

    it("propagates errors from the external API", async () => {
      mockFetch.mockRejectedValue(new Error("External API error"))

      await expect(handler(fakeEvent)).rejects.toThrow("External API error")
    })
  })

  describe("cache options", () => {
    it("has a 1 hour maxAge", () => {
      expect(cacheOptions.maxAge).toBe(60 * 60)
    })

    it("generates cache key from limit, offset, name__icontains and expand", () => {
      mockQuery = { limit: "20", offset: "40", name__icontains: "test", expand: "country" }

      const key = cacheOptions.getKey(fakeEvent)

      expect(key).toBe("borehole-localities:20:40:test:country")
    })

    it("uses empty strings for missing optional params in cache key", () => {
      mockQuery = { limit: "20", offset: "0" }

      const key = cacheOptions.getKey(fakeEvent)

      expect(key).toBe("borehole-localities:20:0::")
    })
  })
})
