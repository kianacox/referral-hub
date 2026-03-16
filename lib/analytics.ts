/**
 * GA4 event helpers for provider CTA tracking.
 * Events: provider_cta_click, provider_code_copy, provider_ios_cta_click, provider_android_cta_click.
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

export function trackProviderCtaClick(provider: string) {
  sendEvent("provider_cta_click", { provider });
}

export function trackProviderCodeCopy(provider: string) {
  sendEvent("provider_code_copy", { provider });
}

export function trackProviderIosCtaClick(provider: string) {
  sendEvent("provider_ios_cta_click", { provider });
}

export function trackProviderAndroidCtaClick(provider: string) {
  sendEvent("provider_android_cta_click", { provider });
}

export function trackBrandTrustpilotClick(brand: string) {
  sendEvent("brand_trustpilot_click", { brand });
}
