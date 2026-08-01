import type { Metadata } from "next";
import {
  getBrandsByCategory,
  getFeaturedBrand,
  HOME_SECTIONS,
} from "@/lib/brands";
import { FeaturedOfferHero } from "@/components/home/FeaturedOfferHero";
import { OfferCard } from "@/components/home/OfferCard";
import { HOMEPAGE_DISCLOSURE } from "@/constants/copy";

export const metadata: Metadata = {
  title: "Referral Hub | Personal referral links & discounts",
  description:
    "A collection of personal referral links for brands I use—discounts and offers that are often better than current promotions. Try something new without paying full price.",
  openGraph: {
    title: "Referral Hub | Personal referral links & discounts",
    description:
      "Personal referral links for brands I use, with discounts often better than current promotions.",
  },
  alternates: { canonical: "https://referral-hub.app" },
};

const HOW_IT_WORKS_STEPS = [
  {
    title: "Pick an offer",
    body: "Tap the link or copy the code — whatever the brand uses.",
  },
  {
    title: "Sign up as normal",
    body: "Same product, same checkout. The referral just tags your signup.",
  },
  {
    title: "Your reward lands",
    body: "Cash, credit or discount arrives automatically. Nothing extra to do.",
  },
];

export default function Home() {
  const featured = getFeaturedBrand();

  return (
    <div id="top" className="mx-auto w-full max-w-6xl px-4 pb-14 pt-7">
      <FeaturedOfferHero brand={featured} />

      <section
        id="how-it-works"
        aria-label="How referrals work"
        className="mt-5 flex scroll-mt-[110px] flex-wrap items-start gap-x-8 gap-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-5"
      >
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="flex min-w-[200px] flex-[1_1_220px] gap-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e7f2ec] text-[13px] font-semibold text-[var(--accent)]">
              {i + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {step.title}
              </span>
              <span className="text-[13px] leading-normal text-[var(--muted)]">
                {step.body}
              </span>
            </div>
          </div>
        ))}
      </section>

      {HOME_SECTIONS.map((section) => {
        const brands = getBrandsByCategory(section.id);
        if (brands.length === 0) return null;
        return (
          <section
            key={section.id}
            id={section.id}
            className="mt-11 scroll-mt-[110px]"
          >
            <div className="mb-1.5 flex items-baseline gap-3">
              <h2 className="font-[family-name:var(--font-serif)] text-[26px] font-medium tracking-[-0.01em] text-[var(--foreground)]">
                {section.title}
              </h2>
              <span className="text-[13px] text-[var(--muted)]">
                {brands.length} {brands.length === 1 ? "offer" : "offers"}
              </span>
            </div>
            <p className="mb-[18px] max-w-[560px] text-sm text-[var(--muted)]">
              {section.blurb}
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] gap-4">
              {brands.map((brand) => (
                <OfferCard key={brand.id} brand={brand} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="mx-auto mt-10 max-w-[640px] text-center text-[13px] leading-relaxed text-[var(--muted)]">
        {HOMEPAGE_DISCLOSURE}
      </p>
    </div>
  );
}
