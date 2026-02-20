import { getCmsPath } from "./cms-path"

const serverCache = new Map<string, unknown>()

export const fetchCmsData = async <T>(path: string): Promise<T> => {
  if (import.meta.server) {
    const cached = serverCache.get(path)
    if (cached) return cached as T

    const { readFile } = await import("node:fs/promises")
    const { join } = await import("node:path")
    const content = await readFile(join(process.cwd(), "public", "data", path), "utf-8")
    const parsed = JSON.parse(content) as T
    serverCache.set(path, parsed)
    return parsed
  }

  return (await $fetch(getCmsPath(path))) as T
}
