export interface BoreholeLocalitiesCmsData {
  pageTitle: string
  columns: {
    id: string
    name: string
    country: string
    latitude: string
    longitude: string
    depth: string
    elevation: string
  }
  emptyState: {
    title: string
    description: string
  }
  error: {
    title: string
    description: string
    retryLabel: string
  }
  pagination: {
    previous: string
    next: string
    pageInfo: string
  }
}
