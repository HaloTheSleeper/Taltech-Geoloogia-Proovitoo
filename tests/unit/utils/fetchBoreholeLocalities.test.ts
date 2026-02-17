import { describe, it, expect, vi, beforeEach } from "vitest"
import { fetchBoreholeLocalities } from "~/lib/borehole-localities"

const mockResponse = {
  count: 100,
  next: null,
  previous: null,
  results: [],
}

const mockFetch = vi.fn(() => Promise.resolve(mockResponse))

vi.stubGlobal("$fetch", mockFetch)

describe("fetchBoreholeLocalities", () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it("calls $fetch with base URL and query params", async () => {
    await fetchBoreholeLocalities("https://api.example.com/localities", {
      limit: 20,
      offset: 0,
      expand: "country",
    })

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/localities", {
      params: {
        limit: 20,
        offset: 0,
        expand: "country",
      },
    })
  })

  it("includes name__icontains when provided", async () => {
    await fetchBoreholeLocalities("https://api.example.com/localities", {
      limit: 20,
      offset: 0,
      name__icontains: "puurauk",
      expand: "country",
    })

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/localities", {
      params: {
        limit: 20,
        offset: 0,
        name__icontains: "puurauk",
        expand: "country",
      },
    })
  })

  it("omits name__icontains when not provided", async () => {
    await fetchBoreholeLocalities("https://api.example.com/localities", {
      limit: 20,
      offset: 40,
    })

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/localities", {
      params: {
        limit: 20,
        offset: 40,
      },
    })
  })

  it("returns the API response", async () => {
    const result = await fetchBoreholeLocalities("https://api.example.com/localities", {
      limit: 20,
      offset: 0,
    })

    expect(result).toEqual(mockResponse)
  })
})
