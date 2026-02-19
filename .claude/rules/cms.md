# CMS Mock Data Rules

We simulate a CMS using JSON files.

Location:

- `/public/data`

Current files:

- `/public/data/layout.json` — navbar title, search placeholder, footer copyright text
- `/public/data/borehole-localities.json` — list page column labels, empty state, error messages, pagination labels

Access pattern:

- During SSR: read JSON files directly from the filesystem (via `node:fs/promises`) for server-side data access (similar to Next.js server components).
- During client-side navigation: fetch static files via `$fetch('/data/...')` from the public directory.
- This logic is handled by `fetchCmsData` in `/app/lib/cms` — no server API routes are used for CMS data.

## Architecture rules

- CMS fetching logic lives in `/app/lib/cms`
- UI must not fetch `/data` directly
- Composables wrap CMS fetching (e.g. `useLayoutData`, `useBoreholeLocalitiesCms`)
- Keep in mind that we want to keep the structure consistent and prefer a CMS-like schema for future migration, so when adding fields, keep naming consistent, update related types, and avoid breaking existing structure. Document significant changes if needed.

## Adding new CMS data

When adding a new page or feature that needs UI text:

1. Add a JSON file to `/public/data/{entity}.json`
2. Define a TypeScript type in `/app/types/cms/{entity}.ts` (e.g. add an interface like `{Entity}CmsData`) and re-export it from `/app/types/cms/index.ts`
3. Create a composable in `/app/composables/cms/use{Entity}Cms.ts` that calls `fetchCmsData<{Entity}CmsData>("{entity}.json")`
4. Use the composable in the page — pass CMS values as props to components
