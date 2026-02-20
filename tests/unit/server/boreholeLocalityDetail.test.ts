import { describe, it, expect, vi, beforeEach } from "vitest"
import type { BoreholeLocality } from "~/types/api"

// ── Nitro global stubs ───────────────────────────────────────────────────────

const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)

const mockRuntimeConfig = {
  boreholeLocalitiesApiUrl: "https://api.example.com/localities/",
}
vi.stubGlobal("useRuntimeConfig", () => mockRuntimeConfig)

let mockRouterParam = "42"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
vi.stubGlobal("getRouterParam", (_event: unknown, _param: string) => mockRouterParam)

vi.stubGlobal("createError", (input: { statusCode: number; statusMessage: string }) => {
  const err = new Error(input.statusMessage) as Error & {
    statusCode: number
    statusMessage: string
  }
  err.statusCode = input.statusCode
  err.statusMessage = input.statusMessage
  return err
})

// defineCachedEventHandler: extract the handler and cache options
let handler: (event: unknown) => Promise<unknown>
let cacheOptions: { maxAge: number; getKey: (event: unknown) => string }

vi.stubGlobal(
  "defineCachedEventHandler",
  (fn: (event: unknown) => Promise<unknown>, options: typeof cacheOptions) => {
    handler = fn
    cacheOptions = options
    return fn
  },
)

// ── Import the route (triggers defineCachedEventHandler) ─────────────────────

await import("../../../server/api/borehole-localities/[id].get")

// ── Helpers ──────────────────────────────────────────────────────────────────

const fakeEvent = {} as unknown

const makeLocality = (overrides: Partial<BoreholeLocality> = {}): BoreholeLocality => ({
  id: 42,
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

// ── Tests ────────────────────────────────────────────────────────────────────

describe("server/api/borehole-localities/[id].get", () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockRouterParam = "42"
    mockFetch.mockResolvedValue(makeLocality())
  })

  describe("handler", () => {
    it("fetches the detail URL with the id appended", async () => {
      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/localities/42/",
        expect.objectContaining({ params: { expand: "country" } }),
      )
    })

    it("constructs URL correctly when base URL has trailing slash", async () => {
      mockRuntimeConfig.boreholeLocalitiesApiUrl = "https://api.example.com/localities/"

      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/localities/42/",
        expect.anything(),
      )
    })

    it("constructs URL correctly when base URL has no trailing slash", async () => {
      mockRuntimeConfig.boreholeLocalitiesApiUrl = "https://api.example.com/localities"

      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/localities/42/",
        expect.anything(),
      )
    })

    it("uses the id from router params", async () => {
      mockRouterParam = "99"

      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/99/"), expect.anything())
    })

    it("always requests expand=country", async () => {
      await handler(fakeEvent)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ params: { expand: "country" } }),
      )
    })

    it("returns the external API response", async () => {
      const locality = makeLocality({ id: 42, name: "Rõuge" })
      mockFetch.mockResolvedValue(locality)

      const result = await handler(fakeEvent)

      expect(result).toEqual(locality)
    })

    it("throws 502 when external API returns a non-404 error", async () => {
      mockFetch.mockRejectedValue({ response: { status: 500 } })

      await expect(handler(fakeEvent)).rejects.toThrow("Failed to fetch from external API")
      await expect(handler(fakeEvent)).rejects.toMatchObject({ statusCode: 502 })
    })

    it("throws 404 when external API returns 404", async () => {
      mockFetch.mockRejectedValue({ response: { status: 404 } })

      await expect(handler(fakeEvent)).rejects.toThrow("Resource not found")
      await expect(handler(fakeEvent)).rejects.toMatchObject({ statusCode: 404 })
    })

    it("throws 502 when external API throws without a response status", async () => {
      mockFetch.mockRejectedValue(new Error("Network failure"))

      await expect(handler(fakeEvent)).rejects.toThrow("Failed to fetch from external API")
      await expect(handler(fakeEvent)).rejects.toMatchObject({ statusCode: 502 })
    })
  })

  describe("cache options", () => {
    it("has a 1 hour maxAge", () => {
      expect(cacheOptions.maxAge).toBe(60 * 60)
    })

    it("generates cache key from the id", () => {
      mockRouterParam = "42"

      const key = cacheOptions.getKey(fakeEvent)

      expect(key).toBe("borehole-locality:42")
    })

    it("generates different cache keys for different ids", () => {
      mockRouterParam = "99"

      const key = cacheOptions.getKey(fakeEvent)

      expect(key).toBe("borehole-locality:99")
    })
  })
})
