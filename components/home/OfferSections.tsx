"use client";

import { useSearchParams } from "next/navigation";
import {
  toBrandCategory,
  type Brand,
  type BrandCategory,
  type HomeSection,
} from "@/lib/brands";
import { OfferCard } from "@/components/home/OfferCard";

export type SectionWithBrands = { section: HomeSection; brands: Brand[] };

type OfferSectionListProps = {
  sections: SectionWithBrands[];
  /** Only this category is shown; undefined shows every section. */
  active?: BrandCategory;
};

export function OfferSectionList({ sections, active }: OfferSectionListProps) {
  return sections
    .filter(({ section }) => !active || section.id === active)
    .map(({ section, brands }) => (
      <section
        key={section.id}
        id={section.id}
        className="mt-11 scroll-mt-[124px] sm:scroll-mt-[110px]"
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
    ));
}

/** Filters sections by `?category=`. Render inside <Suspense>. */
export function OfferSections({ sections }: { sections: SectionWithBrands[] }) {
  const category = toBrandCategory(useSearchParams().get("category"));
  // A hidden category (e.g. ?category=finance with the flag off) shows everything, not an empty page.
  const active = sections.some(({ section }) => section.id === category)
    ? category
    : undefined;
  return <OfferSectionList sections={sections} active={active} />;
}
