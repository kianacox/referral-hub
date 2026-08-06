import { describe, expect, it } from "vitest";
import {
  countOtherOffers,
  getBrandByPathname,
  getVisibleBrands,
} from "@/lib/brands";

describe("getBrandByPathname", () => {
  it("resolves an earn landing page", () => {
    expect(getBrandByPathname("/earn/ribbon-rewards")?.slug).toBe(
      "ribbon-rewards",
    );
  });

  it("resolves a discounts landing page", () => {
    expect(getBrandByPathname("/discounts/health/exhale-coffee")?.slug).toBe(
      "exhale-coffee",
    );
  });

  it("returns undefined for the homepage", () => {
    expect(getBrandByPathname("/")).toBeUndefined();
  });

  it("returns undefined when the slug is unknown", () => {
    expect(getBrandByPathname("/earn/not-a-brand")).toBeUndefined();
  });

  it("returns undefined when the category does not match the brand", () => {
    expect(getBrandByPathname("/discounts/finance/exhale-coffee")).toBeUndefined();
  });

  it("ignores a trailing slash", () => {
    expect(getBrandByPathname("/earn/ribbon-rewards/")?.slug).toBe(
      "ribbon-rewards",
    );
  });
});

describe("countOtherOffers", () => {
  it("counts every visible offer except the one being viewed", () => {
    expect(countOtherOffers("ribbon-rewards")).toBe(
      getVisibleBrands().length - 1,
    );
  });

  it("counts every visible offer when no slug is excluded", () => {
    expect(countOtherOffers()).toBe(getVisibleBrands().length);
  });

  it("does not subtract for a slug that is not visible", () => {
    expect(countOtherOffers("not-a-brand")).toBe(getVisibleBrands().length);
  });
});
