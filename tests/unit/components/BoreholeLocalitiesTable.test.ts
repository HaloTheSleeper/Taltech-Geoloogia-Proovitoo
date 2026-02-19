import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BoreholeLocalitiesTable from "~/components/borehole-localities/BoreholeLocalitiesTable.vue"
import type { BoreholeLocality } from "~/types/api"
import type { BoreholeLocalitiesCmsData } from "~/types/cms"

const columns: BoreholeLocalitiesCmsData["columns"] = {
  id: "ID",
  name: "Nimi",
  country: "Riik",
  latitude: "Laiuskraad",
  longitude: "Pikkuskraad",
  depth: "Sügavus (m)",
  elevation: "Kõrgus (m)",
}

const mockLocality: BoreholeLocality = {
  id: 1,
  name: "Hüti F-358 puurauk",
  name_en: "Hüti F-358 borehole",
  country: { id: 68, name: "Eesti", name_en: "Estonia", iso_3166_1_alpha_2: "EE" },
  depth: 335.3,
  elevation: "21.50",
  latitude: 58.899398,
  longitude: 22.524572,
  number: "F-358",
  area: null,
  code: null,
  coordx: null,
  coordy: null,
  coordinate_system: null,
  epsg: null,
  land_board_id: null,
  municipality: null,
  remarks: null,
  remarks_location: null,
  stratigraphy_base_text: null,
  stratigraphy_top_text: null,
  coordinate_agent: null,
  coordinate_method: null,
  coordinate_precision: null,
  parent: null,
  type: null,
  settlement: null,
  stratigraphy_base: null,
  stratigraphy_top: null,
  date_added: null,
  date_changed: null,
}

const mockLocalityNulls: BoreholeLocality = {
  ...mockLocality,
  id: 2,
  name: null,
  name_en: null,
  country: null,
  depth: null,
  elevation: null,
  latitude: null,
  longitude: null,
}

describe("BoreholeLocalitiesTable", () => {
  it("renders column headers", () => {
    const wrapper = mount(BoreholeLocalitiesTable, {
      props: { localities: [mockLocality], columns },
    })
    expect(wrapper.text()).toContain("ID")
    expect(wrapper.text()).toContain("Nimi")
    expect(wrapper.text()).toContain("Riik")
    expect(wrapper.text()).toContain("Laiuskraad")
    expect(wrapper.text()).toContain("Pikkuskraad")
    expect(wrapper.text()).toContain("Sügavus (m)")
    expect(wrapper.text()).toContain("Kõrgus (m)")
  })

  it("renders locality data", () => {
    const wrapper = mount(BoreholeLocalitiesTable, {
      props: { localities: [mockLocality], columns },
    })
    expect(wrapper.text()).toContain("1")
    expect(wrapper.text()).toContain("Hüti F-358 borehole")
    expect(wrapper.text()).toContain("Estonia")
    expect(wrapper.text()).toContain("58.899398")
    expect(wrapper.text()).toContain("22.524572")
    expect(wrapper.text()).toContain("335.3")
    expect(wrapper.text()).toContain("21.50")
  })

  it("shows dashes for null values", () => {
    const wrapper = mount(BoreholeLocalitiesTable, {
      props: { localities: [mockLocalityNulls], columns },
    })
    const cells = wrapper.findAll("td")
    const dashCells = cells.filter((cell) => cell.text() === "–")
    expect(dashCells.length).toBeGreaterThanOrEqual(5)
  })

  it("prefers name_en over name", () => {
    const localityWithBothNames: BoreholeLocality = {
      ...mockLocality,
      name: "Estonian name",
      name_en: "English name",
    }
    const wrapper = mount(BoreholeLocalitiesTable, {
      props: { localities: [localityWithBothNames], columns },
    })
    expect(wrapper.text()).toContain("English name")
  })

  it("falls back to name when name_en is null", () => {
    const localityNoEnglish: BoreholeLocality = {
      ...mockLocality,
      name: "Estonian name",
      name_en: null,
    }
    const wrapper = mount(BoreholeLocalitiesTable, {
      props: { localities: [localityNoEnglish], columns },
    })
    expect(wrapper.text()).toContain("Estonian name")
  })

  it("renders multiple rows", () => {
    const wrapper = mount(BoreholeLocalitiesTable, {
      props: { localities: [mockLocality, mockLocalityNulls], columns },
    })
    const rows = wrapper.findAll("tbody tr")
    expect(rows.length).toBe(2)
  })
})
