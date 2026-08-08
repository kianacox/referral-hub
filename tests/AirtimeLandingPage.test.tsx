import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { AirtimeLandingPage } from "@/components/landing/AirtimeLandingPage";
import * as analytics from "@/lib/analytics";
import { ALL_BRANDS } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";

vi.mock("@/lib/analytics", () => ({
  trackProviderCodeCopy: vi.fn(),
  trackProviderCtaClick: vi.fn(),
  trackProviderIosCtaClick: vi.fn(),
  trackProviderAndroidCtaClick: vi.fn(),
  trackBrandTrustpilotClick: vi.fn(),
}));

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const brand = ALL_BRANDS.find((b) => b.slug === "airtime")!;
const content = LANDING_PAGE_CONTENT.airtime;

function renderPage() {
  return render(<AirtimeLandingPage brand={brand} content={content} />);
}

beforeEach(() => {
  vi.clearAllMocks();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe("AirtimeLandingPage links", () => {
  it("both app CTAs point at the brand URL", () => {
    renderPage();
    const heroCta = screen.getByRole("link", { name: /get the app/i });
    const finalCta = screen.getByRole("link", { name: /download airtime/i });
    expect(heroCta).toHaveAttribute("href", "https://airtime.app");
    expect(finalCta).toHaveAttribute("href", "https://airtime.app");
  });

  it("keeps the iOS and Android store links", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /download for ios/i })).toHaveAttribute(
      "href",
      content.appStoreLinks!.ios,
    );
    expect(screen.getByRole("link", { name: /download for android/i })).toHaveAttribute(
      "href",
      content.appStoreLinks!.android,
    );
  });

  it("keeps the Trustpilot link", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /on trustpilot/i })).toHaveAttribute(
      "href",
      content.trustpilot!.url,
    );
  });

  it("renders the referral code in both copy buttons", () => {
    renderPage();
    expect(screen.getAllByText("UKV9QCKE")).toHaveLength(2);
  });
});

describe("AirtimeLandingPage analytics", () => {
  it("fires cta_click on the hero app link", () => {
    renderPage();
    fireEvent.click(screen.getByRole("link", { name: /get the app/i }));
    expect(analytics.trackProviderCtaClick).toHaveBeenCalledWith("airtime");
  });

  it("fires cta_click on the final download link", () => {
    renderPage();
    fireEvent.click(screen.getByRole("link", { name: /download airtime/i }));
    expect(analytics.trackProviderCtaClick).toHaveBeenCalledWith("airtime");
  });

  it("fires code_copy and shows feedback when copying the code", async () => {
    renderPage();
    const copyButtons = screen.getAllByRole("button", { name: /copy code/i });
    fireEvent.click(copyButtons[0]);
    await waitFor(() =>
      expect(analytics.trackProviderCodeCopy).toHaveBeenCalledWith("airtime"),
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("UKV9QCKE");
    await waitFor(() => expect(screen.getAllByText("Copied!")).toHaveLength(2));
  });

  it("fires store and Trustpilot events", () => {
    renderPage();
    fireEvent.click(screen.getByRole("link", { name: /download for ios/i }));
    fireEvent.click(screen.getByRole("link", { name: /download for android/i }));
    fireEvent.click(screen.getByRole("link", { name: /on trustpilot/i }));
    expect(analytics.trackProviderIosCtaClick).toHaveBeenCalledWith("airtime");
    expect(analytics.trackProviderAndroidCtaClick).toHaveBeenCalledWith("airtime");
    expect(analytics.trackBrandTrustpilotClick).toHaveBeenCalledWith("airtime");
  });
});

describe("AirtimeLandingPage FAQ", () => {
  it("renders every FAQ question from content, all closed on mount", () => {
    renderPage();
    for (const item of content.faq!) {
      const button = screen.getByRole("button", { name: new RegExp(item.question.slice(0, 20), "i") });
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("clicking a question reveals its answer", () => {
    renderPage();
    const first = content.faq![0];
    const button = screen.getByRole("button", {
      name: new RegExp(first.question.slice(0, 20), "i"),
    });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(first.answer)).toBeInTheDocument();
  });
});
