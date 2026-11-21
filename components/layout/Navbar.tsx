"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { findLandingPage, type SiteChrome } from "@/lib/landing-path";
import { trackMoreOffersClick } from "@/lib/analytics";
import { SITE_TAGLINE } from "@/constants/copy";
import { MoreOffersBar } from "@/components/layout/MoreOffersBar";
import {
  CategoryNav,
  CategoryNavFromUrl,
} from "@/components/layout/CategoryNav";

const headerClass =
  "sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-footer-bg)]";
const navClass = "mx-auto flex h-[52px] max-w-6xl items-center justify-between px-4";

function Wordmark() {
  return (
    <Link href="/#top" className="flex items-center gap-2.5 no-underline">
      <Image
        src="/referral-hub-logo.png"
        alt=""
        width={28}
        height={28}
        priority
        className="h-7 w-7"
      />
      <span className="text-[15px] font-semibold text-[var(--foreground)]">
        Referral Hub
      </span>
    </Link>
  );
}

export function Navbar({ landingPages, sections }: SiteChrome) {
  const pathname = usePathname();
  const landingBrand = findLandingPage(landingPages, pathname);

  // Brand landing pages get the quiet single-row nav plus a sticky offers bar
  // (design 1c) — nothing competes with the offer above the fold.
  if (landingBrand) {
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
        <MoreOffersBar
          brandSlug={landingBrand.slug}
          otherOfferCount={landingPages.length - 1}
        />
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
        {/* useSearchParams needs a Suspense boundary; the fallback keeps the
            nav in the static HTML with "All offers" selected. */}
        <Suspense fallback={<CategoryNav sections={sections} />}>
          <CategoryNavFromUrl sections={sections} />
        </Suspense>
      </div>
    </header>
  );
}
