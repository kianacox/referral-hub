# Verification

## Define success criteria

Turn the task into something checkable before starting. Weak criteria ("make it work") force constant clarification; strong ones let you loop to done independently.

For multi-step work, state a brief plan with a verification per step:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

## When tests are required

| Change | Tests |
| --- | --- |
| Bugfix | Write a failing test that reproduces it, then make it pass |
| Copy edits in `content/landing-pages.ts` | Not required |
| Pure styling | Not required |

Tests live in `tests/` and run with `npm test` (Vitest). Existing tests must pass regardless of what you changed.

## Before claiming done

Run the relevant command and read the output. If tests fail or a step was skipped, say so.
