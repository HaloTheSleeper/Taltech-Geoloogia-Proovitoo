export interface BoreholeLocalityCountry {
  id: number
  name: string
  name_en: string
  iso_3166_1_alpha_2: string
}

export interface BoreholeLocality {
  id: number
  name: string | null
  name_en: string | null
  country: BoreholeLocalityCountry | null
  depth: number | null
  elevation: string | null
  latitude: number | null
  longitude: number | null
  number: string | null
  area: number | null
  code: string | null
  coordx: number | null
  coordy: number | null
  coordinate_system: number | null
  epsg: number | null
  land_board_id: string | null
  municipality: number | null
  remarks: string | null
  remarks_location: string | null
  stratigraphy_base_text: string | null
  stratigraphy_top_text: string | null
  coordinate_agent: number | null
  coordinate_method: number | null
  coordinate_precision: number | null
  parent: number | null
  type: number | null
  settlement: number | null
  stratigraphy_base: number | null
  stratigraphy_top: number | null
  date_added: string | null
  date_changed: string | null
}

export interface BoreholeLocalitiesResponse {
  count: number
  next: string | null
  previous: string | null
  results: BoreholeLocality[]
}

export interface BoreholeLocalitiesParams {
  limit: number
  offset: number
  name__icontains?: string
  expand?: string
}
