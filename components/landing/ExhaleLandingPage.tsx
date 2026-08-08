"use client";

import { useState } from "react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import {
  trackBrandTrustpilotClick,
  trackProviderCtaClick,
} from "@/lib/analytics";

const COLORS = {
  ink: "#131313",
  body: "#4B4F4C",
  muted: "#6B7872",
  cream: "#FAF7F2",
  line: "#E6E2D8",
  green: "#1E7A55",
  greenTint: "#E7F4EC",
  mint: "#7CCBA0",
  mintSoft: "#A6DFC1",
  white: "#ffffff",
};

const DISPLAY_FONT = "var(--font-poppins), Poppins, sans-serif";
const BODY_FONT = "Inter, -apple-system, BlinkMacSystemFont, sans-serif";

const CTA_LABEL = "claim 50% off";

// ---- Inline icons (matching the design's SVGs) ----

type IconProps = { size?: number };

function BoltIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function ShieldIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LeafIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    </svg>
  );
}

function ClockIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function BoxIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M3 8l9-6 9 6" />
    </svg>
  );
}

function StarIcon({ size = 13 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ChevronIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.green}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/** Exhale's sunrise mark: mint half-disc with radiating rays. */
function SunriseMark({
  height,
  width = "100%",
  rayStroke = "#ffffff",
  rayWidth = 2,
  style,
}: {
  height: number;
  width?: number | string;
  rayStroke?: string;
  rayWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 72 40"
      preserveAspectRatio="xMidYMax meet"
      style={{ display: "block", ...style }}
    >
      <path d="M16 40 A20 20 0 0 1 56 40 Z" fill={COLORS.mint} />
      <g stroke={rayStroke} strokeWidth={rayWidth} strokeLinecap="round">
        <line x1="58.6" y1="31.8" x2="68" y2="28.4" />
        <line x1="51.4" y1="21.6" x2="57.8" y2="13.9" />
        <line x1="40.2" y1="16.4" x2="41.9" y2="6.5" />
        <line x1="31.8" y1="16.4" x2="30.1" y2="6.5" />
        <line x1="20.6" y1="21.6" x2="14.2" y2="13.9" />
        <line x1="13.4" y1="31.8" x2="4" y2="28.4" />
      </g>
    </svg>
  );
}

// ---- Page copy (from the design; not brand-configurable) ----

const HERO_TRUST = [
  { icon: <ShieldIcon size={18} />, text: "Tested by independent labs" },
  { icon: <LeafIcon size={18} />, text: "Soil Association organic" },
  { icon: <ClockIcon size={18} />, text: "Pause or cancel anytime" },
];

const BENEFITS = [
  { icon: <BoltIcon />, text: "Lab-verified antioxidant levels" },
  { icon: <ShieldIcon />, text: "Screened for mould, pesticides & heavy metals" },
  { icon: <LeafIcon />, text: "Soil Association certified organic" },
  { icon: <BoxIcon />, text: "B Corp, compostable letterbox packaging" },
];

const REASONS = [
  {
    icon: <ShieldIcon />,
    title: "tested 9 ways, every batch",
    body: "Independent labs screen each batch for mould, mycotoxins, pesticide residues and heavy metals — and confirm what’s in the cup, not just what’s claimed on the bag.",
  },
  {
    icon: <LeafIcon />,
    title: "certified organic",
    body: "Soil Association certified and grown without synthetic pesticides — a cleaner daily cup for people who drink coffee every single day.",
  },
  {
    icon: <BoltIcon />,
    title: "polyphenols plus vitamin B3",
    body: "Naturally rich in chlorogenic acid, the polyphenol most studied in coffee. Exhale’s figures put two cups at roughly 20% of your daily niacin (vitamin B3).",
  },
  {
    icon: <ClockIcon />,
    title: "roasted to protect the good stuff",
    body: "Careless roasting destroys much of coffee’s antioxidant content. Exhale roasts speciality-grade beans in small batches in the UK, tuned to preserve chlorogenic acid.",
  },
  {
    icon: <BoxIcon />,
    title: "better for the planet too",
    body: "A certified B Corp and 1% for the Planet member, shipping in plastic-free compostable bags that fit through your letterbox.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "click my referral link",
    body: "Hit the black button anywhere on this page to open Exhale Coffee.",
  },
  {
    n: "2",
    title: "pick your roast & subscription",
    body: "Choose beans or ground and a delivery schedule that suits you — pause or reschedule anytime.",
  },
  {
    n: "3",
    title: "50% off at checkout",
    body: "The discount is applied to your first subscription order automatically.",
  },
];

// ---- Shared style fragments ----

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: DISPLAY_FONT,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
  color: COLORS.ink,
  fontSize: "clamp(27px, 3.6vw, 42px)",
  textTransform: "lowercase",
};

