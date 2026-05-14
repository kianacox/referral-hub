"use client";

import { useState } from "react";
import Link from "next/link";
import { trackProviderCtaClick } from "@/lib/analytics";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent, FaqItem } from "@/content/landing-pages";

// ── Design tokens (CSS custom properties set on root div) ─────────────────
const CSS_VARS = `
  --paper: #F4F1EA;
  --ink: #0E1411;
  --ink-soft: #2A332E;
  --muted: #6B7269;
  --rule: #D9D2C2;
  --rule-soft: #E5DFD0;
  --vm-red: #C8102E;
  --vm-red-dark: #9B0E25;
  --vm-red-soft: #F4DDDF;
  --vm-charcoal: #1A0E10;
  --emerald: #0F6B47;
  --emerald-soft: #DCE9DE;
  --gold: #B8862C;
`;

const REFERRAL_LINK = "https://aklam.io/izBRNjvv";

// ── Shared shadow tokens ───────────────────────────────────────────────────
const SHADOW_MD = "0 2px 0 rgba(14,20,17,0.05), 0 8px 24px -8px rgba(14,20,17,0.12)";
const SHADOW_LG = "0 4px 0 rgba(14,20,17,0.04), 0 24px 48px -16px rgba(14,20,17,0.18)";

// ── Sub-components ─────────────────────────────────────────────────────────

/**
 * OfferCard — two-column card: offer rows on the left, reward panel on the right.
 */
export function OfferCard({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <div
      className="vm-offer-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        background: "#FBFAF6",
        border: "1px solid var(--rule)",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        boxShadow: SHADOW_LG,
        maxWidth: 880,
      }}
    >
      {/* Tri-colour top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background:
            "linear-gradient(90deg, var(--vm-red) 0%, var(--vm-red) 50%, var(--vm-charcoal) 50%, var(--vm-charcoal) 80%, var(--gold) 80%, var(--gold) 100%)",
        }}
        aria-hidden
      />

      {/* Left: offer rows */}
      <div className="vm-offer-left" style={{ padding: "40px 44px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono-jb)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--vm-red)",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 16,
              height: 1,
              background: "var(--vm-red)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          My referral · Real cash, not bill credit
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              borderBottom: "1px dashed var(--rule)",
              paddingBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 44,
                lineHeight: 1,
                color: "var(--vm-red)",
                letterSpacing: "-0.02em",
                minWidth: 110,
              }}
            >
              £50
            </div>
            <div style={{ flex: 1, fontSize: 14, color: "var(--muted)", lineHeight: 1.4 }}>
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>To you, paid by Aklamio</strong>
              <br />
              Withdraw to your bank or PayPal 60 days after install.
            </div>
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              borderBottom: "1px dashed var(--rule)",
              paddingBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 44,
                lineHeight: 1,
                color: "var(--vm-red)",
                letterSpacing: "-0.02em",
                minWidth: 110,
              }}
            >
              £50
            </div>
            <div style={{ flex: 1, fontSize: 14, color: "var(--muted)", lineHeight: 1.4 }}>
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>To me, the referrer</strong>
              <br />
              How this stays free for you — Aklamio covers both sides.
            </div>
          </div>

          {/* Row 3 */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 44,
                lineHeight: 1,
                color: "var(--vm-red)",
                letterSpacing: "-0.02em",
                minWidth: 110,
              }}
            >
              +
            </div>
            <div style={{ flex: 1, fontSize: 14, color: "var(--muted)", lineHeight: 1.4 }}>
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Up to £250 switching credit</strong>
              <br />
              Virgin&apos;s own offer (separate) covers exit fees from your current provider.
            </div>
          </div>
        </div>
      </div>

      {/* Right: reward panel */}
      <div
        className="vm-offer-right"
        style={{
          background: "var(--vm-charcoal)",
          color: "var(--paper)",
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-30%",
            width: 280,
            height: 280,
            background: "radial-gradient(circle, rgba(200,16,46,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
          aria-hidden
        />
        {/* Left border gradient */}
        <div
          className="vm-offer-divider"
          style={{
            position: "absolute",
            top: 20,
            bottom: 20,
            left: 0,
            width: 1,
            background: "linear-gradient(180deg, transparent, var(--vm-red), transparent)",
            opacity: 0.5,
          }}
          aria-hidden
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-mono-jb)",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(244,241,234,0.5)",
              marginBottom: 12,
            }}
          >
            Your reward
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: 72,
              lineHeight: 1,
              color: "var(--paper)",
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>£</em>50
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(244,241,234,0.6)",
              lineHeight: 1.4,
              marginBottom: 28,
              maxWidth: 230,
            }}
          >
            Paid as real cash to your bank or PayPal — usually within 60 days of installation.
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            href={REFERRAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCtaClick}
            className="vm-cta-main"
            style={{
              display: "block",
              background: "var(--vm-red)",
              color: "var(--paper)",
              padding: "16px 20px",
              borderRadius: 3,
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "-0.01em",
              border: "1px solid var(--vm-red)",
            }}
          >
            Claim my £50 cash →
          </Link>
          <div
            style={{
              marginTop: 14,
              fontFamily: "var(--font-mono-jb)",
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "rgba(244,241,234,0.45)",
              textAlign: "center",
            }}
          >
            Opens Aklamio · Tracking automatic
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * TrustStrip — three inline trust items below the offer card.
 */
