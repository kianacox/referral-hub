"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  HeartPulse,
  House,
  LayoutGrid,
  PiggyBank,
  type LucideIcon,
} from "lucide-react";
import {
  HOME_SECTIONS,
  toBrandCategory,
  type BrandCategory,
} from "@/lib/brands";

const ICONS: Record<BrandCategory, LucideIcon> = {
  bills: House,
  health: HeartPulse,
  finance: PiggyBank,
};

const items = [
  { id: undefined, label: "All offers", short: "All", Icon: LayoutGrid, href: "/#top" },
  ...HOME_SECTIONS.map((s) => ({
    id: s.id,
    label: s.title,
    short: s.shortTitle,
    Icon: ICONS[s.id],
    // Filter via the query string, then land on the section's heading.
    href: `/?category=${s.id}#${s.id}`,
  })),
];

type CategoryNavProps = {
  /** Selected category; undefined means "All offers". */
  active?: BrandCategory;
};

/**
 * Homepage category filter: icon tabs on mobile so every option
 * fits without sideways scrolling, pill chips from `sm` up.
 */
export function CategoryNav({ active }: CategoryNavProps) {
  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-4 px-2 sm:hidden">
        {items.map(({ id, short, Icon, href }) => {
          const isActive = id === active;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "true" : undefined}
              className={`flex h-14 flex-col items-center justify-center gap-1 border-b-[3px] pt-[3px] text-[12.5px] no-underline transition-colors ${
                isActive
                  ? "border-[var(--accent)] font-semibold text-[var(--accent)]"
                  : "border-transparent font-medium text-[var(--body-text)]"
              }`}
            >
              <Icon aria-hidden size={22} strokeWidth={isActive ? 2 : 1.8} />
              {short}
            </Link>
          );
        })}
      </div>
      <div className="mx-auto hidden max-w-6xl gap-2 px-4 py-2 sm:flex">
        {items.map(({ id, label, href }) => {
          const isActive = id === active;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium no-underline transition-colors ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[#dcd7cb] bg-[var(--main-bg)] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-white hover:text-[var(--accent)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </>
  );
}

/** Reads the selected category from `?category=`. Render inside <Suspense>. */
export function CategoryNavFromUrl() {
  const active = toBrandCategory(useSearchParams().get("category"));
  return <CategoryNav active={active} />;
}
