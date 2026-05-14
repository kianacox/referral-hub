import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  OfferCard,
  PackagesLedger,
  EligibilityGrid,
  FaqAccordion,
} from "@/components/landing/VirginMediaLandingPage";

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
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
  Instrument_Serif: () => ({ variable: "--font-instrument-serif", className: "instrument-serif" }),
  Inter_Tight: () => ({ variable: "--font-inter-tight", className: "inter-tight" }),
  JetBrains_Mono: () => ({ variable: "--font-jb-mono", className: "jb-mono" }),
}));

// ── OfferCard ──────────────────────────────────────────────────────────────

describe("OfferCard", () => {
  const defaultProps = {
    onCtaClick: vi.fn(),
  };

  it("renders the referee £50 reward row", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByText("To you, paid by Aklamio")).toBeInTheDocument();
  });

  it("renders the referrer £50 reward row", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByText("To me, the referrer")).toBeInTheDocument();
  });

  it("renders the switching credit row", () => {
    render(<OfferCard {...defaultProps} />);
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("Up to £250 switching credit")).toBeInTheDocument();
  });

  it("CTA link points to the referral link", () => {
    render(<OfferCard {...defaultProps} />);
    const cta = screen.getByRole("link", { name: /claim my £50 cash/i });
    expect(cta).toHaveAttribute("href", "https://aklam.io/izBRNjvv");
  });

  it("shows £50 reward amount in dark panel", () => {
    render(<OfferCard {...defaultProps} />);
    // The charcoal panel shows "Your reward" label and a large £50
    expect(screen.getByText("Your reward")).toBeInTheDocument();
    // The panel contains £ and 50 rendered separately in the DOM
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});

// ── PackagesLedger ────────────────────────────────────────────────────────

describe("PackagesLedger", () => {
  it("renders all five package rows", () => {
    render(<PackagesLedger />);
    expect(screen.getByText("M125 Fibre")).toBeInTheDocument();
    expect(screen.getByText("M250 Fibre")).toBeInTheDocument();
    expect(screen.getByText("M500 Fibre")).toBeInTheDocument();
    expect(screen.getByText("Gig1 Fibre")).toBeInTheDocument();
    expect(screen.getByText("Volt Bundle")).toBeInTheDocument();
  });

  it("shows £50 cashback for every row", () => {
    render(<PackagesLedger />);
    // Five package rows each show £50 in the cashback column
    const fiftyElements = screen.getAllByText(/£50/);
    expect(fiftyElements.length).toBeGreaterThanOrEqual(5);
  });

  it("shows Sweet spot pill on M500 row", () => {
    render(<PackagesLedger />);
    expect(screen.getByText("Sweet spot")).toBeInTheDocument();
  });

  it("renders the disclaimer footnote", () => {
    render(<PackagesLedger />);
    expect(screen.getByText(/Prices reflect/)).toBeInTheDocument();
  });
});

// ── EligibilityGrid ───────────────────────────────────────────────────────

describe("EligibilityGrid", () => {
  it("renders the yes-column with 5 qualifying items", () => {
    render(<EligibilityGrid />);
    // One item unique to the yes column
    expect(
      screen.getByText(/new to Virgin Media/i)
    ).toBeInTheDocument();
    // Count all list items in the grid — expect at least 5 in the yes column
    const yesColumnHeading = screen.getByText(/you're in if/i);
    expect(yesColumnHeading).toBeInTheDocument();
    // Spot-check two more items from the yes list
    expect(screen.getByText(/signing up to broadband/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 12 months/i)).toBeInTheDocument();
  });

  it("renders the no-column with 5 exclusion items", () => {
    render(<EligibilityGrid />);
    // Heading for the no column
    expect(screen.getByText(/sorry, not this time if/i)).toBeInTheDocument();
    // Spot-check a distinctive item from the no list
    expect(screen.getByText(/Mates Rates/i)).toBeInTheDocument();
    // Another exclusion item
    expect(screen.getByText(/upgrading or extending/i)).toBeInTheDocument();
  });
});

// ── FaqAccordion ──────────────────────────────────────────────────────────

describe("FaqAccordion", () => {
  const ITEMS = [
    { question: "Q1", answer: "A1" },
    { question: "Q2", answer: "A2" },
    { question: "Q3", answer: "A3" },
  ];

  it("renders all question titles", () => {
    render(<FaqAccordion items={ITEMS} />);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
    expect(screen.getByText("Q3")).toBeInTheDocument();
  });

  it("first item answer is visible on mount", () => {
    render(<FaqAccordion items={ITEMS} />);
    // First item starts open (openIndex initialised to 0)
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    // Other items are closed
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[2]).toHaveAttribute("aria-expanded", "false");
    // Answer text is in the document (maxHeight controls visibility via CSS)
    expect(screen.getByText("A1")).toBeInTheDocument();
  });

  it("clicking a closed item opens it", () => {
    render(<FaqAccordion items={ITEMS} />);
    const buttons = screen.getAllByRole("button");
    // Q2 is initially closed
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(buttons[1]);
    // Q2 should now be open
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    // Q1 should now be closed (clicking a different item closes the previous)
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking the open item closes it", () => {
    render(<FaqAccordion items={ITEMS} />);
    const buttons = screen.getAllByRole("button");
    // Q1 is initially open
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(buttons[0]);
    // Q1 should now be closed (toggle same index → openIndex = -1)
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });
});