export function TrustStrip() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        marginTop: 32,
        paddingTop: 28,
        borderTop: "1px solid var(--rule)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-soft)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 7L6 9L10 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
        <span>
          Paid by <strong style={{ fontWeight: 600 }}>BACS or PayPal</strong> — not vouchers
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-soft)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 1L12 3V7C12 10 9.5 12.5 7 13C4.5 12.5 2 10 2 7V3L7 1Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span>
          Powered by <strong style={{ fontWeight: 600 }}>Aklamio</strong>, Virgin&apos;s official partner
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-soft)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span>
          £50 confirmed <strong style={{ fontWeight: 600 }}>after 60 days</strong>
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    num: "01",
    title: "Click my link",
    body: "Hit the red button anywhere on this page. You'll land on the official Aklamio portal and be forwarded to Virgin's checkout — your referral is tracked automatically.",
    aside: "~ 5 seconds",
  },
  {
    num: "02",
    title: "Order online",
    body: "Pick any eligible Virgin Media package — broadband, TV, home phone or a Volt bundle. Standard checkout, same prices as going direct.",
    aside: "~ 8 minutes",
  },
  {
    num: "03",
    title: "Install & settle in",
    body: "Virgin sends an engineer or a QuickStart self-install kit. Keep the service active past the 14-day cooling-off period.",
    aside: "7–14 days to install",
  },
  {
    num: "04",
    title: "Withdraw £50",
    body: "Around 60 days after install, Aklamio confirms the reward. Log in, hit withdraw, and the cash lands in your bank or PayPal in a few working days.",
    aside: "Real money · No vouchers",
  },
];

/**
 * HowItWorksGrid — four-column step grid.
 */
export function HowItWorksGrid() {
  return (
    <div
      className="vm-steps-grid"
      style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: "1px solid var(--rule)" }}
    >
      {HOW_STEPS.map((step) => (
        <div
          key={step.num}
          className="vm-step"
          style={{ padding: "32px 28px", borderRight: "1px solid var(--rule)", position: "relative" }}
        >
          <div
            className="vm-step-num"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 56,
              lineHeight: 1,
              color: "var(--rule)",
              marginBottom: 36,
            }}
          >
            {step.num}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: 22,
              lineHeight: 1.2,
              color: "var(--ink)",
              marginBottom: 12,
              letterSpacing: "-0.01em",
            }}
          >
            {step.title}
          </h3>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>{step.body}</p>
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px dashed var(--rule)",
              fontFamily: "var(--font-mono-jb)",
              fontSize: 11,
              color: "var(--vm-red)",
              letterSpacing: "0.05em",
            }}
          >
            {step.aside}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const ELIG_YES = [
  "You're new to Virgin Media (or haven't been a customer in the last 6 months)",
  "You're signing up to broadband, TV, home phone or a Volt bundle",
  "You're on a contract of at least 12 months (rolling student deals also qualify)",
  "Virgin Media is available at your postcode",
  "You order via my Aklamio link or quote the code at checkout",
];

