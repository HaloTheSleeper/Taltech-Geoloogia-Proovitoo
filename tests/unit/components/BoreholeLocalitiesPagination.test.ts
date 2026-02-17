import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { computed } from "vue"
import BoreholeLocalitiesPagination from "~/components/borehole-localities/BoreholeLocalitiesPagination/BoreholeLocalitiesPagination.vue"
import type { BoreholeLocalitiesCmsData } from "~/types/borehole-localities"

vi.stubGlobal("computed", computed)

const labels: BoreholeLocalitiesCmsData["pagination"] = {
  previous: "Eelmine",
  next: "Järgmine",
  pageInfo: "Lehekülg {page} / {totalPages}",
}

describe("BoreholeLocalitiesPagination", () => {
  it("renders page info text", () => {
    const wrapper = mount(BoreholeLocalitiesPagination, {
      props: { page: 2, totalPages: 10, labels },
    })
    expect(wrapper.text()).toContain("Lehekülg 2 / 10")
  })

  it("renders previous and next labels", () => {
    const wrapper = mount(BoreholeLocalitiesPagination, {
      props: { page: 1, totalPages: 5, labels },
    })
    expect(wrapper.text()).toContain("Eelmine")
    expect(wrapper.text()).toContain("Järgmine")
  })

  it("renders page number buttons", () => {
    const wrapper = mount(BoreholeLocalitiesPagination, {
      props: { page: 1, totalPages: 3, labels },
    })
    expect(wrapper.text()).toContain("1")
    expect(wrapper.text()).toContain("2")
    expect(wrapper.text()).toContain("3")
  })
})
