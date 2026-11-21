import type { Metadata } from "next";
import { getEarnBrandBySlug } from "@/lib/brands";
import { BrandLandingRoute, brandLandingMetadata } from "@/components/landing/BrandLandingRoute";
import { LloydsLandingPage } from "@/components/landing/LloydsLandingPage";

// Financial brand: own route so its client code stays out of the shared [slug] chunk.
// 404s unless ENABLE_FINANCE_PAGES is "true" (the lookup applies the flag).
const brand = () => getEarnBrandBySlug("lloyds-bank");

export function generateMetadata(): Metadata {
  return brandLandingMetadata(brand(), "/earn/lloyds-bank");
}

export default function LloydsPage() {
  return <BrandLandingRoute brand={brand()} Page={LloydsLandingPage} />;
}
