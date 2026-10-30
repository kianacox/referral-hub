"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  trackProviderCtaClick,
  trackProviderFaqOpen,
  trackProviderLinkCopy,
  type CtaPlacement,
} from "@/lib/analytics";
import type { Brand } from "@/lib/brands";
import type { FaqItem, LandingPageContent } from "@/content/landing-pages";

// ── Design tokens (CSS custom properties set on root div) ─────────────────
const CSS_VARS = `
  --kl-page: #faf7f2;
  --kl-surface: #ffffff;
  --kl-ink: #1a1918;
  --kl-ink-hover: #3a3430;
  --kl-body: #5c5852;
  --kl-muted: #706b65;
  --kl-rule: #e6e2d8;
  --kl-pink: #b0305c;
  --kl-pink-dark: #8a2347;
  --kl-pink-soft: #fbe8ee;
  --kl-pink-wash: #fdf3f6;
  --kl-hover-bg: #f3efe6;
`;

const TERMS_URL =
  "https://cdn.klarna.com/1.0/shared/content/legal/terms/en-GB/referral-general";
const MEMBERSHIPS_URL = "https://www.klarna.com/uk/memberships/";

const STEPS = [
  {
    title: "Open my invite link",
    body: "Tap “Sign up with my link” and accept the invite from Klarna.",
  },
  {
    title: "Choose a membership",
    body: "In the Klarna app, pick Everywhere, Plus, Premium or Max. You need to be 18+ with a valid payment method.",
  },
  {
    title: "Complete your invite steps",
    body: "Your invite shows the steps Klarna needs you to complete to unlock the reward.",
  },
  {
    title: "Track your reward",
    body: "Follow its status in the Klarna app. Rewards arrive as cashback points you redeem to your Klarna balance.",
  },
];

const TIERS = [
  { name: "Everywhere", price: "£0.99 first month, then £4.99/mo", cashback: "—", reward: "£6" },
  { name: "Plus", price: "£0.99 first month, then £9.99/mo", cashback: "0.5%", reward: "£13" },
  { name: "Premium", price: "£19.99/mo", cashback: "1%", reward: "£25" },
  { name: "Max", price: "£44.99/mo", cashback: "1.5%", reward: "£40" },
];

const serifFont = "var(--font-fraunces), Georgia, serif";
const monoFont = "var(--font-geist-mono), monospace";

const h2Style = {
  margin: 0,
  textAlign: "center",
  fontFamily: serifFont,
  fontWeight: 500,
  fontSize: 26,
  color: "var(--kl-ink)",
} as const;

const finePrintStyle = {
  margin: 0,
  fontSize: 12.5,
  lineHeight: 1.6,
  color: "var(--kl-muted)",
} as const;

// ── Sub-components ─────────────────────────────────────────────────────────

type SignUpLinkProps = { href: string; onClick: () => void };

/** SignUpLink — full-width dark CTA to the referral link. */
function SignUpLink({ href, onClick }: SignUpLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="kl-cta"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        padding: "0 20px",
        borderRadius: 10,
        background: "var(--kl-ink)",
        color: "#ffffff",
        fontSize: 15,
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: "0 10px 20px -10px rgba(26,25,24,0.45)",
        transition: "background-color 150ms, box-shadow 150ms",
      }}
    >
      Sign up with my link →
    </a>
  );
}

function TermsLink() {
  return (
    <a
      href={TERMS_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontWeight: 500, textDecoration: "none" }}
    >
      Reward terms set by Klarna ↗
    </a>
  );
}

type HeroProps = {
  link: string;
  copied: boolean;
  onCtaClick: () => void;
  onCopy: () => void;
};

/** Hero — headline, lede, CTA card with the copyable invite link. */
function Hero({ link, copied, onCtaClick, onCopy }: HeroProps) {
  return (
    <section
      aria-label="Klarna referral link"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 14,
        paddingTop: 4,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: serifFont,
          fontWeight: 500,
          fontSize: "clamp(32px, 7vw, 46px)",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          color: "var(--kl-ink)",
          maxWidth: 560,
          textWrap: "balance",
        }}
      >
        Klarna referral link UK
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: 16,
          lineHeight: 1.55,
          color: "var(--kl-body)",
          maxWidth: 480,
          textWrap: "pretty",
        }}
      >
        Join a Klarna membership through my invite link and get up to £40, depending on the
        membership you choose. It’s paid into the Klarna app as cashback points.
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 6,
          borderRadius: 12,
          border: "1px solid var(--kl-rule)",
          background: "var(--kl-surface)",
          padding: 14,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <SignUpLink href={link} onClick={onCtaClick} />
        <button
          type="button"
          onClick={onCopy}
          aria-live="polite"
          className="kl-copy-box"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            minHeight: 48,
            width: "100%",
            borderRadius: 8,
            border: `1px dashed ${copied ? "var(--kl-pink)" : "rgba(176,48,92,0.35)"}`,
            background: copied ? "var(--kl-pink-wash)" : "var(--kl-surface)",
            padding: "0 6px 0 14px",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background-color 200ms ease, border-color 200ms ease",
          }}
        >
          <code
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: monoFont,
              fontSize: 13,
              color: "var(--kl-ink)",
            }}
          >
            {link.replace(/^https?:\/\//, "")}
          </code>
          <span
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 84,
              height: 34,
              borderRadius: 6,
              background: copied ? "var(--kl-ink)" : "var(--kl-pink-soft)",
              color: copied ? "#ffffff" : "var(--kl-pink)",
              fontSize: 13,
              fontWeight: 600,
              transform: `scale(${copied ? 1.06 : 1})`,
              transition:
                "transform 180ms cubic-bezier(.3,1.6,.6,1), background-color 200ms ease, color 200ms ease",
            }}
          >
            {copied ? "Copied!" : "Copy link"}
          </span>
        </button>
      </div>

      <p style={{ ...finePrintStyle, marginTop: 2, maxWidth: 460 }}>
        My personal referral, not an official Klarna page. <TermsLink />
      </p>
    </section>
  );
}