const eyebrowStyle: React.CSSProperties = {
  color: COLORS.green,
  fontWeight: 700,
  fontSize: "clamp(11.5px, 1vw, 13px)",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  marginBottom: 14,
  display: "inline-block",
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontFamily: DISPLAY_FONT,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.25,
  fontSize: "clamp(18px, 1.8vw, 21px)",
  textTransform: "lowercase",
};

const ctaBaseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "19px 34px",
  borderRadius: 999,
  fontFamily: DISPLAY_FONT,
  fontWeight: 600,
  fontSize: "clamp(16.5px, 1.4vw, 17.5px)",
  textDecoration: "none",
  lineHeight: 1,
};

type ExhaleLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

export function ExhaleLandingPage({ brand, content }: ExhaleLandingPageProps) {
  const referralLink = brand.referralLink ?? "";
  const hasLink = referralLink.trim() !== "";
  const faqItems = content.faq ?? [];
  const trustpilot = content.trustpilot;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleCtaClick = () => trackProviderCtaClick(brand.slug);
  const handleTrustpilotClick = () => trackBrandTrustpilotClick(brand.slug);

  const trustpilotBadge = trustpilot ? (
    <div
      className="ex-trustpilot"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 24,
        padding: "13px 17px",
        background: COLORS.white,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 15,
        boxShadow:
          "0 1px 2px rgba(19,19,19,0.05), 0 2px 8px rgba(19,19,19,0.04)",
        maxWidth: 430,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            aria-hidden
            style={{
              display: "flex",
              width: 21,
              height: 21,
              alignItems: "center",
              justifyContent: "center",
              background: COLORS.green,
              borderRadius: 4,
            }}
          >
            <StarIcon />
          </span>
        ))}
      </div>
      <div style={{ fontSize: 13, color: COLORS.body, lineHeight: 1.4 }}>
        <strong style={{ color: COLORS.ink }}>
          {trustpilot.score} on Trustpilot
        </strong>{" "}
        —{" "}
        <a
          href={trustpilot.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTrustpilotClick}
          style={{
            color: COLORS.green,
            textDecoration: "underline",
            textUnderlineOffset: 2,
          }}
        >
          read {brand.name}’s reviews
        </a>
      </div>
    </div>
  ) : null;

  return (
    <div
      className="ex-root"
      style={{
        fontFamily: BODY_FONT,
        color: COLORS.ink,
        background: COLORS.cream,
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes ex-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-10px) rotate(2deg); }
        }
        .ex-float-1 { animation: ex-float 6s ease-in-out infinite; }
        .ex-float-2 { animation: ex-float 6s ease-in-out infinite; animation-delay: 1.5s; }
        .ex-cta-dark:hover { background: #000000; }
        .ex-cta-mint:hover { background: ${COLORS.mintSoft}; }
        .ex-card-note { display: none; }
        .ex-hero-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        .ex-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 16px; }
        .ex-why-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .ex-steps-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .ex-hero-cta { width: 100%; }
        /* Lift the more-offers bar above this page's mobile sticky CTA */
        :root { --more-offers-bar-offset: 76px; }
        @media (min-width: 720px) {
          .ex-benefits-grid { grid-template-columns: repeat(4, 1fr); gap: 32px 24px; }
          .ex-why-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .ex-steps-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .ex-hero-cta { width: auto; }
          .ex-sticky-cta { display: none !important; }
          :root { --more-offers-bar-offset: 0px; }
        }
        @media (min-width: 960px) {
          .ex-hero-grid { grid-template-columns: 1.08fr 0.92fr; gap: 80px; }
          .ex-why-grid { grid-template-columns: repeat(3, 1fr); }
          .ex-card-note { display: block; }
        }
      `}</style>

      {/* ======== HERO ======== */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: COLORS.cream,
          padding: "clamp(44px, 6vw, 76px) 0 clamp(52px, 7vw, 92px)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 clamp(20px, 3vw, 24px)",
          }}
        >
          <div className="ex-hero-grid">
            {/* Left: copy */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: COLORS.ink,
                  color: COLORS.white,
                  padding: "8px 15px",
                  borderRadius: 999,
                  fontSize: "clamp(10.5px, 1vw, 12px)",
                  fontWeight: 700,
                  marginBottom: 24,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS.mint,
                    display: "inline-block",
                  }}
                />
                Ridiculously healthy coffee
              </div>

              <h1
                style={{
                  margin: "0 0 20px",
                  fontFamily: DISPLAY_FONT,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  fontSize: "clamp(35px, 5vw, 60px)",
                  color: COLORS.ink,
                  textTransform: "lowercase",
                }}
              >
                get{" "}
                <span
                  style={{
                    background: `linear-gradient(transparent 58%, ${COLORS.mintSoft} 58%)`,
                  }}
                >
                  50% off
                </span>{" "}
                coffee that’s actually good for you
              </h1>

              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: "clamp(16px, 1.6vw, 19px)",
                  color: COLORS.body,
                  maxWidth: 530,
                }}
              >
                Exhale is speciality coffee grown and roasted for health —
                lab-verified antioxidants, certified organic, delivered through
                your letterbox. My referral link takes half off your first
                subscription order.
              </p>

              {hasLink && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 28,
                  }}
                >
                  <a
                    href={referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCtaClick}
                    className="ex-cta-dark ex-hero-cta"
                    style={{
                      ...ctaBaseStyle,
                      background: COLORS.ink,
                      color: COLORS.white,
                      boxShadow: "0 8px 24px rgba(19,19,19,0.22)",
                      transition: "background 0.2s ease",
                    }}
                  >
                    {CTA_LABEL} <span style={{ color: COLORS.mint }}>→</span>
                  </a>
                  <span style={{ fontSize: 14, color: COLORS.muted }}>
                    Applied automatically at checkout
                  </span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px 28px",
                  fontSize: "clamp(14px, 1.3vw, 15px)",
                }}
              >
                {HERO_TRUST.map(({ icon, text }) => (
                  <span
                    key={text}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 500,
                      color: COLORS.green,
                    }}
                  >
                    {icon}
                    <span style={{ color: COLORS.body }}>{text}</span>
                  </span>
                ))}
              </div>

              {trustpilotBadge}
            </div>

            {/* Right: offer card */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="ex-card-note ex-float-1"
                style={{
                  position: "absolute",
                  top: 0,
                  left: -4,
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 14,
                  padding: "12px 16px",
                  boxShadow: "0 8px 24px rgba(19,19,19,0.10)",
                  fontSize: 13,
                  color: COLORS.body,
                  maxWidth: 220,
                  zIndex: 2,
                }}
              >
                <strong style={{ color: COLORS.green }}>
                  1 cup ≈ 12 punnets
                </strong>{" "}
                of blueberries in antioxidants
              </div>
              <div
                className="ex-card-note ex-float-2"
                style={{
                  position: "absolute",
                  bottom: -24,
                  right: -10,
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 14,
                  padding: "12px 16px",
                  boxShadow: "0 8px 24px rgba(19,19,19,0.10)",
                  fontSize: 13,
                  color: COLORS.body,
                  maxWidth: 170,
                  zIndex: 2,
                }}
              >
                <strong style={{ color: COLORS.green }}>9 lab tests</strong> on
                every single batch
              </div>

              <div
                style={{
                  position: "relative",
                  background: COLORS.ink,
                  borderRadius: 26,
                  padding: "30px 30px 26px",
                  width: "100%",
                  maxWidth: 400,
                  boxShadow: "0 24px 64px rgba(19,19,19,0.28)",
                  color: COLORS.white,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transform: "rotate(-3deg)",
                }}
              >
                <SunriseMark height={110} style={{ marginBottom: 16 }} />
                <div
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  referral offer
                </div>
                <div
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: "clamp(64px, 8vw, 88px)",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    textAlign: "center",
                    margin: "8px 0 6px",
                  }}
                >
                  50<span style={{ color: COLORS.mint }}>%</span>
                </div>
                <div
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: "clamp(17px, 2vw, 22px)",
                    fontWeight: 500,
                    textAlign: "center",
                    color: COLORS.mint,
                    textTransform: "lowercase",
                    marginBottom: 16,
                  }}
                >
                  off your first order
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255,255,255,0.14)",
                    paddingTop: 14,
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>
                    exhalecoffee.com
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>
                    applied at checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== BENEFITS BAR ======== */}
      <div
        style={{
          background: COLORS.white,
          borderTop: `1px solid ${COLORS.line}`,
          borderBottom: `1px solid ${COLORS.line}`,
          padding: "clamp(28px, 3vw, 40px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 clamp(20px, 3vw, 24px)",
          }}
        >
          <div className="ex-benefits-grid">
            {BENEFITS.map(({ icon, text }) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    background: COLORS.greenTint,
                    borderRadius: 999,
                    color: COLORS.green,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(12.5px, 1.3vw, 15px)",
                    color: COLORS.ink,
                    lineHeight: 1.3,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======== WHY EXHALE ======== */}
      <section
        style={{
          padding: "clamp(56px, 7vw, 96px) 0",
          background: COLORS.cream,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 clamp(20px, 3vw, 24px)",
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto clamp(36px, 5vw, 64px)",
              textAlign: "center",
            }}
          >
            <span style={eyebrowStyle}>Why Exhale</span>
            <h2 style={sectionHeadingStyle}>ridiculously healthy, verifiably</h2>
            <p
              style={{
                fontSize: "clamp(15.5px, 1.5vw, 17.5px)",
                margin: "16px 0 0",
                color: COLORS.body,
              }}
            >
              Every claim below comes from Exhale’s own published lab results
              and certifications — not marketing fluff.
            </p>
          </div>

          <div className="ex-why-grid">
            {/* Featured dark card */}
            <div
              style={{
                background: COLORS.ink,
                borderRadius: 22,
                padding: "clamp(26px, 3vw, 32px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <SunriseMark
                width={52}
                height={30}
                rayWidth={2.4}
                style={{ marginBottom: 18 }}
              />
              <h3 style={{ ...cardTitleStyle, color: COLORS.white }}>
                one cup ≈ the antioxidants of 12 punnets of blueberries
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(14px, 1.4vw, 15.5px)",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                Exhale sources naturally high-polyphenol beans and verifies each
                batch with independent labs — per their published results, one
                cup carries the antioxidant equivalent of 12 punnets of
                blueberries or 55 oranges.
              </p>
            </div>

            {REASONS.map(({ icon, title, body }) => (
              <div
                key={title}
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 22,
                  padding: "clamp(26px, 3vw, 32px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 46,
                    height: 46,
                    background: COLORS.greenTint,
                    borderRadius: 999,
                    color: COLORS.green,
                    marginBottom: 18,
                  }}
                >
                  {icon}
                </div>
                <h3 style={{ ...cardTitleStyle, color: COLORS.ink }}>{title}</h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(14px, 1.4vw, 15.5px)",
                    color: COLORS.body,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== STEPS ======== */}
      <section
        style={{
          padding: "clamp(56px, 7vw, 96px) 0",
          background: COLORS.white,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 clamp(20px, 3vw, 24px)",
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto clamp(32px, 5vw, 64px)",
              textAlign: "center",
            }}
          >
            <span style={eyebrowStyle}>How to redeem</span>
            <h2 style={sectionHeadingStyle}>half price in three steps</h2>
            <p
              style={{
                fontSize: "clamp(15.5px, 1.5vw, 17.5px)",
                margin: "16px 0 0",
                color: COLORS.body,
              }}
            >
              No code to remember — the discount is applied automatically at
              checkout.
            </p>
          </div>

          <div className="ex-steps-grid">
            {STEPS.map(({ n, title, body }) => (
              <div
                key={n}
                style={{
                  background: COLORS.cream,
                  borderRadius: 18,
                  padding: "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 28px)",
                  border: `1px solid ${COLORS.line}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 42,
                    height: 42,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    background: COLORS.mint,
                    color: COLORS.ink,
                    fontFamily: DISPLAY_FONT,
                    fontSize: 17,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  {n}
                </div>
                <h3
                  style={{
                    ...cardTitleStyle,
                    color: COLORS.ink,
                    fontSize: "clamp(15.5px, 1.6vw, 18.5px)",
                    marginBottom: 8,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(13.5px, 1.3vw, 14.5px)",
                    color: COLORS.body,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== MID CTA ======== */}
      <section
        style={{
          padding: "clamp(56px, 8vw, 104px) 0 0",
          background: COLORS.ink,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(20px, 3vw, 24px)",
            textAlign: "center",
            color: COLORS.white,
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              padding: "8px 15px",
              borderRadius: 999,
              fontSize: "clamp(12px, 1.2vw, 13px)",
              color: "rgba(255,255,255,0.9)",
              marginBottom: 22,
              fontWeight: 500,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                background: COLORS.mint,
                borderRadius: "50%",
                boxShadow: "0 0 0 4px rgba(124,203,160,0.2)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {trustpilot ? `${trustpilot.score} on Trustpilot · ` : ""}50% off
            first order
          </div>

          <h2 style={{ ...sectionHeadingStyle, color: COLORS.white, marginBottom: 16 }}>
            ready to switch your{" "}
            <span style={{ color: COLORS.mint }}>daily cup?</span>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(15px, 1.5vw, 17.5px)",
              margin: "0 auto 28px",
              maxWidth: 560,
            }}
          >
            Try Exhale at half price. If it’s not for you, pause or cancel the
            subscription in a couple of clicks — no commitment beyond the first
            bag.
          </p>

          {hasLink && (
            <a
              href={referralLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="ex-cta-mint"
              style={{
                ...ctaBaseStyle,
                display: "inline-flex",
                background: COLORS.mint,
                color: COLORS.ink,
                boxShadow: "0 8px 28px rgba(124,203,160,0.3)",
                transition: "background 0.2s ease",
              }}
            >
              {CTA_LABEL} →
            </a>
          )}

          <p
            style={{
              margin: "20px 0 0",
              fontSize: "clamp(12px, 1.2vw, 13px)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Full transparency: when you subscribe through my link, Exhale pays
            me £5. It costs you nothing extra.
          </p>
        </div>

        <svg
          aria-hidden="true"
          width="100%"
          height={150}
          viewBox="0 0 72 20"
          preserveAspectRatio="xMidYMax slice"
          style={{
            display: "block",
            marginTop: 40,
            height: "clamp(90px, 12vw, 150px)",
          }}
        >
          <path d="M16 20 A20 20 0 0 1 56 20 Z" fill={COLORS.mint} opacity="0.9" />
          <g stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round">
            <line x1="58.6" y1="11.8" x2="68" y2="8.4" />
            <line x1="51.4" y1="1.6" x2="57.8" y2="-6.1" />
            <line x1="13.4" y1="11.8" x2="4" y2="8.4" />
            <line x1="20.6" y1="1.6" x2="14.2" y2="-6.1" />
          </g>
        </svg>
      </section>

      {/* ======== FAQ ======== */}
      {faqItems.length > 0 && (
        <section
          aria-labelledby="exhale-faq-heading"
          style={{
            padding: "clamp(56px, 7vw, 96px) 0",
            background: COLORS.cream,
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "0 clamp(20px, 3vw, 24px)",
            }}
          >
            <div
              style={{ textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)" }}
            >
              <span style={eyebrowStyle}>FAQ</span>
              <h2 id="exhale-faq-heading" style={sectionHeadingStyle}>
                common questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.question}
                    style={{
                      background: COLORS.white,
                      border: `1px solid ${COLORS.line}`,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`exhale-faq-answer-${index}`}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "clamp(16px, 2vw, 20px) clamp(18px, 2vw, 24px)",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(14.5px, 1.5vw, 16.5px)",
                          fontWeight: 600,
                          color: COLORS.ink,
                        }}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden
                        style={{
                          display: "flex",
                          flexShrink: 0,
                          transition: "transform 0.2s",
                          transform: isOpen ? "rotate(180deg)" : "none",
                        }}
                      >
                        <ChevronIcon />
                      </span>
                    </button>
                    {isOpen && (
                      <p
                        id={`exhale-faq-answer-${index}`}
                        style={{
                          margin: 0,
                          padding: "0 clamp(18px, 2vw, 24px) clamp(16px, 2vw, 20px)",
                          color: COLORS.body,
                          fontSize: "clamp(13.5px, 1.4vw, 15.5px)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ======== STICKY MOBILE CTA ======== */}
      {hasLink && (
        <div
          className="ex-sticky-cta"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(8px)",
            borderTop: `1px solid ${COLORS.line}`,
            padding: "12px 16px",
            boxShadow: "0 -8px 24px -12px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 12.5, lineHeight: 1.3, color: COLORS.body }}>
            <strong style={{ color: COLORS.ink, display: "block" }}>
              50% off first order
            </strong>
            {brand.name} subscription
          </div>
          <a
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            style={{
              display: "inline-flex",
              flexShrink: 0,
              alignItems: "center",
              borderRadius: 999,
              background: COLORS.ink,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.white,
              fontFamily: DISPLAY_FONT,
              textDecoration: "none",
            }}
          >
            {CTA_LABEL}
          </a>
        </div>
      )}
    </div>
  );
}
