import type { Metadata } from "next";
import { getVisibleBrands } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { EditorialListHeader } from "@/components/list/EditorialListHeader";
import { ListPageFrame } from "@/components/list/ListPageFrame";
import { homeEditorial } from "@/lib/list-page-editorial";
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
    <ListPageFrame>
      <EditorialListHeader
        {...homeEditorial()}
        supporting={HOMEPAGE_INTRO}
      />
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </section>
    </ListPageFrame>
  );
}
