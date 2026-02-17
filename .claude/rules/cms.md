# CMS Mock Data Rules

We simulate a CMS using JSON files.

Location:

- /public/data

Examples:

- /public/data/homepage.json
- /public/data/borehole-locality.json

Access pattern:

- During SSR: read JSON files directly from the filesystem (via `node:fs/promises`) for server-side data access (similar to Next.js server components).
- During client-side navigation: fetch static files via `$fetch('/data/...')` from the public directory.
- This logic is handled by `fetchCmsData` in `/app/lib/cms` — no server API routes are used for CMS data.

## Architecture rules

- CMS fetching logic lives in /app/lib/cms
- UI must not fetch /data directly
- Composables wrap CMS fetching
- Keep in mind that we want to keep the structure consistent and prefer a CMS-like schema for future migration, so when adding fields, keep naming consistent, update related types, and avoid breaking existing structure. Document significant changes if needed.
