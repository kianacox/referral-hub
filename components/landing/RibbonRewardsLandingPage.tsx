"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { trackProviderCtaClick, trackRibbonSocialProofClick } from "@/lib/analytics";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";

// ── Fonts (module-level, statically analysed by Next.js) ──────────────────
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jb-mono",
  display: "swap",
});

// ── Design tokens ──────────────────────────────────────────────────────────
const E = "#0F6B47";
const E_DARK = "#0A4E33";
const E_SOFT = "#DCE9DE";
const PLUM = "#4A2A5C";
const GOLD = "#B8862C";
const PAPER = "#F4F1EA";
const PAPER_WARM = "#EDE7DA";
const PAPER_CARD = "#FBFAF6";
const INK = "#0E1411";
const INK_SOFT = "#2A332E";
const MUTED = "#6B7269";
const RULE = "#D9D2C2";
const RULE_SOFT = "#E5DFD0";

const SHADOW_MD = "0 2px 0 rgba(14,20,17,0.05), 0 8px 24px -8px rgba(14,20,17,0.12)";
const SHADOW_LG = "0 4px 0 rgba(14,20,17,0.04), 0 24px 48px -16px rgba(14,20,17,0.18)";

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Helpers ────────────────────────────────────────────────────────────────
function getReferralCode(brand: Brand): string {
  if (brand.referralCode?.trim()) return brand.referralCode;
  if (!brand.referralLink) return "KIAN63DB";
  try {
    const val = new URL(brand.referralLink).searchParams.get("ref");
    return val?.trim() || "KIAN63DB";
  } catch {
    return "KIAN63DB";
  }
}

const serif = (opsz = 144, soft = 0, wonk = 0) =>
  `'opsz' ${opsz}, 'SOFT' ${soft}, 'WONK' ${wonk}`;

// ── Sub-components ─────────────────────────────────────────────────────────

type OfferCardProps = {
  referralCode: string;
  referralLink: string;
  onCtaClick: () => void;
};

