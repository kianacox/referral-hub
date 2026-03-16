import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBrandBySlug, getAllSlugs } from "@/lib/brands";
import type { BrandCategory } from "@/lib/brands";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";
import { buildFaqJsonLd } from "@/lib/seo";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { ExhaleLandingPage } from "@/components/landing/ExhaleLandingPage";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map(({ category, slug }) => ({ category, slug }));
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

  const isExhale = slug === "exhale-coffee";
  const PageContent = isExhale ? ExhaleLandingPage : LandingPageTemplate;

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
