"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  trackBrandTrustpilotClick,
  trackProviderAndroidCtaClick,
  trackProviderCodeCopy,
  trackProviderCtaClick,
  trackProviderIosCtaClick,
} from "@/lib/analytics";
import type { Brand } from "@/lib/brands";
import type { FaqItem, LandingPageContent } from "@/content/landing-pages";

// ── Design tokens (CSS custom properties set on root div) ─────────────────
const CSS_VARS = `
  --at-page: #f6f8fc;
  --at-surface: #ffffff;
  --at-ink: #14181f;
  --at-body: #444b57;
  --at-muted: #5c6470;
  --at-faint: #7a828f;
  --at-rule: #e3e8f1;
  --at-rule-soft: #dbe4f2;
  --at-blue: #2461c7;
  --at-blue-soft: #e8f0fd;
  --at-blue-bright: #5f9df0;
  --at-blue-light: #8db8f5;
  --at-night: #0e1622;
`;

const RETAILERS = [
  "Boots",
  "Greggs",
  "Argos",
  "Tesco",
  "IKEA",
  "ASOS",
  "New Look",
  "Waterstones",
  "The Range",
];

const STEPS = [
  {
    n: "1",
    title: "Download Airtime",
    body: "Grab the app and sign up with code UKV9QCKE — that's what unlocks your £2 bonus.",
  },
  {
    n: "2",
    title: "Link a card",
    body: "Add up to 10 Visa or Mastercard cards. Takes a minute; cards activate within 24 hours.",
  },
  {
    n: "3",
    title: "Shop like normal",
    body: "Pay with a linked card at any partner retailer. No vouchers, no click-throughs — it tracks itself.",
  },
  {
    n: "4",
    title: "Redeem at £10",
    body: "Your balance comes straight off your phone bill, Pay Monthly or Pay As You Go.",
  },
];

const STATS = [
  { big: "4.5m", label: "members earning already" },
  { big: "200+", label: "partner retailers" },
  { big: "£2", label: "free credit with my code" },
];

const serifFont = "var(--font-fraunces), Georgia, serif";
const monoFont = "var(--font-geist-mono), monospace";

// ── Sub-components ─────────────────────────────────────────────────────────

type CopyButtonProps = {
  code: string;
  copied: boolean;
  onCopy: () => void;
  /** Dark hero card vs light final CTA */
  tone: "dark" | "light";
};

/** CopyCodeButton — dashed pill that copies the referral code. */
export function CopyCodeButton({ code, copied, onCopy, tone }: CopyButtonProps) {
  const isDark = tone === "dark";
  return (
    <button
      type="button"
      onClick={onCopy}
      className={isDark ? "at-copy-dark" : "at-copy-light"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderRadius: 9999,
        border: `1px dashed ${isDark ? "rgba(141,184,245,0.6)" : "#b7cdef"}`,
        background: isDark ? "rgba(141,184,245,0.1)" : "var(--at-surface)",
        padding: "11px 18px",
        cursor: "pointer",
      }}
    >
      <code
        style={{
          fontFamily: monoFont,
          fontSize: isDark ? 15 : 14,
          fontWeight: 500,
          color: isDark ? "#ffffff" : "var(--at-ink)",
        }}
      >
        {code}
      </code>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: isDark ? "var(--at-blue-light)" : "var(--at-blue)",
        }}
      >
        {copied ? "Copied!" : "Copy code"}
      </span>
    </button>
  );
}

type HeroProps = {
  logoPath: string;
  code: string;
  appUrl?: string;
  copied: boolean;
  onCopy: () => void;
  onAppClick: () => void;
};

