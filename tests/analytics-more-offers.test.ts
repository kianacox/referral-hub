import { afterEach, describe, expect, it, vi } from "vitest";
import { trackMoreOffersClick } from "@/lib/analytics";

afterEach(() => {
  delete window.gtag;
  vi.restoreAllMocks();
});

describe("trackMoreOffersClick", () => {
  it("sends one cross-brand event with brand and placement params", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackMoreOffersClick("ribbon-rewards", "nav");

    expect(gtag).toHaveBeenCalledWith("event", "more_offers_click", {
      brand: "ribbon-rewards",
      placement: "nav",
    });
  });

  it("distinguishes the sticky bar from the nav", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackMoreOffersClick("exhale-coffee", "sticky_bar");

    expect(gtag).toHaveBeenCalledWith("event", "more_offers_click", {
      brand: "exhale-coffee",
      placement: "sticky_bar",
    });
  });

  it("is a no-op when analytics is not loaded", () => {
    expect(() => trackMoreOffersClick("ribbon-rewards", "nav")).not.toThrow();
  });
});
