import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import AppFooter from "~/components/AppFooter/AppFooter.vue"

describe("AppFooter", () => {
  const defaultProps = {
    copyright: "Tallinna Ülikooli Geoloogia Instituut — Kõik õigused kaitstud",
  }

  it("renders the copyright text", () => {
    const wrapper = mount(AppFooter, { props: defaultProps })
    expect(wrapper.text()).toContain(defaultProps.copyright)
  })

  it("includes the current year", () => {
    const wrapper = mount(AppFooter, { props: defaultProps })
    const currentYear = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(currentYear)
  })
})
