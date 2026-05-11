"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bolt,
  ChevronDown,
  CircleDollarSign,
  Link2,
  MonitorPlay,
  Router,
  Tv,
  Verified,
} from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { trackVirginCtaClick } from "@/lib/analytics";

type VirginMediaLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

const COLORS = {
  primary: "#8C1623",
  primaryContainer: "#680012",
  secondary: "#7f4798",
  onPrimary: "#ffffff",
  onSurface: "#131b2e",
  onSurfaceVariant: "#475569",
  surface: "#ffffff",
  surfaceLow: "#f8fafc",
  outline: "#cbd5e1",
};

const steps = [
  {
    title: "1. Use the Link",
    body: "Use my unique referral link to start your application so Aklamio can track it correctly for your £50 cash reward.",
    icon: Link2,
    iconBg: COLORS.primary,
  },
  {
    title: "2. Choose a Plan",
    body: "Pick any eligible broadband, TV or phone package. No hidden exclusions apply to this offer.",
    icon: MonitorPlay,
    iconBg: COLORS.primary,
  },
  {
    title: "3. Get Paid",
    body: "Once your service is active for 28 days, your £50 cash reward will be available for withdrawal from your Aklamio account.",
    icon: CircleDollarSign,
    iconBg: "#059669",
  },
];

const switchReasons = [
  {
    title: "Gig1 Fibre Broadband",
    body: "Average download speeds of 1,130Mbps. That's 22x faster than the UK average.",
    icon: Bolt,
  },
  {
    title: "Hub 5 Technology",
    body: "Our smartest router ever, with Wi-Fi 6 technology for more devices and better range.",
    icon: Router,
  },
  {
    title: "Stream Your Way",
    body: "Access all your favorite apps and live TV in one place with our ultra-compact Stream box.",
    icon: Tv,
  },
  {
    title: "99.9% Reliability",
    body: "Built on a dedicated fiber-optic network designed for the demands of modern homes.",
    icon: Verified,
  },
];

const faqItems = [
  {
    question: "How do I receive the £50 cash?",
    answer:
      "After your service has been installed and active for 28 days, your reward will be confirmed in your Aklamio account. You can then withdraw your £50 cash via bank transfer or PayPal directly from your Aklamio dashboard.",
  },
  {
    question: "Can I use this with other offers?",
    answer:
      "Yes! The referral reward is cumulative with our current web-exclusive deals and pricing.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "If the contract is cancelled within the first 28 days, the referral reward will be voided.",
  },
];

