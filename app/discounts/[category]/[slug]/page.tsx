import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type React from "react";
import { getBrandBySlug, getDiscountSlugs } from "@/lib/brands";
import type { Brand, BrandCategory } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import type { LandingPageContent } from "@/content/landing-pages";
import { buildFaqJsonLd } from "@/lib/seo";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { ExhaleLandingPage } from "@/components/landing/ExhaleLandingPage";
import { AirtimeLandingPage } from "@/components/landing/AirtimeLandingPage";

type DiscountPageComponent = React.ComponentType<{
  brand: Brand;
  content: LandingPageContent;
}>;

/** Brands with a bespoke page; everything else falls back to LandingPageTemplate. */
const DISCOUNT_PAGE_REGISTRY: Record<string, DiscountPageComponent> = {
  "exhale-coffee": ExhaleLandingPage,
  airtime: AirtimeLandingPage,
};

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getDiscountSlugs().map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const brand = getBrandBySlug(category as BrandCategory, slug);
  const content = slug ? LANDING_PAGE_CONTENT[slug] : undefined;
  if (!brand || !content) return { title: "Not found" };

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: content.keywords,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
    },
    alternates: { canonical: `https://referral-hub.app/discounts/${category}/${slug}` },
  };
}

export default async function BrandLandingPage({ params }: PageProps) {
  const { category, slug } = await params;
  const brand = getBrandBySlug(category as BrandCategory, slug);
  const content = slug ? LANDING_PAGE_CONTENT[slug] : undefined;

  if (!brand || !content) notFound();

  const PageContent = DISCOUNT_PAGE_REGISTRY[slug] ?? LandingPageTemplate;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brand.name,
    description: content.seoDescription,
    offers: {
      "@type": "Offer",
      description: brand.offerSummary,
    },
  };

  const faqJsonLd = content.faq?.length ? buildFaqJsonLd(content.faq) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <PageContent brand={brand} content={content} />
    </>
  );
}
