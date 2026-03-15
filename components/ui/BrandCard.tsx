import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/brands";
import { CopyableCode } from "./CopyableCode";
import { CtaBlock } from "./CtaBlock";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";
import { LEARN_MORE_LABEL } from "@/constants/copy";

type BrandCardProps = {
  brand: Brand;
  showCategory?: boolean;
};

function primaryCtaLabel(brand: Brand): string {
  if (brand.referralLink) {
    const lower = brand.offerSummary.toLowerCase();
    if (lower.includes("£")) {
      const match = brand.offerSummary.match(/£\d+/);
      if (match) return `Get ${match[0]} off now!`;
    }
    if (lower.includes("free") || lower.includes("trial") || lower.includes("weeks"))
      return "Get free trial";
    if (lower.includes("%")) return "Get discount";
    return "Get offer";
  }
  return "Use my code";
}

export function BrandCard({ brand, showCategory }: BrandCardProps) {
  const landingHref = `/discounts/${brand.category}/${brand.slug}`;

  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-md shadow-black/10">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
            <Image
              src={brand.logoPath}
              alt={`${brand.name} logo`}
              fill
              className="object-contain p-1"
              sizes="56px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{brand.name}</h2>
              {showCategory && (
                <span className="rounded-full bg-[var(--border)] px-2 py-0.5 text-xs capitalize text-[var(--muted)]">
                  {brand.category}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{brand.overview}</p>
          </div>
        </div>
        <p className="text-sm font-medium text-[var(--foreground)]">{brand.offerSummary}</p>
        <div className="flex flex-wrap items-center gap-3">
          {brand.referralLink && brand.referralLink.trim() !== "" ? (
            <CtaBlock
              referralLink={brand.referralLink}
              label={primaryCtaLabel(brand)}
              provider={brand.slug}
            />
          ) : brand.referralCode ? (
            <>
              <CopyableCode code={brand.referralCode} provider={brand.slug} />
              {brand.brandUrl && (
                <TrackedCtaLink
                  href={brand.brandUrl}
                  provider={brand.slug}
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
                >
                  Go to site
                </TrackedCtaLink>
              )}
            </>
          ) : null}
          <Link
            href={landingHref}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
          >
            {LEARN_MORE_LABEL}
          </Link>
        </div>
      </div>
    </article>
  );
}
