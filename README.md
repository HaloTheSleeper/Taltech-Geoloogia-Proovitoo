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

2. Create `.env.development` and/or `.env.production` files in the project root (see [Environment variables](#environment-variables) below).

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

Environment files (`.env.*`) are git-ignored. Create `.env.development` and/or `.env.production` in the project root.

The following variables are required:

| Variable                      | Description                              |
| ----------------------------- | ---------------------------------------- |
| `BOREHOLE_LOCALITIES_API_URL` | Base URL for the borehole localities API |

Contact the project maintainer for the correct values.

## Project structure

```
app/
  app.vue            # Root component
  components/        # Presentational Vue components (no data fetching)
    ui/              # shadcn-vue components
  pages/             # Route-level pages (orchestrate via composables)
  composables/       # Reactive state, loading/error handling, calls into lib
  lib/               # Pure logic, API/CMS fetching (no Vue reactivity)
    borehole-localities/  # Borehole localities API calls
    cms/                  # CMS mock data fetching
  types/             # TypeScript type definitions (per entity)
public/
  data/              # Mock CMS JSON files
tests/
  unit/              # Unit tests
  integration/       # Integration tests
.claude/             # Claude Code agent instructions
```

## Architecture

The project follows a layered architecture with strict separation of concerns:

- **Components** (`/app/components`) — Presentational only. Receive data via props, emit events. Never fetch data directly.
- **Pages** (`/app/pages`) — Route-level orchestration. Use composables to fetch and display data.
- **Composables** (`/app/composables`) — Manage reactive state, loading/error handling. Call into lib functions.
- **Lib** (`/app/lib`) — Pure data-fetching logic and transformations. No Vue reactivity. Each API entity gets its own folder (e.g., `/app/lib/borehole-localities`).
- **Types** (`/app/types`) — TypeScript type definitions, one file per entity.

## CMS readiness

We currently don't have a CMS, but the codebase is structured in a way that allows us to easily integrate one in the future. For "CMS related data" (anything that doesn't come from the localities API) we simulate a CMS by serving JSON from `/public/data`. CMS fetching logic lives in `/app/lib/cms`.

## Possibility to add other data sources

The architecture allows us to easily add other data sources in the future. For example, if we wanted to add another API, we would create a new folder under `/app/lib` for that API's fetching logic, and then create composables that wrap that logic for use in our components.

## Fonts

Fonts are managed by `@nuxt/fonts` (auto-optimized, no manual `<link>` tags needed).

| Font        | Tailwind class  | Usage    |
| ----------- | --------------- | -------- |
| Montserrat  | `font-heading`  | Headings |
| Inter        | `font-body`     | Body text |

Headings (`h1`–`h6`) use `font-heading` by default. Body text uses `font-body` by default. Both are applied globally in `app/assets/css/main.css`.

## Color scheme

The app uses CSS custom properties (defined in `app/assets/css/main.css`) mapped to Tailwind utility classes via `tailwind.config.ts`. Available color tokens:

| Token              | Value (RGB)     | Usage                        |
| ------------------ | --------------- | ---------------------------- |
| `background`       | 255 255 255     | Page background              |
| `foreground`       | 31 41 55        | Default text                 |
| `primary`          | 45 42 95        | Primary actions, headings    |
| `primary-foreground` | 255 255 255   | Text on primary backgrounds  |
| `accent`           | 230 0 126       | Highlights, call-to-actions  |
| `accent-foreground` | 255 255 255    | Text on accent backgrounds   |
| `muted`            | 245 246 248     | Subtle backgrounds           |
| `muted-foreground` | 107 114 128     | Secondary text               |
| `border`           | 229 231 235     | Borders, dividers            |
| `card`             | 255 255 255     | Card backgrounds             |

Use Tailwind classes like `bg-primary`, `text-accent`, `border-border`, etc. Do not hardcode colors outside the theme.

## Code style

- ESLint + Prettier are configured and enforced
- Prettier config: no semicolons, double quotes, 100 char print width, trailing commas
- Vue components in PascalCase, composables and lib functions in camelCase, folder/file names in kebab-case

## Claude Code usage

This repository is set up to be used with [Claude Code](https://docs.anthropic.com/en/docs/claude-code). The `.claude` folder is intentionally tracked in git so that all developers benefit from the agent instructions it contains. See `.claude/CLAUDE.md` for the full set of rules.
