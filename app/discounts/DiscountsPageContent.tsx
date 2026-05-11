"use client";

import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { getDiscountBrands, CATEGORIES, CATEGORY_LABELS } from "@/lib/brands";
import type { BrandCategory } from "@/lib/brands";
import { BrandCard } from "@/components/ui/BrandCard";

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
    const visible = getDiscountBrands();
    if (activeFilters.length === 0) return visible;
    return visible.filter((b) => activeFilters.includes(b.category));
  }, [activeFilters]);

  const sortedBrands = useMemo(
    () => [...brands].sort((a, b) => a.rewardRank - b.rewardRank),
    [brands]
  );

  return (
    <>
      <section className="mb-10 flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeFilters.includes(cat)}
              onClick={() => toggleFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilters.includes(cat)
                  ? "bg-[#006A4D] text-white shadow-sm"
                  : "border border-[#006A4D] bg-[var(--card)] text-[#006A4D] hover:bg-green-50"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        {activeFilters.length > 1 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-medium text-[#006A4D] underline-offset-4 hover:text-[#00533C] hover:underline"
          >
            Clear all
          </button>
        )}
      </section>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {sortedBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} showCategory />
        ))}
      </section>
    </>
  );
}
