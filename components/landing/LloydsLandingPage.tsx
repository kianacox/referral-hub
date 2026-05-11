"use client";

import { useState, useEffect, useRef } from "react";
import { Fraunces } from "next/font/google";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { trackLloydsCtaClick } from "@/lib/analytics";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

// UPDATE EVERY 30 DAYS — Lloyds referral links expire after 30 days
const REFERRAL_LINK =
  "https://apply.lloydsbank.co.uk/sales-content/cwa/l/onboardpca/index-app.html?from=ob&webDirect=true&redesign=true&token=8kMtnCauQOuTJv7Erekd8QZQyYpdXlfw0yAKZua0puM=#/refer-friend";

const COLORS = {
  green900: "#003827",
  green800: "#00533C",
  green700: "#006A4D",
  green600: "#1A7F60",
  green100: "#E4F1EB",
  green50: "#F1F8F4",
  cream: "#FAF7F2",
  ink: "#1A1F1C",
  ink2: "#3D4A43",
  ink3: "#6B7872",
  line: "#E6E2D8",
  accent: "#E8C547",
  accent2: "#D4A82B",
};

type LloydsLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

// ---- SVG icons (inline, matching the HTML design) ----

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DollarIcon({ size = 22 }: { size?: number }) {
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
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      width="22"
      height="22"
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

function CreditCardIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PlusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

// ---- Reveal hook (IntersectionObserver) ----
function useReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

// ---- Main component ----
export function LloydsLandingPage({ content }: LloydsLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const revealRef = useReveal();

  const faqItems = content.faq ?? [];

  function handleCtaClick() {
    trackLloydsCtaClick();
  }

  return (
    <div
      ref={revealRef}
      className={`${fraunces.variable} min-h-screen overflow-x-hidden`}
      style={{
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        color: COLORS.ink,
        background: COLORS.cream,
        lineHeight: "1.6",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ---- Global styles (keyframes, reveal, etc.) ---- */}
      <style>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0, 106, 77, 0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(0, 106, 77, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 106, 77, 0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50%       { transform: translateY(-12px) rotate(6deg); }
        }
        .lloyds-pulse { animation: pulse 2s infinite; }
        .lloyds-float-1 { animation: float 6s ease-in-out infinite; animation-delay: 0s; }
        .lloyds-float-2 { animation: float 6s ease-in-out infinite; animation-delay: 1.5s; }
        .lloyds-float-3 { animation: float 6s ease-in-out infinite; animation-delay: 3s; }
        .lloyds-reward-card {
          transform: rotate(-4deg);
          transition: transform 0.6s cubic-bezier(.2,.8,.2,1);
        }
        .lloyds-reward-card:hover { transform: rotate(-2deg) translateY(-4px); }
        .lloyds-perk-card {
          transition: all 0.3s ease;
        }
        .lloyds-perk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 56, 39, 0.08), 0 12px 32px rgba(0, 56, 39, 0.06);
          border-color: ${COLORS.green100} !important;
        }
        .lloyds-step-card {
          transition: all 0.25s ease;
        }
        .lloyds-step-card:hover {
          background: ${COLORS.green50} !important;
          border-color: ${COLORS.green100} !important;
        }
        .lloyds-nav-cta {
          display: none;
        }
        @media (min-width: 720px) {
          .lloyds-nav-cta { display: inline-block; }
        }
        @media (min-width: 960px) {
          .lloyds-hero-grid { grid-template-columns: 1.1fr 0.9fr !important; gap: 80px !important; }
        }
        @media (min-width: 720px) {
          .lloyds-benefits-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .lloyds-perks-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lloyds-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lloyds-elig-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lloyds-footer-grid { grid-template-columns: 2fr 1fr 1fr !important; }
          .lloyds-sticky-cta { display: none !important; }
          .lloyds-footer { padding-bottom: 64px !important; }
        }
        @media (min-width: 1000px) {
          .lloyds-perks-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .lloyds-steps-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 20px !important; }
        }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s cubic-bezier(.2,.8,.2,1), transform 0.7s cubic-bezier(.2,.8,.2,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ======== NAV ======== */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250, 247, 242, 0.85)",
          backdropFilter: "saturate(140%) blur(12px)",
          WebkitBackdropFilter: "saturate(140%) blur(12px)",
          borderBottom: `1px solid rgba(230, 226, 216, 0.6)`,
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "16px 24px", maxWidth: 1180, margin: "0 auto" }}
        >
          <div
            className="flex items-center"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 600,
              fontSize: "1.15rem",
              color: COLORS.green800,
              gap: 10,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.green700,
                boxShadow: `0 0 0 4px ${COLORS.green100}`,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span>The £50 Hub</span>
          </div>
          <a
            href="#claim"
            className="lloyds-nav-cta"
            onClick={handleCtaClick}
            style={{
              background: COLORS.green700,
              color: "white",
              padding: "10px 20px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: "0.92rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Claim £50 →
          </a>
        </div>
      </nav>

      {/* ======== HERO ======== */}
      <header
        style={{
          position: "relative",
          padding: "80px 0 100px",
          overflow: "hidden",
          background: `
            radial-gradient(ellipse at top right, rgba(0, 106, 77, 0.08), transparent 60%),
            radial-gradient(ellipse at bottom left, rgba(232, 197, 71, 0.06), transparent 50%),
            ${COLORS.cream}
          `,
        }}
      >
        {/* Dot grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0, 56, 39, 0.04) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
            maskImage:
              "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
        />
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div
            className="lloyds-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Left: copy */}
            <div className="reveal">
              {/* Eyebrow */}
              <div
                className="inline-flex items-center"
                style={{
                  gap: 8,
                  background: COLORS.green100,
                  color: COLORS.green800,
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  marginBottom: 24,
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  className="lloyds-pulse"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS.green700,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                Active referral · Updated May 2026
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: COLORS.ink,
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  marginBottom: 24,
                }}
              >
                Get{" "}
                <span
                  style={{
                    background: `linear-gradient(120deg, ${COLORS.green700}, ${COLORS.green600})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    fontStyle: "italic",
                  }}
                >
                  £50 free
                </span>{" "}
                when you open a Lloyds current account
              </h1>

              {/* Subtext */}
              <p
                style={{
                  fontSize: "1.18rem",
                  color: COLORS.ink2,
                  marginBottom: 36,
                  maxWidth: 540,
                }}
              >
                Use my personal Lloyds refer-a-friend link to open a new
                account and we both pocket £50. Paid as cash into your new
                account within 30 working days — no switching, no strings.
              </p>

              {/* CTA */}
              <div
                className="flex flex-wrap items-center"
                style={{ gap: 16, marginBottom: 36 }}
              >
                <a
                  href={REFERRAL_LINK}
                  target="_blank"
                  rel="noopener"
                  onClick={handleCtaClick}
                  className="inline-flex items-center justify-center"
                  style={{
                    gap: 10,
                    padding: "22px 40px",
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: "1.12rem",
                    background: COLORS.green700,
                    color: "white",
                    textDecoration: "none",
                    boxShadow:
                      "0 6px 20px rgba(0, 106, 77, 0.28), inset 0 -2px 0 rgba(0,0,0,0.12)",
                    transition:
                      "all 0.25s cubic-bezier(.2,.8,.2,1)",
                    lineHeight: 1,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Claim Your £50 Bonus →
                </a>
              </div>

              {/* Trust items */}
              <div
                className="flex flex-wrap"
                style={{ gap: "20px 28px", fontSize: "0.92rem", color: COLORS.ink2 }}
              >
                {[
                  { icon: <ShieldIcon />, text: "FCA-regulated bank" },
                  { icon: <ClockIcon />, text: "Paid within 30 days" },
                  { icon: <CheckIcon />, text: "10 minutes to apply" },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center"
                    style={{ gap: 8, fontWeight: 500, color: COLORS.green700 }}
                  >
                    {icon}
                    <span style={{ color: COLORS.ink2 }}>{text}</span>
                  </span>
                ))}
              </div>

              {/* Social proof */}
              <div
                className="flex items-center"
                style={{
                  gap: 14,
                  marginTop: 28,
                  padding: "14px 18px",
                  background: "white",
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 16,
                  boxShadow:
                    "0 1px 2px rgba(0, 56, 39, 0.06), 0 2px 8px rgba(0, 56, 39, 0.04)",
                  maxWidth: 420,
                }}
              >
                {/* Avatars */}
                <div className="flex">
                  {[
                    {
                      initials: "SK",
                      bg: "linear-gradient(135deg, #1A7F60, #006A4D)",
                    },
                    {
                      initials: "JM",
                      bg: "linear-gradient(135deg, #D4A82B, #B88817)",
                    },
                    {
                      initials: "AR",
                      bg: "linear-gradient(135deg, #5A6E55, #3D4A43)",
                    },
                    { initials: "+2k", bg: COLORS.green800, small: true },
                  ].map(({ initials, bg, small }, i) => (
                    <div
                      key={initials}
                      className="flex items-center justify-center"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        border: "2px solid white",
                        marginLeft: i === 0 ? 0 : -10,
                        background: bg,
                        fontWeight: 600,
                        fontSize: small ? "0.7rem" : "0.78rem",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div
                  style={{ fontSize: "0.86rem", color: COLORS.ink2, lineHeight: 1.4 }}
                >
                  <strong style={{ color: COLORS.ink }}>Thousands</strong> have
                  claimed their £50 through Lloyds&apos; refer-a-friend.
                </div>
              </div>
            </div>

            {/* Right: reward card stage */}
            <div
              className="reveal"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 420,
              }}
            >
              {/* Floating coins */}
              {[
                {
                  cls: "lloyds-float-1",
                  size: 70,
                  top: "8%",
                  left: "5%",
                  fontSize: "1.2rem",
                },
                {
                  cls: "lloyds-float-2",
                  size: 48,
                  bottom: "12%",
                  right: "8%",
                  fontSize: "0.85rem",
                },
                {
                  cls: "lloyds-float-3",
                  size: 36,
                  top: "30%",
                  right: "2%",
                  fontSize: "0.7rem",
                },
              ].map(({ cls, size, top, bottom, left, right, fontSize }) => (
                <div
                  key={cls}
                  className={`${cls} flex items-center justify-center`}
                  style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    top,
                    bottom,
                    left,
                    right,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                    boxShadow:
                      "0 8px 24px rgba(232, 197, 71, 0.32), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 700,
                    color: "#6B4E00",
                    fontSize,
                  }}
                >
                  £
                </div>
              ))}

              {/* The card */}
              <div
                className="lloyds-reward-card"
                style={{
                  position: "relative",
                  background: `linear-gradient(145deg, ${COLORS.green800} 0%, ${COLORS.green700} 60%, ${COLORS.green600} 100%)`,
                  borderRadius: 24,
                  padding: "36px 32px",
                  width: "100%",
                  maxWidth: 360,
                  aspectRatio: "1.586 / 1",
                  boxShadow: "0 20px 60px rgba(0, 56, 39, 0.18)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                }}
              >
                {/* Decorative overlays */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-30%",
                    width: 380,
                    height: 380,
                    background:
                      "radial-gradient(circle, rgba(232, 197, 71, 0.18) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-20%",
                    left: "-10%",
                    width: 200,
                    height: 200,
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Top row */}
                <div
                  className="flex justify-between items-start"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      opacity: 0.78,
                      fontWeight: 500,
                    }}
                  >
                    Welcome Bonus
                  </div>
                  {/* Chip */}
                  <div
                    style={{
                      width: 38,
                      height: 28,
                      background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accent2} 100%)`,
                      borderRadius: 5,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        left: 4,
                        right: 4,
                        height: 1,
                        background: "rgba(0,0,0,0.12)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 4,
                        right: 4,
                        height: 1,
                        background: "rgba(0,0,0,0.12)",
                        boxShadow: "0 4px 0 rgba(0,0,0,0.12)",
                      }}
                    />
                  </div>
                </div>

                {/* Amount */}
                <div
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "clamp(3.5rem, 9vw, 5rem)",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.5em",
                      verticalAlign: "top",
                      marginRight: 4,
                      opacity: 0.85,
                    }}
                  >
                    £
                  </span>
                  50
                </div>

                {/* Bottom row */}
                <div
                  className="flex justify-between items-end"
                  style={{ position: "relative", zIndex: 2, fontSize: "0.85rem" }}
                >
                  <span style={{ fontWeight: 500, opacity: 0.92 }}>
                    Paid to your new Lloyds account
                  </span>
                  <span style={{ opacity: 0.7, fontSize: "0.78rem" }}>
                    30 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======== BENEFITS BAR ======== */}
      <div
        style={{
          background: "white",
          borderTop: `1px solid ${COLORS.line}`,
          borderBottom: `1px solid ${COLORS.line}`,
          padding: "40px 0",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="lloyds-benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "32px 24px",
            }}
          >
            {[
              {
                icon: <DollarIcon />,
                text: "£50 cash bonus",
              },
              {
                icon: <VideoIcon />,
                text: "Free Disney+ with Club Lloyds",
              },
              {
                icon: <HomeIcon />,
                text: "Exclusive mortgage rates",
              },
              {
                icon: <PhoneIcon />,
                text: "Highly-rated mobile app",
              },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center"
                style={{ gap: 14 }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    background: COLORS.green100,
                    borderRadius: 12,
                    color: COLORS.green700,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
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

      {/* ======== PERKS SECTION ======== */}
      <section
        id="benefits"
        style={{ padding: "100px 0", background: COLORS.cream }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div
            className="reveal text-center"
            style={{ maxWidth: 720, margin: "0 auto 64px" }}
          >
            <span
              style={{
                color: COLORS.green700,
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "inline-block",
              }}
            >
              Why Lloyds
            </span>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: COLORS.ink,
                fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
              }}
            >
              More than just £50
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                marginTop: 16,
                color: COLORS.ink2,
              }}
            >
              Open a qualifying account and you&apos;ll get access to Club
              Lloyds — a current account packed with lifestyle perks, better
              mortgage rates and savings rewards. Plus £50 just for joining.
            </p>
          </div>

          {/* Grid */}
          <div
            className="lloyds-perks-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}
          >
            {/* Featured card */}
            <div
              className="lloyds-perk-card reveal"
              style={{
                background: `linear-gradient(165deg, ${COLORS.green800}, ${COLORS.green700})`,
                borderRadius: 24,
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  color: COLORS.accent,
                  marginBottom: 20,
                }}
              >
                <StarIcon />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "white",
                  fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
                  marginBottom: 12,
                }}
              >
                Club Lloyds lifestyle benefit
              </h3>
              <p style={{ fontSize: "0.96rem", color: "rgba(255,255,255,0.85)" }}>
                Pick one a year: Disney+, six cinema tickets, magazine
                subscriptions, Gourmet Society membership, or digital movie
                rentals.
              </p>
            </div>

            {/* Regular perk cards */}
            {[
              {
                icon: <ActivityIcon />,
                title: "Competitive Regular Saver",
                body: "Club Lloyds customers get access to a Monthly Saver with one of the higher fixed rates among UK high-street banks.",
              },
              {
                icon: <CreditCardIcon />,
                title: "3 months interest-free overdraft",
                body: "New Club Lloyds customers get an arranged overdraft with 0% interest for the first three months (subject to status & approval).",
              },
              {
                icon: <HomeIcon />,
                title: "Exclusive mortgage discounts",
                body: "Club Lloyds customers get rate discounts on selected residential mortgages — useful if you're buying or remortgaging soon.",
              },
              {
                icon: <InfoIcon />,
                title: "£5 monthly fee waived",
                body: "Pay in £2,000+ a month (or two payments totalling that) and the £5 Club Lloyds fee is waived — completely free banking.",
              },
              {
                icon: <HeartIcon />,
                title: "Silver, Platinum & Premier tiers",
                body: "Upgrade for travel insurance, breakdown cover, mobile phone insurance. Premier adds Bupa Digital GP, Wellbeing & financial coaching for higher earners.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="lloyds-perk-card reveal"
                style={{
                  background: "white",
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 24,
                  padding: 32,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    background: COLORS.green100,
                    borderRadius: 14,
                    color: COLORS.green700,
                    marginBottom: 20,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: COLORS.ink,
                    fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
                    marginBottom: 12,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.96rem", color: COLORS.ink2 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== STEPS SECTION ======== */}
      <section style={{ padding: "100px 0", background: "white" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div
            className="reveal text-center"
            style={{ maxWidth: 720, margin: "0 auto 64px" }}
          >
            <span
              style={{
                color: COLORS.green700,
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "inline-block",
              }}
            >
              How it works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: COLORS.ink,
                fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
              }}
            >
              Claim your £50 in four steps
            </h2>
            <p
              style={{ fontSize: "1.1rem", marginTop: 16, color: COLORS.ink2 }}
            >
              The whole process takes around 10 minutes online. You&apos;ll
              have the £50 in your new account within 30 working days.
            </p>
          </div>

          {/* Steps grid */}
          <div
            className="lloyds-steps-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}
          >
            {[
              {
                num: "01",
                title: "Click my referral link",
                body: "Hit the green button anywhere on this page. The link is valid for 30 days from when I generated it.",
              },
              {
                num: "02",
                title: "Open an account",
                body: "Apply for a qualifying Lloyds current account in your sole name — Club Lloyds, Classic, Silver, Platinum or Premier.",
              },
              {
                num: "03",
                title: "Keep it open 7 days",
                body: "That's it. Keep the account open for at least 7 days — no minimum deposit, no direct debit moving required.",
              },
              {
                num: "04",
                title: "Receive £50",
                body: "Lloyds pays £50 as a cash credit into your new account within 30 working days of opening it.",
              },
            ].map(({ num, title, body }) => (
              <div
                key={num}
                className="lloyds-step-card reveal"
                style={{
                  background: COLORS.cream,
                  borderRadius: 16,
                  padding: "32px 28px",
                  border: `1px solid ${COLORS.line}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "2.6rem",
                    fontWeight: 600,
                    color: COLORS.green700,
                    lineHeight: 1,
                    marginBottom: 16,
                    fontStyle: "italic",
                  }}
                >
                  {num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: COLORS.ink,
                    fontSize: "1.15rem",
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.92rem", color: COLORS.ink2 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== ELIGIBILITY SECTION ======== */}
      <section style={{ padding: "100px 0", background: "#F4EFE6" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div
            className="reveal text-center"
            style={{ maxWidth: 720, margin: "0 auto 64px" }}
          >
            <span
              style={{
                color: COLORS.green700,
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "inline-block",
              }}
            >
              Eligibility
            </span>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: COLORS.ink,
                fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
              }}
            >
              Who qualifies for the £50?
            </h2>
            <p style={{ fontSize: "1.1rem", marginTop: 16, color: COLORS.ink2 }}>
              The bonus is for people brand new to Lloyds. Quick check below —
              see if you&apos;re eligible before you start your application.
            </p>
          </div>

          {/* Two-column eligibility grid */}
          <div
            className="lloyds-elig-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}
          >
            {/* YES column */}
            <div
              className="reveal"
              style={{
                background: "white",
                borderRadius: 24,
                padding: 36,
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <h3
                className="flex items-center"
                style={{
                  gap: 12,
                  marginBottom: 24,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${COLORS.line}`,
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: COLORS.ink,
                  fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: COLORS.green100,
                    color: COLORS.green800,
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon size={18} />
                </span>
                You&apos;re eligible if…
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "You're a UK resident aged 18 or over",
                  "You're completely new to Lloyds — no existing current account, savings, credit card, loan or mortgage",
                  "You're opening the account in your sole name",
                  "You've never received a Lloyds refer-a-friend bonus before",
                  "You can keep the new account open for at least 7 days",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start"
                    style={{
                      padding: "12px 0",
                      color: COLORS.ink2,
                      fontSize: "0.98rem",
                      gap: 12,
                      borderBottom: `1px solid ${COLORS.line}`,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: COLORS.green700,
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
              className="reveal"
              style={{
                background: "white",
                borderRadius: 24,
                padding: 36,
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <h3
                className="flex items-center"
                style={{
                  gap: 12,
                  marginBottom: 24,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${COLORS.line}`,
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: COLORS.ink,
                  fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#FCE9E4",
                    color: "#9B3A26",
                    flexShrink: 0,
                  }}
                >
                  <XIcon size={18} />
                </span>
                Sorry, not this time if…
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "You're applying for a joint account",
                  "You're an existing Lloyds, Halifax or Bank of Scotland customer",
                  "You've previously claimed a Lloyds refer-a-friend payment",
                  "You're opening an Under 19s, Smart Start or Student account",
                  "You're under 18 or not resident in the UK",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start"
                    style={{
                      padding: "12px 0",
                      color: COLORS.ink2,
                      fontSize: "0.98rem",
                      gap: 12,
                      borderBottom: `1px solid ${COLORS.line}`,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#C25339",
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
        </div>
      </section>

      {/* ======== MID-CTA SECTION ======== */}
      <section
        id="claim"
        style={{
          padding: "100px 0",
          background: `radial-gradient(ellipse at top, rgba(232, 197, 71, 0.08), transparent 50%), ${COLORS.green900}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="reveal text-center"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 24px",
            color: "white",
          }}
        >
          {/* Urgency tag */}
          <div
            className="inline-flex items-center"
            style={{
              gap: 8,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: "0.86rem",
              color: "rgba(255,255,255,0.92)",
              marginBottom: 28,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: COLORS.accent,
                borderRadius: "50%",
                boxShadow: `0 0 0 4px rgba(232, 197, 71, 0.18)`,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Referral link active for 30 days only
          </div>

          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "white",
              fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
              marginBottom: 20,
            }}
          >
            Ready to grab your{" "}
            <span style={{ color: COLORS.accent, fontStyle: "italic" }}>
              £50?
            </span>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.1rem",
              marginBottom: 36,
              maxWidth: 580,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Click below to open Lloyds&apos; application page through my
            personal referral link. It takes about 10 minutes, and the £50
            lands in your new account within 30 working days.
          </p>

          <a
            href={REFERRAL_LINK}
            target="_blank"
            rel="noopener"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center"
            style={{
              gap: 10,
              padding: "22px 40px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: "1.12rem",
              background: COLORS.accent,
              color: COLORS.green900,
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(232, 197, 71, 0.3)",
              transition: "all 0.25s cubic-bezier(.2,.8,.2,1)",
              lineHeight: 1,
              border: "none",
              cursor: "pointer",
            }}
          >
            Claim Your £50 Bonus Now →
          </a>

          {/* Trust row */}
          <div
            className="flex flex-wrap justify-center"
            style={{
              gap: 24,
              marginTop: 32,
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.9rem",
            }}
          >
            {[
              { icon: <ShieldIcon />, text: "FCA-regulated bank" },
              { icon: <LayersIcon />, text: "FSCS protected to £85k" },
              { icon: <CheckIcon size={16} />, text: "Paid within 30 days" },
            ].map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center"
                style={{ gap: 8, color: COLORS.accent }}
              >
                {icon}
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ SECTION ======== */}
      <section style={{ padding: "100px 0", background: "white" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div
            className="reveal text-center"
            style={{ maxWidth: 720, margin: "0 auto 64px" }}
          >
            <span
              style={{
                color: COLORS.green700,
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "inline-block",
              }}
            >
              Questions, answered
            </span>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: COLORS.ink,
                fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
              }}
            >
              Everything you might want to know
            </h2>
          </div>

          {/* FAQ accordion */}
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  style={{
                    borderBottom: `1px solid ${COLORS.line}`,
                    borderTop: index === 0 ? `1px solid ${COLORS.line}` : undefined,
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setOpenFaqIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between"
                    style={{
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      padding: "26px 0",
                      fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "1.08rem",
                      fontWeight: 600,
                      color: isOpen ? COLORS.green700 : COLORS.ink,
                      cursor: "pointer",
                      gap: 24,
                      transition: "color 0.2s ease",
                      width: "100%",
                    }}
                  >
                    <span>{item.question}</span>
                    <span
                      className="flex items-center justify-center"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: isOpen ? COLORS.green700 : COLORS.green50,
                        color: isOpen ? "white" : COLORS.green700,
                        flexShrink: 0,
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <PlusIcon />
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      style={{
                        paddingBottom: 26,
                        color: COLORS.ink2,
                        lineHeight: 1.7,
                        fontSize: "1rem",
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== TERMS SECTION ======== */}
      <section style={{ padding: "100px 0", background: COLORS.cream }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div
            className="reveal text-center"
            style={{ maxWidth: 720, margin: "0 auto 64px" }}
          >
            <span
              style={{
                color: COLORS.green700,
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "inline-block",
              }}
            >
              The fine print
            </span>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: COLORS.ink,
                fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
              }}
            >
              Terms &amp; conditions
            </h2>
            <p style={{ fontSize: "1.1rem", marginTop: 16, color: COLORS.ink2 }}>
              Clear, summarised — full T&amp;Cs are on Lloyds&apos; own
              application page when you click through.
            </p>
          </div>

          {/* Terms box */}
          <div
            className="reveal"
            style={{
              background: "white",
              borderRadius: 24,
              padding: 40,
              border: `1px solid ${COLORS.line}`,
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {(() => {
                const terms = [
                  {
                    text: (
                      <>
                        Referral links are valid for <strong>30 days</strong>{" "}
                        from when they&apos;re generated. After that, a fresh link
                        is required.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        You must keep the new account open for a{" "}
                        <strong>minimum of 7 days</strong> from the date it&apos;s
                        opened.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        The account must be in your{" "}
                        <strong>sole name</strong>. Joint accounts don&apos;t
                        qualify for the £50.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        You must be <strong>new to Lloyds</strong> — no current
                        account, savings, credit card, loan or mortgage held in
                        the last 12 months.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        The referrer&apos;s £50 is paid into their{" "}
                        <strong>oldest qualifying Lloyds current account</strong>.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        Under 19s, Smart Start and Student accounts{" "}
                        <strong>are excluded</strong> from the refer-a-friend
                        programme.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        Each customer can <strong>only claim once</strong> as a
                        referee under the Lloyds refer-a-friend programme.
                      </>
                    ),
                  },
                  {
                    text: (
                      <>
                        Lloyds may change or withdraw the refer-a-friend offer at
                        any time. The full T&amp;Cs on the Lloyds website apply.
                      </>
                    ),
                  },
                ];
                return terms.map((term, i) => (
                <li
                  key={i}
                  style={{
                    padding: "14px 0",
                    borderBottom:
                      i < terms.length - 1 ? `1px solid ${COLORS.line}` : undefined,
                    fontSize: "0.95rem",
                    color: COLORS.ink2,
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: COLORS.green700, marginTop: 2 }}>
                    <CheckIcon size={20} />
                  </span>
                  <span>{term.text}</span>
                </li>
              ));
              })()}
            </ul>
          </div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <footer
        className="lloyds-footer"
        style={{
          background: COLORS.ink,
          color: "rgba(255,255,255,0.78)",
          padding: "64px 0 100px",
          fontSize: "0.9rem",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="lloyds-footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 40,
              marginBottom: 48,
            }}
          >
            {/* Brand col */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 600,
                  color: "white",
                  fontSize: "1.2rem",
                  marginBottom: 16,
                }}
              >
                The £50 Hub
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                A personal referral page sharing my Lloyds Bank refer-a-friend
                link. Updated regularly to reflect current offers and link
                validity.
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  marginTop: 12,
                }}
              >
                Last updated: May 2026
              </p>
            </div>

            {/* Links col */}
            <div>
              <h4
                style={{
                  color: "white",
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                Links
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Why Lloyds", href: "#benefits" },
                  { label: "Claim £50", href: "#claim" },
                ].map(({ label, href }) => (
                  <li key={label} style={{ padding: "6px 0" }}>
                    <a
                      href={href}
                      style={{
                        color: "rgba(255,255,255,0.78)",
                        textDecoration: "none",
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful col */}
            <div>
              <h4
                style={{
                  color: "white",
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                Useful
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  {
                    label: "Lloyds Bank site",
                    href: "https://www.lloydsbank.com",
                  },
                  {
                    label: "FCA Register",
                    href: "https://www.fca.org.uk/firms/financial-services-register",
                  },
                  { label: "FSCS", href: "https://www.fscs.org.uk" },
                ].map(({ label, href }) => (
                  <li key={label} style={{ padding: "6px 0" }}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener nofollow"
                      style={{
                        color: "rgba(255,255,255,0.78)",
                        textDecoration: "none",
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: 32,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}
          >
            <p>
              <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                Important:
              </strong>{" "}
              This is a personal referral hub run by an individual Lloyds
              customer. It is{" "}
              <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                not affiliated with, endorsed by, sponsored by or operated by
                Lloyds Bank plc
              </strong>
              . Lloyds Bank is a trading name of Lloyds Bank plc, authorised by
              the Prudential Regulation Authority and regulated by the Financial
              Conduct Authority and the Prudential Regulation Authority. All
              product information shown is for illustrative purposes; please
              check Lloyds&apos; official website for the full, current product
              terms before applying. When you click my referral link and
              successfully open a qualifying account, both you and I receive £50
              each under Lloyds&apos; standard refer-a-friend programme. The
              terms of the bonus are set entirely by Lloyds and may be changed
              or withdrawn at any time.
            </p>
          </div>
        </div>
      </footer>

      {/* ======== STICKY MOBILE CTA ======== */}
      <div
        className="lloyds-sticky-cta"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: `1px solid ${COLORS.line}`,
          padding: "12px 16px",
          zIndex: 100,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <a
          href={REFERRAL_LINK}
          target="_blank"
          rel="noopener"
          onClick={handleCtaClick}
          className="flex w-full items-center justify-center"
          style={{
            padding: "16px 24px",
            borderRadius: 999,
            fontWeight: 600,
            fontSize: "1rem",
            background: COLORS.green700,
            color: "white",
            textDecoration: "none",
            transition: "all 0.25s cubic-bezier(.2,.8,.2,1)",
            lineHeight: 1,
            border: "none",
            cursor: "pointer",
          }}
        >
          Claim Your £50 Bonus →
        </a>
      </div>

    </div>
  );
}
