# AGENTS.md

`referral-hub` is a personal referral website that publishes curated referral offers and SEO landing pages for partner brands.

Production URL: `https://referral-hub.app`

Tests run under Vitest via `npm test` (there is no watch script). `npm run lint` runs `eslint --max-warnings=0`; `npm run typecheck` runs `tsc --noEmit`.

Husky hooks enforce both: `pre-commit` runs lint then typecheck, and `commit-msg` runs commitlint. Every commit message must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) — `type(optional-scope): subject`, types limited to build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test.

## Working agreements

- [Collaboration](docs/agents/collaboration.md) — how to handle ambiguity, when to ask vs. proceed.
- [Scope and changes](docs/agents/scope-and-changes.md) — simplicity rules, surgical-edit rules, cleanup boundaries.
- [Verification](docs/agents/verification.md) — success criteria, when tests are required.

## Repo knowledge

- [CONTEXT.md](CONTEXT.md) — domain model, glossary, routing, content fields, analytics, env flags.
- [Domain docs](docs/agents/domain.md) — where domain context and ADRs live.

## Process

- [Issue tracker](docs/agents/issue-tracker.md) — GitHub Issues for `kianacox/referral-hub` via `gh`.
- [Triage labels](docs/agents/triage-labels.md) — the five-role label vocabulary.
