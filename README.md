# Referral Hub

A personal referral hub hosting landing pages that drive traffic to partner sites via referral links. Built with Next.js, React, and Tailwind.

**Live:** [referral-hub.app](https://referral-hub.app)

## Tech stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS** for styling (dark, mobile-first)
- **Vercel** for deployment
- **Google Analytics** for tracking (optional)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set as needed:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SHOW_GYMSHARK` | Set to `"true"` to show the Gymshark brand and landing page. Omit or leave empty to hide it. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`). Leave empty to disable GA. |

## Routes

- **/** — Homepage with ranked referral cards
- **/discounts** — All discounts with filters (Bills, Health, Finance)
- **/discounts/health**, **/discounts/finance**, **/discounts/bills** — Filtered discount lists
- **/discounts/[category]/[slug]** — Brand landing pages (e.g. `/discounts/health/exhale-coffee`)
- **/earn** — Placeholder (coming later)

## Runna screenshots

To show Runna app screenshots on the Runna landing page, add images under:

- `public/runna_first_run/` (e.g. `screenshot.png`)
- `public/runna_recent_run/`
- `public/runna_total_km/`

Then set the `images` array for the `runna` entry in `content/landing-pages.ts` to use these paths.

## Deploy on Vercel

Set the same environment variables in the Vercel project. The canonical URL is `https://referral-hub.app`.
