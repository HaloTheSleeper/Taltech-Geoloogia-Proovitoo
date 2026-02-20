# Claude Instructions

You are working inside this repository. Follow these rules strictly.

Some of these rules may not yet be fully implemented in the codebase, but they are expected to be implemented in the future. You must follow them regardless when generating or modifying code.

Basic project information can be found in the `README.md` in the repository root.

## Non-negotiable rules

- Use **npm only**. Never use yarn or pnpm.
- Do not introduce new tools, frameworks, or major dependencies unless explicitly asked, but you can do suggestions.
- Keep changes minimal and consistent with existing patterns.
- Prefer simple, readable solutions over clever or complex ones.
- Do not refactor unrelated code unless explicitly instructed, but you can suggest refactoring opportunities.
- Always update or extend tests when behavior changes.
- Always update documentation (README.md) when behavior changes.
- If needed, update documentation inside the `.claude/` folder as well.
- Use **shadcn-vue** components where appropriate.
- All UI must follow the Tailwind theme defined in `tailwind.config.*`.
- Do not hardcode colors outside the Tailwind theme unless explicitly instructed.
- Edge cases and errors must be handled gracefully, with user-friendly messages where appropriate.
- CRITICAL: Before responding that any task is complete, you MUST run the full verification checklist from ./rules/verify.md. Do not skip this. Do not claim work is done without
  completing the checklist. If any item in the checklist fails, you must fix it before claiming completion.

## Tech stack

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS
- shadcn-vue (UI components)
- Vitest + @vue/test-utils (testing)
- ESLint + Prettier

See:

- `./rules/stack.md`
- `./rules/tests.md`
- `./rules/ui.md` (shadcn + styling rules)

## Architecture overview

### Components

`/app/components`

- Presentational only
- No direct API or CMS fetching
- Components are grouped by feature/logic into kebab-case folders. `.vue` files live flat inside the folder — no per-component subfolders.
- `/components/ui/` — shadcn-vue components (auto-generated, leave as-is)
- `/components/layout/` — app shell components (`AppNavbar`, `AppFooter`); auto-imported by Nuxt as `<LayoutAppNavbar>`, `<LayoutAppFooter>`
- `/components/shared/` — reusable cross-feature components (e.g. `ErrorAlert`); auto-imported as `<SharedErrorAlert>`
- `/components/borehole-localities/` — components specific to borehole localities data (list table, detail info card, detail map, loading, empty, pagination)

### Pages

`/app/pages`

- Route-level orchestration
- Uses composables and components to fetch and display data.

### Composables

`/app/composables`

- Reactive state
- Loading/error handling
- Calls server API routes via `useAsyncData` + `$fetch`
- Files live inside `/composables/{entity-name}` if they are related to a specific entity, for example `/composables/borehole-localities` contains composables related to borehole localities data fetching and state management and `/composables/cms` contains composables related to fetching and managing CMS data from `/public/data`.

### Server routes

`/server/api`

- Nitro server routes that proxy external API requests
- Read external API URLs from server-only `runtimeConfig` (never exposed to the client)
- Use `defineCachedEventHandler` for caching responses
- Example: `/server/api/borehole-localities.get.ts` proxies to the external localities API

### Lib

`/app/lib`

- CMS fetching logic lives under `/lib/cms`
- Pure logic
- No Vue reactivity

### Types

The types for the application live in `/app/types`, split into two subfolders by data source:

- `/app/types/api/` — types for external API responses and params (e.g. `BoreholeLocality`, `BoreholeLocalitiesResponse`)
- `/app/types/cms/` — types for CMS JSON data (e.g. `BoreholeLocalitiesCmsData`, `LayoutData`)

Each subfolder has a barrel `index.ts` that re-exports all types within it. Consumers always import from the barrel (e.g. `~/types/api`, `~/types/cms`), not from individual files directly.

## Data sources

### "CMS" related data

For "CMS related data" (anything that doesn't come from the API we're going to talk about soon) we simulate a CMS by serving JSON from `/public/data`. The `/public/data` should contain everything that we don't get from the localities API, for example page titles, search input labels, and other UI text that is not part of the localities API data.

Rules:

- CMS logic lives in `/app/lib/cms`
- UI never fetches `/public/data` directly
- Composables wrap CMS access

CMS data files:

- `/public/data/layout.json` — navbar title, search placeholder, footer copyright text
- `/public/data/borehole-localities.json` — list page column labels, empty state, error messages, pagination labels
- `/public/data/borehole-locality-detail.json` — detail page field labels, map text, back button, error messages

See:

- `./rules/cms.md`

### API related data

For API related data, we use Nitro server routes (`/server/api`) to proxy requests to the external API. The external API URL is stored in a `.env` file and accessed via server-only `runtimeConfig`. It is never exposed to the client.

Data flow:

1. Composable calls `$fetch('/api/{entity}', { params })` via `useAsyncData`
2. Server route reads the external API URL from `runtimeConfig`
3. Server route fetches from the external API with caching
4. Response is returned to the client

Rules:

- External API URLs live in `.env` and are read via server-only `runtimeConfig`
- Server routes live in `/server/api/` and proxy external API requests
- Server routes use `defineCachedEventHandler` for caching
- Composables call the internal server routes (e.g., `/api/borehole-localities`), never the external API directly
- Helper functions for building params live in `/app/lib/{entity-name}`
- UI never calls APIs directly — composables wrap all data access

See:

- `./rules/api.md`

## UI & styling rules

- Use shadcn-vue where appropriate
- Follow Tailwind theme
- Do not hardcode colors outside theme
- Maintain consistent spacing and layout

See:

- `./rules/ui.md`

## Testing rules

All new logic must be testable.

See:

- `./rules/tests.md`

## Code style rules

- Follow existing code style and patterns.
- Use ESLint and Prettier for consistency.
- Do not introduce new patterns or styles without explicit instruction.

See:

- `./rules/code-style.md`

## Definition of done

Before considering work complete:

1. Lint passes
2. Tests pass
3. Build succeeds
4. Architecture rules followed
5. Docs updated if needed

Full checklist:

- `./rules/verify.md`
