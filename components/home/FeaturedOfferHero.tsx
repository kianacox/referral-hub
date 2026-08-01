import Image from "next/image";
import type { Brand } from "@/lib/brands";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";

type FeaturedOfferHeroProps = {
  brand: Brand;
};

const HERO_TICKS = [
  "No switching required",
  "Takes about 10 minutes",
  "Paid within 30 working days",
];

export function FeaturedOfferHero({ brand }: FeaturedOfferHeroProps) {
  return (
    <section
      aria-label="Featured offer"
      className="flex flex-wrap items-center gap-7 rounded-[20px] bg-[#00533C] p-7 text-[#f2efe8] shadow-[0_16px_40px_-16px_rgba(0,83,60,0.45)]"
    >
      <div className="flex min-w-0 flex-[1_1_340px] flex-col items-start gap-3.5">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-white/[0.14] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
            Featured · Best offer
          </span>
          <span className="flex h-[34px] items-center justify-center rounded-lg bg-white px-2.5">
            <Image
              src={brand.logoPath}
              alt={`${brand.name} logo`}
              width={23}
              height={23}
              className="h-[23px] w-auto object-contain"
            />
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-serif)] text-[clamp(28px,4.5vw,40px)] font-medium leading-[1.12] tracking-[-0.01em] text-white [text-wrap:pretty]">
          Get £30 cash for opening a Lloyds account
        </h1>
        <p className="max-w-[480px] text-[15px] leading-relaxed text-[#f2efe8]/85">
          Open a current account with my refer-a-friend link and Lloyds pays £30
          straight into it. No switching, no hoops — just keep the account open
          for 7 days.
        </p>
        <ul className="flex flex-wrap gap-x-[18px] gap-y-2 text-[13px] text-[#f2efe8]/90">
          {HERO_TICKS.map((tick) => (
            <li key={tick} className="flex items-center gap-1.5">
              <span className="text-[#7fd4b5]">✓</span> {tick}
            </li>
          ))}
        </ul>
        <div className="mt-1 flex flex-wrap items-center gap-3.5">
          {brand.referralLink && (
            <TrackedCtaLink
              href={brand.referralLink}
              provider={brand.slug}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#00533C] no-underline shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#f2efe8]"
            >
              Claim your £30 →
            </TrackedCtaLink>
          )}
          <a
            href="#how-it-works"
            className="text-[13px] text-[#f2efe8]/85 underline underline-offset-[3px] hover:text-white"
          >
            How it works
          </a>
        </div>
      </div>
      <div className="flex min-w-[200px] flex-[0_1_240px] flex-col gap-2.5">
        <div className="flex flex-col gap-1 rounded-[14px] border border-white/[0.14] bg-white/[0.08] p-[18px]">
          <span className="text-xs uppercase tracking-[0.1em] text-[#f2efe8]/70">
            You receive
          </span>
          <span className="font-[family-name:var(--font-serif)] text-[44px] leading-none text-white">
            £30
          </span>
          <span className="text-[13px] text-[#f2efe8]/80">
            cash, paid into your new account
          </span>
        </div>
        <p className="text-xs leading-normal text-[#f2efe8]/65">
          Lloyds is a UK bank protected by the FSCS — your money is covered up
          to £85,000.
        </p>
      </div>
    </section>
  );
}
