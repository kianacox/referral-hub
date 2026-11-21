import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getBrandsByCategory,
  getFeaturedBrand,
  getVisibleHomeSections,
} from "@/lib/brands";
import { FeaturedOfferHero } from "@/components/home/FeaturedOfferHero";
import {
  OfferSectionList,
  OfferSections,
} from "@/components/home/OfferSections";
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
  const sections = getVisibleHomeSections().map((section) => ({
    section,
    brands: getBrandsByCategory(section.id),
  }));

  return (
    <div id="top" className="mx-auto w-full max-w-6xl px-4 pb-14 pt-7">
      {featured && <FeaturedOfferHero brand={featured} />}

      <section
        id="how-it-works"
        aria-label="How referrals work"
        className={`${featured ? "mt-5" : ""} flex scroll-mt-[110px] flex-wrap items-start gap-x-8 gap-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-5`}
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

      {/* useSearchParams needs a Suspense boundary; the fallback renders
          every section so all offers stay in the static HTML. */}
      <Suspense fallback={<OfferSectionList sections={sections} />}>
        <OfferSections sections={sections} />
      </Suspense>

      <p className="mx-auto mt-10 max-w-[640px] text-center text-[13px] leading-relaxed text-[var(--muted)]">
        {HOMEPAGE_DISCLOSURE}
      </p>
    </div>
  );
}
