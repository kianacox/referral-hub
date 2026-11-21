import {
  getBrandLandingHref,
  getVisibleBrands,
  getVisibleHomeSections,
} from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import type { SiteChrome } from "@/lib/landing-path";

/**
 * Built on the server and passed to client components as props, so hidden
 * brands (and their links and copy) never reach the browser bundle.
 */
export function getSiteChrome(): SiteChrome {
  return {
    landingPages: getVisibleBrands().map((b) => ({
      href: getBrandLandingHref(b),
      slug: b.slug,
      standaloneLayout: Boolean(b.standaloneLayout),
      disclaimer:
        b.section === "discounts"
          ? (LANDING_PAGE_CONTENT[b.slug]?.disclaimer ?? null)
          : null,
    })),
    sections: getVisibleHomeSections(),
  };
}
