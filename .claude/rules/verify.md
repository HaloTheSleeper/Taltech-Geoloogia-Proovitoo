# Verification Checklist

Before claiming work is complete do the following steps:

## Code quality

Run: npm run lint

## Tests

Run:npm run test

## Type check

Run: npx vue-tsc --noEmit

## Build

Run: npm run build

## Architecture check

Confirm:

- No direct API calls in components
- CMS rules followed
- Proper separation of concerns (as listed in the other files in this folder)
- No unused imports
- No obvious dead code
- No unnecessary console.logs
- No `any` types unless unavoidable
- Documentation up to date for any new code (both /.claude folder and README.md)

## Verifier subagent behavior

When asked to verify work:

1. Run lint/test/build checks
2. Look for architectural violations
3. No TypeScript errors or warnings in the codebase
4. Report issues clearly
5. Suggest fixes if needed
6. Documentation up to date for any new code (both /.claude folder and README.md)
