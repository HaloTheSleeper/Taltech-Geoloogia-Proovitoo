import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BoreholeLocalityDetailLoading from "~/components/borehole-localities/BoreholeLocalityDetailLoading.vue"

describe("BoreholeLocalityDetailLoading", () => {
  it("renders skeleton elements for the detail layout", () => {
    const wrapper = mount(BoreholeLocalityDetailLoading)
    const skeletons = wrapper.findAll("[class*='animate-pulse']")
    // 14 regular fields (2 skeletons each) + 2 wide fields (2 each) + title + map title + map body = 35
    expect(skeletons.length).toBe(35)
  })

  it("renders the info card container", () => {
    const wrapper = mount(BoreholeLocalityDetailLoading)
    expect(wrapper.find(".rounded-lg.border.border-border.bg-card").exists()).toBe(true)
  })
})
