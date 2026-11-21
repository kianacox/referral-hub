import type { Metadata } from "next";
import { getBrandBySlug } from "@/lib/brands";
import { BrandLandingRoute, brandLandingMetadata } from "@/components/landing/BrandLandingRoute";
import { AirtimeLandingPage } from "@/components/landing/AirtimeLandingPage";

// Financial brand: own route so its client code stays out of the shared [slug] chunk.
// 404s unless ENABLE_FINANCE_PAGES is "true" (the lookup applies the flag).
const brand = () => getBrandBySlug("bills", "airtime");

export function generateMetadata(): Metadata {
  return brandLandingMetadata(brand(), "/discounts/bills/airtime");
}

export default function AirtimePage() {
  return <BrandLandingRoute brand={brand()} Page={AirtimeLandingPage} />;
}
