import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/layout/Navbar";

const mockPathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
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

describe("Navbar", () => {
  beforeEach(() => {
    mockPathname.mockReset();
  });

  it("returns null when earn brand uses standalone layout", () => {
    mockPathname.mockReturnValue("/earn/lloyds-bank");
    const { container } = render(<Navbar />);
    expect(container.firstChild).toBeNull();
  });

  it("marks the active section link with aria-current=page", () => {
    mockPathname.mockReturnValue("/earn");
    render(<Navbar />);
    expect(
      screen.getByRole("link", { name: "Earn", current: "page" }),
    ).toBeInTheDocument();
  });

  it("marks home with aria-current=page when pathname is /", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);
    expect(
      screen.getByRole("link", { name: "Home", current: "page" }),
    ).toBeInTheDocument();
  });

  it("does not mark inactive section links as the current page", () => {
    mockPathname.mockReturnValue("/earn");
    render(<Navbar />);
    expect(
      screen.queryByRole("link", { name: "Discounts", current: "page" }),
    ).toBeNull();
    expect(screen.getByRole("link", { name: "Discounts" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("does not mark home as the current page when on a section route", () => {
    mockPathname.mockReturnValue("/earn");
    render(<Navbar />);
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).not.toHaveAttribute("aria-current", "page");
  });
});
