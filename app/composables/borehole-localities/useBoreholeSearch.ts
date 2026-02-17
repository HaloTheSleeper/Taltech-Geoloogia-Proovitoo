export const useBoreholeSearch = () => {
  const searchQuery = useState<string>("boreholeSearchQuery", () => "")

  return {
    searchQuery,
  }
}