/** Steps — four numbered steps that fade in once scrolled into view. */
function Steps() {
  const listRef = useRef<HTMLOListElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    const canObserve = Boolean(el) && "IntersectionObserver" in window;
    const io = canObserve
      ? new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) setRevealed(true);
          },
          { threshold: 0.15 },
        )
      : null;
    if (io && el) io.observe(el);
    // Never leave the steps invisible if the observer is missing or doesn't fire.
    const fallback = setTimeout(() => setRevealed(true), canObserve ? 1500 : 0);
    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section aria-label="How to get your reward" style={{ marginTop: 56 }}>
      <h2 style={{ ...h2Style, marginBottom: 18 }}>How to get your reward</h2>
      <ol
        ref={listRef}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 12,
        }}
      >
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              borderRadius: 12,
              border: "1px solid var(--kl-rule)",
              background: "var(--kl-surface)",
              padding: "16px 18px",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateY(10px)",
              transition: `opacity 500ms ease ${i * 90}ms, transform 500ms ease ${i * 90}ms`,
            }}
          >
            <span
              aria-hidden
              style={{
                flexShrink: 0,
                display: "flex",
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "var(--kl-pink-soft)",
                color: "var(--kl-pink)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {i + 1}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--kl-ink)" }}>
                {s.title}
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--kl-body)" }}>
                {s.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const thStyle = {
  padding: "10px 18px",
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--kl-muted)",
  borderBottom: "1px solid var(--kl-rule)",
  background: "var(--kl-page)",
} as const;

const numCellStyle = {
  textAlign: "right",
  fontSize: 15,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
} as const;

/** MembershipTable — price, cashback and referral reward per membership tier. */
function MembershipTable() {
  return (
    <section aria-label="Membership options" style={{ marginTop: 56 }}>
      <h2 style={{ ...h2Style, marginBottom: 6 }}>Membership options</h2>
      <p
        style={{
          margin: "0 0 18px",
          textAlign: "center",
          fontSize: 14,
          color: "var(--kl-muted)",
        }}
      >
        Your reward depends on the membership you choose.
      </p>
      <div
        style={{
          borderRadius: 12,
          border: "1px solid var(--kl-rule)",
          background: "var(--kl-surface)",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th scope="col" style={{ ...thStyle, textAlign: "left" }}>
                Membership
              </th>
              <th scope="col" style={{ ...thStyle, textAlign: "right", padding: "10px 6px" }}>
                Cashback
              </th>
              <th scope="col" style={{ ...thStyle, textAlign: "right", paddingLeft: 6 }}>
                Your reward
              </th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t, i) => {
              const rule = i === 0 ? "none" : "1px solid var(--kl-rule)";
              return (
                <tr key={t.name}>
                  <th
                    scope="row"
                    style={{ padding: "14px 18px", textAlign: "left", fontWeight: "normal", borderTop: rule }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--kl-ink)" }}>
                        {t.name}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--kl-muted)" }}>{t.price}</span>
                    </span>
                  </th>
                  <td
                    style={{
                      ...numCellStyle,
                      padding: "14px 6px",
                      fontWeight: 500,
                      color: "var(--kl-ink)",
                      borderTop: rule,
                    }}
                  >
                    {t.cashback}
                  </td>
                  <td style={{ ...numCellStyle, padding: "14px 18px 14px 6px", borderTop: rule }}>
                    <span
                      style={{
                        borderRadius: 6,
                        background: "var(--kl-pink-soft)",
                        padding: "4px 9px",
                        fontWeight: 600,
                        color: "var(--kl-pink)",
                      }}
                    >
                      {t.reward}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{ ...finePrintStyle, marginTop: 10, textAlign: "center" }}>
        Prices and cashback from{" "}
        <a
          href={MEMBERSHIPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 500, textDecoration: "none" }}
        >
          klarna.com/uk/memberships
        </a>
        . Cashback is on Klarna purchases.
      </p>
    </section>
  );
}

