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
  const landingHref =
    brand.section === "earn"
      ? `/earn/${brand.slug}`
      : `/discounts/${brand.category}/${brand.slug}`;
  const ctaLabel = brand.primaryCtaLabel ?? primaryCtaLabel(brand);

  return (
    <article className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-sm shadow-black/[0.06] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10">
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
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800">
                  {brand.section === "earn" ? "Earn" : brand.category}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{brand.overview}</p>
          </div>
        </div>
        <p className="text-base text-[var(--foreground)]">
          <strong className="font-semibold">{brand.offerSummary}</strong>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {brand.referralLink && brand.referralLink.trim() !== "" ? (
            <CtaBlock
              referralLink={brand.referralLink}
              label={ctaLabel}
              provider={brand.slug}
              primaryLinkVariant="listCard"
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
            aria-label={`${LEARN_MORE_LABEL} — ${brand.name}`}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
          >
            {LEARN_MORE_LABEL}
          </Link>
        </div>
      </div>
    </article>
  );
}
