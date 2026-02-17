# Code style

The code style is defined by the existing codebase. Follow the patterns and styles already present in the code. Use ESLint and Prettier for consistency. Do not introduce new patterns or styles without explicit instruction.

Must also follow:

- ES6 functions
- Random helper functions should go in `/app/lib/utils` or a more specific utils file if appropriate (e.g. `/app/lib/date-utils`).
- Use TypeScript for type safety and better developer experience.
- Vue component should be in PascalCase.
- Composables and lib functions in camelCase.
- Folder names and lib file names should be kebab-case, except folders containing single components, they should be in PascalCase. Shadcn single component folders in `/components/ui` should be left as they are automatically generated.
- Use barrel export files (index.ts) for cleaner imports when appropriate.
- Don't hardcode .env variables in the code (or in the documentation), read them from runtime config or existing project approach. .env shouldn't also be available client-side, except especially told so.
- Each component should have its own folder with the component file and related styles (.css files) if needed.
- Index.ts files should only be used for exports, not for defining functions or components (if possible).s
