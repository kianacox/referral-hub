import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import {
  ALL_BRANDS,
  getBrandBySlug,
  getDiscountSlugs,
  getEarnBrandBySlug,
  getEarnSlugs,
  getFeaturedBrand,
  getVisibleBrands,
  getVisibleHomeSections,
} from "@/lib/brands";
import { isFinancePagesEnabled } from "@/lib/flags";
import { getSiteChrome } from "@/lib/landing-chrome";
import sitemap from "@/app/sitemap";
import LloydsPage from "@/app/earn/lloyds-bank/page";
import RibbonPage from "@/app/earn/ribbon-rewards/page";
import KlarnaPage from "@/app/discounts/finance/klarna/page";
import StarlingPage from "@/app/discounts/finance/starling-bank/page";
import AirtimePage from "@/app/discounts/bills/airtime/page";
import EarnPage from "@/app/earn/[slug]/page";
import DiscountPage from "@/app/discounts/[category]/[slug]/page";
import { proxy } from "@/proxy";

vi.mock("next/font/local", () => ({
  default: () => ({ className: "", variable: "" }),
}));

const HIDDEN = ["ribbon-rewards", "lloyds-bank", "klarna", "starling-bank", "airtime"];
const HIDDEN_URLS = [
  "/earn/ribbon-rewards",
  "/earn/lloyds-bank",
  "/discounts/finance/klarna",
  "/discounts/finance/starling-bank",
  "/discounts/bills/airtime",
];

/** Pages return a <BrandLandingRoute> element; call it to run its notFound() check. */
const run = (el: React.ReactElement) =>
  (el.type as (props: unknown) => unknown)(el.props);
const notFound = { digest: expect.stringContaining("404") };

const slugs = () => getVisibleBrands().map((b) => b.slug);
const status = (url: string) =>
  proxy(new NextRequest(`https://referral-hub.app${url}`)).status;

afterEach(() => vi.unstubAllEnvs());

describe("isFinancePagesEnabled", () => {
  it.each([[undefined], [""], ["false"], ["1"], ["TRUE"], ["yes"]])(
    "is off for %s",
    (value) => {
      vi.stubEnv("ENABLE_FINANCE_PAGES", value);
      expect(isFinancePagesEnabled()).toBe(false);
    },
  );

  it('is on only for exactly "true"', () => {
    vi.stubEnv("ENABLE_FINANCE_PAGES", "true");
    expect(isFinancePagesEnabled()).toBe(true);
  });
});

describe("with ENABLE_FINANCE_PAGES off", () => {
  beforeEach(() => vi.stubEnv("ENABLE_FINANCE_PAGES", undefined));

  it("hides every financial brand, and only those", () => {
    for (const slug of HIDDEN) expect(slugs()).not.toContain(slug);
    expect(slugs()).toEqual(
      expect.arrayContaining(["virgin-media", "exhale-coffee", "myprotein", "runna"]),
    );
  });

  it("resolves no hidden brand by slug", () => {
    expect(getEarnBrandBySlug("lloyds-bank")).toBeUndefined();
    expect(getBrandBySlug("finance", "starling-bank")).toBeUndefined();
    expect(getBrandBySlug("finance", "klarna")).toBeUndefined();
    expect(getBrandBySlug("bills", "airtime")).toBeUndefined();
  });

  it("excludes hidden pages from static generation", () => {
    expect(getEarnSlugs()).not.toContain("lloyds-bank");
    const discountSlugs = getDiscountSlugs().map((d) => d.slug);
    for (const slug of HIDDEN) expect(discountSlugs).not.toContain(slug);
  });

  it("drops the featured Lloyds hero and the finance section", () => {
    expect(getFeaturedBrand()).toBeUndefined();
    expect(getVisibleHomeSections().map((s) => s.id)).toEqual(["bills", "health"]);
  });

  it("keeps hidden pages out of the nav and footer data", () => {
    const { landingPages, sections } = getSiteChrome();
    const hrefs = landingPages.map((p) => p.href);
    for (const url of HIDDEN_URLS) expect(hrefs).not.toContain(url);
    expect(sections.map((s) => s.id)).not.toContain("finance");
  });

  it("keeps hidden pages out of the sitemap", () => {
    const urls = sitemap().map((e) => e.url).join("\n");
    for (const url of HIDDEN_URLS) expect(urls).not.toContain(url);
  });

  it("404s every hidden page", () => {
    for (const Page of [RibbonPage, LloydsPage, KlarnaPage, StarlingPage, AirtimePage]) {
      expect(() => run(Page())).toThrow(expect.objectContaining(notFound));
    }
  });

  it("404s financial-brand images, direct and via the image optimiser", () => {
    expect(status("/starling_logo.svg")).toBe(404);
    expect(status("/starling_how_it_works.webp")).toBe(404);
    expect(status("/lloyds_logo.svg")).toBe(404);
    expect(status("/klarna_logo.svg")).toBe(404);
    expect(status("/airtime_logo.png")).toBe(404);
    expect(status("/_next/image?url=%2Fklarna_logo.svg&w=64&q=75")).toBe(404);
    expect(status("/ribbon_rewards_logo.webp")).toBe(404);
    expect(status("/ribbon_proof_of_use.jpg")).toBe(404);
    expect(status("/exhale_logo.png")).toBe(200);
  });

  it("sends hidden page URLs to the not-found page", () => {
    for (const url of HIDDEN_URLS) {
      const res = proxy(new NextRequest(`https://referral-hub.app${url}`));
      expect(res.status).toBe(404);
      expect(res.headers.get("x-middleware-rewrite")).toContain("/__not-found");
    }
    expect(status("/earn/virgin-media")).toBe(200);
  });
});

describe("with ENABLE_FINANCE_PAGES=true", () => {
  beforeEach(() => vi.stubEnv("ENABLE_FINANCE_PAGES", "true"));

  it("renders every hidden page again", () => {
    for (const Page of [RibbonPage, LloydsPage, KlarnaPage, StarlingPage, AirtimePage]) {
      expect(() => run(Page())).not.toThrow();
    }
  });

  it("shows every financial brand again", () => {
    for (const slug of HIDDEN) expect(slugs()).toContain(slug);
    expect(getFeaturedBrand()?.slug).toBe("lloyds-bank");
    expect(getVisibleHomeSections().map((s) => s.id)).toContain("finance");
  });

  it("serves financial-brand images", () => {
    expect(status("/starling_logo.svg")).toBe(200);
  });
});

describe("financial brand routes", () => {
  it("has a dedicated route for every financial brand, and the [slug] routes refuse them", async () => {
    vi.stubEnv("ENABLE_FINANCE_PAGES", "true");
    for (const b of ALL_BRANDS.filter((b) => b.financial)) {
      const dir = b.section === "earn" ? `earn/${b.slug}` : `discounts/${b.category}/${b.slug}`;
      expect(fs.existsSync(path.join("app", dir, "page.tsx"))).toBe(true);
      const page = await (b.section === "earn"
        ? EarnPage({ params: Promise.resolve({ slug: b.slug }) })
        : DiscountPage({ params: Promise.resolve({ category: b.category, slug: b.slug }) }));
      expect(() => run(page)).toThrow(expect.objectContaining(notFound));
    }
  });

  // Next doesn't fall back from a static folder (app/discounts/bills/) to [category],
  // so a non-financial discount in such a category would silently 404.
  it("keeps non-financial discounts out of categories that have a static folder", () => {
    for (const b of ALL_BRANDS.filter((b) => b.section === "discounts" && !b.financial)) {
      expect(fs.existsSync(path.join("app", "discounts", b.category))).toBe(false);
    }
  });
});
