import { describe, expect, it } from "vitest";
import { getVisibleBrands } from "@/lib/brands";
import { getSiteChrome } from "@/lib/landing-chrome";
import { findLandingPage } from "@/lib/landing-path";

const { landingPages } = getSiteChrome();
const find = (pathname: string) => findLandingPage(landingPages, pathname);

describe("findLandingPage", () => {
  it("resolves an earn landing page", () => {
    expect(find("/earn/ribbon-rewards")?.slug).toBe("ribbon-rewards");
  });

  it("resolves a discounts landing page", () => {
    expect(find("/discounts/health/exhale-coffee")?.slug).toBe("exhale-coffee");
  });

  it("returns undefined for the homepage", () => {
    expect(find("/")).toBeUndefined();
  });

  it("returns undefined when the slug is unknown", () => {
    expect(find("/earn/not-a-brand")).toBeUndefined();
  });

  it("returns undefined when the category does not match the brand", () => {
    expect(find("/discounts/finance/exhale-coffee")).toBeUndefined();
  });

  it("ignores a trailing slash", () => {
    expect(find("/earn/ribbon-rewards/")?.slug).toBe("ribbon-rewards");
  });
});

describe("getSiteChrome", () => {
  it("lists one landing page per visible brand", () => {
    expect(landingPages.map((p) => p.slug)).toEqual(getVisibleBrands().map((b) => b.slug));
  });

  it("carries the footer disclaimer for discounts pages only", () => {
    expect(find("/earn/ribbon-rewards")?.disclaimer).toBeNull();
  });
});
