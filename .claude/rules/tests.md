# Testing Rules

We use:

- Vitest
- @vue/test-utils

## What must be tested

1. Rendering with data
2. Loading state
3. Empty state
4. Error state
5. Search behavior
6. Pagination behavior

## Test location

Tests should be located in the `/tests` directory, following the structure:
/tests
/unit
components/
/integration

Be consistent.

## Mocking

Mock `/app/lib` functions instead of low-level fetch.

## Scripts

- npm run test
- npm run test:watch