/** Hero — logo, headline, lede and the dark welcome-bonus card. */
export function Hero({ logoPath, code, appUrl, copied, onCopy, onAppClick }: HeroProps) {
  return (
    <section
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "12px 0 8px",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          padding: "0 22px",
          borderRadius: 16,
          background: "var(--at-surface)",
          border: "1px solid var(--at-rule)",
          boxShadow: "0 2px 8px rgba(31,77,156,0.08)",
        }}
      >
        <Image
          src={logoPath}
          alt="Airtime logo"
          width={120}
          height={34}
          style={{ height: 34, width: "auto", objectFit: "contain" }}
        />
      </span>

      <h1
        style={{
          margin: 0,
          fontFamily: serifFont,
          fontWeight: 500,
          fontSize: "clamp(30px, 5vw, 46px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "var(--at-ink)",
          maxWidth: 640,
          textWrap: "pretty",
        }}
      >
        Get money off your phone bill, just by shopping
      </h1>

      <p
        style={{
          margin: 0,
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--at-body)",
          maxWidth: 540,
        }}
      >
        Link a card once and Airtime automatically earns you cashback at 200+ UK retailers — Boots,
        Greggs, Argos, Tesco and more. It comes straight off your mobile bill.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          borderRadius: 16,
          background: "var(--at-night)",
          color: "#ffffff",
          padding: "22px 26px",
          boxShadow: "0 16px 36px -14px rgba(14,22,34,0.5)",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--at-blue-light)",
          }}
        >
          Welcome bonus
        </span>
        <span style={{ fontFamily: serifFont, fontSize: 26, lineHeight: 1.2, color: "#ffffff" }}>
          £2 free credit with my code
        </span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
          Sign up with the code below, spend £5 in your first week, and £2 lands in your balance.
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 6,
          }}
        >
          <CopyCodeButton code={code} copied={copied} onCopy={onCopy} tone="dark" />
          {appUrl && (
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onAppClick}
              className="at-cta-bright"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "var(--at-blue-bright)",
                color: "var(--at-night)",
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Get the app →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

type TrustLineProps = {
  trustpilot?: LandingPageContent["trustpilot"];
  onTrustpilotClick: () => void;
};

/** TrustLine — the small reassurance strip under the hero card. */
export function TrustLine({ trustpilot, onTrustpilotClick }: TrustLineProps) {
  return (
    <p style={{ margin: 0, fontSize: 12.5, color: "var(--at-faint)" }}>
      Free to use · Visa &amp; Mastercard · 4.5 million members
      {trustpilot && (
        <>
          {" · "}
          <a
            href={trustpilot.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onTrustpilotClick}
            style={{ color: "var(--at-blue)", textDecoration: "none", fontWeight: 500 }}
          >
            {trustpilot.score.toFixed(1)} on Trustpilot
          </a>
        </>
      )}
    </p>
  );
}

/** RetailerPills — where you earn. */
export function RetailerPills() {
  return (
    <section
      aria-label="Where you earn"
      style={{
        marginTop: 28,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {RETAILERS.map((r) => (
        <span
          key={r}
          style={{
            borderRadius: 9999,
            border: "1px solid var(--at-rule-soft)",
            background: "var(--at-surface)",
            color: "var(--at-body)",
            padding: "7px 15px",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {r}
        </span>
      ))}
      <span
        style={{
          borderRadius: 9999,
          background: "var(--at-blue-soft)",
          color: "var(--at-blue)",
          padding: "7px 15px",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        + 190 more
      </span>
    </section>
  );
}

type HowItWorksProps = {
  ios?: string;
  android?: string;
  onIosClick: () => void;
  onAndroidClick: () => void;
};

/** HowItWorks — four numbered set-up steps plus the app store links. */
export function HowItWorks({ ios, android, onIosClick, onAndroidClick }: HowItWorksProps) {
  return (
    <section aria-label="How it works" style={{ marginTop: 40 }}>
      <h2
        style={{
          margin: "0 0 18px",
          textAlign: "center",
          fontFamily: serifFont,
          fontWeight: 500,
          fontSize: 26,
          color: "var(--at-ink)",
        }}
      >
        Set it up once, earn forever
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: 14,
        }}
      >
        {STEPS.map((s) => (
          <div
            key={s.n}
            style={{
              borderRadius: 14,
              border: "1px solid var(--at-rule)",
              background: "var(--at-surface)",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span
              style={{
                display: "flex",
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "var(--at-blue-soft)",
                color: "var(--at-blue)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {s.n}
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--at-ink)" }}>{s.title}</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--at-muted)" }}>
              {s.body}
            </span>
          </div>
        ))}
      </div>
      {(ios || android) && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {ios && (
            <a
              href={ios}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onIosClick}
              className="at-store-link"
              style={{
                borderRadius: 9999,
                border: "1px solid var(--at-rule-soft)",
                background: "var(--at-surface)",
                color: "var(--at-body)",
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Download for iOS
            </a>
          )}
          {android && (
            <a
              href={android}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onAndroidClick}
              className="at-store-link"
              style={{
                borderRadius: 9999,
                border: "1px solid var(--at-rule-soft)",
                background: "var(--at-surface)",
                color: "var(--at-body)",
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Download for Android
            </a>
          )}
        </div>
      )}
    </section>
  );
}

/** StatsRow — three headline numbers. */
export function StatsRow() {
  return (
    <section
      aria-label="Why it converts"
      style={{
        marginTop: 40,
        borderRadius: 16,
        border: "1px solid var(--at-rule)",
        background: "var(--at-surface)",
        padding: 24,
        display: "flex",
        flexWrap: "wrap",
        gap: "20px 36px",
        justifyContent: "center",
      }}
    >
      {STATS.map((st) => (
        <div
          key={st.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            minWidth: 140,
          }}
        >
          <span style={{ fontFamily: serifFont, fontSize: 30, color: "var(--at-ink)" }}>
            {st.big}
          </span>
          <span style={{ fontSize: 13, color: "var(--at-muted)", textAlign: "center" }}>
            {st.label}
          </span>
        </div>
      ))}
    </section>
  );
}

/** FaqAccordion — all items closed on mount, each toggles independently. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  function toggle(i: number) {
    setOpenIndexes((prev) =>
      prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIndexes.includes(i);
        return (
          <div
            key={item.question}
            style={{
              borderRadius: 12,
              border: "1px solid var(--at-rule)",
              background: "var(--at-surface)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="at-faq-button"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "14px 18px",
                textAlign: "left",
                fontSize: 14.5,
                fontWeight: 600,
                color: "var(--at-ink)",
                fontFamily: "inherit",
              }}
            >
              {item.question}
              <span style={{ color: "var(--at-blue-bright)", fontSize: 16 }} aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 18px 15px",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "var(--at-muted)",
                }}
              >
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

type FinalCtaProps = {
  code: string;
  appUrl?: string;
  copied: boolean;
  onCopy: () => void;
  onAppClick: () => void;
};

/** FinalCta — closing headline, copy pill and dark download button. */
export function FinalCta({ code, appUrl, copied, onCopy, onAppClick }: FinalCtaProps) {
  return (
    <section
      aria-label="Final call to action"
      style={{
        margin: "44px 0 0",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: serifFont,
          fontWeight: 500,
          fontSize: 26,
          color: "var(--at-ink)",
          maxWidth: 520,
          textWrap: "pretty",
        }}
      >
        You&apos;re already doing the shopping. Start getting paid for it.
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <CopyCodeButton code={code} copied={copied} onCopy={onCopy} tone="light" />
        {appUrl && (
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAppClick}
            className="at-cta-night"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              background: "var(--at-night)",
              color: "#ffffff",
              padding: "12px 26px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 20px -8px rgba(14,22,34,0.5)",
            }}
          >
            Download Airtime →
          </a>
        )}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "var(--at-faint)",
          maxWidth: 520,
        }}
      >
        This is my personal referral code — I get a small reward when you use it, and you get your £2
        bonus. It never costs you anything.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type AirtimeLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

/**
 * AirtimeLandingPage — root component.
 */
export function AirtimeLandingPage({ brand, content }: AirtimeLandingPageProps) {
  const [copied, setCopied] = useState(false);
  const code = brand.referralCode ?? "";
  const faqItems = content.faq ?? [];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      trackProviderCodeCopy(brand.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing useful to show
    }
  }, [code, brand.slug]);

  const handleAppClick = () => trackProviderCtaClick(brand.slug);
  const handleTrustpilotClick = () => trackBrandTrustpilotClick(brand.slug);
  const handleIosClick = () => trackProviderIosCtaClick(brand.slug);
  const handleAndroidClick = () => trackProviderAndroidCtaClick(brand.slug);

  return (
    <>
      <style>{`
        .at-root { ${CSS_VARS} }
        .at-root a { color: var(--at-blue); }
        .at-copy-dark:hover { border-color: var(--at-blue-light); }
        .at-copy-light:hover { border-color: var(--at-blue); }
        .at-cta-bright:hover { background: var(--at-blue-light); }
        .at-cta-night:hover { background: #243247; }
        .at-store-link:hover { border-color: var(--at-blue); color: var(--at-blue); }
        .at-faq-button:hover { color: var(--at-blue); }
        @media (max-width: 600px) {
          .at-wrap { padding: 28px 16px 0 !important; }
        }
      `}</style>

      <div
        className="at-root"
        style={{
          minHeight: "100%",
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(96,153,239,0.14), transparent 55%), var(--at-page)",
          color: "var(--at-body)",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <div
          className="at-wrap"
          style={{
            margin: "0 auto",
            width: "100%",
            maxWidth: 900,
            padding: "36px 16px 0",
            boxSizing: "border-box",
          }}
        >
          <Hero
            logoPath={brand.logoPath}
            code={code}
            appUrl={brand.brandUrl}
            copied={copied}
            onCopy={handleCopy}
            onAppClick={handleAppClick}
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <TrustLine
              trustpilot={content.trustpilot}
              onTrustpilotClick={handleTrustpilotClick}
            />
          </div>

          <RetailerPills />

          <HowItWorks
            ios={content.appStoreLinks?.ios}
            android={content.appStoreLinks?.android}
            onIosClick={handleIosClick}
            onAndroidClick={handleAndroidClick}
          />

          <StatsRow />

          {faqItems.length > 0 && (
            <section aria-label="FAQ" style={{ marginTop: 40 }}>
              <h2
                style={{
                  margin: "0 0 16px",
                  textAlign: "center",
                  fontFamily: serifFont,
                  fontWeight: 500,
                  fontSize: 26,
                  color: "var(--at-ink)",
                }}
              >
                Good to know
              </h2>
              <FaqAccordion items={faqItems} />
            </section>
          )}

          <FinalCta
            code={code}
            appUrl={brand.brandUrl}
            copied={copied}
            onCopy={handleCopy}
            onAppClick={handleAppClick}
          />

          <div style={{ height: 64 }} />
        </div>
      </div>
    </>
  );
}

export default AirtimeLandingPage;
