import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  OfferCard,
  EarningsLedger,
  OnboardingStages,
  TrustStrip,
} from "@/components/landing/RibbonRewardsLandingPage";

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
  trackRibbonSocialProofClick: vi.fn(),
  trackProviderCodeCopy: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt?: string; src?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ""} src={typeof src === "string" ? src : ""} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

// next/font/google returns objects with variable/className; mock at module level
vi.mock("next/font/google", () => ({
  Playfair_Display: () => ({ variable: "--font-playfair", className: "playfair" }),
  Inter_Tight: () => ({ variable: "--font-inter-tight", className: "inter-tight" }),
  JetBrains_Mono: () => ({ variable: "--font-jb-mono", className: "jb-mono" }),
}));

// ── OfferCard ──────────────────────────────────────────────────────────────

describe("OfferCard", () => {
  const defaultProps = {
    referralCode: "KIAN63DB",
    referralLink: "https://www.ribbonrewards.io/?ref=KIAN63DB",
    onCtaClick: vi.fn(),
  };

  it("displays the referral code", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByText("KIAN63DB")).toBeInTheDocument();
  });

  it("renders a copy button", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("CTA link has the correct href", () => {
    render(<OfferCard {...defaultProps} />);
    const cta = screen.getByRole("link", { name: /claim my £25/i });
    expect(cta).toHaveAttribute("href", defaultProps.referralLink);
  });

  it("shows the £25 welcome bonus reward row", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByText("£25")).toBeInTheDocument();
    expect(screen.getByText("Welcome bonus")).toBeInTheDocument();
  });

  it("shows the 1% cashback reward row", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByText("1%")).toBeInTheDocument();
    expect(screen.getByText("Rent cashback, forever")).toBeInTheDocument();
  });
});

// ── EarningsLedger ────────────────────────────────────────────────────────

describe("EarningsLedger", () => {
  it("renders all four rent-tier rows", () => {
    render(<EarningsLedger />);
    expect(screen.getByText("£600")).toBeInTheDocument();
    expect(screen.getByText("£1,000")).toBeInTheDocument();
    expect(screen.getByText("£1,500")).toBeInTheDocument();
    expect(screen.getByText("£2,000")).toBeInTheDocument();
  });

  it("shows the UK avg pill on the £1,500 row", () => {
    render(<EarningsLedger />);
    expect(screen.getByText("UK avg")).toBeInTheDocument();
  });

  it("renders the four column headers", () => {
    render(<EarningsLedger />);
    expect(screen.getByText("Monthly rent")).toBeInTheDocument();
    expect(screen.getByText("1% cashback")).toBeInTheDocument();
    expect(screen.getByText("+ Welcome")).toBeInTheDocument();
    expect(screen.getByText("First-year value")).toBeInTheDocument();
  });

  it("shows first-year total values", () => {
    render(<EarningsLedger />);
    expect(screen.getByText("£97")).toBeInTheDocument();
    expect(screen.getByText("£145")).toBeInTheDocument();
    expect(screen.getByText("£205")).toBeInTheDocument();
    expect(screen.getByText("£265")).toBeInTheDocument();
  });
});

// ── OnboardingStages ──────────────────────────────────────────────────────

const MOCK_STAGES = [
  { title: "Stage 1 (25%) - Identity", details: "Name, email, date of birth, and phone number." },
  { title: "Stage 2 (50%) - Address", details: "UK residential address verification for banking." },
  { title: "Stage 3 (75%) - Compliance", details: "Employment, income, and source of funds checks." },
  { title: "Stage 4 (100%) - Rent details", details: "Enter rent amount and confirm referral code." },
];

describe("OnboardingStages", () => {
  it("renders all four stage titles (stripped of prefix)", () => {
    render(<OnboardingStages stages={MOCK_STAGES} />);
    expect(screen.getByText("Identity")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Compliance")).toBeInTheDocument();
    expect(screen.getByText("Rent details")).toBeInTheDocument();
  });

  it("renders all four progress percentages", () => {
    render(<OnboardingStages stages={MOCK_STAGES} />);
    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders stage numbers", () => {
    render(<OnboardingStages stages={MOCK_STAGES} />);
    expect(screen.getByText("Stage 1")).toBeInTheDocument();
    expect(screen.getByText("Stage 4")).toBeInTheDocument();
  });
});

// ── TrustStrip ────────────────────────────────────────────────────────────

describe("TrustStrip", () => {
  it("shows the Trustpilot score", () => {
    render(<TrustStrip trustpilotScore={4.7} />);
    expect(screen.getByText(/4\.7/)).toBeInTheDocument();
    expect(screen.getByText(/trustpilot/i)).toBeInTheDocument();
  });

  it("shows Griffin Bank FCA credential", () => {
    render(<TrustStrip trustpilotScore={4.7} />);
    expect(screen.getByText(/griffin bank ltd/i)).toBeInTheDocument();
    expect(screen.getByText(/fca regulated/i)).toBeInTheDocument();
  });

  it("shows FSCS protection amount", () => {
    render(<TrustStrip trustpilotScore={4.7} />);
    expect(screen.getByText(/£85,000/)).toBeInTheDocument();
    expect(screen.getByText(/fscs protected/i)).toBeInTheDocument();
  });
});
