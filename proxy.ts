import { NextResponse, type NextRequest } from "next/server";
import { ALL_BRANDS, getBrandLandingHref } from "@/lib/brands";
import { isFinancePagesEnabled } from "@/lib/flags";

const financialBrands = ALL_BRANDS.filter((b) => b.financial);

/** Public images used only by financial-product pages, besides each brand's logo. */
const EXTRA_FINANCE_ASSETS = ["/starling_how_it_works.webp"];

const FINANCE_ASSETS = new Set([
  ...financialBrands.map((b) => b.logoPath),
  ...EXTRA_FINANCE_ASSETS,
]);

const FINANCE_PAGES = new Set(financialBrands.map(getBrandLandingHref));

/**
 * With finance pages off:
 * - their images 404, directly and through the image optimiser;
 * - their URLs render the site's not-found page without running the route, so
 *   the 404 response doesn't load that page's JS. (The pages also call
 *   notFound() themselves; this just keeps their code out of the response.)
 */
export function proxy(request: NextRequest) {
  if (isFinancePagesEnabled()) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  if (FINANCE_PAGES.has(path)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url), { status: 404 });
  }

  const asset = path === "/_next/image" ? searchParams.get("url") : path;
  if (asset && FINANCE_ASSETS.has(asset)) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/_next/image",
    "/:file([^/]+\\.(?:svg|png|webp|jpg))",
    "/earn/:slug",
    "/discounts/:category/:slug",
  ],
};
