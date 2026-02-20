# API Rules

This project fetches data from external APIs. All API access must follow these rules.

## Source of truth

- External API base URLs live in `.env` (git-ignored) and are read via server-only `runtimeConfig`.
- Do not hardcode external API base URLs anywhere in the codebase.
- The `.env` file is the only place for API URLs — not `.env.development` or `.env.production` (Nitro only loads `.env`).
- API URLs must never be exposed to the client. They live in `runtimeConfig` (server-only, not `runtimeConfig.public`).

## Data flow

External API calls go through a Nitro server route. The client never calls the external API directly.

```
Page → Composable → $fetch('/api/{entity}') → Server route → External API
```

1. **Composable** calls the internal server route via `useAsyncData` + `$fetch('/api/{entity}', { params })`
2. **Server route** (`/server/api/{entity}.get.ts`) reads the external URL from `runtimeConfig` and fetches from the external API
3. **Server route** caches the response using `defineCachedEventHandler`
4. Response is returned to the client

## Folder conventions

- External API helper functions live in `/app/lib/{entity-name}`
- API TypeScript types live in `/app/types/api/{entity-name}.ts` and are re-exported from `/app/types/api/index.ts`
- Server routes live in `/server/api/`
- Each API entity has its own server route file, e.g. `/server/api/borehole-localities.get.ts`

Example:

- Borehole localities server route: `/server/api/borehole-localities.get.ts`

## Server routes (`/server/api`)

- Must use `defineCachedEventHandler` (not plain `defineEventHandler`) for caching
- Must read the external API URL from `useRuntimeConfig()` — never hardcoded
- Must use `getQuery(event)` to forward query params to the external API
- Cache key must include all query params that affect the response (see `getKey` option)
- Default cache TTL: 1 hour (`maxAge: 60 * 60`)

Example:

```ts
export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)
    return $fetch(config.myApiUrl, { params: { ...query } })
  },
  {
    maxAge: 60 * 60,
    getKey: (event) => {
      const query = getQuery(event)
      return `entity:${query.limit}:${query.offset}:${query.search || ""}`
    },
  },
)
```

## Separation of concerns

### Allowed in `/app/lib/{entity-name}`

- `$fetch` for HTTP requests (used in server routes, not directly in composables)
- parameter building (`params`, query string building)
- request/response mapping (API shape → app shape)
- reusable helpers (pagination helpers, filtering helpers)
- pure data transformations

### Not allowed in `/app/lib/{entity-name}`

- `ref`, `computed`, `watch`
- UI concerns (toasts, DOM operations, component behavior)
- direct usage of Vue components
- direct usage of route/query state

## Components & pages rules

### Components (`/app/components`)

- Must NOT call external APIs directly.
- Must NOT call `/app/lib/{entity-name}` directly.
- Must receive data via props and emit events.

### Pages (`/app/pages`)

- Must NOT call external APIs directly.
- Must NOT call server routes directly.
- Must fetch data via composables.

### Composables (`/app/composables`)

- Are the only layer allowed to orchestrate API calls for UI.
- Call internal server routes (e.g. `$fetch('/api/borehole-localities', { params })`) via `useAsyncData`.
- Manage:
  - loading state
  - error state
  - pagination/search state (derived from URL query params via `useRoute`)
  - mapping to UI-friendly shape if needed

## Pagination & search

- Page and search state live in the URL query params (`?page=2&search=foo`)
- Composable reads `route.query.page` and `route.query.search` as computed values
- Navigation (page change, search) uses `navigateTo` with updated query params
- Navbar search is debounced before triggering navigation
- Page resets to 1 when search changes

## Error handling rules

- Handle errors gracefully.
- Return or expose user-friendly error messages where appropriate (use the CMS for that).
- Avoid leaking raw low-level network errors to UI.
- Prefer consistent error shape across composables.

## Testing expectations

- Server routes are tested implicitly via integration or by testing the composable with mocked `$fetch`.
- When behavior changes, update tests, documentation and claude instructions accordingly.

See also:

- `./tests.md`
- `./verify.md`
