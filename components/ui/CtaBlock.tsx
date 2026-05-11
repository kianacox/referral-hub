"use client";

import Link from "next/link";
import { CopyableCode } from "./CopyableCode";
import { trackProviderCtaClick } from "@/lib/analytics";

type PrimaryReferralLinkVariant = "gradient" | "listCard";

type CtaBlockProps = {
  referralLink?: string;
  referralCode?: string;
  label: string;
  brandUrl?: string;
  brandUrlLabel?: string;
  /** Provider slug for GA events (e.g. runna, airtime) */
  provider?: string;
  /** List cards use solid green pill; landing pages keep gradient. */
  primaryLinkVariant?: PrimaryReferralLinkVariant;
};

export function CtaBlock({
  referralLink,
  referralCode,
  label,
  brandUrl,
  brandUrlLabel = "Go to site",
  provider,
  primaryLinkVariant = "gradient",
}: CtaBlockProps) {
  const handleCtaClick = () => {
    if (provider) trackProviderCtaClick(provider);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {referralLink ? (
        <Link
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          data-primary-variant={primaryLinkVariant}
          onClick={handleCtaClick}
          className={
            primaryLinkVariant === "listCard"
              ? "inline-flex items-center justify-center rounded-full bg-[#006A4D] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#006A4D]/25 transition-[background-color,box-shadow] hover:bg-[#00533C] hover:shadow-lg hover:shadow-[#00533C]/25"
              : "inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[var(--cta-from)] to-[var(--cta-to)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-lg shadow-indigo-500/20 transition-shadow hover:shadow-indigo-500/30 hover:shadow-xl"
          }
        >
          {label}
        </Link>
      ) : referralCode ? (
        <CopyableCode code={referralCode} provider={provider} />
      ) : null}
      {brandUrl && (
        <Link
          href={brandUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]"
        >
          {brandUrlLabel}
        </Link>
      )}
    </div>
  );
}
