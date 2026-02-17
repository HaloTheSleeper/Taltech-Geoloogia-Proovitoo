# Code style

The code style is defined by the existing codebase. Follow the patterns and styles already present in the code. Use ESLint and Prettier for consistency. Do not introduce new patterns or styles without explicit instruction.

Must also follow:

- ES6 functions
- Random helper functions should go in `/app/lib/utils` or a more specific utils file if appropriate (e.g. `/app/lib/date-utils`).
- Use TypeScript for type safety and better developer experience.
- Vue component should be in PascalCase.
- Composables and lib functions in camelCase.
- Folder names and lib file names should be kebab-case.
- Use barrel export files (index.ts) for cleaner imports when appropriate.
- Don't hardcode .env variables in the code (or in the documentation), read them from runtime config or existing project approach.
