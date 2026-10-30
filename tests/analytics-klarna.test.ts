import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackProviderCtaClick,
  trackProviderFaqOpen,
  trackProviderLinkCopy,
} from "@/lib/analytics";

afterEach(() => {
  delete window.gtag;
  vi.restoreAllMocks();
});

describe("trackProviderCtaClick", () => {
  it("sends only the brand when no placement is given", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackProviderCtaClick("airtime");

    expect(gtag).toHaveBeenCalledWith("event", "airtime_cta_click", { brand: "airtime" });
  });

  it("adds the placement when given", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackProviderCtaClick("klarna", "repeat_cta");

    expect(gtag).toHaveBeenCalledWith("event", "klarna_cta_click", {
      brand: "klarna",
      placement: "repeat_cta",
    });
  });
});

describe("trackProviderLinkCopy", () => {
  it("sends a brand-prefixed link_copy event with placement", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackProviderLinkCopy("klarna", "hero");

    expect(gtag).toHaveBeenCalledWith("event", "klarna_link_copy", {
      brand: "klarna",
      placement: "hero",
    });
  });
});

describe("trackProviderFaqOpen", () => {
  it("sends a brand-prefixed faq_open event with the question", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackProviderFaqOpen("klarna", "Who can sign up?");

    expect(gtag).toHaveBeenCalledWith("event", "klarna_faq_open", {
      brand: "klarna",
      question: "Who can sign up?",
    });
  });
});
