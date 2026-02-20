# Code style

The code style is defined by the existing codebase. Follow the patterns and styles already present in the code. Use ESLint and Prettier for consistency. Do not introduce new patterns or styles without explicit instruction.

Must also follow:

- ES6 functions
- Random helper functions should go in `/app/lib/utils` or a more specific utils file if appropriate (e.g. `/app/lib/date-utils`).
- Use TypeScript for type safety and better developer experience.
- Vue component should be in PascalCase.
- Composables and lib functions in camelCase.
- Folder names and lib file names should be kebab-case. Shadcn component folders in `/components/ui` should be left as they are automatically generated.
- Use barrel export files (index.ts) for cleaner imports when appropriate.
- Don't hardcode .env variables in the code (or in the documentation), read them from runtime config or existing project approach. .env shouldn't also be available client-side, except especially told so.
- Components are grouped by feature/logic into kebab-case folders (e.g. `borehole-localities/`, `layout/`, `shared/`). Component `.vue` files live flat inside those folders — no per-component subfolders. Since styles go in the SFC `<style>` block and tests live in `/tests/`, there is no need for individual component folders.
- Index.ts files should only be used for exports, not for defining functions or components (if possible).
- Data coming from the API or the CMS should be used with truncate type styling in the UI to prevent overflow issues.
