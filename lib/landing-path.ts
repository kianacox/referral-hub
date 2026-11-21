import type { HomeSection } from "@/lib/brands";

// Client-safe: types and pure helpers only. Never import brand data or page copy here.

/** What the client-side nav, footer and disclaimer need to know about one visible landing page. */
export type LandingChromeItem = {
  href: string;
  slug: string;
  standaloneLayout: boolean;
  /** Footer disclaimer, for discounts pages only */
  disclaimer: string | null;
};

export type SiteChrome = {
  landingPages: LandingChromeItem[];
  sections: HomeSection[];
};

/** Matches a pathname (trailing slash ignored) to a visible landing page. */
export function findLandingPage(
  landingPages: LandingChromeItem[],
  pathname: string,
): LandingChromeItem | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return landingPages.find((p) => p.href === path);
}
