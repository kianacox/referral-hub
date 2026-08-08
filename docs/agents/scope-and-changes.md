# Scope and Changes

## Simplicity

Minimum code that solves the problem.

- No features beyond what was asked.
- No abstractions for single-use code.
- No flexibility or configurability that wasn't requested.
- No error handling for impossible scenarios.

## Surgical edits

Every changed line should trace directly to the request.

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

## Cleanup boundaries

Remove imports, variables, and functions that **your** changes made unused. Leave pre-existing dead code alone unless asked.
