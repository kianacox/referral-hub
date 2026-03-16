/**
 * GA4 event helpers for brand-level tracking (CTA, code copy, app store, Trustpilot).
 * Events: brand_cta_click, brand_code_copy, brand_ios_cta_click, brand_android_cta_click, brand_trustpilot_click.
 * All events send a `brand` parameter (slug) so analytics can segment by brand.
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

function sendEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackProviderCtaClick(brandSlug: string) {
  sendEvent("brand_cta_click", { brand: brandSlug });
}

export function trackProviderCodeCopy(brandSlug: string) {
  sendEvent("brand_code_copy", { brand: brandSlug });
}

export function trackProviderIosCtaClick(brandSlug: string) {
  sendEvent("brand_ios_cta_click", { brand: brandSlug });
}

export function trackProviderAndroidCtaClick(brandSlug: string) {
  sendEvent("brand_android_cta_click", { brand: brandSlug });
}

export function trackBrandTrustpilotClick(brand: string) {
  sendEvent("brand_trustpilot_click", { brand });
}
