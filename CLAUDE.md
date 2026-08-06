# CLAUDE.md

This file guides Claude (and other coding agents) when working in `referral-hub`.

## Repo Purpose

`referral-hub` is a personal referral website that publishes curated referral offers and SEO landing pages for partner brands.

Primary goals:
- Present trusted offers clearly (`discounts` and `earn` flows).
- Drive outbound referral clicks with clean UX.
- Capture useful interaction analytics.
- Keep content updates fast and code-light by using a content-driven structure.

Production URL: `https://referral-hub.app`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- ESLint (Next core-web-vitals + TS config)
- Vercel deployment
- Optional Google Analytics (`NEXT_PUBLIC_GA_ID`)

## Repo Structure

Core directories:
- `app/` - App Router pages, metadata, sitemap/robots, route segments
- `components/` - UI/layout/landing templates and brand-specific landing components
- `content/landing-pages.ts` - Main content source for SEO copy, FAQs, structured sections
- `lib/brands.ts` - Brand catalog, categories, routing slugs, feature flags, helpers
- `lib/seo.ts` - JSON-LD builders and SEO helpers
- `lib/analytics.ts` - GA event helpers
- `constants/copy.ts` - Shared copy blocks for list pages
- `public/` - Logos and landing assets/screenshots

Important route patterns:
- `/` -> Homepage cards ranked by `rewardRank`
- `/discounts` -> Discount list + filters
- `/discounts/[category]` -> Category view
- `/discounts/[category]/[slug]` -> Discount landing pages
- `/earn` -> Earn-offer list
- `/earn/[slug]` -> Earn landing pages (currently custom experiences for selected brands)

## Data and Content Model

The app is content-driven and powered by two main files:

1. `lib/brands.ts`
   - Defines canonical brand metadata (`slug`, `category`, `section`, CTA data, ranking, optional feature flag).
   - Controls which brands appear and where.

2. `content/landing-pages.ts`
   - Defines detailed per-brand page content (`seoTitle`, `seoDescription`, `whyIUseIt`, FAQ, optional advanced sections).
   - Key lookup is brand `slug`.

Rule: Every routable brand slug must have matching entries in both places.

## Conventions

### Routing and page generation
- Prefer static generation patterns already used in routes (`generateStaticParams`, `generateMetadata`).
- Use existing slug/category helpers from `lib/brands.ts` rather than duplicating filtering logic.
- Use `notFound()` when brand/content pair is missing.

### Components
- Keep generic reusable landing UI in `components/landing/LandingPageTemplate.tsx`.
- Use specialized brand components only when the brand experience genuinely diverges (example pattern: dedicated page component for premium/complex layouts).
- Keep components focused and composable (CTA, FAQ, Trustpilot, copy code blocks are already split into small units).

### Styling
- Tailwind utility-first classes are the default.
- Keep existing visual language (dark theme tokens, card borders, rounded surfaces, compact content width).
- Reuse existing CSS variable palette from `app/globals.css`; do not introduce ad hoc colors unless necessary.

### TypeScript and imports
- Project runs with `strict: true`; preserve strong typing.
- Use path alias imports (`@/...`) consistently.
- Define explicit types for new content structures where needed.

### Analytics
- Reuse helpers in `lib/analytics.ts`.
- Event naming convention is slug-based and snake-cased per brand (`brand_slug_suffix`).
- Include `brand` parameter in emitted events for segmentation.

### SEO and structured data
- Each landing page should define accurate metadata and canonical URL.
- Keep/extend JSON-LD patterns via `lib/seo.ts`.
- FAQ content should stay truthful and align with visible on-page content.

### Environment flags
- `NEXT_PUBLIC_SHOW_GYMSHARK` controls conditional brand visibility.
- `NEXT_PUBLIC_GA_ID` enables/disables Google Analytics script behavior.
- Add new feature flags in the same style as existing brand gating.

## Common Tasks

### Add a new brand
1. Add brand metadata in `lib/brands.ts` (`slug`, `section`, category/CTA details, rank).
2. Add matching content object in `content/landing-pages.ts` using the same slug key.
3. Ensure logos/assets are present in `public/`.
4. Confirm the correct route resolves (`/discounts/...` or `/earn/...`).
5. Add/adjust specialized component only if template-based layout is insufficient.

### Update copy/offer details
- Edit `content/landing-pages.ts` first.
- If CTA behavior changes (code vs link vs app links), verify `lib/brands.ts` fields match.
- Keep disclaimers and referral transparency accurate.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `kianacox/referral-hub`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary — `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

## Guardrails for Agents

- Keep changes scoped and minimal.
- Do not commit secrets or `.env.local`.
- Do not change unrelated brand copy while implementing a specific request.
- Preserve current route structure and metadata quality.
- Prefer extending existing helpers/components over creating duplicate abstractions.
