import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"

// Mock leaflet modules to avoid ESM resolution errors in test environment
vi.mock("leaflet/dist/leaflet.css", () => ({}))
vi.mock("@vue-leaflet/vue-leaflet", () => ({
  LMap: { template: '<div class="l-map-mock"><slot /></div>' },
  LTileLayer: { template: "<div></div>" },
  LMarker: { template: "<div></div>" },
}))

import BoreholeLocalityDetailMap from "~/components/borehole-localities/BoreholeLocalityDetailMap.client.vue"

describe("BoreholeLocalityDetailMap", () => {
  const defaultProps = {
    latitude: 58.899398,
    longitude: 22.524572,
    title: "Asukoht kaardil",
  }

  it("renders the map section title", () => {
    const wrapper = mount(BoreholeLocalityDetailMap, {
      props: defaultProps,
    })
    expect(wrapper.text()).toContain("Asukoht kaardil")
  })

  it("renders the map container with border styling", () => {
    const wrapper = mount(BoreholeLocalityDetailMap, {
      props: defaultProps,
    })
    const container = wrapper.find(".rounded-lg.border")
    expect(container.exists()).toBe(true)
  })

  it("renders the LMap mock inside the container", () => {
    const wrapper = mount(BoreholeLocalityDetailMap, {
      props: defaultProps,
    })
    const mapMock = wrapper.find(".l-map-mock")
    expect(mapMock.exists()).toBe(true)
  })
})
