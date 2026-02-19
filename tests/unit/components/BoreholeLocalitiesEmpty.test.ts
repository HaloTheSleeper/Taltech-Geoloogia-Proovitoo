import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BoreholeLocalitiesEmpty from "~/components/borehole-localities/BoreholeLocalitiesEmpty.vue"

describe("BoreholeLocalitiesEmpty", () => {
  const defaultProps = {
    title: "No results found",
    description: "Try changing your search query.",
  }

  it("renders the title", () => {
    const wrapper = mount(BoreholeLocalitiesEmpty, { props: defaultProps })
    expect(wrapper.text()).toContain("No results found")
  })

  it("renders the description", () => {
    const wrapper = mount(BoreholeLocalitiesEmpty, { props: defaultProps })
    expect(wrapper.text()).toContain("Try changing your search query.")
  })
})
