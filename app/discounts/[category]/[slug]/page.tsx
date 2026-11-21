import type { Metadata } from "next";
import { getBrandBySlug, getDiscountSlugs } from "@/lib/brands";
import type { BrandCategory } from "@/lib/brands";
import {
  BrandLandingRoute,
  brandLandingMetadata,
  type LandingPageComponent,
} from "@/components/landing/BrandLandingRoute";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { ExhaleLandingPage } from "@/components/landing/ExhaleLandingPage";
import { RunnaLandingPage } from "@/components/landing/RunnaLandingPage";

/**
 * Brands with a bespoke page; everything else falls back to LandingPageTemplate.
 * Financial brands (`financial: true`) have their own route folders instead, so
 * their client code is never bundled into this route's shared chunk.
 */
const DISCOUNT_PAGE_REGISTRY: Record<string, LandingPageComponent> = {
  "exhale-coffee": ExhaleLandingPage,
  runna: RunnaLandingPage,
};

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

function getRouteBrand(category: string, slug: string) {
  const brand = getBrandBySlug(category as BrandCategory, slug);
  return brand?.financial ? undefined : brand;
}

export function generateStaticParams() {
  return getDiscountSlugs().filter(({ category, slug }) => getRouteBrand(category, slug));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  return brandLandingMetadata(getRouteBrand(category, slug), `/discounts/${category}/${slug}`);
}

export default async function BrandLandingPage({ params }: PageProps) {
  const { category, slug } = await params;
  return (
    <BrandLandingRoute
      brand={getRouteBrand(category, slug)}
      Page={DISCOUNT_PAGE_REGISTRY[slug] ?? LandingPageTemplate}
    />
  );
}
