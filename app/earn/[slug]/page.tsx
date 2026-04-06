import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEarnBrandBySlug, getEarnSlugs } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import {
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { RibbonRewardsLandingPage } from "@/components/landing/RibbonRewardsLandingPage";
import { VirginMediaLandingPage } from "@/components/landing/VirginMediaLandingPage";

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

  if (slug === "ribbon-rewards") {
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
    const organizationJsonLd = buildOrganizationJsonLd();
    const serviceJsonLd = buildServiceJsonLd();
    const faqJsonLd = content.faq?.length ? buildFaqJsonLd(content.faq) : null;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <RibbonRewardsLandingPage brand={brand} content={content} />
      </>
    );
  }

  if (slug === "virgin-media") {
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
    const organizationJsonLd = buildOrganizationJsonLd();
    const serviceJsonLd = buildServiceJsonLd();
    const faqJsonLd = content.faq?.length ? buildFaqJsonLd(content.faq) : null;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <VirginMediaLandingPage content={content} />
      </>
    );
  }

  notFound();
}
