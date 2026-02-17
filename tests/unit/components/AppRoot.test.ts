import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import { defineComponent, h, Suspense, ref } from "vue"
import App from "~/app.vue"
import ErrorAlert from "~/components/ErrorAlert/ErrorAlert.vue"

const mockLayoutData = {
  navbar: { title: "Test Title", searchPlaceholder: "Search..." },
  footer: { copyright: "Test copyright" },
}

let useLayoutDataMock: ReturnType<typeof vi.fn>

const mountApp = async (stubs = {}) => {
  const wrapper = mount(
    defineComponent({
      render() {
        return h(Suspense, null, { default: () => h(App) })
      },
    }),
    {
      global: {
        components: { ErrorAlert },
        stubs: {
          AppNavbar: { template: "<nav />" },
          AppFooter: { template: "<footer />" },
          NuxtPage: { template: "<div />" },
          ...stubs,
        },
      },
    },
  )
  await flushPromises()
  return wrapper
}

describe("App", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {})
  })

  describe("when layout data loads successfully", () => {
    beforeEach(() => {
      useLayoutDataMock = vi.fn(() => ({
        data: ref(mockLayoutData),
        error: ref(null),
        refresh: vi.fn(),
      }))
      vi.stubGlobal("useLayoutData", useLayoutDataMock)
    })

    it("renders navbar, main and footer", async () => {
      const wrapper = await mountApp()
      expect(wrapper.find("nav").exists()).toBe(true)
      expect(wrapper.find("main").exists()).toBe(true)
      expect(wrapper.find("footer").exists()).toBe(true)
    })
  })

  describe("when layout data fails to load", () => {
    let refreshMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
      refreshMock = vi.fn()
      useLayoutDataMock = vi.fn(() => ({
        data: ref(null),
        error: ref(new Error("Failed to fetch")),
        refresh: refreshMock,
      }))
      vi.stubGlobal("useLayoutData", useLayoutDataMock)
    })

    it("renders error alert with retry button", async () => {
      const wrapper = await mountApp()
      expect(wrapper.find("nav").exists()).toBe(false)
      expect(wrapper.find("footer").exists()).toBe(false)
      expect(wrapper.text()).toContain("Andmete laadimine ebaõnnestus")
      expect(wrapper.text()).toContain("Proovi uuesti")
    })

    it("calls refresh when retry button is clicked", async () => {
      const wrapper = await mountApp()
      await wrapper.find("button").trigger("click")
      expect(refreshMock).toHaveBeenCalled()
    })
  })
})
