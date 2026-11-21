import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type React from "react";
import type { Brand } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import type { LandingPageContent } from "@/content/landing-pages";
import { buildFaqJsonLd } from "@/lib/seo";
import { IndependenceDisclaimer } from "@/components/ui/IndependenceDisclaimer";

export type LandingPageComponent = React.ComponentType<{
  brand: Brand;
  content: LandingPageContent;
}>;

/** Shared by the dynamic landing routes and the dedicated financial-brand routes. */
export function brandLandingMetadata(brand: Brand | undefined, path: string): Metadata {
  const content = brand ? LANDING_PAGE_CONTENT[brand.slug] : undefined;
  if (!brand || !content) return { title: "Not found" };

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: content.keywords,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
    },
    alternates: { canonical: `https://referral-hub.app${path}` },
  };
}

/** Renders a brand landing page with its JSON-LD, or 404s if the brand is unknown or hidden. */
export function BrandLandingRoute({
  brand,
  Page,
}: {
  brand: Brand | undefined;
  Page: LandingPageComponent | undefined;
}) {
  const content = brand ? LANDING_PAGE_CONTENT[brand.slug] : undefined;
  if (!brand || !content || !Page) notFound();

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
      {brand.category === "finance" && brand.signUpPlace && (
        <IndependenceDisclaimer brandName={brand.name} signUpPlace={brand.signUpPlace} />
      )}
      <Page brand={brand} content={content} />
    </>
  );
}
