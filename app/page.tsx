import type { Metadata } from "next";
import { getVisibleBrands } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { HOMEPAGE_INTRO } from "@/constants/copy";

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

export default function Home() {
  const brands = getVisibleBrands().sort((a, b) => a.rewardRank - b.rewardRank);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <section className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Referral Hub
        </h1>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">{HOMEPAGE_INTRO}</p>
      </section>
      <section className="grid gap-6 sm:gap-8">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </section>
    </div>
  );
}
