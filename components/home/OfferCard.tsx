"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { getBrandLandingHref, type Brand } from "@/lib/brands";
import { COPIED, COPY_CODE } from "@/constants/copy";
import {
  trackBrandTrustpilotClick,
  trackProviderCodeCopy,
  trackProviderCtaClick,
} from "@/lib/analytics";

type OfferCardProps = {
  brand: Brand;
};

function Stars({ score }: { score: number }) {
  const pct = `${((score / 5) * 100).toFixed(0)}%`;
  return (
    <span className="flex items-center gap-1.5">
      <span
        aria-hidden
        className="relative inline-block text-xs leading-none tracking-[1px] text-[#ddd8cd]"
      >
        ★★★★★
        <span
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-[#00a06a]"
          style={{ width: pct }}
        >
          ★★★★★
        </span>
      </span>
      <span className="text-[11px] text-[var(--muted)]">
        {score.toFixed(1)} on Trustpilot
      </span>
    </span>
  );
}

export function OfferCard({ brand }: OfferCardProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const ctaHref = brand.referralLink?.trim() || brand.brandUrl;
  const showCta = Boolean(brand.primaryCtaLabel && ctaHref);

  const handleCopy = useCallback(async () => {
    if (!brand.referralCode) return;
    try {
      await navigator.clipboard.writeText(brand.referralCode);
      trackProviderCodeCopy(brand.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; ignore
    }
  }, [brand.referralCode, brand.slug]);

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-[18px] shadow-sm shadow-black/[0.05] transition-shadow duration-200 ease-out hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.14)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#f1ede4] bg-white">
          <Image
            src={brand.logoPath}
            alt={`${brand.name} logo`}
            width={36}
            height={36}
            className="max-h-9 max-w-9 object-contain"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-semibold text-[var(--foreground)]">
            {brand.name}
          </span>
          {brand.trustpilot && <Stars score={brand.trustpilot.score} />}
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-[#e7f2ec] px-[11px] py-[5px] text-xs font-semibold text-[#00533C]">
          {brand.refereeReward}
        </span>
      </div>
      <p className="text-[14.5px] font-medium leading-normal text-[var(--foreground)] [text-wrap:pretty]">
        {brand.offerSummary}
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        {showCta && (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProviderCtaClick(brand.slug)}
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-[18px] py-2.5 text-[13.5px] font-semibold text-white no-underline shadow-[0_4px_10px_-4px_rgba(0,106,77,0.5)] transition-colors hover:bg-[#00533C]"
          >
            {brand.primaryCtaLabel}
          </a>
        )}
        {brand.referralCode && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-[#b9c9c0] bg-[#f6faf8] px-3.5 py-[9px] transition-colors hover:border-[var(--accent)]"
          >
            <code className="font-mono text-[12.5px] font-medium text-[var(--foreground)]">
              {brand.referralCode}
            </code>
            <span className="text-xs font-semibold text-[var(--accent)]">
              {copied ? COPIED : COPY_CODE}
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="ml-auto flex cursor-pointer items-center gap-1 border-none bg-transparent px-1 py-2 text-[13px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          {open ? "Hide details ▴" : "Details ▾"}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-2.5 border-t border-[#f1ede4] pt-3">
          <p className="text-[13.5px] leading-relaxed text-[var(--body-text)]">
            {brand.overview}
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href={getBrandLandingHref(brand)}
              className="text-[13px] font-medium text-[var(--accent)] underline underline-offset-[3px]"
            >
              Learn more about this offer
            </Link>
            {brand.trustpilot && (
              <a
                href={brand.trustpilot.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBrandTrustpilotClick(brand.slug)}
                className="text-[13px] text-[var(--muted)] underline underline-offset-[3px] transition-colors hover:text-[var(--accent)]"
              >
                Read Trustpilot reviews ↗
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
