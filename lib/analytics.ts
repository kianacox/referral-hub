/**
 * GA4 event helpers for brand-level tracking (CTA, code copy, app store, Trustpilot).
 * Event names are prefixed by brand slug (e.g. ribbon_rewards_cta_click) so analytics can filter by event name.
 * All events also send a `brand` parameter (slug) for segmentation.
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

function eventNameForBrand(brandSlug: string, suffix: string): string {
  const normalized = brandSlug.replace(/-/g, "_");
  return `${normalized}_${suffix}`;
}

function sendEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackProviderCtaClick(brandSlug: string) {
  sendEvent(eventNameForBrand(brandSlug, "cta_click"), { brand: brandSlug });
}

export function trackProviderCodeCopy(brandSlug: string) {
  sendEvent(eventNameForBrand(brandSlug, "code_copy"), { brand: brandSlug });
}

export function trackProviderIosCtaClick(brandSlug: string) {
  sendEvent(eventNameForBrand(brandSlug, "ios_cta_click"), { brand: brandSlug });
}

export function trackProviderAndroidCtaClick(brandSlug: string) {
  sendEvent(eventNameForBrand(brandSlug, "android_cta_click"), { brand: brandSlug });
}

export function trackBrandTrustpilotClick(brand: string) {
  sendEvent(eventNameForBrand(brand, "trustpilot_click"), { brand });
}

/** Where on a landing page the "more offers" prompt was clicked. */
export type MoreOffersPlacement = "nav" | "sticky_bar";

/**
 * Cross-sell interest on brand landing pages.
 * Deliberately not brand-prefixed: the question is how many readers want more offers
 * across the whole site, so one event name keeps the total in a single GA4 report.
 * Segment by the `brand` and `placement` params.
 */
export function trackMoreOffersClick(
  brandSlug: string,
  placement: MoreOffersPlacement,
) {
  sendEvent("more_offers_click", { brand: brandSlug, placement });
}

export function trackRibbonSocialProofClick() {
  sendEvent("ribbon_social_proof_click", { brand: "ribbon-rewards" });
}

