"use client";

import { useMemo } from "react";
import { getEarnBrands } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";

export function EarnPageContent() {
  const brands = useMemo(
    () => getEarnBrands().sort((a, b) => a.rewardRank - b.rewardRank),
    []
  );

  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} showCategory />
      ))}
    </section>
  );
}
