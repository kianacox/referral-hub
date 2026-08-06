"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackMoreOffersClick } from "@/lib/analytics";

/** Scroll distance (px) before the bar slides up, matching design 1c. */
const SCROLL_THRESHOLD = 400;

type MoreOffersBarProps = {
  brandSlug: string;
  /** Count of other visible offers — always passed in, never hardcoded here. */
  otherOfferCount: number;
};

/**
 * Sticky bottom bar on brand landing pages: once the reader is past the offer,
 * tells them how many other offers exist and links back to the hub.
 * Sits above any brand-owned mobile sticky CTA via --more-offers-bar-offset.
 */
export function MoreOffersBar({
  brandSlug,
  otherOfferCount,
}: MoreOffersBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > SCROLL_THRESHOLD);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (otherOfferCount < 1 || !visible) return null;

  const offerNoun = otherOfferCount === 1 ? "offer" : "offers";

  return (
    <div
      role="region"
      aria-label="More referral offers"
      className="more-offers-bar fixed left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--header-footer-bg)]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4">
        <span className="text-[12.5px] leading-snug text-[var(--body-text)] sm:text-[13.5px]">
          <span className="hidden sm:inline">
            Enjoying this offer? There are{" "}
          </span>
          <strong className="font-semibold text-[var(--foreground)]">
            {otherOfferCount} more {offerNoun}
          </strong>{" "}
          on the hub.
        </span>
        <Link
          href="/#top"
          onClick={() => trackMoreOffersClick(brandSlug, "sticky_bar")}
          className="inline-flex shrink-0 items-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-[13px] font-semibold text-white no-underline shadow-[0_4px_10px_-4px_rgba(0,106,77,0.5)] transition-colors hover:bg-[var(--cta-to)] sm:px-[18px] sm:py-[9px] sm:text-[13.5px]"
        >
          More ways to save →
        </Link>
      </div>
    </div>
  );
}
