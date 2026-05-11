import { describe, expect, it } from "vitest";
import { buildDiscountsCategoryMetadata } from "@/lib/discounts-category-metadata";

describe("buildDiscountsCategoryMetadata", () => {
  it("returns title, description, openGraph, and canonical for a category", () => {
    const meta = buildDiscountsCategoryMetadata("health");
    expect(meta.title).toBe("Health discounts");
    expect(meta.description).toBeTruthy();
    expect(meta.description).toContain("Health");
    expect(meta.openGraph?.title).toBe("Health discounts | Referral Hub");
    expect(meta.openGraph?.description).toBe(meta.description);
    expect(meta.alternates?.canonical).toBe(
      "https://referral-hub.app/discounts/health"
    );
  });

  it("uses distinct copy per category slug", () => {
    const bills = buildDiscountsCategoryMetadata("bills");
    const finance = buildDiscountsCategoryMetadata("finance");
    expect(bills.title).toBe("Bills discounts");
    expect(finance.title).toBe("Finance discounts");
    expect(bills.alternates?.canonical).toBe(
      "https://referral-hub.app/discounts/bills"
    );
  });
});
