import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { KlarnaLandingPage } from "@/components/landing/KlarnaLandingPage";
import * as analytics from "@/lib/analytics";
import { ALL_BRANDS, getBrandsByCategory } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
  trackProviderLinkCopy: vi.fn(),
  trackProviderFaqOpen: vi.fn(),
}));

const brand = ALL_BRANDS.find((b) => b.slug === "klarna")!;
const content = LANDING_PAGE_CONTENT.klarna;

function renderPage() {
  return render(<KlarnaLandingPage brand={brand} content={content} />);
}

beforeEach(() => {
  vi.clearAllMocks();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe("KlarnaLandingPage links", () => {
  it("points both sign-up CTAs at the referral link", () => {
    renderPage();
    const ctas = screen.getAllByRole("link", { name: /sign up with my link/i });
    expect(ctas).toHaveLength(2);
    ctas.forEach((cta) => {
      expect(cta).toHaveAttribute("href", brand.referralLink);
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("links to Klarna's reward terms", () => {
    renderPage();
    const terms = screen.getAllByRole("link", { name: /reward terms set by klarna/i });
    expect(terms.length).toBeGreaterThan(0);
    terms.forEach((link) =>
      expect(link.getAttribute("href")).toMatch(/^https:\/\/cdn\.klarna\.com\//),
    );
  });

  it("shows every membership tier with its reward", () => {
    renderPage();
    for (const [tier, reward] of [
      ["Everywhere", "£6"],
      ["Plus", "£13"],
      ["Premium", "£25"],
      ["Max", "£40"],
    ]) {
      const row = screen.getByRole("rowheader", { name: new RegExp(`^${tier}`) }).closest("tr")!;
      expect(row).toHaveTextContent(reward);
    }
  });
});

describe("KlarnaLandingPage analytics", () => {
  it("tags each CTA click with its placement", () => {
    renderPage();
    const [hero, repeat] = screen.getAllByRole("link", { name: /sign up with my link/i });
    fireEvent.click(hero);
    fireEvent.click(repeat);
    expect(analytics.trackProviderCtaClick).toHaveBeenNthCalledWith(1, "klarna", "hero");
    expect(analytics.trackProviderCtaClick).toHaveBeenNthCalledWith(2, "klarna", "repeat_cta");
  });

  it("copies the referral link and fires link_copy with its placement", async () => {
    renderPage();
    const [hero, repeat] = screen.getAllByRole("button", { name: /copy link/i });
    fireEvent.click(hero);
    await waitFor(() =>
      expect(analytics.trackProviderLinkCopy).toHaveBeenCalledWith("klarna", "hero"),
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(brand.referralLink);
    await waitFor(() => expect(screen.getAllByText("Copied!")).toHaveLength(2));

    fireEvent.click(repeat);
    await waitFor(() =>
      expect(analytics.trackProviderLinkCopy).toHaveBeenCalledWith("klarna", "repeat_cta"),
    );
  });
});

describe("KlarnaLandingPage FAQ", () => {
  it("renders every FAQ question from content, all closed on mount", () => {
    renderPage();
    for (const item of content.faq!) {
      expect(screen.getByRole("button", { name: item.question })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("opens one answer at a time and tracks only opens", () => {
    renderPage();
    const [first, second] = content.faq!;
    const firstButton = screen.getByRole("button", { name: first.question });
    const secondButton = screen.getByRole("button", { name: second.question });

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(analytics.trackProviderFaqOpen).toHaveBeenCalledWith("klarna", first.question);

    fireEvent.click(secondButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(secondButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
    expect(analytics.trackProviderFaqOpen).toHaveBeenCalledTimes(2);
  });

  it("answers the reward-amount question for search and AI overviews", () => {
    expect(content.faq![0].question).toMatch(/how much is the klarna referral reward/i);
    expect(content.faq![0].answer).toMatch(/£6.*£13.*£25.*£40/);
  });
});

describe("Klarna homepage placement", () => {
  it("sits in Money & banking after Lloyds and before Emma", () => {
    expect(getBrandsByCategory("finance").map((b) => b.slug)).toEqual([
      "lloyds-bank",
      "klarna",
      "emma-budgeting",
    ]);
  });
});
