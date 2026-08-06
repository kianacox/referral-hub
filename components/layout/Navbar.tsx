"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  countOtherOffers,
  getBrandByPathname,
  HOME_SECTIONS,
} from "@/lib/brands";
import { trackMoreOffersClick } from "@/lib/analytics";
import { SITE_TAGLINE } from "@/constants/copy";
import { MoreOffersBar } from "@/components/layout/MoreOffersBar";

const chips = [
  { label: "All offers", href: "/#top" },
  ...HOME_SECTIONS.map((s) => ({ label: s.title, href: `/#${s.id}` })),
];

const headerClass =
  "sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-footer-bg)]";
const navClass = "mx-auto flex h-[52px] max-w-6xl items-center justify-between px-4";

function Wordmark() {
  return (
    <Link href="/#top" className="flex items-center gap-2.5 no-underline">
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] font-[family-name:var(--font-serif)] text-base text-white"
      >
        R
      </span>
      <span className="text-[15px] font-semibold text-[var(--foreground)]">
        Referral Hub
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const landingBrand = getBrandByPathname(pathname);

  // Brand landing pages get the quiet single-row nav plus a sticky offers bar
  // (design 1c) — nothing competes with the offer above the fold.
  if (landingBrand) {
    const offersBar = (
      <MoreOffersBar
        brandSlug={landingBrand.slug}
        otherOfferCount={countOtherOffers(landingBrand.slug)}
      />
    );

    // Standalone pages ship their own sticky header — a second one would collide,
    // so they get the cross-sell bar only.
    if (landingBrand.standaloneLayout) return offersBar;

    return (
      <>
        <header className={headerClass}>
          <nav className={navClass}>
            <Wordmark />
            <Link
              href="/#top"
              onClick={() => trackMoreOffersClick(landingBrand.slug, "nav")}
              className="text-[13px] font-medium text-[var(--muted)] no-underline transition-colors hover:text-[var(--accent)]"
            >
              All offers →
            </Link>
          </nav>
        </header>
        {offersBar}
      </>
    );
  }

  return (
    <header className={headerClass}>
      <nav className={navClass}>
        <Wordmark />
        <span className="hidden text-xs text-[var(--muted)] sm:inline">
          {SITE_TAGLINE}
        </span>
      </nav>
      <div className="border-t border-[#f1ede4] bg-[var(--header-footer-bg)]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          {chips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className="shrink-0 whitespace-nowrap rounded-full border border-[#dcd7cb] bg-[var(--main-bg)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--foreground)] no-underline transition-colors hover:border-[var(--accent)] hover:bg-white hover:text-[var(--accent)]"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