const ELIG_NO = [
  "You've had any Virgin Media service in the last 6 months",
  "You're on Mates Rates, My Rates, Tribe or Partner Rates",
  "You're upgrading or extending an existing Virgin Media contract",
  "You're a Virgin Media or O2 employee",
  "You're on a 30-day rolling contract or Essential broadband social tariff",
];

/**
 * EligibilityGrid — YES/NO two-column eligibility check.
 */
export function EligibilityGrid() {
  return (
    <div
      className="vm-elig-grid"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
    >
      {/* YES column */}
      <div
        style={{
          background: "#FBFAF6",
          border: "1px solid var(--rule)",
          borderRadius: 4,
          padding: 36,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: 22,
            color: "var(--ink)",
            marginBottom: 24,
            paddingBottom: 20,
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            letterSpacing: "-0.01em",
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--emerald-soft)",
              color: "var(--emerald)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          You&apos;re in if…
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {ELIG_YES.map((item, i) => (
            <li
              key={i}
              style={{
                padding: "12px 0",
                color: "var(--ink-soft)",
                fontSize: 15,
                lineHeight: 1.5,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                borderBottom: i < ELIG_YES.length - 1 ? "1px dashed var(--rule-soft)" : "none",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--emerald)",
                  marginTop: 9,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* NO column */}
      <div
        style={{
          background: "#FBFAF6",
          border: "1px solid var(--rule)",
          borderRadius: 4,
          padding: 36,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: 22,
            color: "var(--ink)",
            marginBottom: 24,
            paddingBottom: 20,
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            letterSpacing: "-0.01em",
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--vm-red-soft)",
              color: "var(--vm-red-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
          Sorry, not this time if…
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {ELIG_NO.map((item, i) => (
            <li
              key={i}
              style={{
                padding: "12px 0",
                color: "var(--ink-soft)",
                fontSize: 15,
                lineHeight: 1.5,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                borderBottom: i < ELIG_NO.length - 1 ? "1px dashed var(--rule-soft)" : "none",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--vm-red-dark)",
                  marginTop: 9,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const PACKAGES = [
  { name: "M125 Fibre", sub: "Entry-level broadband", speed: "132 Mbps", price: "£23.99 / mo", featured: false },
  { name: "M250 Fibre", sub: "Most popular tier", speed: "264 Mbps", price: "£33.99 / mo", featured: false },
  { name: "M500 Fibre", sub: "Streaming households", speed: "516 Mbps", price: "£38.99 / mo", featured: true },
  { name: "Gig1 Fibre", sub: "Full-fat gigabit", speed: "1,136 Mbps", price: "£44.99 / mo", featured: false },
  { name: "Volt Bundle", sub: "Virgin broadband + O2 SIM", speed: "Tier + boost", price: "Bundle pricing", featured: false },
];

/**
 * PackagesLedger — table showing available packages and cashback.
 */
export function PackagesLedger() {
  return (
    <div
      style={{
        background: "#FBFAF6",
        border: "1px solid var(--rule)",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: SHADOW_MD,
      }}
    >
      {/* Header */}
      <div
        className="vm-ledger-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          padding: "18px 32px",
          background: "#EDE7DA",
          borderBottom: "1px solid var(--rule)",
          fontFamily: "var(--font-mono-jb)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "var(--ink-soft)",
        }}
      >
        <span>Package</span>
        <span>Avg speed</span>
        <span>From</span>
        <span>Your cashback</span>
      </div>

      {PACKAGES.map((pkg) => (
        <div
          key={pkg.name}
          className="vm-ledger-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            padding: "24px 32px",
            borderBottom: "1px solid var(--rule-soft)",
            alignItems: "center",
            background: pkg.featured
              ? "linear-gradient(90deg, var(--vm-red-soft) 0%, transparent 100%)"
              : undefined,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 500,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {pkg.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans-tight)",
                fontSize: 12,
                color: "var(--muted)",
                fontWeight: 400,
                marginTop: 4,
              }}
            >
              {pkg.sub}
            </div>
          </div>
          <div
            className="vm-ledger-hide-mid"
            style={{ fontFamily: "var(--font-mono-jb)", fontSize: 14, color: "var(--ink-soft)" }}
          >
            {pkg.speed}
          </div>
          <div
            className="vm-ledger-hide-mid"
            style={{ fontFamily: "var(--font-mono-jb)", fontSize: 14, color: "var(--ink-soft)" }}
          >
            {pkg.price}
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 22,
              fontWeight: 500,
              color: "var(--vm-red)",
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            £50
            {pkg.featured && (
              <span
                style={{
                  fontFamily: "var(--font-mono-jb)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  background: "var(--vm-red)",
                  color: "var(--paper)",
                  padding: "3px 8px",
                  borderRadius: 2,
                  fontWeight: 500,
                }}
              >
                Sweet spot
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Disclaimer footnote */}
      <div
        style={{
          padding: "16px 32px",
          background: "#EDE7DA",
          fontSize: 13,
          color: "var(--muted)",
          fontStyle: "italic",
          borderTop: "1px solid var(--rule)",
        }}
      >
        Prices reflect Virgin&apos;s published new-customer offers and may vary by postcode. The £50 referral is the same flat rate across all eligible packages.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    num: "01 · Speed",
    title: "Gig1 fibre, up to 1.1Gbps",
    body: "Virgin's full-fat tier averages 1,136Mbps — over 9× the UK fibre average. M125 starts at £23.99/month with average speeds of 132Mbps.",
    stat: "M125 · M250 · M350 · M500 · Gig1",
  },
  {
    num: "02 · Reliability",
    title: "UK's most reliable network",
    body: "Named \"Most Reliable Broadband Provider\" by Uswitch in 2025 and 2026. Built on Virgin's own dedicated cable network — not Openreach.",
    stat: "2× Uswitch winner · Opensignal verified",
  },
  {
    num: "03 · Volt benefits",
    title: "Free perks if you've got an O2 SIM",
    body: "Pair Virgin broadband with any O2 Pay Monthly plan and unlock: speed boost to the next tier, double mobile data, WiFi guarantee with up to 3 free pods, and roaming in 75 countries.",
    stat: "Worth up to £692/yr — at no extra cost",
  },
  {
    num: "04 · Switch credit",
    title: "Up to £250 toward exit fees",
    body: "If you're tied into another provider, Virgin pays up to £250 of your early termination fees — separately from the £50 referral. Submit your final bill within 60 days of activation.",
    stat: "Virgin's official offer",
  },
];

/**
 * WhyVirginSection — full-bleed dark charcoal section.
 * Uses 100vw trick to break out of the content column.
 */
export function WhyVirginSection() {
  return (
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(-1 * (100vw - 100%) / 2)",
        background: "var(--vm-charcoal)",
        color: "var(--paper)",
        padding: "80px 0",
        margin: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(200,16,46,0.18) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(200,16,46,0.10) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 64px",
          position: "relative",
          zIndex: 1,
        }}
        className="vm-why-inner"
      >
        {/* Header */}
        <div
          className="vm-why-head"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 80,
            marginBottom: 64,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono-jb)",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--vm-red)",
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: "var(--vm-red)",
                  display: "inline-block",
                }}
              />
              Why switch
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(34px, 4vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--paper)",
              }}
            >
              Beyond the £50 —<br />why Virgin&apos;s{" "}
              <em style={{ fontStyle: "italic", color: "var(--vm-red)", opacity: 0.95 }}>worth</em>{" "}
              the switch.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: 20,
              lineHeight: 1.5,
              color: "rgba(244,241,234,0.7)",
            }}
          >
            Virgin Media has been named the UK&apos;s most reliable broadband provider two years running, and the Volt bundle (with O2) layers in mobile, free WiFi pods and roaming benefits worth up to £692 a year. Here&apos;s what you actually get.
          </p>
        </div>

        {/* Feature grid */}
        <div
          className="vm-feature-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "rgba(244,241,234,0.1)",
            border: "1px solid rgba(244,241,234,0.1)",
          }}
        >
          {FEATURES.map((feat) => (
            <div
              key={feat.num}
              className="vm-feature"
              style={{
                background: "var(--vm-charcoal)",
                padding: "36px 32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono-jb)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--vm-red)",
                  marginBottom: 20,
                }}
              >
                {feat.num}
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  fontSize: 22,
                  color: "var(--paper)",
                  marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}
              >
                {feat.title}
              </h4>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(244,241,234,0.65)",
                  lineHeight: 1.55,
                  marginBottom: 12,
                }}
              >
                {feat.body}
              </p>
              <div
                style={{
                  fontFamily: "var(--font-mono-jb)",
                  fontSize: 11,
                  letterSpacing: "0.05em",
                  color: "rgba(244,241,234,0.4)",
                  paddingTop: 12,
                  borderTop: "1px dashed rgba(244,241,234,0.15)",
                  display: "inline-block",
                  marginTop: 8,
                  width: "100%",
                }}
              >
                {feat.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 32,
            borderTop: "1px solid rgba(244,241,234,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "rgba(244,241,234,0.5)",
              fontFamily: "var(--font-mono-jb)",
              letterSpacing: "0.02em",
            }}
          >
            Referral programme officially run by{" "}
            <strong style={{ color: "var(--paper)", fontWeight: 500 }}>AKLAMIO GMBH</strong> — Virgin Media&apos;s authorised reward partner
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(244,241,234,0.5)",
              fontFamily: "var(--font-mono-jb)",
              letterSpacing: "0.02em",
            }}
          >
            <a
              href="https://www.virginmedia.com/help/refer-a-friend"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--paper)",
                borderBottom: "1px solid rgba(244,241,234,0.3)",
                textDecoration: "none",
              }}
            >
              Virgin&apos;s official terms →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * FaqAccordion — accepts items prop; first item open by default.
 */