type FaqProps = { items: FaqItem[]; onOpen: (question: string) => void };

/** Faq — one answer open at a time; answers stay in the DOM so they animate and stay crawlable. */
function Faq({ items, onOpen }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    if (openIndex === i) {
      setOpenIndex(null);
      return;
    }
    setOpenIndex(i);
    onOpen(items[i].question);
  }

  return (
    <section aria-label="FAQ" style={{ marginTop: 56 }}>
      <h2 style={{ ...h2Style, marginBottom: 16 }}>Good to know</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.question}
              style={{
                borderRadius: 12,
                border: "1px solid var(--kl-rule)",
                background: "var(--kl-surface)",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="kl-faq-button"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: "15px 18px",
                  minHeight: 48,
                  textAlign: "left",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--kl-ink)",
                  fontFamily: "inherit",
                }}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  style={{
                    color: "var(--kl-pink)",
                    fontSize: 18,
                    lineHeight: 1,
                    transform: `rotate(${isOpen ? 45 : 0}deg)`,
                    transition: "transform 200ms ease",
                  }}
                >
                  +
                </span>
              </button>
              <div
                aria-hidden={!isOpen}
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 220ms ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p
                    style={{
                      margin: 0,
                      padding: "0 18px 16px",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--kl-body)",
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

type RepeatCtaProps = {
  link: string;
  copied: boolean;
  onCtaClick: () => void;
  onCopy: () => void;
};

/** RepeatCta — closing CTA, copy button and the referral disclosure. */
function RepeatCta({ link, copied, onCtaClick, onCopy }: RepeatCtaProps) {
  return (
    <section
      aria-label="Sign up"
      style={{
        marginTop: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 14,
      }}
    >
      <h2 style={{ ...h2Style, textWrap: "balance" }}>Here’s the link again</h2>
      <div
        style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <SignUpLink href={link} onClick={onCtaClick} />
        <button
          type="button"
          onClick={onCopy}
          className="kl-copy-plain"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 48,
            borderRadius: 8,
            border: "1px solid var(--kl-rule)",
            background: "var(--kl-surface)",
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 500,
            color: copied ? "var(--kl-pink)" : "var(--kl-ink)",
            cursor: "pointer",
            transition: "color 200ms ease, background-color 200ms ease",
          }}
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
      <p style={{ ...finePrintStyle, maxWidth: 480 }}>
        This is my personal referral link. If you join through it, Klarna may reward me too. It
        doesn’t change what you pay. <TermsLink />
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type KlarnaLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

/**
 * KlarnaLandingPage — root component.
 */
export function KlarnaLandingPage({ brand, content }: KlarnaLandingPageProps) {
  const [copied, setCopied] = useState(false);
  const link = brand.referralLink ?? "";
  const faqItems = content.faq ?? [];

  const handleCopy = useCallback(
    async (placement: CtaPlacement) => {
      try {
        await navigator.clipboard.writeText(link);
        trackProviderLinkCopy(brand.slug, placement);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unavailable — nothing useful to show
      }
    },
    [link, brand.slug],
  );

  const handleFaqOpen = (question: string) => trackProviderFaqOpen(brand.slug, question);

  return (
    <>
      <style>{`
        .kl-root { ${CSS_VARS} }
        .kl-root a { color: var(--kl-pink); }
        .kl-root a:hover { color: var(--kl-pink-dark); }
        .kl-root a.kl-cta, .kl-root a.kl-cta:hover { color: #ffffff; }
        .kl-cta:hover { background: var(--kl-ink-hover) !important; box-shadow: 0 14px 24px -10px rgba(26,25,24,0.5) !important; }
        .kl-copy-box:hover { border-color: var(--kl-pink) !important; }
        .kl-copy-plain:hover { background: var(--kl-hover-bg) !important; }
        .kl-faq-button:hover { color: var(--kl-pink) !important; }
        @media (prefers-reduced-motion: reduce) {
          .kl-root * { transition: none !important; }
        }
      `}</style>

      <div
        className="kl-root"
        style={{
          minHeight: "100%",
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(196,70,120,0.08), transparent 55%), var(--kl-page)",
          color: "var(--kl-body)",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: "100%",
            maxWidth: 720,
            padding: "28px 16px 0",
            boxSizing: "border-box",
          }}
        >
          <Hero
            link={link}
            copied={copied}
            onCtaClick={() => trackProviderCtaClick(brand.slug, "hero")}
            onCopy={() => handleCopy("hero")}
          />
          <Steps />
          <MembershipTable />
          {faqItems.length > 0 && <Faq items={faqItems} onOpen={handleFaqOpen} />}
          <RepeatCta
            link={link}
            copied={copied}
            onCtaClick={() => trackProviderCtaClick(brand.slug, "repeat_cta")}
            onCopy={() => handleCopy("repeat_cta")}
          />
          <div style={{ height: 64 }} />
        </div>
      </div>
    </>
  );
}

export default KlarnaLandingPage;
