import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BoreholeLocalitiesLoading from "~/components/borehole-localities/BoreholeLocalitiesLoading.vue"

describe("BoreholeLocalitiesLoading", () => {
  it("renders skeleton elements", () => {
    const wrapper = mount(BoreholeLocalitiesLoading)
    const skeletons = wrapper.findAll("[class*='animate-pulse']")
    expect(skeletons.length).toBe(21)
  })
})
