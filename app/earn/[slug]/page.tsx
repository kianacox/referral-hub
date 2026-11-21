import type { Metadata } from "next";
import { getEarnBrandBySlug, getEarnSlugs } from "@/lib/brands";
import {
  BrandLandingRoute,
  brandLandingMetadata,
  type LandingPageComponent,
} from "@/components/landing/BrandLandingRoute";
import { VirginMediaLandingPage } from "@/components/landing/VirginMediaLandingPage";

/** Financial brands (e.g. Lloyds, Ribbon) have their own route folders; see the discounts route. */
const EARN_PAGE_REGISTRY: Record<string, LandingPageComponent> = {
  "virgin-media": VirginMediaLandingPage,
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getRouteBrand(slug: string) {
  const brand = getEarnBrandBySlug(slug);
  return brand?.financial ? undefined : brand;
}

export function generateStaticParams() {
  return getEarnSlugs().filter((slug) => getRouteBrand(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return brandLandingMetadata(getRouteBrand(slug), `/earn/${slug}`);
}

export default async function EarnBrandLandingPage({ params }: PageProps) {
  const { slug } = await params;
  return <BrandLandingRoute brand={getRouteBrand(slug)} Page={EARN_PAGE_REGISTRY[slug]} />;
}
