# Context: referral-hub

Domain context and ubiquitous language for this repo. Developers and LLMs should use these terms precisely.

## Purpose

`referral-hub` publishes curated referral offers and SEO landing pages for partner brands, split into two flows: `earn` (ongoing cashback/points) and `discounts` (one-time sign-up offers).

## Glossary

---

## Core data model

**Brand**
A partner offer entry defined in `lib/brands.ts`. The canonical record for a referral partner — contains routing, CTA, and ranking data. Does not contain page copy.

**Slug**
The URL-safe brand identifier (e.g. `ribbon-rewards`, `lloyds-bank`). Used as the route segment and as the lookup key into `LANDING_PAGE_CONTENT`. Must be unique and consistent across `lib/brands.ts` and `content/landing-pages.ts`.

**Section**
Top-level routing group for a brand: `"earn"` or `"discounts"`. Determines which route tree the brand lives under (`/earn/[slug]` vs `/discounts/[category]/[slug]`).

**Category**
Sub-grouping within a section (e.g. `"bills"`, `"finance"`, `"health"`). Used for `/discounts/[category]/[slug]` routing and filter UI. Earn brands also carry a category but it is not used for routing.

**LandingPageContent**
The TypeScript type (and per-brand data object) in `content/landing-pages.ts` that holds all page copy for a brand: headlines, body text, FAQ, structured sections. Keyed by slug. Never contains routing or CTA logic.

**LANDING_PAGE_CONTENT**
The exported record in `content/landing-pages.ts` mapping every slug to its `LandingPageContent`. The single source of truth for page copy.

---

## Routing and page generation

**Earn flow**
The `/earn/[slug]` route tree. Brands in this flow offer ongoing cashback or points (e.g. rent cashback, bank referrals). Custom layouts are common here.

**Discounts flow**
The `/discounts/[category]/[slug]` route tree. Brands in this flow offer one-time sign-up discounts or voucher codes.

**EARN_PAGE_REGISTRY**
A `Record<string, EarnPageComponent>` in `app/earn/[slug]/page.tsx` that maps earn slugs to their custom page components. A slug present here gets a bespoke layout instead of `LandingPageTemplate`.

**standaloneLayout**
Optional flag on `Brand`. When `true`, the brand's earn page uses a fully custom component registered in `EARN_PAGE_REGISTRY`.

**rewardRank**
Numeric field on `Brand` controlling the display order of cards on the homepage. Lower number = higher position.

---

## Content fields

**offerSummary**
One-line description of what the referral gives (e.g. "2,500 points worth £25"). Appears on list pages and cards.

**whyIUseIt**
Personal first-person narrative explaining why Kian uses the brand. Appears on landing pages as a quote/testimonial section. Supports inline markdown links `[label](url)`.

**referralLink**
The full outbound URL with the referral parameter baked in (e.g. `https://www.ribbonrewards.io/?ref=KIAN63DB`). Used for CTA buttons.

**referralCode**
Standalone alphanumeric code string (e.g. `KIAN63DB`). Present when a code must be manually entered at checkout or sign-up, in addition to or instead of a referral link.

**trustBadge**
Optional `{ partner, label }` pair showing a regulated partner name and credential line (e.g. "Griffin Bank Ltd · FCA authorised").

**howItWorksSteps**
Ordered array of `{ title, description }` explaining the sign-up or usage mechanics. Rendered as a step grid on landing pages.

**onboardingStages**
Ordered array of `{ title, details }` describing the sign-up funnel stages with progress percentages. Ribbon-specific concept, rendered as a progress-bar card grid.

**safetySection**
`{ title, bullets[] }` block covering security and regulatory trust points. Rendered as a bulleted card on landing pages.

**rewardsTable**
Array of `{ label, value }` rows showing potential earnings at different spend levels. Rendered as a table or ledger on landing pages.

**socialProofImages**
Array of `{ src, alt, caption }` real app screenshots. Used as evidence of actual usage on landing pages.

**transparencyDisclosure**
`{ title, body }` block disclosing the referral relationship (Kian earns a matching bonus). Required for honesty/compliance.

---

## UI components and layout terms

**LandingPageTemplate**
The generic reusable landing page component in `components/landing/LandingPageTemplate.tsx`. Used for all brands that don't need a bespoke layout. Renders sections from `LandingPageContent` using the site's standard light-theme CSS variables.

**Custom landing page**
A brand-specific component in `components/landing/` (e.g. `RibbonRewardsLandingPage`, `LloydsLandingPage`). Used when the brand experience genuinely diverges from the template. Registered in `EARN_PAGE_REGISTRY`.

**CTA (call-to-action)**
A button or link that drives the user to the referral destination. Uses `referralLink` from `Brand`. Always tracks clicks via `trackProviderCtaClick(slug)`.

**CtaBlock**
Shared UI component (`components/ui/CtaBlock.tsx`) rendering the primary CTA button. Used inside `LandingPageTemplate`; custom landing pages may render their own CTA.

**CopyableCode**
Shared UI component (`components/ui/CopyableCode.tsx`) rendering a copyable referral code with clipboard interaction.

**TrustpilotBadge**
Shared UI component (`components/ui/TrustpilotBadge.tsx`) rendering a Trustpilot score badge.

**FaqAccordion**
Shared UI component (`components/ui/FaqAccordion.tsx`) rendering an expand/collapse FAQ list from `content.faq`.

---

## Ribbon-specific terms

**Offer card**
The split two-column hero card on the Ribbon landing page: left column shows reward amounts (£25 welcome + 1% cashback), right column shows the referral code and primary CTA.

**Ledger**
The four-column earnings table on the Ribbon page showing `Monthly rent | 1% cashback | + Welcome bonus | First-year value` across four rent-level rows. Hardcoded in the component.

**Trust strip**
Horizontal row of three trust signals beneath the hero offer card: Trustpilot rating, FCA/Griffin Bank credential, FSCS £85k protection. Rendered inline, not via `TrustpilotBadge`.

**Hero meta**
The animated status line above the hero h1 on the Ribbon page: pulsing green dot + `Live referral · KIAN63DB | Updated [month year]`. Hardcoded in the component.

**Full-bleed section**
A section that extends to full viewport width, breaking out of the page content container using negative horizontal margins. Used for the dark security/trust section on the Ribbon page.

**Paper grain**
A subtle SVG fractal-noise texture overlay applied to the Ribbon page background to give a tactile, editorial feel. Scoped to the Ribbon component wrapper; does not affect global styles.

**Activity section**
The "My actual account" section on the Ribbon landing page. Shows `ribbon_proof_of_use.jpg` as the main proof image in a two-column layout, with `ribbon_shopping_rewards.jpg` and `ribbon_travel_rewards.jpg` as supplementary redemption screenshots.

**Section label**
The monospace uppercase tag used to annotate editorial sections (e.g. `§ ii · Mechanics`, `§ v · Trust`). Purely decorative/navigational, used on the Ribbon page.

---

## Analytics

**trackProviderCtaClick(slug)**
GA event helper in `lib/analytics.ts`. Called on every outbound CTA click. Takes the brand slug as the identifier.

**trackRibbonSocialProofClick()**
GA event helper for the "see my rewards" scroll-to action on the Ribbon page.

---

## Environment flags

**NEXT_PUBLIC_GA_ID**
Enables Google Analytics. Undefined in local dev; set in Vercel environment for production.

**NEXT_PUBLIC_SHOW_GYMSHARK**
Feature flag controlling Gymshark brand visibility. Pattern for all future conditional brand gating.
