import { getCmsPath } from "./cms-path"

export const fetchCmsData = async <T>(path: string): Promise<T> => {
  if (import.meta.server) {
    const { readFile } = await import("node:fs/promises")
    const { join } = await import("node:path")
    const content = await readFile(join(process.cwd(), "public", "data", path), "utf-8")
    return JSON.parse(content) as T
  }

  return $fetch<T>(getCmsPath(path))
}
