import { describe, it, expect, vi, beforeEach } from "vitest"
import { fetchCmsData } from "~/lib/cms"

// In the Vitest / happy-dom environment import.meta.server is undefined (falsy),
// so fetchCmsData always takes the client-side path ($fetch).
// The server-side path (node:fs/promises) would require a Node environment
// with import.meta.server === true, which is not part of this test suite.

const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)

describe("fetchCmsData (client-side path)", () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it("calls $fetch with /data/{filename} URL", async () => {
    mockFetch.mockResolvedValue({})

    await fetchCmsData("layout.json")

    expect(mockFetch).toHaveBeenCalledWith("/data/layout.json")
  })

  it("calls $fetch with the correct URL for any filename", async () => {
    mockFetch.mockResolvedValue({})

    await fetchCmsData("borehole-localities.json")

    expect(mockFetch).toHaveBeenCalledWith("/data/borehole-localities.json")
  })

  it("returns the data resolved by $fetch", async () => {
    const mockData = { pageTitle: "Boreholes", columns: {} }
    mockFetch.mockResolvedValue(mockData)

    const result = await fetchCmsData("borehole-localities.json")

    expect(result).toEqual(mockData)
  })

  it("propagates errors thrown by $fetch", async () => {
    mockFetch.mockRejectedValue(new Error("Not found"))

    await expect(fetchCmsData("missing.json")).rejects.toThrow("Not found")
  })
})
