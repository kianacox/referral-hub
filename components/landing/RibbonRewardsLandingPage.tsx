"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, HelpCircle, Quote, FileText } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { trackProviderCtaClick } from "@/lib/analytics";

/* Dark Finance: true black, emerald accents, thin borders */
const BG_BLACK = "#000000";
const BORDER = "#1F1F1F";
const EMERALD = "#10B981";
const EMERALD_MUTED = "rgba(16, 185, 129, 0.15)";
const TEXT_PRIMARY = "#fafafa";
const TEXT_MUTED = "#a1a1aa";

const CARD_CLASS =
  "rounded-xl border p-5 sm:p-6";
const CARD_STYLE = { backgroundColor: BG_BLACK, borderColor: BORDER };

type RibbonRewardsLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

export function RibbonRewardsLandingPage({
  brand,
  content,
}: RibbonRewardsLandingPageProps) {
  const headline = content.heroHeadline ?? "Earn £25 + 1% Cashback on Your Rent Payments";
  const subheadline =
    content.heroSubheadline ??
    "Stop letting your biggest monthly expense go unrewarded. Join thousands of UK renters earning points on every pound spent on rent.";
  const ctaLabel = content.ctaLabel ?? "Claim your £25 Sign-up Bonus";
  const steps = content.howItWorksSteps ?? [];
  const safety = content.safetySection;
  const rewardsTable = content.rewardsTable ?? [];
  const hasLink = brand.referralLink && brand.referralLink.trim() !== "";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BG_BLACK }}
    >
      {/* Hero: slight green gradient top → black */}
      <section
        className="relative overflow-hidden px-4 pt-12 pb-7 sm:px-6 sm:pt-16 sm:pb-9 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, #0c1512 0%, #060a08 40%, #000000 100%)",
        }}
      >
        <div className="mx-auto max-w-[640px] text-center">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: TEXT_PRIMARY }}
          >
            {headline}
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: TEXT_MUTED }}
          >
            {subheadline}
          </p>

          {hasLink && (
            <div className="mt-8">
              <Link
                href={brand.referralLink!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProviderCtaClick(brand.slug)}
                className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold transition-all hover:opacity-95"
                style={{
                  backgroundColor: EMERALD,
                  color: "#000000",
                  boxShadow: `0 4px 14px ${EMERALD}40`,
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          )}

          {content.trustBadge && (
            <div
              className="mt-8 inline-flex flex-col items-center gap-1 rounded-lg border px-4 py-3"
              style={{ borderColor: BORDER }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: EMERALD }}
              >
                {content.trustBadge.partner}
              </span>
              <span
                className="text-sm"
                style={{ color: TEXT_MUTED }}
              >
                {content.trustBadge.label}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* How it Works grid */}
      {steps.length > 0 && (
        <section className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              How it works
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`${CARD_CLASS}`}
                  style={CARD_STYLE}
                >
                  <span
                    className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: EMERALD_MUTED, color: EMERALD }}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="font-semibold"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: TEXT_MUTED }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Safety & Trust */}
      {safety && safety.bullets.length > 0 && (
        <section className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <div className={`${CARD_CLASS}`} style={CARD_STYLE}>
              <h2
                className="flex items-center gap-2 text-xl font-bold tracking-tight"
                style={{ color: TEXT_PRIMARY }}
              >
                <Shield size={22} style={{ color: EMERALD }} aria-hidden />
                {safety.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {safety.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed"
                    style={{ color: TEXT_MUTED }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: EMERALD }}
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Why I use Ribbon */}
      <section className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-[640px]">
          <div
            className={`${CARD_CLASS} border-l-4`}
            style={{
              ...CARD_STYLE,
              borderLeftColor: EMERALD,
            }}
          >
            <h2
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
              style={{ color: EMERALD }}
            >
              <Quote size={16} aria-hidden />
              Why I use Ribbon
            </h2>
            <blockquote
              className="mt-3 whitespace-pre-line text-[1rem] leading-relaxed italic"
              style={{ color: TEXT_MUTED }}
            >
              {content.whyIUseIt}
            </blockquote>
          </div>
        </div>
      </section>

      {/* Rewards table */}
      {rewardsTable.length > 0 && (
        <section className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              Potential earnings
            </h2>
            <div
              className={`mt-4 ${CARD_CLASS} overflow-hidden`}
              style={CARD_STYLE}
            >
              <table className="w-full text-sm">
                <tbody>
                  {rewardsTable.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0"
                      style={{ borderColor: BORDER }}
                    >
                      <td
                        className="py-3 pr-4 font-medium"
                        style={{ color: TEXT_PRIMARY }}
                      >
                        {row.label}
                      </td>
                      <td
                        className="py-3"
                        style={{ color: EMERALD }}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Calculator image — real earnings example */}
      <section className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-[640px]">
          <div className={`${CARD_CLASS} overflow-hidden`} style={CARD_STYLE}>
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              My Ribbon points calculator
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: TEXT_MUTED }}
            >
              See how much you could earn — here’s my own calculator with £795/mo rent over 12 months.
            </p>
            <div className="mt-4 relative w-full max-w-sm mx-auto aspect-[9/19] rounded-lg overflow-hidden border bg-black/30" style={{ borderColor: BORDER }}>
              <Image
                src="/ribbbon_rewards_calculator.jpg"
                alt="Ribbon Rewards points calculator showing 9,540 points (£95 value) for £795/month rent over 12 months"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA repeat */}
      {hasLink && (
        <section className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px] text-center">
            <Link
              href={brand.referralLink!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProviderCtaClick(brand.slug)}
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold transition-all hover:opacity-95"
              style={{
                backgroundColor: EMERALD,
                color: "#000000",
                boxShadow: `0 4px 14px ${EMERALD}40`,
              }}
            >
              {ctaLabel}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faq && content.faq.length > 0 && (
        <section
          className="px-4 py-5 sm:px-6"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-[640px]">
            <h2
              id="faq-heading"
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              <HelpCircle size={22} style={{ color: EMERALD }} aria-hidden />
              Frequently asked questions
            </h2>
            <div
              className={`mt-5 ${CARD_CLASS}`}
              style={CARD_STYLE}
            >
              <FaqAccordion items={content.faq} />
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      {content.disclaimer && (
        <section className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <div
              className={`${CARD_CLASS} flex items-start gap-3`}
              style={CARD_STYLE}
            >
              <FileText
                size={18}
                className="mt-0.5 shrink-0"
                style={{ color: EMERALD }}
                aria-hidden
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: TEXT_MUTED }}
              >
                {content.disclaimer}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
