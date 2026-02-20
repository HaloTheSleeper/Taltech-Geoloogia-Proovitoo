# Arti Tamm Taltech Department of Geology sample work - Borehole data visualization

## Tech stack

- [Nuxt 4](https://nuxt.com/) (Vue 3)
- TypeScript
- Tailwind CSS
- [shadcn-vue](https://www.shadcn-vue.com/) (UI components)
- Vitest + @vue/test-utils (testing)
- ESLint + Prettier (code quality)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

> **Note:** This project uses **npm only**. Do not use yarn or pnpm.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root (see [Environment variables](#environment-variables) below).

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Available scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm run build`    | Build for production                 |
| `npm run generate` | Generate a static site               |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm run lint:fix` | Run ESLint with auto-fix             |
| `npm run test`     | Run tests                            |

## Environment variables

The `.env` file is git-ignored. Create a `.env` file in the project root with the required variables.

The following variables are required:

| Variable                      | Description                              |
| ----------------------------- | ---------------------------------------- |
| `BOREHOLE_LOCALITIES_API_URL` | Base URL for the borehole localities API |

These are server-only variables — they are read via Nuxt's `runtimeConfig` and are only accessible on the server side (in Nitro server routes). They are never exposed to the client.

## Project structure

```
app/
  app.vue            # Root component
  components/        # Presentational Vue components (no data fetching)
    ui/              # shadcn-vue components (alert, button, input, table, pagination, skeleton)
    borehole-localities/  # Borehole locality list components
      BoreholeLocalitiesTable/      # Data table
      BoreholeLocalitiesLoading/    # Skeleton loading state
      BoreholeLocalitiesEmpty/      # Empty state (no results)
      BoreholeLocalitiesPagination/ # Pagination controls
    AppNavbar/       # Navigation bar with search
    AppFooter/       # Footer
    ErrorAlert/      # Reusable error alert with retry
  pages/             # Route-level pages (orchestrate via composables)
  composables/       # Reactive state, loading/error handling, calls into lib
    borehole-localities/  # Borehole localities data composable
    cms/                  # CMS data composables
  lib/               # Pure logic, CMS fetching (no Vue reactivity)
    cms/                  # CMS mock data fetching
  types/             # TypeScript type definitions
    api/              # External API types (responses, params) — barrel at index.ts
    cms/              # CMS JSON types — barrel at index.ts
server/
  api/               # Nitro server API routes
    borehole-localities.get.ts       # Proxies list requests to the external localities API
    borehole-localities/[id].get.ts  # Proxies detail requests for a single locality
public/
  data/              # Mock CMS JSON files
    layout.json                    # Navbar and footer text
    borehole-localities.json       # List page text (columns, empty state, errors, pagination)
    borehole-locality-detail.json  # Detail page text (field labels, map, errors)
tests/
  unit/              # Unit tests
    components/      # Component tests
    server/          # Server route tests
  integration/       # Integration tests
.claude/             # Claude Code agent instructions
```

## Architecture

The project follows a layered architecture with strict separation of concerns:

- **Components** (`/app/components`) — Presentational only. Receive data via props, emit events. Never fetch data directly.
- **Pages** (`/app/pages`) — Route-level orchestration. Use composables to fetch and display data.
- **Composables** (`/app/composables`) — Manage reactive state, loading/error handling. Call into server API routes via `useAsyncData` + `$fetch`.
- **Lib** (`/app/lib`) — Pure logic and transformations. No Vue reactivity. CMS fetching logic lives under `/app/lib/cms`.
- **Server routes** (`/server/api`) — Nitro server routes that proxy external API requests. Read API URLs from server-only `runtimeConfig`. Responses are cached.
- **Types** (`/app/types`) — TypeScript type definitions split by data source: `api/` for external API types, `cms/` for CMS types. Each subfolder has a barrel `index.ts` — always import from `~/types/api` or `~/types/cms`.

### Data flow for API data

1. **Page** uses a composable (e.g., `useBoreholeLocalities`)
2. **Composable** calls the internal server route via `$fetch('/api/borehole-localities', { params })`
3. **Server route** reads the external API URL from `runtimeConfig` and fetches from the external API
4. Response is cached (1 hour by default) and returned to the client

This ensures the external API URL stays server-side only and is never exposed to the client.

## Features

### Borehole localities list (Home page)

- Default route (`/`) is prerendered at build time (SSG) via `routeRules` in `nuxt.config.ts` — requires the external API to be reachable during build
- Fetches borehole localities from the external API via a server route
- Displays results in a table with columns: ID, Name, Country, Latitude, Longitude, Depth, Elevation
- Server-side search via the navbar input (debounced, updates URL query params)
- Pagination with 20 items per page (uses shadcn-vue Pagination)
- Loading skeleton state
- Error state with retry button (reusable ErrorAlert component)
- Empty state when no results are found
- All UI text comes from CMS data (`/public/data/borehole-localities.json`)
- Clicking a table row navigates to the detail view

### Borehole locality detail view (`/borehole-localities/:id`)

- Fetches a single borehole locality from the external API via a dedicated server route
- Displays all available fields in a structured info card (name, country, coordinates, depth, elevation, code, stratigraphy, remarks, dates, etc.)
- Map integration using [vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) — displays the locality coordinates on an OpenStreetMap tile layer
- Gracefully handles missing coordinates with a fallback message ("Coordinates not available")
- Back button to navigate to the list page
- Loading, error, and empty states
- All UI text comes from CMS data (`/public/data/borehole-locality-detail.json`)

## CMS readiness

We currently don't have a CMS, but the codebase is structured in a way that allows us to easily integrate one in the future. For "CMS related data" (anything that doesn't come from the localities API) we simulate a CMS by serving JSON from `/public/data`. CMS fetching logic lives in `/app/lib/cms`.

### Current CMS data files

| File                              | Purpose                                               |
| --------------------------------- | ----------------------------------------------------- |
| `layout.json`                     | Navbar title, search placeholder, footer text         |
| `borehole-localities.json`        | List page: column labels, empty/error/pagination text |
| `borehole-locality-detail.json`   | Detail page: field labels, map text, error/back text  |

## Fonts

Fonts are managed by `@nuxt/fonts` (auto-optimized, no manual `<link>` tags needed).

| Font       | Tailwind class | Usage     |
| ---------- | -------------- | --------- |
| Montserrat | `font-heading` | Headings  |
| Inter      | `font-body`    | Body text |

Headings (`h1`–`h6`) use `font-heading` by default. Body text uses `font-body` by default. Both are applied globally in `app/assets/css/main.css`.

## Color scheme

The app uses CSS custom properties (defined in `app/assets/css/main.css`) mapped to Tailwind utility classes via `tailwind.config.ts`. Available color tokens:

| Token                | Value (RGB) | Usage                       |
| -------------------- | ----------- | --------------------------- |
| `background`         | 255 255 255 | Page background             |
| `foreground`         | 31 41 55    | Default text                |
| `primary`            | 45 42 95    | Primary actions, headings   |
| `primary-foreground` | 255 255 255 | Text on primary backgrounds |
| `accent`             | 230 0 126   | Highlights, call-to-actions |
| `accent-foreground`  | 255 255 255 | Text on accent backgrounds  |
| `muted`              | 245 246 248 | Subtle backgrounds          |
| `muted-foreground`   | 107 114 128 | Secondary text              |
| `border`             | 229 231 235 | Borders, dividers           |
| `card`               | 255 255 255 | Card backgrounds            |

Use Tailwind classes like `bg-primary`, `text-accent`, `border-border`, etc. Do not hardcode colors outside the theme.

## Code style

- ESLint + Prettier are configured and enforced
- Prettier config: no semicolons, double quotes, 100 char print width, trailing commas
- Vue components in PascalCase, composables and lib functions in camelCase, folder/file names in kebab-case

## Claude Code usage

This repository is set up to be used with [Claude Code](https://docs.anthropic.com/en/docs/claude-code). The `.claude` folder is intentionally tracked in git so that all developers benefit from the agent instructions it contains. See `.claude/CLAUDE.md` for the full set of rules.
