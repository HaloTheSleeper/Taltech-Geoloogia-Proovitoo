import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { ref } from "vue"
import AppNavbar from "~/components/layout/AppNavbar.vue"

vi.stubGlobal("ref", ref)

vi.stubGlobal("useRoute", () => ({
  query: {},
  path: "/",
}))

vi.stubGlobal("navigateTo", vi.fn())

describe("AppNavbar", () => {
  const defaultProps = {
    title: "Test Title",
    searchPlaceholder: "Search...",
  }

  it("renders the title", () => {
    const wrapper = mount(AppNavbar, { props: defaultProps })
    expect(wrapper.text()).toContain("Test Title")
  })

  it("renders the search input with placeholder", () => {
    const wrapper = mount(AppNavbar, { props: defaultProps })
    const input = wrapper.find("input")
    expect(input.exists()).toBe(true)
    expect(input.attributes("placeholder")).toBe("Search...")
  })

  it("updates search input value on user input", async () => {
    const wrapper = mount(AppNavbar, { props: defaultProps })
    const input = wrapper.find("input")
    await input.setValue("test query")
    expect(input.element.value).toBe("test query")
  })
})
