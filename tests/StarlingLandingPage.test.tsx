import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { StarlingLandingPage } from "@/components/landing/StarlingLandingPage";
import * as analytics from "@/lib/analytics";
import { ALL_BRANDS } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";

vi.mock("@/lib/analytics", () => ({
  trackProviderCodeCopy: vi.fn(),
  trackProviderCtaClick: vi.fn(),
  trackProviderOutboundClick: vi.fn(),
}));

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const brand = ALL_BRANDS.find((b) => b.slug === "starling-bank")!;
const content = LANDING_PAGE_CONTENT["starling-bank"];

function renderPage() {
  return render(<StarlingLandingPage brand={brand} content={content} />);
}

beforeEach(() => {
  vi.clearAllMocks();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe("Starling offer data", () => {
  it("is code-only, with no referral link", () => {
    expect(brand.referralCode).toBe("VVDCRGY");
    expect(brand.referralLink).toBeUndefined();
  });
});

describe("StarlingLandingPage analytics", () => {
  it("copies the code, shows Copied! and fires code_copy", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    await waitFor(() => expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("VVDCRGY");
    expect(analytics.trackProviderCodeCopy).toHaveBeenCalledWith("starling-bank");
  });

  it("tracks every outbound link and opens it in a new tab", () => {
    renderPage();
    const site = screen.getByRole("link", { name: /starlingbank\.com/i });
    const terms = screen.getByRole("link", { name: /full refer a friend t&cs/i });
    const source = screen.getByRole("link", { name: /beermoneyuk/i });

    [site, terms, source].forEach((l) => expect(l).toHaveAttribute("target", "_blank"));

    fireEvent.click(site);
    fireEvent.click(terms);
    fireEvent.click(source);
    expect(analytics.trackProviderCtaClick).toHaveBeenCalledWith("starling-bank");
    expect(analytics.trackProviderOutboundClick).toHaveBeenCalledWith("starling-bank", "terms");
    expect(analytics.trackProviderOutboundClick).toHaveBeenCalledWith("starling-bank", "dd_source");
  });
});
