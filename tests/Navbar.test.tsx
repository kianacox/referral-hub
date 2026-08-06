import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/layout/Navbar";
import { getVisibleBrands } from "@/lib/brands";

const mockPathname = vi.fn();
const trackMoreOffersClick = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

vi.mock("@/lib/analytics", () => ({
  trackMoreOffersClick: (...args: unknown[]) => trackMoreOffersClick(...args),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...rest
  }: React.PropsWithChildren<
    { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Navbar on the homepage", () => {
  beforeEach(() => {
    mockPathname.mockReset();
    trackMoreOffersClick.mockReset();
    mockPathname.mockReturnValue("/");
  });

  it("keeps the pill chip row", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "All offers" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Bills & home" }),
    ).toBeInTheDocument();
  });

  it("does not render the landing page offers link", () => {
    render(<Navbar />);
    expect(screen.queryByRole("link", { name: /All offers →/ })).toBeNull();
  });
});

describe("Navbar on a brand landing page", () => {
  beforeEach(() => {
    mockPathname.mockReset();
    trackMoreOffersClick.mockReset();
    mockPathname.mockReturnValue("/earn/ribbon-rewards");
  });

  it("drops the pill chip row", () => {
    render(<Navbar />);
    expect(screen.queryByRole("link", { name: "Bills & home" })).toBeNull();
  });

  it("links the wordmark back to the homepage", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Referral Hub" })).toHaveAttribute(
      "href",
      "/#top",
    );
  });

  it("shows a quiet all-offers link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /All offers/ })).toHaveAttribute(
      "href",
      "/#top",
    );
  });

  it("tracks the all-offers click as a nav click", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("link", { name: /All offers/ }));
    expect(trackMoreOffersClick).toHaveBeenCalledWith("ribbon-rewards", "nav");
  });

  it("gives standalone pages the offers bar without a second header", () => {
    mockPathname.mockReturnValue("/earn/lloyds-bank");
    render(<Navbar />);
    expect(screen.queryByRole("banner")).toBeNull();
    expect(screen.queryByRole("link", { name: /All offers/ })).toBeNull();

    window.scrollY = 401;
    fireEvent.scroll(window);
    expect(screen.getByRole("region")).toBeInTheDocument();
    window.scrollY = 0;
  });

  it("renders on discount landing pages", () => {
    mockPathname.mockReturnValue("/discounts/health/exhale-coffee");
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /All offers/ })).toBeInTheDocument();
  });

  it("passes the live offer count to the sticky bar", () => {
    render(<Navbar />);
    window.scrollY = 401;
    fireEvent.scroll(window);
    expect(
      screen.getByText(`${getVisibleBrands().length - 1} more offers`),
    ).toBeInTheDocument();
    window.scrollY = 0;
  });
});
