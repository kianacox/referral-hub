import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MoreOffersBar } from "@/components/layout/MoreOffersBar";

const trackMoreOffersClick = vi.fn();

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

function scrollTo(y: number) {
  act(() => {
    window.scrollY = y;
    fireEvent.scroll(window);
  });
}

beforeEach(() => {
  trackMoreOffersClick.mockReset();
  window.scrollY = 0;
});

afterEach(() => {
  window.scrollY = 0;
});

describe("MoreOffersBar", () => {
  it("stays hidden before the scroll threshold", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={8} />);
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("appears once the reader scrolls past the threshold", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={8} />);
    scrollTo(401);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("hides again when the reader scrolls back to the top", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={8} />);
    scrollTo(401);
    scrollTo(0);
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("shows the offer count it is given", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={8} />);
    scrollTo(401);
    expect(screen.getByText("8 more offers")).toBeInTheDocument();
  });

  it("reads naturally when only one other offer exists", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={1} />);
    scrollTo(401);
    expect(screen.getByRole("region")).toHaveTextContent(
      /1 more offer on the hub/,
    );
  });

  it("never renders when there are no other offers", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={0} />);
    scrollTo(401);
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("links to the homepage offer list", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={8} />);
    scrollTo(401);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/#top");
  });

  it("tracks the click as a sticky bar click", () => {
    render(<MoreOffersBar brandSlug="ribbon-rewards" otherOfferCount={8} />);
    scrollTo(401);
    fireEvent.click(screen.getByRole("link"));
    expect(trackMoreOffersClick).toHaveBeenCalledWith(
      "ribbon-rewards",
      "sticky_bar",
    );
  });
});
