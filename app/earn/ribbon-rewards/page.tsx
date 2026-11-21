import type { Metadata } from "next";
import { getEarnBrandBySlug } from "@/lib/brands";
import { BrandLandingRoute, brandLandingMetadata } from "@/components/landing/BrandLandingRoute";
import { RibbonRewardsLandingPage } from "@/components/landing/RibbonRewardsLandingPage";

// Financial brand: own route so its client code stays out of the shared [slug] chunk.
// 404s unless ENABLE_FINANCE_PAGES is "true" (the lookup applies the flag).
const brand = () => getEarnBrandBySlug("ribbon-rewards");

export function generateMetadata(): Metadata {
  return brandLandingMetadata(brand(), "/earn/ribbon-rewards");
}

export default function RibbonRewardsPage() {
  return <BrandLandingRoute brand={brand()} Page={RibbonRewardsLandingPage} />;
}
