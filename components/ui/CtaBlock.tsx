"use client";

import Link from "next/link";
import { CopyableCode } from "./CopyableCode";
import { trackProviderCtaClick } from "@/lib/analytics";

type CtaBlockProps = {
  referralLink?: string;
  referralCode?: string;
  label: string;
  brandUrl?: string;
  brandUrlLabel?: string;
  /** Provider slug for GA events (e.g. runna, airtime) */
  provider?: string;
};

export function CtaBlock({
  referralLink,
  referralCode,
  label,
  brandUrl,
  brandUrlLabel = "Go to site",
  provider,
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
          onClick={handleCtaClick}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
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
