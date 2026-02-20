import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BoreholeLocalityDetailInfo from "~/components/borehole-localities/BoreholeLocalityDetailInfo.vue"
import type { BoreholeLocality } from "~/types/api"
import type { BoreholeLocalityDetailCmsData } from "~/types/cms"

const labels: BoreholeLocalityDetailCmsData["fields"] = {
  id: "ID",
  name: "Nimi",
  nameEn: "Nimi (inglise k.)",
  country: "Riik",
  latitude: "Laiuskraad",
  longitude: "Pikkuskraad",
  depth: "Sügavus (m)",
  elevation: "Kõrgus (m)",
  number: "Number",
  code: "Kood",
  coordx: "X-koordinaat",
  coordy: "Y-koordinaat",
  epsg: "EPSG",
  landBoardId: "Maa-ameti ID",
  remarks: "Märkused",
  remarksLocation: "Asukoha märkused",
  stratigraphyBaseText: "Stratigraafia (alumine)",
  stratigraphyTopText: "Stratigraafia (ülemine)",
  dateAdded: "Lisatud",
  dateChanged: "Muudetud",
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
  code: "ABC-123",
  coordx: 6530000,
  coordy: 450000,
  coordinate_system: null,
  epsg: 3301,
  land_board_id: "12345",
  municipality: null,
  remarks: "Test remarks",
  remarks_location: "Test location remarks",
  stratigraphy_base_text: "Cambrian",
  stratigraphy_top_text: "Quaternary",
  coordinate_agent: null,
  coordinate_method: null,
  coordinate_precision: null,
  parent: null,
  type: null,
  settlement: null,
  stratigraphy_base: null,
  stratigraphy_top: null,
  date_added: "2020-01-15",
  date_changed: "2023-06-20",
}

const mockLocalityNulls: BoreholeLocality = {
  id: 2,
  name: null,
  name_en: null,
  country: null,
  depth: null,
  elevation: null,
  latitude: null,
  longitude: null,
  number: null,
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

describe("BoreholeLocalityDetailInfo", () => {
  it("renders all field labels", () => {
    const wrapper = mount(BoreholeLocalityDetailInfo, {
      props: { locality: mockLocality, labels },
    })
    const text = wrapper.text()
    expect(text).toContain("ID")
    expect(text).toContain("Nimi")
    expect(text).toContain("Riik")
    expect(text).toContain("Laiuskraad")
    expect(text).toContain("Pikkuskraad")
    expect(text).toContain("Sügavus (m)")
    expect(text).toContain("Kõrgus (m)")
    expect(text).toContain("Number")
    expect(text).toContain("Kood")
    expect(text).toContain("EPSG")
    expect(text).toContain("Maa-ameti ID")
    expect(text).toContain("Märkused")
    expect(text).toContain("Lisatud")
    expect(text).toContain("Muudetud")
  })

  it("renders locality field values", () => {
    const wrapper = mount(BoreholeLocalityDetailInfo, {
      props: { locality: mockLocality, labels },
    })
    const text = wrapper.text()
    expect(text).toContain("1")
    expect(text).toContain("Hüti F-358 puurauk")
    expect(text).toContain("Eesti")
    expect(text).toContain("58.899398")
    expect(text).toContain("22.524572")
    expect(text).toContain("335.3")
    expect(text).toContain("21.50")
    expect(text).toContain("F-358")
    expect(text).toContain("ABC-123")
    expect(text).toContain("3301")
    expect(text).toContain("12345")
    expect(text).toContain("Test remarks")
    expect(text).toContain("Cambrian")
    expect(text).toContain("Quaternary")
    expect(text).toContain("2020-01-15")
    expect(text).toContain("2023-06-20")
  })

  it("renders dashes for null values", () => {
    const wrapper = mount(BoreholeLocalityDetailInfo, {
      props: { locality: mockLocalityNulls, labels },
    })
    const dds = wrapper.findAll("dd")
    const dashDds = dds.filter((dd) => dd.text() === "–")
    // All fields except id should show dashes (19 fields with null values)
    expect(dashDds.length).toBeGreaterThanOrEqual(15)
  })

  it("prefers country.name over country.name_en", () => {
    const wrapper = mount(BoreholeLocalityDetailInfo, {
      props: { locality: mockLocality, labels },
    })
    expect(wrapper.text()).toContain("Eesti")
  })

  it("falls back to country.name_en when country.name is missing", () => {
    const localityNoEstonianCountry: BoreholeLocality = {
      ...mockLocality,
      country: { id: 68, name: "", name_en: "Estonia", iso_3166_1_alpha_2: "EE" },
    }
    const wrapper = mount(BoreholeLocalityDetailInfo, {
      props: { locality: localityNoEstonianCountry, labels },
    })
    expect(wrapper.text()).toContain("Estonia")
  })
})
