import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import ErrorAlert from "~/components/ErrorAlert/ErrorAlert.vue"

describe("ErrorAlert", () => {
  const defaultProps = {
    title: "Test Error",
    description: "Something went wrong.",
  }

  it("renders title and description", () => {
    const wrapper = mount(ErrorAlert, { props: defaultProps })
    expect(wrapper.text()).toContain("Test Error")
    expect(wrapper.text()).toContain("Something went wrong.")
  })

  it("renders default retry label", () => {
    const wrapper = mount(ErrorAlert, { props: defaultProps })
    expect(wrapper.find("button").text()).toBe("Proovi uuesti")
  })

  it("renders custom retry label", () => {
    const wrapper = mount(ErrorAlert, {
      props: { ...defaultProps, retryLabel: "Retry" },
    })
    expect(wrapper.find("button").text()).toBe("Retry")
  })

  it("emits retry event when button is clicked", async () => {
    const wrapper = mount(ErrorAlert, { props: defaultProps })
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted("retry")).toHaveLength(1)
  })
})
