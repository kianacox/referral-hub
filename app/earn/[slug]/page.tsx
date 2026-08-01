import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type React from "react";
import { getEarnBrandBySlug, getEarnSlugs } from "@/lib/brands";
import type { Brand } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import type { LandingPageContent } from "@/content/landing-pages";
import { buildFaqJsonLd } from "@/lib/seo";
import { LloydsLandingPage } from "@/components/landing/LloydsLandingPage";
import { RibbonRewardsLandingPage } from "@/components/landing/RibbonRewardsLandingPage";
import { VirginMediaLandingPage } from "@/components/landing/VirginMediaLandingPage";

type EarnPageComponent = React.ComponentType<{
  brand: Brand;
  content: LandingPageContent;
}>;

const EARN_PAGE_REGISTRY: Record<string, EarnPageComponent> = {
  "ribbon-rewards": RibbonRewardsLandingPage,
  "virgin-media": VirginMediaLandingPage,
  "lloyds-bank": LloydsLandingPage,
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getEarnSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getEarnBrandBySlug(slug);
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
    alternates: { canonical: `https://referral-hub.app/earn/${slug}` },
  };
}

export default async function EarnBrandLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getEarnBrandBySlug(slug);
  const content = slug ? LANDING_PAGE_CONTENT[slug] : undefined;

  if (!brand || !content) notFound();

  const PageComponent = EARN_PAGE_REGISTRY[slug];
  if (!PageComponent) notFound();

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
      <PageComponent brand={brand} content={content} />
    </>
  );
}
