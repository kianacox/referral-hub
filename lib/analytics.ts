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

export function trackRibbonSocialProofClick() {
  sendEvent("ribbon_social_proof_click", { brand: "ribbon-rewards" });
}

export function trackVirginCtaClick() {
  sendEvent("virgin_cta_click", { brand: "virgin-media" });
}

export function trackLloydsCtaClick() {
  sendEvent("lloyds_bank_cta_click", { brand: "lloyds-bank" });
}
