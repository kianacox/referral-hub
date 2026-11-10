import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { getEarnBrandBySlug } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import { LloydsLandingPage } from "@/components/landing/LloydsLandingPage";
import { trackProviderCtaClick } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
}));

// next/font/local is a compile-time transform; return a stub at module level
vi.mock("next/font/local", () => ({
  default: () => ({ variable: "--font-local", className: "font-local" }),
}));

// Rotated 2026-10-30. UPDATE EVERY 14 DAYS — referral links expire after 14 days.
const LLOYDS_REFERRAL_LINK =
  "https://apply.lloydsbank.co.uk/pca/onboard/lloyds/index-app.html?from=ob&channel=referrals&journeyType=raf&referralToken=8kMtnCauQOuTJv7Erekd8Xce2oCa9pBctvdQSozXGkU=";

// jsdom has no IntersectionObserver; the page uses one for scroll reveals
vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  },
);

const brand = getEarnBrandBySlug("lloyds-bank");
const content = LANDING_PAGE_CONTENT["lloyds-bank"];

describe("Lloyds referral link", () => {
  beforeEach(() => {
    vi.mocked(trackProviderCtaClick).mockClear();
  });

  it("is the current link on the brand record", () => {
    expect(brand).toBeDefined();
    expect(brand!.referralLink).toBe(LLOYDS_REFERRAL_LINK);
  });

  it("carries the token the refer-a-friend flow needs", () => {
    const url = new URL(brand!.referralLink!);
    expect(url.hostname).toBe("apply.lloydsbank.co.uk");
    expect(url.searchParams.get("journeyType")).toBe("raf");
    // '+' and '/' are literal token characters, so read the raw query string
    expect(url.search).toContain(
      "referralToken=8kMtnCauQOuTJv7Erekd8Xce2oCa9pBctvdQSozXGkU=",
    );
  });

  it("points every CTA on the landing page at the referral link", () => {
    render(<LloydsLandingPage brand={brand!} content={content} />);

    const ctas = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === LLOYDS_REFERRAL_LINK);

    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta.getAttribute("rel")).toContain("noopener");
    }

    // No CTA is left on a stale link
    const staleLloydsLinks = screen
      .getAllByRole("link")
      .filter(
        (el) =>
          el.getAttribute("href")?.includes("apply.lloydsbank.co.uk") &&
          el.getAttribute("href") !== LLOYDS_REFERRAL_LINK,
      );
    expect(staleLloydsLinks).toHaveLength(0);
  });

  it("navigates out to Lloyds when a CTA is clicked", () => {
    render(<LloydsLandingPage brand={brand!} content={content} />);

    const cta = screen
      .getAllByRole("link")
      .find((el) => el.getAttribute("href") === LLOYDS_REFERRAL_LINK)!;

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(cta, clickEvent);

    // Analytics fires, and nothing swallows the click, so the browser follows href
    expect(trackProviderCtaClick).toHaveBeenCalledWith("lloyds-bank");
    expect(clickEvent.defaultPrevented).toBe(false);
  });
});
