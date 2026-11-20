import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ALL_BRANDS } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import { IndependenceDisclaimer } from "@/components/ui/IndependenceDisclaimer";
import { Footer } from "@/components/layout/Footer";

vi.mock("next/navigation", () => ({ usePathname: () => "/discounts/finance/starling-bank" }));

const financeBrands = ALL_BRANDS.filter((b) => b.category === "finance");

describe("finance pages", () => {
  it.each(financeBrands.map((b) => [b.slug, b]))("%s has what the independence disclaimer needs", (_, brand) => {
    expect(brand.signUpPlace).toBeTruthy();
  });

  it.each(financeBrands.map((b) => [b.slug]))("%s title and description say it's an independent referral page", (slug) => {
    const content = LANDING_PAGE_CONTENT[slug];
    expect(content.seoTitle).toMatch(/independent personal referral page/i);
    expect(content.seoDescription).toMatch(/^Independent personal referral page, not run by/);
  });
});

describe("IndependenceDisclaimer", () => {
  it("names the brand and says where sign-up happens", () => {
    render(<IndependenceDisclaimer brandName="Starling Bank" signUpPlace="Starling's own app" />);
    expect(screen.getByRole("note")).toHaveTextContent(
      "Independent personal referral page. Not affiliated with, endorsed by or operated by Starling Bank. I don't collect any of your details. You sign up in Starling's own app.",
    );
  });
});

describe("site footer", () => {
  it("links to About and Privacy Policy and states independence", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByText(/independent personal site/i)).toBeInTheDocument();
  });
});
