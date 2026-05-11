import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CtaBlock } from "@/components/ui/CtaBlock";

vi.mock("@/lib/analytics", () => ({
  trackProviderCtaClick: vi.fn(),
}));

describe("CtaBlock", () => {
  it("marks the default primary referral link as the landing gradient variant", () => {
    render(
      <CtaBlock
        referralLink="https://example.com"
        label="Go"
        provider="acme"
      />
    );
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("data-primary-variant", "gradient");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("marks list-card primary referral links as the solid pill variant", () => {
    render(
      <CtaBlock
        referralLink="https://example.com"
        label="Go"
        provider="acme"
        primaryLinkVariant="listCard"
      />
    );
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("data-primary-variant", "listCard");
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
