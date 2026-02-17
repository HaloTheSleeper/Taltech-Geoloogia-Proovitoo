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
- `/components/ui/` is used for shadcn-vue components.
- `components/borehole-localities` is used for components related to borehole localities, that we get from the borehole localities API.

### Pages

`/app/pages`

- Route-level orchestration
- Uses composables and components to fetch and display data.

### Composables

`/app/composables`

- Reactive state
- Loading/error handling
- Calls into `/lib`
- Use useAsyncData, useFetch as needed, but prefer consistency within the same entity.

### Lib

`/app/lib`

- Borehole localities API calls live under `/lib/boorehole-localities`
- CMS fetching logic lives under `/lib/cms`
- Pure logic
- No Vue reactivity

### Types

The types for the application live in `/app/types`, each entity has its own file, for example `/app/types/borehole-localities.ts` contains types related to the borehole localities API.

## Data sources

### "CMS" related data

For "CMS related data" (anything that doesn't come from the API we're going to talk about soon) we simulate a CMS by serving JSON from `/public/data`. The `/public/data` should contain everything that we don't get from the localities API, for example page titles, search input labels, and other UI text that is not part of the localities API data.

Rules:

- CMS logic lives in `/app/lib/cms`
- UI never fetches `/public/data` directly
- Composables wrap CMS access

See:

- `./rules/cms.md`

### API related data

For API related data, we fetch it directly from the localities API (the url is in the .env file/files) and the fetching logic lives in `/lib/{entity-name}`.

Rules:

- All API calls live in `/app/lib/{entity-name}`
- UI never calls API directly
- Composables wrap API usage
- For example borehole localities API calls live in `/app/lib/borehole-localities` and any page that needs borehole localities data should use a composable that calls into that lib.

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

- `./rules/verify.md`s
