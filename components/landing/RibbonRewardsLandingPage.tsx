"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, HelpCircle, Quote, FileText, Clock3, BadgeCheck } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TrustpilotBadge } from "@/components/ui/TrustpilotBadge";
import { trackProviderCtaClick, trackRibbonSocialProofClick } from "@/lib/analytics";
import { CopyableCode } from "@/components/ui/CopyableCode";

const BG_BLACK = "#090909";
const BORDER = "#2D2438";
const FUCHSIA = "#FF007F";
const PURPLE = "#7E00B9";
const FUCHSIA_MUTED = "rgba(255, 0, 127, 0.12)";
const TEXT_PRIMARY = "#fafafa";
const TEXT_MUTED = "#c7b9d5";

const CARD_CLASS = "rounded-xl border p-5 sm:p-6";
const CARD_STYLE = { backgroundColor: BG_BLACK, borderColor: BORDER };

type RibbonRewardsLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

function getReferralCode(brand: Brand): string {
  if (brand.referralCode && brand.referralCode.trim() !== "") return brand.referralCode;
  if (!brand.referralLink) return "KIAN63DB";
  try {
    const url = new URL(brand.referralLink);
    const value = url.searchParams.get("ref");
    return value && value.trim() !== "" ? value : "KIAN63DB";
  } catch {
    return "KIAN63DB";
  }
}

