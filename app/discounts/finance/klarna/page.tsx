import type { Metadata } from "next";
import { getBrandBySlug } from "@/lib/brands";
import { BrandLandingRoute, brandLandingMetadata } from "@/components/landing/BrandLandingRoute";
import { KlarnaLandingPage } from "@/components/landing/KlarnaLandingPage";

// Financial brand: own route so its client code stays out of the shared [slug] chunk.
// 404s unless ENABLE_FINANCE_PAGES is "true" (the lookup applies the flag).
const brand = () => getBrandBySlug("finance", "klarna");

export function generateMetadata(): Metadata {
  return brandLandingMetadata(brand(), "/discounts/finance/klarna");
}

export default function KlarnaPage() {
  return <BrandLandingRoute brand={brand()} Page={KlarnaLandingPage} />;
}
