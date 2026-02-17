# CMS Mock Data Rules

We simulate a CMS using JSON files.

Location:

- /public/data

Examples:

- /public/data/homepage.json
- /public/data/borehole-locality.json

Access pattern:

- Should use Nuxt specific methods for fetching, like $fetch - can suggest alternatives.

## Architecture rules

- CMS fetching logic lives in /app/lib/cms
- UI must not fetch /data directly
- Composables wrap CMS fetching
- Keep in mind that we want to keep the structure consistent and prefer a CMS-like schema for future migration, so when adding fields, keep naming consistent, update related types, and avoid breaking existing structure. Document significant changes if needed.
