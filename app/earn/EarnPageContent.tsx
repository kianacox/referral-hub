"use client";

import { useMemo } from "react";
import { getEarnBrands } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { EARN_INTRO } from "@/constants/copy";

export function EarnPageContent() {
  const brands = useMemo(
    () => getEarnBrands().sort((a, b) => a.rewardRank - b.rewardRank),
    []
  );

  return (
    <div className="mx-auto max-w-[600px] px-4 py-12 sm:py-20">
      <section className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Earn
        </h1>
        <p className="mt-4 text-[var(--body-text)] leading-[1.6]">
          {EARN_INTRO}
        </p>
      </section>

      <section className="grid gap-8">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} showCategory />
        ))}
      </section>
    </div>
  );
}