export function FaqAccordion({ items }: { items: Array<FaqItem> }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? -1 : i);
  }

  return (
    <div style={{ borderTop: "1px solid var(--rule)" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--rule)" }}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                padding: "24px 0",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                background: "none",
                border: "none",
                textAlign: "left",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(18px, 1.8vw, 22px)",
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  flex: 1,
                }}
              >
                {item.question}
              </h4>
              {/* Toggle icon */}
              <span
                style={{
                  width: 28,
                  height: 28,
                  border: "1px solid var(--rule)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: isOpen ? "var(--vm-red)" : "transparent",
                  borderColor: isOpen ? "var(--vm-red)" : "var(--rule)",
                  position: "relative",
                }}
                aria-hidden
              >
                {/* Horizontal bar */}
                <span
                  style={{
                    position: "absolute",
                    width: 12,
                    height: 1,
                    background: isOpen ? "var(--paper)" : "var(--ink)",
                  }}
                />
                {/* Vertical bar */}
                <span
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 12,
                    background: isOpen ? "var(--paper)" : "var(--ink)",
                    transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 0.3s",
                  }}
                />
              </span>
            </button>

            <div
              style={{
                maxHeight: isOpen ? 500 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}
            >
              <p
                style={{
                  paddingBottom: 28,
                  color: "var(--ink-soft)",
                  lineHeight: 1.65,
                  maxWidth: 760,
                  fontSize: 15,
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type VirginMediaLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

/**
 * VirginMediaLandingPage — root component.
 */
export function VirginMediaLandingPage({ brand: _brand, content }: VirginMediaLandingPageProps) {
  const faqItems = content.faq ?? [];

  function handleCtaClick() {
    trackProviderCtaClick("virgin-media");
  }

  return (
    <>
      {/* CSS custom properties + keyframes */}
      <style>{`
        .vm-root { ${CSS_VARS} }
        .wave-underline::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 8px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8' preserveAspectRatio='none'%3E%3Cpath d='M0 4 Q 25 0 50 4 T 100 4' stroke='%23C8102E' stroke-width='1.5' fill='none' opacity='0.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #C8102E;
          opacity: 0.3;
          animation: vm-pulse 2s ease-in-out infinite;
        }
        @keyframes vm-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        .vm-step:hover { background: rgba(200,16,46,0.03); }
        .vm-step:hover .vm-step-num { color: var(--vm-red); }
        .vm-cta-main:hover { background: var(--paper) !important; color: var(--vm-charcoal) !important; border-color: var(--paper) !important; }
        .vm-feature:hover { background: rgba(200,16,46,0.06); }
        @media (max-width: 900px) {
          .vm-wrap { padding: 0 20px !important; }
          .vm-offer-card { grid-template-columns: 1fr !important; max-width: 100% !important; }
          .vm-offer-left { padding: 28px 24px !important; }
          .vm-offer-right { padding: 28px 24px !important; }
          .vm-offer-divider { display: none !important; }
          .vm-steps-grid { grid-template-columns: 1fr 1fr !important; border-top: 1px solid var(--rule) !important; }
          .vm-elig-grid { grid-template-columns: 1fr !important; }
          .vm-why-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .vm-why-inner { padding: 0 24px !important; }
          .vm-feature-grid { grid-template-columns: 1fr !important; }
          .vm-ledger-row { grid-template-columns: 1.4fr 1fr !important; }
          .vm-ledger-hide-mid { display: none !important; }
        }
      `}</style>

      <div
        className="vm-root"
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          fontFamily: "var(--font-sans-tight), -apple-system, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 10% 0%, rgba(200,16,46,0.04) 0%, transparent 40%), radial-gradient(circle at 90% 100%, rgba(15,107,71,0.03) 0%, transparent 40%)",
          backgroundAttachment: "fixed",
          overflowX: "hidden",
        }}
      >
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 0 60px", position: "relative" }}>
          <div
            className="vm-wrap"
            style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}
          >
            {/* Meta row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 36,
                fontFamily: "var(--font-mono-jb)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              <span style={{ position: "relative", display: "flex" }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--vm-red)",
                    display: "block",
                  }}
                />
                <span
                  className="pulse-dot"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                  }}
                />
              </span>
              <span>Live referral · Aklamio verified</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>Updated May 2026</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(44px, 7vw, 92px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                maxWidth: 900,
                marginBottom: 32,
              }}
            >
              <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>£50 cash</em> for joining the UK&apos;s{" "}
              <span
                className="wave-underline"
                style={{ position: "relative", display: "inline-block" }}
              >
                most reliable
              </span>{" "}
              broadband.
            </h1>

            {/* Lede */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(20px, 2vw, 24px)",
                lineHeight: 1.45,
                color: "var(--ink-soft)",
                maxWidth: 640,
                marginBottom: 56,
              }}
            >
              Sign up to a Virgin Media broadband, TV or Volt package through my refer-a-friend link and Aklamio pays us both £50 — straight to your bank account or PayPal. Not bill credit. Real cash.
            </p>

            <OfferCard onCtaClick={handleCtaClick} />
            <TrustStrip />
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
        <section style={{ margin: "100px 0" }}>
          <div
            className="vm-wrap"
            style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                borderBottom: "1px solid var(--rule)",
                paddingBottom: 24,
                marginBottom: 56,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(34px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  maxWidth: 760,
                }}
              >
                How the <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>cash</em> reaches you.
              </h2>
            </div>
            <HowItWorksGrid />
          </div>
        </section>

        {/* ── ELIGIBILITY ───────────────────────────────────────────────── */}
        <section style={{ margin: "100px 0" }}>
          <div
            className="vm-wrap"
            style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                borderBottom: "1px solid var(--rule)",
                paddingBottom: 24,
                marginBottom: 56,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(34px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  maxWidth: 760,
                }}
              >
                Quick check — are{" "}
                <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>you</em> eligible?
              </h2>
            </div>
            <EligibilityGrid />
          </div>
        </section>

        {/* ── WHY VIRGIN (full-bleed) ────────────────────────────────────── */}
        <WhyVirginSection />

        {/* ── PACKAGES LEDGER ───────────────────────────────────────────── */}
        <section style={{ margin: "100px 0" }}>
          <div
            className="vm-wrap"
            style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                borderBottom: "1px solid var(--rule)",
                paddingBottom: 24,
                marginBottom: 56,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(34px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  maxWidth: 760,
                }}
              >
                What you&apos;ll <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>actually</em> pay.
              </h2>
            </div>
            <PackagesLedger />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        {faqItems.length > 0 && (
          <section style={{ margin: "100px 0" }} aria-labelledby="vm-faq-heading">
            <div
              className="vm-wrap"
              style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: 24,
                  marginBottom: 56,
                }}
              >
                <h2
                  id="vm-faq-heading"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    fontSize: "clamp(34px, 4vw, 52px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: "var(--ink)",
                    maxWidth: 760,
                  }}
                >
                  The <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>actual</em> questions you&apos;ll have.
                </h2>
              </div>
              <FaqAccordion items={faqItems} />
            </div>
          </section>
        )}

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section style={{ margin: "100px 0 80px" }}>
          <div
            className="vm-wrap"
            style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "80px 32px",
                background: "#FBFAF6",
                border: "1px solid var(--rule)",
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Tri-colour top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background:
                    "linear-gradient(90deg, var(--vm-red) 0%, var(--vm-red) 50%, var(--vm-charcoal) 50%, var(--vm-charcoal) 80%, var(--gold) 80%, var(--gold) 100%)",
                }}
                aria-hidden
              />
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(34px, 5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  marginBottom: 24,
                  maxWidth: 760,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Don&apos;t switch{" "}
                <em style={{ fontStyle: "italic", color: "var(--vm-red)" }}>without</em> the £50.
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: "var(--muted)",
                  marginBottom: 36,
                  maxWidth: 580,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Same Virgin Media, same packages, same prices — plus £50 cash to your bank account that you&apos;d otherwise leave on the table.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Link
                  href={REFERRAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCtaClick}
                  style={{
                    background: "var(--vm-red)",
                    color: "var(--paper)",
                    padding: "18px 28px",
                    borderRadius: 3,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: "-0.005em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    border: "1px solid var(--vm-red)",
                  }}
                >
                  Claim my £50 cash <span>→</span>
                </Link>
                <a
                  href="https://www.virginmedia.com/help/refer-a-friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--ink-soft)",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono-jb)",
                    fontSize: 13,
                    letterSpacing: "0.05em",
                    padding: "18px 8px",
                    borderBottom: "1px solid var(--rule)",
                  }}
                >
                  Read Virgin&apos;s terms →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOBILE STICKY CTA ─────────────────────────────────────────── */}
        <div
          className="vm-sticky-cta"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: "12px 16px",
            background: "var(--vm-charcoal)",
            display: "flex",
          }}
        >
          <Link
            href={REFERRAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            style={{
              flex: 1,
              background: "var(--vm-red)",
              color: "var(--paper)",
              padding: "16px 20px",
              borderRadius: 3,
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "-0.01em",
            }}
          >
            Claim my £50 cash →
          </Link>
        </div>

        {/* Hidden SEO field */}
        <div className="sr-only">{content.seoTitle}</div>
      </div>

      {/* Hide mobile sticky CTA on md+ */}
      <style>{`
        @media (min-width: 768px) {
          .vm-sticky-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default VirginMediaLandingPage;
