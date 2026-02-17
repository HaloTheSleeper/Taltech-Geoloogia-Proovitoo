# API Rules

This project fetches data from external APIs. All API access must follow these rules.

## Source of truth

- API base URLs and configuration live in `.env` files.
- Do not hardcode external API base URLs in components, pages, or composables.
- Read API base URLs from runtime config (preferred) or from the existing project approach.

## Folder conventions

All API fetching logic lives in: /app/lib/{entity-name}. Each API entity should have its own folder inside `/app/lib`.

Examples:

- Borehole localities API: `/app/lib/borehole-localities`

## Separation of concerns

### Allowed in `/app/lib/{entity-name}`

- `$fetch` for HTTP requests
- `node:fs/promises` for server-side file reading (CMS data in `/app/lib/cms`)
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
- Must NOT call `/app/lib/{entity-name}` directly.
- Must fetch data via composables.

### Composables (`/app/composables`)

- Are the only layer allowed to orchestrate API calls for UI.
- Must call into `/app/lib/{entity-name}` functions.
- Manage:
  - loading state
  - error state
  - pagination/search state
  - mapping to UI-friendly shape if needed

## Error handling rules

- Handle errors gracefully.
- Return or expose user-friendly error messages where appropriate (use the CMS for that).
- Avoid leaking raw low-level network errors to UI.
- Prefer consistent error shape across composables.

## Pagination & search

If API uses pagination:

- keep pagination parameter logic in `/app/lib/{entity-name}`
- composable manages `page`, `pageSize`, search query state
- components/pages only interact with those states/events

## Testing expectations

- `/app/lib/{entity-name}` functions should be testable (pure-ish).
- Prefer mocking `/app/lib/*` in tests rather than mocking low-level fetch everywhere.
- When behavior changes, update tests, documentation and claude instructions accordingly.

See also:

- `./tests.md`
- `./verify.md`
