import type { Metadata } from "next";
import { getBrandBySlug } from "@/lib/brands";
import { BrandLandingRoute, brandLandingMetadata } from "@/components/landing/BrandLandingRoute";
import { StarlingLandingPage } from "@/components/landing/StarlingLandingPage";

// Financial brand: own route so its client code stays out of the shared [slug] chunk.
// 404s unless ENABLE_FINANCE_PAGES is "true" (the lookup applies the flag).
const brand = () => getBrandBySlug("finance", "starling-bank");

export function generateMetadata(): Metadata {
  return brandLandingMetadata(brand(), "/discounts/finance/starling-bank");
}

export default function StarlingPage() {
  return <BrandLandingRoute brand={brand()} Page={StarlingLandingPage} />;
}
