"use client";

import Link from "next/link";
import {
  Zap,
  Shield,
  Clock,
  Leaf,
  Package,
  CheckCircle2,
  HelpCircle,
  FileText,
} from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { TrustpilotBadge } from "@/components/ui/TrustpilotBadge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { trackProviderCtaClick } from "@/lib/analytics";

const CARD_STYLE =
  "rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-[10px]";

/* Exhale Coffee brand accent: green */
const EXHALE_ACCENT = "text-emerald-400";
const EXHALE_ACCENT_MUTED = "text-emerald-400/90";
const EXHALE_BG = "bg-emerald-500";
const EXHALE_BG_SOFT = "bg-emerald-500/15";
const EXHALE_BORDER = "border-l-emerald-500/70";
const EXHALE_SHADOW = "shadow-emerald-500/25";
const EXHALE_HOVER = "hover:bg-emerald-400 hover:shadow-emerald-500/30";
const EXHALE_LINK = "text-emerald-400 hover:text-emerald-300 hover:underline";

const iconMap = {
  Zap,
  Shield,
  Clock,
  Leaf,
  Package,
} as const;

function WhyIUseItWithLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, url] = match;
          const isExternal =
            url.startsWith("http") && !url.includes("referral-hub.app");
          return (
            <Link
              key={i}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={EXHALE_LINK}
            >
              {label}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

type ExhaleLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

export function ExhaleLandingPage({ brand, content }: ExhaleLandingPageProps) {
  const hasLink = brand.referralLink && brand.referralLink.trim() !== "";
  const productSummary = content.productSummary ?? [];
  const keyBenefits = content.keyBenefits ?? [];
  const howToRedeem = content.howToRedeem ?? [];
  const productSpecs = content.productSpecs ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero: gradient dark → roasted brown, CTA + product summary */}
      <section
        className="relative overflow-hidden px-4 pt-10 pb-10 sm:px-6 sm:pt-12 sm:pb-12 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, #1a1510 0%, #0f0f0f 50%, #0a0a0a 100%)",
        }}
      >
        <div className="mx-auto max-w-[600px]">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {brand.name}
          </h1>
          <p className="mt-2 text-lg text-[var(--body-text)]">
            {brand.offerSummary}
          </p>

          {content.trustpilot && (
            <div className="mt-5 flex justify-center">
              <TrustpilotBadge
                brandName={brand.name}
                trustpilot={content.trustpilot}
                brand={brand.slug}
              />
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8">
            {hasLink && (
              <div className="flex w-full flex-col items-center text-center sm:w-auto">
                <Link
                  href={brand.referralLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProviderCtaClick(brand.slug)}
                  className={`inline-flex items-center justify-center rounded-xl ${EXHALE_BG} px-8 py-4 text-lg font-bold text-slate-950 shadow-lg ${EXHALE_SHADOW} transition ${EXHALE_HOVER}`}
                >
                  Get 50% off — open Exhale Coffee
                </Link>
                <p className="mt-2 text-sm text-[var(--body-text)]">
                  Discount applied at checkout when you subscribe.
                </p>
              </div>
            )}

            {productSummary.length > 0 && (
              <div
                className={`${CARD_STYLE} min-w-[220px] space-y-3`}
              >
                <h2 className={`text-sm font-semibold uppercase tracking-wider ${EXHALE_ACCENT_MUTED}`}>
                  Product summary
                </h2>
                <ul className="space-y-2">
                  {productSummary.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-[var(--body-text)]"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-emerald-500/80"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Benefits grid */}
      {keyBenefits.length > 0 && (
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[600px]">
            <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Why Exhale Coffee?
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {keyBenefits.map((benefit, i) => {
                const Icon =
                  iconMap[benefit.icon as keyof typeof iconMap] ?? Zap;
                return (
                  <div
                    key={i}
                    className={`${CARD_STYLE} flex flex-col`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${EXHALE_BG_SOFT} ${EXHALE_ACCENT}`}>
                      <Icon size={20} aria-hidden />
                    </div>
                    <h3 className="mt-3 font-semibold text-[var(--foreground)]">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--body-text)] leading-[1.6]">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* User's Note (anecdote) */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[600px]">
          <div
            className={`${CARD_STYLE} border-l-4 ${EXHALE_BORDER} pl-6`}
          >
            <h2 className={`text-sm font-semibold uppercase tracking-wider ${EXHALE_ACCENT_MUTED}`}>
              My experience
            </h2>
            <div className="mt-3 whitespace-pre-line text-[var(--body-text)] leading-[1.6]">
              <WhyIUseItWithLinks text={content.whyIUseIt} />
            </div>
          </div>
        </div>
      </section>

      {/* How to Redeem */}
      {howToRedeem.length > 0 && (
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[600px]">
            <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              How to redeem
            </h2>
            <div className={`${CARD_STYLE} mt-5 space-y-4`}>
              {howToRedeem.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${EXHALE_BG_SOFT} text-sm font-bold ${EXHALE_ACCENT}`}>
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-[var(--body-text)] leading-[1.6]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            {hasLink && (
              <div className="mt-5 flex justify-center">
                <CtaBlock
                  referralLink={brand.referralLink}
                  label="Get 50% off now"
                  provider={brand.slug}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Specs table */}
      {productSpecs.length > 0 && (
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[600px]">
            <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Technical breakdown
            </h2>
            <div className={`${CARD_STYLE} mt-5 overflow-hidden`}>
              <table className="w-full text-sm">
                <tbody>
                  {productSpecs.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                        {row.label}
                      </td>
                      <td className="py-3 text-[var(--body-text)]">
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

      {/* FAQ — full-width with background */}
      {content.faq && content.faq.length > 0 && (
        <section
          className="px-4 py-10 sm:px-6 lg:px-8"
          style={{ background: "rgba(255,255,255,0.02)" }}
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-[600px]">
            <h2
              id="faq-heading"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--foreground)]"
            >
              <HelpCircle size={20} className={EXHALE_ACCENT} aria-hidden />
              Frequently asked questions
            </h2>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-[10px] sm:p-6">
              <FaqAccordion items={content.faq} />
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer footer (transparency / what referrer gets is here) */}
      {content.disclaimer && (
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[600px]">
            <div
              className={`${CARD_STYLE} flex items-start gap-3`}
            >
              <FileText size={18} className={`mt-0.5 shrink-0 ${EXHALE_ACCENT_MUTED}`} aria-hidden />
              <p className="text-xs text-[var(--body-text)] leading-relaxed">
                {content.disclaimer}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
