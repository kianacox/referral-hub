import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ExhaleLandingPage } from "@/components/landing/ExhaleLandingPage";
import * as analytics from "@/lib/analytics";
import { ALL_BRANDS } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
  trackBrandTrustpilotClick: vi.fn(),
}));

const brand = ALL_BRANDS.find((b) => b.slug === "exhale-coffee")!;
const content = LANDING_PAGE_CONTENT["exhale-coffee"];

function renderPage() {
  return render(<ExhaleLandingPage brand={brand} content={content} />);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ExhaleLandingPage links", () => {
  it("points every referral CTA at the brand referral link", () => {
    renderPage();
    const ctas = screen.getAllByRole("link", { name: /claim 50% off/i });
    // hero, mid-page and mobile sticky CTAs
    expect(ctas).toHaveLength(3);
    ctas.forEach((cta) => {
      expect(cta).toHaveAttribute("href", brand.referralLink);
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("keeps the Trustpilot link", () => {
    renderPage();
    expect(
      screen.getByRole("link", { name: /read exhale coffee’s reviews/i }),
    ).toHaveAttribute("href", content.trustpilot!.url);
  });
});

describe("ExhaleLandingPage analytics", () => {
  it("fires cta_click on every referral CTA", () => {
    renderPage();
    const ctas = screen.getAllByRole("link", { name: /claim 50% off/i });
    ctas.forEach((cta) => fireEvent.click(cta));
    expect(analytics.trackProviderCtaClick).toHaveBeenCalledTimes(ctas.length);
    expect(analytics.trackProviderCtaClick).toHaveBeenCalledWith(
      "exhale-coffee",
    );
  });

  it("fires trustpilot_click on the Trustpilot link", () => {
    renderPage();
    fireEvent.click(
      screen.getByRole("link", { name: /read exhale coffee’s reviews/i }),
    );
    expect(analytics.trackBrandTrustpilotClick).toHaveBeenCalledWith(
      "exhale-coffee",
    );
  });
});

describe("ExhaleLandingPage content", () => {
  it("renders every FAQ question and toggles its answer", () => {
    renderPage();
    const [first] = content.faq!;
    content.faq!.forEach(({ question }) => {
      expect(
        screen.getByRole("button", { name: question }),
      ).toBeInTheDocument();
    });

    expect(screen.queryByText(first.answer)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: first.question }));
    expect(screen.getByText(first.answer)).toBeInTheDocument();
  });

  it("shows the Trustpilot score from content", () => {
    renderPage();
    expect(
      screen.getAllByText(new RegExp(`${content.trustpilot!.score} on Trustpilot`)),
    ).not.toHaveLength(0);
  });
});
