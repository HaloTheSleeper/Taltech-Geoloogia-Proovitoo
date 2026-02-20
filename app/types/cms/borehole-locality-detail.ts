export interface BoreholeLocalityDetailCmsData {
  backButton: string
  pageTitle: string
  mapTitle: string
  coordinatesNotAvailable: string
  fields: {
    id: string
    name: string
    nameEn: string
    country: string
    latitude: string
    longitude: string
    depth: string
    elevation: string
    number: string
    code: string
    coordx: string
    coordy: string
    epsg: string
    landBoardId: string
    remarks: string
    remarksLocation: string
    stratigraphyBaseText: string
    stratigraphyTopText: string
    dateAdded: string
    dateChanged: string
  }
  error: {
    title: string
    description: string
    retryLabel: string
  }
}