export function VirginMediaLandingPage({ content }: VirginMediaLandingPageProps) {
  const referralLink = "https://aklam.io/izBRNjvv";
  const broadbandDealsLink = "https://www.virginmedia.com/broadband";
  const currentYear = new Date().getFullYear();
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  return (
    <div
      className="min-h-screen bg-white text-[var(--on-surface)]"
      style={
        {
          "--primary": COLORS.primary,
          "--primary-container": COLORS.primaryContainer,
          "--secondary": COLORS.secondary,
          "--on-primary": COLORS.onPrimary,
          "--on-surface": COLORS.onSurface,
          "--on-surface-variant": COLORS.onSurfaceVariant,
          "--surface": COLORS.surface,
          "--surface-container-low": COLORS.surfaceLow,
          "--outline": COLORS.outline,
          fontFamily: "Inter, var(--font-geist-sans), system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl shadow-[0px_20px_40px_rgba(25,26,41,0.06)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="text-base font-black tracking-tight text-[var(--primary)] sm:text-2xl">
            Virgin Media
          </div>
          <div className="hidden items-center space-x-6 lg:flex">
            <a
              className="text-xs font-bold uppercase tracking-tight text-slate-600 transition hover:text-[var(--primary)]"
              href="#how-it-works"
            >
              How it works
            </a>
            <a
              className="text-xs font-bold uppercase tracking-tight text-slate-600 transition hover:text-[var(--primary)]"
              href="#rewards"
            >
              Rewards
            </a>
            <a
              className="text-xs font-bold uppercase tracking-tight text-slate-600 transition hover:text-[var(--primary)]"
              href="#why-switch"
            >
              Why Virgin Media
            </a>
            <a
              className="text-xs font-bold uppercase tracking-tight text-slate-600 transition hover:text-[var(--primary)]"
              href="#faq"
            >
              FAQ
            </a>
          </div>
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-bold text-white transition active:scale-95"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryContainer} 100%)` }}
          >
            Refer a Friend
          </button>
        </div>
      </nav>

      <main className="pt-16">
        <section id="rewards" className="relative flex min-h-[85vh] items-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Kinetic fiber optic lighting"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Z7m8uqLc5bHS3st1XMLFaGPZybhPvjcoxpqV2_MBTt8CpGeTsbYfNgPgR48X1U8EabVpasrIj5lO5P5XGZ_iUctWv73XTJ9qdFTDVs2LlkJfls-gCdZ5_kKx615NhcaWXAVRwJm_r0fWguHNUMXQZAm0N_bqlN8S4bscwXTpwsaU5teyaRhzyvoM1Cv0DIegufzDDLa6Ch1tOCS8D8we-AIjUhiHwfrvtpypj7RuhphIUWjgSAzLPfKn7cj65IGdbRn8qlrPWcHR"
            />
          </div>

          <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-16">
            <div className="max-w-xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white backdrop-blur-md">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Official Invitation</span>
              </div>
              <h1 className="mb-6 text-5xl leading-tight font-black tracking-tight text-white md:text-7xl">
                Get <span style={{ color: "#ff8894" }}>£50 cash</span> when you sign up.
              </h1>
              <p className="mb-10 text-lg leading-relaxed text-slate-300">
                Switch to Virgin Media using this link and Aklamio will transfer £50 directly to your
                bank or PayPal. <span className="font-bold text-white">Actual cash, not just bill credit.</span>
              </p>
              <div className="flex flex-col gap-4">
                <Link
                  href={referralLink}
                  target="_blank"
                  rel="noopener"
                  onClick={trackVirginCtaClick}
                  className="rounded-xl px-8 py-5 text-center text-lg font-black text-white shadow-2xl transition hover:scale-[1.02] active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryContainer} 100%)`,
                    boxShadow: "0 25px 50px -12px rgba(140, 22, 35, 0.4)",
                  }}
                >
                  Claim My £50 Reward
                </Link>
                <Link
                  href={broadbandDealsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-5 text-center text-lg font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  View Broadband Deals
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-xs font-medium text-slate-400">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                  <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-600" />
                  <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-500" />
                </div>
                <p>Joined by 12,000+ people this month</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-[var(--surface)] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black tracking-tight">Three simple steps to your reward</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <article key={step.title} className="group rounded-2xl border border-slate-100 bg-slate-50 p-8 transition hover:shadow-xl">
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg text-white transition group-hover:scale-110"
                    style={{ backgroundColor: step.iconBg }}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 text-xl font-black">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--on-surface-variant)]">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-switch" className="relative overflow-hidden bg-[var(--primary)] py-24 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <svg className="h-full w-full" fill="none" viewBox="0 0 100 100">
              <circle cx="90" cy="10" r="50" fill="white" fillOpacity="0.2" />
              <circle cx="10" cy="90" r="40" fill="white" fillOpacity="0.1" />
            </svg>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">Why switch to Virgin Media?</h2>
              <p className="mx-auto max-w-xl text-lg text-white/70 lg:mx-0">
                Reliability meets raw power. Experience the UK&apos;s fastest widely available broadband.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {switchReasons.map((reason) => (
                <article key={reason.title} className="flex items-start gap-5 rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <reason.icon className="h-8 w-8 text-white" />
                  <div>
                    <h4 className="mb-1 text-lg font-black">{reason.title}</h4>
                    <p className="text-sm leading-relaxed text-white/70">{reason.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-12 text-center text-3xl font-black">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <article key={faq.question} className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between p-6 text-left text-base font-bold transition hover:bg-slate-50"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-[var(--primary)] transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && <div className="px-6 pb-6 text-sm leading-relaxed text-[var(--on-surface-variant)]">{faq.answer}</div>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-[var(--secondary)] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-12">
          <div>
            <div className="mb-4 text-xl font-black text-white">Virgin Media</div>
            <p className="text-xs leading-relaxed font-medium uppercase tracking-[0.16em] text-white/70">
              Connecting your world with the UK&apos;s fastest speeds.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-12 pt-8 md:flex-row">
          <div className="text-[10px] font-medium tracking-[0.16em] text-white/70 uppercase">
            © {currentYear} Virgin Media. All rights reserved.
          </div>
        </div>
      </footer>

      <div className="fixed right-6 bottom-6 left-6 z-50 md:hidden">
        <Link
          href={referralLink}
          target="_blank"
          rel="noopener"
          onClick={trackVirginCtaClick}
          className="flex w-full items-center justify-center gap-3 rounded-full py-5 text-sm font-black tracking-[0.16em] text-white uppercase shadow-2xl transition active:scale-95"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryContainer} 100%)` }}
        >
          <CircleDollarSign className="h-5 w-5" />
          CLAIM £50 CASH NOW
        </Link>
      </div>

      <div className="hidden">{content.seoTitle}</div>
    </div>
  );
}