export function RibbonRewardsLandingPage({
  brand,
  content,
}: RibbonRewardsLandingPageProps) {
  const headline = content.heroHeadline ?? "Earn £25 + 1% Cashback on Your Rent Payments";
  const subheadline =
    content.heroSubheadline ??
    "Stop letting your biggest monthly expense go unrewarded. Join thousands of UK renters earning points on every pound spent on rent.";
  const ctaLabel = content.ctaLabel ?? "Get £25 now!";
  const steps = content.howItWorksSteps ?? [];
  const safety = content.safetySection;
  const rewardsTable = content.rewardsTable ?? [];
  const socialProofImages = content.socialProofImages ?? [];
  const referralCode = getReferralCode(brand);
  const hasLink = brand.referralLink && brand.referralLink.trim() !== "";
  const hasOnboardingStages = (content.onboardingStages ?? []).length > 0;
  const hasSafetySection = Boolean(safety && safety.bullets.length > 0);
  const hasTransparencySection = Boolean(content.transparencyDisclosure);
  const hasFaqSection = Boolean(content.faq && content.faq.length > 0);

  const handleSocialProofClick = () => {
    trackRibbonSocialProofClick();
    const socialProofSection = document.getElementById("ribbon-social-proof");
    socialProofSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionLinks = [
    { id: "ribbon-how-it-works", label: "How it works", show: steps.length > 0 },
    { id: "ribbon-earnings", label: "Earnings", show: rewardsTable.length > 0 },
    { id: "ribbon-social-proof", label: "My rewards", show: socialProofImages.length > 0 },
    { id: "ribbon-faq", label: "FAQ", show: hasFaqSection },
  ].filter((section) => section.show);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BG_BLACK }}
    >
      <section
        className="relative overflow-hidden px-4 pt-12 pb-7 sm:px-6 sm:pt-16 sm:pb-9 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, #2d0a2f 0%, #1a0721 45%, #090909 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 blur-3xl"
          style={{
            background: "linear-gradient(90deg, rgba(255,0,127,0.25), rgba(126,0,185,0.25))",
          }}
        />
        <div className="mx-auto max-w-[640px] text-center">
          {sectionLinks.length > 0 && (
            <nav
              aria-label="Ribbon page sections"
              className="mb-6 overflow-x-auto md:overflow-visible"
            >
              <div className="flex min-w-max items-center gap-2 pb-1 md:min-w-0 md:justify-center">
                {sectionLinks.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium transition hover:opacity-90"
                    style={{ borderColor: BORDER, color: TEXT_MUTED }}
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </nav>
          )}

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

          <div
            className="mx-auto mt-7 max-w-[460px] rounded-xl border p-4"
            style={{ ...CARD_STYLE, borderColor: FUCHSIA }}
          >
            <p className="text-sm" style={{ color: TEXT_MUTED }}>
              Use referral code
            </p>
            <div className="mt-2">
              <CopyableCode
                code={referralCode}
                label="Copy code"
                provider={brand.slug}
                className="border-dashed bg-transparent"
              />
            </div>
            <p className="mt-2 text-xs" style={{ color: TEXT_MUTED }}>
              Use the sign-up link and check the code is present at the final onboarding step.
            </p>
          </div>

          {hasLink && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                href={brand.referralLink!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProviderCtaClick(brand.slug)}
                className="inline-flex min-h-14 w-full max-w-[340px] items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold text-center transition-all hover:opacity-95"
                style={{
                  background: `linear-gradient(90deg, ${FUCHSIA} 0%, ${PURPLE} 100%)`,
                  color: "#FFFFFF",
                  boxShadow: `0 6px 20px rgba(255,0,127,0.35)`,
                }}
              >
                {ctaLabel}
              </Link>
              {socialProofImages.length > 0 && (
                <button
                  type="button"
                  onClick={handleSocialProofClick}
                  className="inline-flex min-h-14 w-full max-w-[340px] flex-col items-center justify-center rounded-md border px-5 py-3 text-base text-center leading-tight transition hover:opacity-90"
                  style={{ borderColor: BORDER, color: TEXT_MUTED }}
                >
                  <span>Not convinced?</span>
                  <span>See my rewards!</span>
                </button>
              )}
            </div>
          )}

          {content.trustBadge && (
            <div
              className="mt-8 inline-flex flex-col items-center gap-1 rounded-lg border px-4 py-3"
              style={{ borderColor: BORDER }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: FUCHSIA }}
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

          {content.trustpilot && (
            <div className="mt-6">
              <TrustpilotBadge
                brandName={brand.name}
                trustpilot={content.trustpilot}
                brand={brand.slug}
              />
            </div>
          )}
        </div>
      </section>

      {steps.length > 0 && (
        <section id="ribbon-how-it-works" className="px-4 py-5 sm:px-6">
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
                    style={{ backgroundColor: FUCHSIA_MUTED, color: FUCHSIA }}
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

      <section id="ribbon-onboarding" className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-[640px]">
          <div className={`${CARD_CLASS}`} style={CARD_STYLE}>
            <h2
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              <Clock3 size={22} style={{ color: FUCHSIA }} aria-hidden />
              Onboarding in 4 steps
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {(content.onboardingStages ?? []).map((stage) => (
                <li
                  key={stage.title}
                  className="rounded-lg border p-3 text-sm"
                  style={{ borderColor: BORDER, color: TEXT_MUTED }}
                >
                  <p className="font-semibold" style={{ color: TEXT_PRIMARY }}>
                    {stage.title}
                  </p>
                  <p className="mt-1">{stage.details}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {safety && safety.bullets.length > 0 && (
        <section id="ribbon-safety" className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <div className={`${CARD_CLASS}`} style={CARD_STYLE}>
              <h2
                className="flex items-center gap-2 text-xl font-bold tracking-tight"
                style={{ color: TEXT_PRIMARY }}
              >
                <Shield size={22} style={{ color: FUCHSIA }} aria-hidden />
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
                      style={{ backgroundColor: FUCHSIA }}
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

      <section className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-[640px]">
          <div
            className={`${CARD_CLASS} border-l-4`}
            style={{
              ...CARD_STYLE,
              borderLeftColor: FUCHSIA,
            }}
          >
            <h2
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
              style={{ color: FUCHSIA }}
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

      {rewardsTable.length > 0 && (
        <section id="ribbon-earnings" className="px-4 py-5 sm:px-6">
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
                        style={{ color: FUCHSIA }}
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

      {socialProofImages.length > 0 && (
        <section id="ribbon-social-proof" className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <div className={`${CARD_CLASS}`} style={CARD_STYLE}>
              <h2
                className="flex items-center gap-2 text-xl font-bold tracking-tight"
                style={{ color: TEXT_PRIMARY }}
              >
                <BadgeCheck size={22} style={{ color: FUCHSIA }} aria-hidden />
                My Ribbon Activity & Rewards
              </h2>
              <p className="mt-2 text-sm" style={{ color: TEXT_MUTED }}>
                A quick look at my real payment activity and the rewards I can redeem.
              </p>
              <div className="mt-5 grid gap-4">
                {socialProofImages.map((image) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-lg border p-3"
                    style={{ borderColor: BORDER }}
                  >
                    <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-md">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 340px"
                      />
                    </div>
                    {image.caption && (
                      <figcaption className="mt-3 text-sm" style={{ color: TEXT_MUTED }}>
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {content.transparencyDisclosure && (
        <section id="ribbon-transparency" className="px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[640px]">
            <div className={`${CARD_CLASS}`} style={CARD_STYLE}>
              <h2 className="text-xl font-bold tracking-tight" style={{ color: TEXT_PRIMARY }}>
                {content.transparencyDisclosure.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                {content.transparencyDisclosure.body}
              </p>
            </div>
          </div>
        </section>
      )}

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
                background: `linear-gradient(90deg, ${FUCHSIA} 0%, ${PURPLE} 100%)`,
                color: "#FFFFFF",
                boxShadow: `0 6px 20px rgba(255,0,127,0.35)`,
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
          id="ribbon-faq"
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
              <HelpCircle size={22} style={{ color: FUCHSIA }} aria-hidden />
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
                style={{ color: FUCHSIA }}
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
