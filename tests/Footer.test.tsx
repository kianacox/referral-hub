import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { getSiteChrome } from "@/lib/landing-chrome";

const mockPathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Footer", () => {
  beforeEach(() => {
    mockPathname.mockReset();
  });

  it("returns null when earn brand uses standalone layout", () => {
    mockPathname.mockReturnValue("/earn/lloyds-bank");
    const { container } = render(<Footer landingPages={getSiteChrome().landingPages} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders copyright on standard routes", () => {
    mockPathname.mockReturnValue("/earn");
    render(<Footer landingPages={getSiteChrome().landingPages} />);
    expect(
      screen.getByText(/© 2026 referral hub/i),
    ).toBeInTheDocument();
  });

  it("links to the contact page", () => {
    mockPathname.mockReturnValue("/");
    render(<Footer landingPages={getSiteChrome().landingPages} />);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });
});
