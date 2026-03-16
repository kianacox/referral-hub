"use client";

import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { getVisibleBrands, CATEGORIES, CATEGORY_LABELS } from "@/lib/brands";
import type { BrandCategory } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { DISCOUNTS_INTRO } from "@/constants/copy";

type DiscountsPageContentProps = {
  initialFilters: BrandCategory[];
  categoryFromPath: BrandCategory | null;
};

export function DiscountsPageContent({
  initialFilters,
  categoryFromPath,
}: DiscountsPageContentProps) {
  const router = useRouter();

  const activeFilters = useMemo(() => {
    if (categoryFromPath) return [categoryFromPath];
    return initialFilters;
  }, [categoryFromPath, initialFilters]);

  const setFilters = useCallback(
    (filters: BrandCategory[]) => {
      if (filters.length === 0) {
        router.push("/discounts");
        return;
      }
      if (filters.length === 1) {
        router.push(`/discounts/${filters[0]}`);
        return;
      }
      router.push(`/discounts?filters=${filters.join(",")}`);
    },
    [router]
  );

  const toggleFilter = useCallback(
    (cat: BrandCategory) => {
      const next = activeFilters.includes(cat)
        ? activeFilters.filter((c) => c !== cat)
        : [...activeFilters, cat];
      setFilters(next);
    },
    [activeFilters, setFilters]
  );

  const clearAll = useCallback(() => {
    router.push("/discounts");
  }, [router]);

  const brands = useMemo(() => {
    const visible = getVisibleBrands();
    if (activeFilters.length === 0) return visible;
    return visible.filter((b) => activeFilters.includes(b.category));
  }, [activeFilters]);

  const sortedBrands = useMemo(
    () => [...brands].sort((a, b) => a.rewardRank - b.rewardRank),
    [brands]
  );

  return (
    <div className="mx-auto max-w-[600px] px-4 py-12 sm:py-20">
      <section className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Discounts
        </h1>
        <p className="mt-4 text-[var(--body-text)] leading-[1.6]">{DISCOUNTS_INTRO}</p>
      </section>

      <section className="mb-10 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => toggleFilter(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilters.includes(cat)
                ? "bg-gradient-to-r from-[var(--cta-from)] to-[var(--cta-to)] text-[var(--accent-foreground)]"
                : "border border-[#1F1F1F] bg-[#0A0A0A] text-[var(--foreground)] hover:bg-[#1F1F1F]"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
        {activeFilters.length > 1 && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--body-text)] hover:text-[var(--foreground)]"
          >
            Clear all
          </button>
        )}
      </section>

      <section className="grid gap-8">
        {sortedBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} showCategory />
        ))}
      </section>
    </div>
  );
}