export function OfferCard({ referralCode, referralLink, onCtaClick }: OfferCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  return (
    <div className="rb-offer-grid" style={{ background: PAPER_CARD, border: `1px solid ${RULE}`, borderRadius: 4, overflow: "hidden", position: "relative", boxShadow: SHADOW_LG, maxWidth: 880 }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${E} 0%, ${E} 40%, ${PLUM} 40%, ${PLUM} 70%, ${GOLD} 70%, ${GOLD} 100%)` }} />

      {/* Left: reward rows */}
      <div className="rb-offer-left" style={{ padding: "40px 44px" }}>
        <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: E, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 16, height: 1, background: E, display: "inline-block", flexShrink: 0 }} />
          My referral · Two rewards
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, borderBottom: `1px dashed ${RULE}`, paddingBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(144, 0, 1), fontWeight: 500, fontSize: 44, lineHeight: 1, color: E, letterSpacing: "-0.02em", fontStyle: "italic", flexShrink: 0 }}>£25</div>
            <div style={{ flex: 1, fontSize: 14, color: MUTED, lineHeight: 1.4 }}>
              <strong style={{ color: INK, fontWeight: 500 }}>Welcome bonus</strong><br />
              Paid in points after your first verified rent payment lands.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <div style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(144, 0, 1), fontWeight: 500, fontSize: 44, lineHeight: 1, color: E, letterSpacing: "-0.02em", fontStyle: "italic", flexShrink: 0 }}>1%</div>
            <div style={{ flex: 1, fontSize: 14, color: MUTED, lineHeight: 1.4 }}>
              <strong style={{ color: INK, fontWeight: 500 }}>Rent cashback, forever</strong><br />
              £12/month on £1,200 rent — that&apos;s £144 a year, every year.
            </div>
          </div>
        </div>
      </div>

      {/* Right: code + CTA */}
      <div className="rb-offer-right" style={{ background: INK, color: PAPER, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
        <div className="rb-offer-divider" style={{ position: "absolute", top: 20, bottom: 20, left: 0, width: 1, background: `linear-gradient(180deg, transparent, ${E}, transparent)`, opacity: 0.4 }} />
        <div>
          <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(244,241,234,0.5)", marginBottom: 12 }}>
            Referral code
          </div>
          <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 28, fontWeight: 500, letterSpacing: "0.05em", color: PAPER, padding: "14px 18px", border: "1px dashed rgba(244,241,234,0.3)", borderRadius: 3, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(244,241,234,0.03)" }}>
            <span>{referralCode}</span>
            <button
              type="button"
              onClick={handleCopy}
              style={{ fontFamily: "var(--font-jb-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: copied ? E_DARK : E, color: PAPER, padding: "6px 10px", borderRadius: 2, cursor: "pointer", border: "none", transition: "background 0.2s", flexShrink: 0 }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div style={{ fontSize: 12, color: "rgba(244,241,234,0.5)", lineHeight: 1.4, marginBottom: 28 }}>
            Code auto-applies via the link below. Double-check it&apos;s present on the final onboarding step.
          </div>
        </div>
        <Link
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          style={{ display: "block", background: PAPER, color: INK, padding: "16px 20px", borderRadius: 3, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}
        >
          Claim my £25 + cashback →
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────

type TrustStripProps = {
  trustpilotScore: number;
};

export function TrustStrip({ trustpilotScore }: TrustStripProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32, marginTop: 32, paddingTop: 28, borderTop: `1px solid ${RULE}`, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: INK_SOFT }}>
        <span style={{ color: "#00B67A", letterSpacing: 2 }}>★★★★★</span>
        <span>Rated <strong style={{ fontWeight: 600 }}>{trustpilotScore}</strong> on Trustpilot</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: INK_SOFT }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M7 1L12 3V7C12 10 9.5 12.5 7 13C4.5 12.5 2 10 2 7V3L7 1Z" stroke="currentColor" strokeWidth="1.2" /></svg>
        <span>Powered by <strong style={{ fontWeight: 600 }}>Griffin Bank Ltd</strong> · FCA regulated</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: INK_SOFT }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" /><path d="M4 7L6 9L10 5" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
        <span>FSCS protected up to <strong style={{ fontWeight: 600 }}>£85,000</strong></span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────

const LEDGER_ROWS = [
  { rent: "£600",   cashback: "£72",  bonus: "£25", total: "£97",  isAvg: false },
  { rent: "£1,000", cashback: "£120", bonus: "£25", total: "£145", isAvg: false },
  { rent: "£1,500", cashback: "£180", bonus: "£25", total: "£205", isAvg: true  },
  { rent: "£2,000", cashback: "£240", bonus: "£25", total: "£265", isAvg: false },
];

export function EarningsLedger() {
  return (
    <div style={{ background: PAPER_CARD, border: `1px solid ${RULE}`, borderRadius: 4, overflow: "hidden", boxShadow: SHADOW_MD }}>
      <div className="rb-ledger-row" style={{ background: PAPER_WARM, borderBottom: `1px solid ${RULE}`, fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: INK_SOFT }}>
        <span>Monthly rent</span>
        <span className="rb-ledger-hide-mid">1% cashback</span>
        <span className="rb-ledger-hide-mid">+ Welcome</span>
        <span>First-year value</span>
      </div>
      {LEDGER_ROWS.map((row) => (
        <div
          key={row.rent}
          className="rb-ledger-row"
          style={{ borderBottom: `1px solid ${RULE_SOFT}`, alignItems: "center", background: row.isAvg ? `linear-gradient(90deg, ${E_SOFT} 0%, transparent 100%)` : undefined }}
        >
          <div style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(144), fontSize: 24, fontWeight: 500, color: INK, letterSpacing: "-0.01em" }}>{row.rent}</div>
          <div className="rb-ledger-hide-mid" style={{ fontFamily: "var(--font-jb-mono)", fontSize: 16, color: INK_SOFT }}>{row.cashback}</div>
          <div className="rb-ledger-hide-mid" style={{ fontFamily: "var(--font-jb-mono)", fontSize: 16, color: INK_SOFT }}>{row.bonus}</div>
          <div style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(144), fontSize: 28, fontWeight: 500, color: E, letterSpacing: "-0.01em", display: "flex", alignItems: "baseline", gap: 8 }}>
            {row.total}
            {row.isAvg && (
              <span style={{ fontFamily: "var(--font-jb-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: E, color: PAPER, padding: "3px 8px", borderRadius: 2, fontWeight: 500 }}>
                UK avg
              </span>
            )}
          </div>
        </div>
      ))}
      <div style={{ padding: "16px 32px", background: PAPER_WARM, fontSize: 13, color: MUTED, fontStyle: "italic", borderTop: `1px solid ${RULE}` }}>
        Figures assume 1% rate. Some properties qualify for up to 1.5% — Ribbon shows you during sign-up.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────

type OnboardingStage = { title: string; details: string };

export function OnboardingStages({ stages }: { stages: OnboardingStage[] }) {
  const PROGRESS = [25, 50, 75, 100];
  const TIMES = ["~30 seconds", "~30 seconds", "~45 seconds", "✓ Code applied"];

  return (
    <div className="rb-onboard-grid">
      {stages.map((stage, i) => {
        const pct = PROGRESS[i] ?? 100;
        const isDone = pct === 100;
        const label = stage.title.replace(/^Stage \d+ \(\d+%\) [-–] /, "");
        return (
          <div key={stage.title} style={{ background: PAPER_CARD, border: `1px solid ${RULE}`, borderRadius: 3, padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: 3, background: E, width: `${pct}%`, transition: "width 0.8s ease" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>Stage {i + 1}</span>
              <span style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, color: E, fontWeight: 600 }}>{pct}%</span>
            </div>
            <h4 style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(72), fontWeight: 500, fontSize: 18, color: INK, marginBottom: 6, letterSpacing: "-0.01em" }}>
              {label}
            </h4>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{stage.details}</p>
            <div style={{ marginTop: 14, fontFamily: "var(--font-jb-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: isDone ? E : PLUM }}>
              {TIMES[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Security card titles (mapped to safetySection.bullets order) ───────────
const SECURITY_TITLES = [
  "Held at a regulated UK bank",
  "FSCS protected to £85,000",
  "Normal Faster Payments",
  "How it pays for itself",
];

// ── Main component ─────────────────────────────────────────────────────────

type RibbonRewardsLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

export function RibbonRewardsLandingPage({ brand, content }: RibbonRewardsLandingPageProps) {
  const referralCode = getReferralCode(brand);
  const referralLink = brand.referralLink ?? "#";
  const steps = content.howItWorksSteps ?? [];
  const stages = content.onboardingStages ?? [];
  const safetyBullets = content.safetySection?.bullets ?? [];
  const proofImages = content.socialProofImages ?? [];
  const faqItems = content.faq ?? [];
  const trustpilotScore = content.trustpilot?.score ?? 4.7;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ribbon Rewards",
      url: "https://www.ribbonrewards.io",
      sameAs: ["https://www.trustpilot.com/review/ribbonrewards.io"],
      description: "Ribbon Rewards helps UK renters earn points on rent payments routed through regulated UK banking infrastructure.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Ribbon Rewards Rent Cashback",
      serviceType: "Rent payment rewards",
      provider: { "@type": "Organization", name: "Ribbon Rewards", url: "https://www.ribbonrewards.io" },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      offers: { "@type": "Offer", description: "£25 sign-up bonus plus ongoing points on rent payments.", price: "0", priceCurrency: "GBP" },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Regulated Banking Infrastructure", value: "Griffin Bank Ltd (FCA FRN 970920)" },
        { "@type": "PropertyValue", name: "Typical Cashback Rate", value: "1% to 1.5%" },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <style>{`
        .rb-root {
          font-family: var(--font-inter-tight), -apple-system, sans-serif;
          background: ${PAPER};
          background-image:
            radial-gradient(circle at 10% 0%, rgba(74,42,92,0.04) 0%, transparent 40%),
            radial-gradient(circle at 90% 100%, rgba(15,107,71,0.04) 0%, transparent 40%);
          overflow-x: hidden;
          position: relative;
        }
        .rb-wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .rb-offer-grid { display: grid; grid-template-columns: 1.4fr 1fr; }
        .rb-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-left: 1px solid ${RULE}; }
        .rb-onboard-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .rb-personal-grid { display: grid; grid-template-columns: 200px 1fr; gap: 60px; align-items: start; }
        .rb-security-head { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; margin-bottom: 64px; align-items: end; }
        .rb-security-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(244,241,234,0.1); border: 1px solid rgba(244,241,234,0.1); }
        .rb-activity-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: center; }
        .rb-ledger-row { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1.4fr; padding: 18px 32px; }
        .rb-ledger-row:not(:first-child) { padding: 24px 32px; }
        .rb-section-head { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid ${RULE}; padding-bottom: 24px; margin-bottom: 56px; }
        @keyframes rb-pulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.8); opacity: 0; } }
        .rb-pulse-ring { animation: rb-pulse 2s ease-in-out infinite; }
        @media (max-width: 900px) {
          .rb-wrap { padding: 0 20px; }
          .rb-offer-grid { grid-template-columns: 1fr; }
          .rb-offer-left { padding: 28px 24px !important; }
          .rb-offer-right { padding: 28px 24px !important; }
          .rb-offer-divider { display: none; }
          .rb-steps-grid { grid-template-columns: repeat(2, 1fr); border-top: 1px solid ${RULE}; }
          .rb-onboard-grid { grid-template-columns: repeat(2, 1fr); }
          .rb-personal-grid { grid-template-columns: 1fr; gap: 24px; }
          .rb-personal-quote::before { display: none; }
          .rb-security-head { grid-template-columns: 1fr; gap: 24px; }
          .rb-security-grid { grid-template-columns: 1fr; }
          .rb-activity-grid { grid-template-columns: 1fr; gap: 32px; }
          .rb-section-head { flex-direction: column; align-items: flex-start; gap: 12px; }
          .rb-ledger-row { grid-template-columns: 1fr 1fr; }
          .rb-ledger-hide-mid { display: none; }
          .rb-proof-img { transform: none !important; }
        }
      `}</style>

      <div className={`rb-root ${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
        {/* Grain overlay */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.4, backgroundImage: GRAIN_BG }} aria-hidden />

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 2, padding: "80px 0 60px" }}>
          <div className="rb-wrap">
            {/* Meta line */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36, fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>
              <span style={{ position: "relative", display: "flex" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: E, display: "block" }} />
                <span className="rb-pulse-ring" style={{ position: "absolute", inset: -4, borderRadius: "50%", background: E, opacity: 0.3 }} />
              </span>
              <span>Live referral · {referralCode}</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>Updated May 2026</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144, 30), fontSize: "clamp(48px, 7vw, 92px)", lineHeight: 0.96, letterSpacing: "-0.03em", color: INK, maxWidth: 900, marginBottom: 32 }}>
              The easiest{" "}
              <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 100, 1), color: E }}>£300+</em>
              {" "}a year I make,{" "}
              <br />
              just for{" "}
              <span style={{ textDecoration: "underline wavy", textDecorationColor: E, textDecorationThickness: 2, textUnderlineOffset: 5 }}>paying rent</span>.
            </h1>

            {/* Lede */}
            <p style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontVariationSettings: serif(72), fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.45, color: INK_SOFT, maxWidth: 640, marginBottom: 56 }}>
              Ribbon turns your monthly rent payment into points you can spend at Amazon, Eurostar, Deliveroo and more. I&apos;ve been using it for 14 months — and you get £25 just for signing up with my code.
            </p>

            <OfferCard referralCode={referralCode} referralLink={referralLink} onCtaClick={() => trackProviderCtaClick(brand.slug)} />
            <TrustStrip trustpilotScore={trustpilotScore} />
          </div>
        </section>

        {/* ── PERSONAL QUOTE ───────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 2, margin: "100px 0" }}>
          <div className="rb-wrap">
            <div className="rb-personal-grid">
              <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, display: "flex", alignItems: "center", gap: 10, paddingTop: 6 }}>
                <span style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(144, 0, 1), fontStyle: "italic", fontSize: 32, color: E, lineHeight: 1 }}>i.</span>
                <span>Why I use it</span>
              </div>
              <div style={{ maxWidth: 720 }}>
                <blockquote className="rb-personal-quote" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.3, letterSpacing: "-0.02em", color: INK, marginBottom: 28, paddingLeft: 60, position: "relative" }}>
                  <span style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), fontSize: 80, color: E, position: "absolute", left: 0, top: -10, lineHeight: 1, opacity: 0.5 }}>&ldquo;</span>
                  I pay rent anyway, so I was keen to get{" "}
                  <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>something back</em>
                  {" "}on a payment I&apos;m already making. The rewards are genuinely useful — I save mine through the year and spend them at Christmas on Amazon vouchers.
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-jb-mono)", fontSize: 12, letterSpacing: "0.05em", color: MUTED }}>
                  <span style={{ width: 32, height: 1, background: RULE, display: "inline-block" }} />
                  <span>— <strong style={{ color: INK, fontWeight: 500 }}>Kian</strong> · Ribbon user since Feb 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        {steps.length > 0 && (
          <section style={{ position: "relative", zIndex: 2, margin: "100px 0" }}>
            <div className="rb-wrap">
              <div className="rb-section-head">
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.025em", color: INK, maxWidth: 700 }}>
                  How it <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>works</em>.<br />Four steps, two minutes.
                </h2>
                <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>§ ii · Mechanics</div>
              </div>

              <div className="rb-steps-grid">
                {steps.map((step, i) => (
                  <div key={step.title} style={{ padding: "32px 28px", borderRight: `1px solid ${RULE}`, position: "relative" }}>
                    <div style={{ fontFamily: "var(--font-fraunces)", fontVariationSettings: serif(144, 0, 1), fontWeight: 300, fontStyle: "italic", fontSize: 56, lineHeight: 1, color: RULE, marginBottom: 36 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontVariationSettings: serif(72), fontSize: 22, lineHeight: 1.2, color: INK, marginBottom: 12, letterSpacing: "-0.01em" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.55 }}>{step.description}</p>
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px dashed ${RULE}`, fontFamily: "var(--font-jb-mono)", fontSize: 11, color: E, letterSpacing: "0.05em" }}>
                      {i === 0 ? "~ 2 minutes" : i === 1 ? "One-time change" : i === 2 ? "Instant · Same-day" : "Auto, every month"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── EARNINGS LEDGER ──────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 2, margin: "100px 0" }}>
          <div className="rb-wrap">
            <div className="rb-section-head">
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.025em", color: INK }}>
                What you could <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>actually</em> earn.
              </h2>
              <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>§ iii · Numbers</div>
            </div>
            <EarningsLedger />
          </div>
        </section>

        {/* ── ONBOARDING ───────────────────────────────────────────────── */}
        {stages.length > 0 && (
          <section style={{ position: "relative", zIndex: 2, margin: "100px 0" }}>
            <div className="rb-wrap">
              <div className="rb-section-head">
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.025em", color: INK }}>
                  The full sign-up,<br />in <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>four</em> stages.
                </h2>
                <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>§ iv · Onboarding</div>
              </div>
              <OnboardingStages stages={stages} />
            </div>
          </section>
        )}

        {/* ── SECURITY (full-bleed dark) ────────────────────────────────── */}
        {safetyBullets.length > 0 && (
          <section style={{ position: "relative", zIndex: 2, background: INK, overflow: "hidden", padding: "80px 0", margin: "100px 0" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 30%, rgba(15,107,71,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(74,42,92,0.15) 0%, transparent 50%)`, pointerEvents: "none" }} />
            <div className="rb-wrap" style={{ position: "relative", zIndex: 1 }}>
              <div className="rb-security-head">
                <div>
                  <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: E, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 24, height: 1, background: E, display: "inline-block" }} />
                    § v · Trust
                  </div>
                  <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.025em", color: PAPER }}>
                    &ldquo;Sounds too good<br />to be true.&rdquo;<br />
                    <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E_SOFT }}>So how is it real?</em>
                  </h2>
                </div>
                <p style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, fontVariationSettings: serif(72), fontSize: 20, lineHeight: 1.5, color: "rgba(244,241,234,0.7)" }}>
                  Ribbon isn&apos;t a fintech holding your money in some unregulated wallet. Your funds sit at Griffin Bank, a fully licensed UK bank — same protections as your high-street account.
                </p>
              </div>

              <div className="rb-security-grid">
                {SECURITY_TITLES.map((title, i) => (
                  <div key={title} style={{ background: INK, padding: 32 }}>
                    <div style={{ width: 32, height: 32, border: `1px solid ${E}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: E }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        {i === 0 && <path d="M7 1L12 3V7C12 10 9.5 12.5 7 13C4.5 12.5 2 10 2 7V3L7 1Z" stroke="currentColor" strokeWidth="1.2" />}
                        {i === 1 && <><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" /><path d="M4 7L6 9L10 5" stroke="currentColor" strokeWidth="1.2" fill="none" /></>}
                        {i === 2 && <path d="M2 7H12M9 4L12 7L9 10" stroke="currentColor" strokeWidth="1.2" fill="none" />}
                        {i === 3 && <><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.2" /></>}
                      </svg>
                    </div>
                    <h4 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, fontVariationSettings: serif(72), fontSize: 20, color: PAPER, marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</h4>
                    <p style={{ fontSize: 14, color: "rgba(244,241,234,0.65)", lineHeight: 1.55 }}>{safetyBullets[i]}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(244,241,234,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 13, color: "rgba(244,241,234,0.5)", letterSpacing: "0.02em" }}>
                  Partnered with <strong style={{ color: PAPER, fontWeight: 500 }}>GRIFFIN BANK LTD</strong> · FCA authorised (FRN 970920)
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── ACTIVITY ─────────────────────────────────────────────────── */}
        {proofImages.length > 0 && (
          <section style={{ position: "relative", zIndex: 2, margin: "100px 0" }}>
            <div className="rb-wrap">
              <div className="rb-section-head">
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.025em", color: INK }}>
                  My actual <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>account</em>.
                </h2>
                <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>§ vi · Proof</div>
              </div>

              <div className="rb-activity-grid">
                {/* Left: text */}
                <div>
                  <h3 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(32px, 3.5vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: INK, marginBottom: 24 }}>
                    This is from my real Ribbon account last month.
                  </h3>
                  <p style={{ fontSize: 16, color: INK_SOFT, lineHeight: 1.6, marginBottom: 16 }}>
                    On 31 March 2026 I paid £795 in rent. It forwarded to my landlord, I got a downloadable proof of payment, and the points landed the same day — including a 2,500-point referral bonus from someone using my code.
                  </p>
                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                    The redeem options are the part most people don&apos;t expect: Amazon, Eurostar, Deliveroo, Hotels.com, Apple, Ryanair, Nike, Nando&apos;s, John Lewis, Asda — all common stuff you&apos;d actually spend money on anyway.
                  </p>

                  <ul style={{ marginTop: 28, listStyle: "none", padding: 0 }}>
                    {[
                      { label: "Rent paid forward", value: "£795.00", green: false },
                      { label: "Points earned (1%)", value: "+795 pts", green: true },
                      { label: "Referral bonus", value: "+2,500 pts", green: true },
                      { label: "Total month value", value: "£33.00", green: true },
                    ].map((item, i, arr) => (
                      <li key={item.label} style={{ padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px dashed ${RULE}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
                        <span style={{ color: MUTED }}>{item.label}</span>
                        <span style={{ fontFamily: "var(--font-jb-mono)", color: item.green ? E : INK, fontWeight: 500 }}>{item.value}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Shopping + travel images */}
                  {proofImages.length >= 3 && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 }}>
                      {[proofImages[1], proofImages[2]].map((img) => (
                        <figure key={img.src} style={{ margin: 0, position: "relative", aspectRatio: "9/16", borderRadius: 8, overflow: "hidden", border: `1px solid ${RULE}` }}>
                          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 900px) 50vw, 260px" />
                        </figure>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: main proof image */}
                <figure
                  className="rb-proof-img"
                  style={{ margin: 0, position: "relative", aspectRatio: "9/16", borderRadius: 8, overflow: "hidden", border: `1px solid ${RULE}`, boxShadow: SHADOW_LG, transform: "rotate(-1deg)", cursor: "pointer" }}
                  onClick={() => { trackRibbonSocialProofClick(); }}
                >
                  <Image src={proofImages[0].src} alt={proofImages[0].alt} fill className="object-cover" sizes="(max-width: 900px) 100vw, 500px" />
                </figure>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        {faqItems.length > 0 && (
          <section style={{ position: "relative", zIndex: 2, margin: "100px 0" }} aria-labelledby="ribbon-faq-heading">
            <div className="rb-wrap">
              <div className="rb-section-head">
                <h2 id="ribbon-faq-heading" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.025em", color: INK }}>
                  The <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>actual</em> questions you&apos;ll have.
                </h2>
                <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>§ vii · FAQ</div>
              </div>
              <FaqAccordion items={faqItems} />
            </div>
          </section>
        )}

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 2, margin: "100px 0 80px" }}>
          <div className="rb-wrap">
            <div style={{ textAlign: "center", padding: "80px 32px", background: PAPER_CARD, border: `1px solid ${RULE}`, borderRadius: 4, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${E} 0%, ${E} 40%, ${PLUM} 40%, ${PLUM} 70%, ${GOLD} 70%, ${GOLD} 100%)` }} />
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontVariationSettings: serif(144), fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.025em", color: INK, marginBottom: 24, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
                Stop leaving <em style={{ fontStyle: "italic", fontVariationSettings: serif(144, 0, 1), color: E }}>money</em> on the table.
              </h2>
              <p style={{ fontSize: 18, color: MUTED, marginBottom: 36, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
                Takes about 4 minutes. Costs nothing. Earns you £25 + whatever 1% of your annual rent is — every year you keep using it.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                <Link
                  href={referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProviderCtaClick(brand.slug)}
                  style={{ background: INK, color: PAPER, padding: "18px 28px", borderRadius: 3, textDecoration: "none", fontWeight: 500, fontSize: 16, letterSpacing: "-0.005em", display: "inline-flex", alignItems: "center", gap: 10 }}
                >
                  Claim my £25 + cashback <span>→</span>
                </Link>
                <div style={{ fontFamily: "var(--font-jb-mono)", fontSize: 14, color: MUTED, padding: "16px 18px", border: `1px dashed ${RULE}`, borderRadius: 3, background: "white" }}>
                  Referral code: <strong style={{ color: INK, fontWeight: 600, marginLeft: 6 }}>{referralCode}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
