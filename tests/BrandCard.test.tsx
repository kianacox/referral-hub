import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Brand } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { LEARN_MORE_LABEL } from "@/constants/copy";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    className,
  }: {
    alt?: string;
    src?: string;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ""} src={typeof src === "string" ? src : ""} className={className} />
  ),
}));

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
}));

const listBrandWithLink: Brand = {
  id: "test-co",
  name: "Test Co",
  slug: "test-co",
  category: "health",
  section: "discounts",
  logoPath: "/test.png",
  overview: "A test brand for list cards.",
  offerSummary: "£10 off your first order",
  refereeReward: "£10",
  rewardRank: 5,
  referralLink: "https://example.com/join",
};

describe("BrandCard (list styling)", () => {
  it("exposes a distinct accessible name for Learn more using the brand (visible label unchanged)", () => {
    render(<BrandCard brand={listBrandWithLink} />);
    const learnMore = screen.getByRole("link", {
      name: new RegExp(
        `${LEARN_MORE_LABEL}\\s*[—-]\\s*${listBrandWithLink.name}`,
        "i"
      ),
    });
    expect(learnMore).toHaveTextContent(LEARN_MORE_LABEL);
    expect(learnMore).toHaveAttribute(
      "href",
      `/discounts/${listBrandWithLink.category}/${listBrandWithLink.slug}`
    );
  });

  it("shows the category badge when requested", () => {
    render(<BrandCard brand={listBrandWithLink} showCategory />);
    expect(screen.getByText("health")).toBeInTheDocument();
  });

  it("surfaces the offer summary with semantic emphasis", () => {
    render(<BrandCard brand={listBrandWithLink} />);
    const offer = screen.getByText("£10 off your first order");
    expect(offer.tagName).toBe("STRONG");
  });

  it("uses the list-card primary referral CTA variant and referral href", () => {
    render(<BrandCard brand={listBrandWithLink} />);
    const cta = screen.getByRole("link", { name: /get £10 off now/i });
    expect(cta).toHaveAttribute("data-primary-variant", "listCard");
    expect(cta).toHaveAttribute("href", listBrandWithLink.referralLink);
  });
});
