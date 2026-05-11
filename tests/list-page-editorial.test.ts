import { describe, expect, it } from "vitest";
import {
  discountsCategoryEditorial,
  discountsCategorySupportingText,
  discountsIndexEditorial,
  earnEditorial,
  homeEditorial,
} from "@/lib/list-page-editorial";

describe("list-page-editorial", () => {
  it("homeEditorial returns stable eyebrow and headline", () => {
    expect(homeEditorial()).toEqual({
      eyebrow: "Personal referrals",
      headline: "Referral Hub",
    });
  });

  it("earnEditorial returns stable eyebrow and headline", () => {
    expect(earnEditorial()).toEqual({
      eyebrow: "Cashback & rewards",
      headline: "Earn",
    });
  });

  it("discountsIndexEditorial returns stable eyebrow and headline", () => {
    expect(discountsIndexEditorial()).toEqual({
      eyebrow: "Discounts & offers",
      headline: "Discounts",
    });
  });

  it("discountsCategoryEditorial uses category label in headline", () => {
    expect(discountsCategoryEditorial("health")).toEqual({
      eyebrow: "Discounts & offers",
      headline: "Health discounts",
    });
    expect(discountsCategoryEditorial("finance")).toEqual({
      eyebrow: "Discounts & offers",
      headline: "Finance discounts",
    });
  });

  it("discountsCategorySupportingText mentions the category", () => {
    expect(discountsCategorySupportingText("bills")).toContain("Bills");
  });
});
