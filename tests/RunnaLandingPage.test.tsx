import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { RunnaLandingPage } from "@/components/landing/RunnaLandingPage";
import * as analytics from "@/lib/analytics";
import { ALL_BRANDS } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";

vi.mock("@/lib/analytics", () => ({
  trackProviderCodeCopy: vi.fn(),
  trackProviderIosCtaClick: vi.fn(),
  trackProviderAndroidCtaClick: vi.fn(),
  trackBrandTrustpilotClick: vi.fn(),
}));

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const brand = ALL_BRANDS.find((b) => b.slug === "runna")!;
const content = LANDING_PAGE_CONTENT.runna;

function renderPage() {
  return render(<RunnaLandingPage brand={brand} content={content} />);
}

beforeEach(() => {
  vi.clearAllMocks();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe("RunnaLandingPage content", () => {
  it("shows the referral code", () => {
    renderPage();
    expect(screen.getByText(brand.referralCode!)).toBeInTheDocument();
  });

  it("keeps both iOS and Android store links in hero and offer section", () => {
    renderPage();
    const ios = screen.getAllByRole("link", { name: /download for ios/i });
    const android = screen.getAllByRole("link", { name: /download for android/i });
    expect(ios).toHaveLength(2);
    expect(android).toHaveLength(2);
    ios.forEach((l) => expect(l).toHaveAttribute("href", content.appStoreLinks!.ios));
    android.forEach((l) => expect(l).toHaveAttribute("href", content.appStoreLinks!.android));
  });

  it("renders every progress image and FAQ", () => {
    renderPage();
    content.images!.forEach((img) => expect(screen.getByAltText(img.alt)).toBeInTheDocument());
    content.faq!.forEach((f) => expect(screen.getByText(f.question)).toBeInTheDocument());
  });
});

describe("RunnaLandingPage analytics", () => {
  it("fires code_copy when the code is copied", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    await waitFor(() => expect(analytics.trackProviderCodeCopy).toHaveBeenCalledWith("runna"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(brand.referralCode);
  });

  it("fires ios_cta_click from both iOS links", () => {
    renderPage();
    screen
      .getAllByRole("link", { name: /download for ios/i })
      .forEach((l) => fireEvent.click(l));
    expect(analytics.trackProviderIosCtaClick).toHaveBeenCalledTimes(2);
    expect(analytics.trackProviderIosCtaClick).toHaveBeenCalledWith("runna");
  });

  it("fires android_cta_click from both Android links", () => {
    renderPage();
    screen
      .getAllByRole("link", { name: /download for android/i })
      .forEach((l) => fireEvent.click(l));
    expect(analytics.trackProviderAndroidCtaClick).toHaveBeenCalledTimes(2);
    expect(analytics.trackProviderAndroidCtaClick).toHaveBeenCalledWith("runna");
  });

  it("fires trustpilot_click on the Trustpilot link", () => {
    renderPage();
    const link = screen.getByRole("link", { name: /on trustpilot/i });
    expect(link).toHaveAttribute("href", content.trustpilot!.url);
    fireEvent.click(link);
    expect(analytics.trackBrandTrustpilotClick).toHaveBeenCalledWith("runna");
  });
});
