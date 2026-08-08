import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getEarnBrandBySlug } from "@/lib/brands";
import { OfferCard } from "@/components/home/OfferCard";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt?: string; src?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ""} src={typeof src === "string" ? src : ""} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
  trackProviderCodeCopy: vi.fn(),
  trackBrandTrustpilotClick: vi.fn(),
}));

const VIRGIN_REFERRAL_LINK = "https://aklam.io/izBRNjvv";

describe("Virgin Media offer CTA", () => {
  const brand = getEarnBrandBySlug("virgin-media");

  it("carries the Aklamio referral link rather than a dead brand URL", () => {
    expect(brand).toBeDefined();
    expect(brand!.referralLink).toBe(VIRGIN_REFERRAL_LINK);
    // virginmedia.com/refer-a-friend 404s; the live page is under /help/
    expect(brand!.brandUrl).not.toBe("https://www.virginmedia.com/refer-a-friend");
  });

  it("renders a claim CTA on the homepage card pointing at the referral link", () => {
    render(<OfferCard brand={brand!} />);
    const cta = screen.getByRole("link", { name: /claim £50 now/i });
    expect(cta).toHaveAttribute("href", VIRGIN_REFERRAL_LINK);
  });
});
