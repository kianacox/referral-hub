"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarCheck, Check, KeyRound, PartyPopper } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { trackProviderOutboundClick } from "@/lib/analytics";
import { CodeTicket } from "./CodeTicket";
import { AUBERGINE, DD_SOURCE_URL, DIRECT_DEBITS, DOES_NOT_COUNT, ELIGIBILITY, FAQ, TERMS_URL, WHY_STARLING } from "./offer";

const linkClass = "font-medium text-[var(--accent-icon)] hover:text-[var(--accent)] hover:underline";

const TIMELINE = [
  { icon: KeyRound, when: "Today", title: "Apply with code VVDCRGY", body: "Open a free personal current account in the Starling app." },
  { icon: CalendarCheck, when: "Next", title: "Tick off the conditions", body: "The app lists them. If it's a Direct Debit, a £1 charity one works." },
  { icon: PartyPopper, when: "Within 30 days", title: "£25 lands in a Space", body: "Paid within 30 days of meeting the conditions. Keep it, spend it, save it." },
];

/** Option C, "Value story": sells the account first for lower-intent visitors, with the code always one tap away. */
export function StarlingOptionC({ brand, content }: { brand: Brand; content: LandingPageContent }) {
  const code = brand.referralCode!;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: AUBERGINE }}>
        <div aria-hidden className="absolute -right-32 -top-32 size-[420px] rounded-full bg-[#9be3c5]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Image src={brand.logoPath} alt={`${brand.name} logo`} width={126} height={25} className="mb-8 h-6 w-auto brightness-0 invert" />
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              A free bank account that pays you <span className="text-[#9be3c5]">£25</span> to try it
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Keep your main bank. Open Starling on the side with my code, meet the conditions in the app, and the £25 is yours.
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/15 backdrop-blur sm:p-6">
            <CodeTicket code={code} provider={brand.slug} tone="dark" />
            <TrackedCtaLink
              href={brand.brandUrl!}
              provider={brand.slug}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#9be3c5] px-6 py-4 text-lg font-semibold text-[#321E37] transition hover:bg-white"
            >
              Get started at starlingbank.com <ArrowUpRight className="size-5" aria-hidden />
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-28 sm:pb-16">
        {/* Numbers strip */}
        <dl className="relative z-10 -mt-8 grid grid-cols-3 divide-x divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white text-center shadow-lg">
          {[
            ["£25", "cash reward"],
            ["£0", "monthly fee"],
            ["30 days", "max wait to get paid"],
          ].map(([n, l]) => (
            <div key={l} className="px-2 py-5">
              <dt className="sr-only">{l}</dt>
              <dd className="text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">{n}</dd>
              <dd className="text-xs text-[var(--muted)] sm:text-sm">{l}</dd>
            </div>
          ))}
        </dl>

        {/* Why Starling */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Why bother with Starling?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {WHY_STARLING.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
                <h3 className="text-lg font-bold text-[var(--foreground)]">{w.title}</h3>
                <p className="mt-1 text-[var(--body-text)]">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Your £25, step by step</h2>
          <ol className="relative ml-4 mt-8 space-y-8 border-l-2 border-dashed border-[var(--border)] pl-8">
            {TIMELINE.map(({ icon: Icon, when, title, body }) => (
              <li key={title} className="relative">
                <span className="absolute -left-[49px] flex size-8 items-center justify-center rounded-full text-white" style={{ background: AUBERGINE }}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-icon)]">{when}</p>
                <h3 className="text-lg font-bold text-[var(--foreground)]">{title}</h3>
                <p className="text-[var(--body-text)]">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-[var(--body-text)]">
            Cheap Direct Debits: {DIRECT_DEBITS.map((d) => `${d.name} (${d.detail})`).join(", ")}. Source:{" "}
            <a href={DD_SOURCE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProviderOutboundClick(brand.slug, "dd_source")} className={linkClass}>
              beermoneyuk.co.uk bank-switching guide ↗
            </a>
          </p>
        </section>

        {/* Is this for you */}
        <section className="mt-16 rounded-3xl bg-[#effaf5] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Is this for you?</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {ELIGIBILITY.map((e) => (
              <li key={e} className="flex gap-2 text-[var(--foreground)]">
                <Check className="mt-0.5 size-5 shrink-0 text-[var(--accent)]" aria-hidden /> {e}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--body-text)]">Doesn&apos;t count: {DOES_NOT_COUNT}</p>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Questions</h2>
          <FaqAccordion items={FAQ} />
          <p className="mt-4 text-sm text-[var(--body-text)]">
            {content.whatDoIGet}{" "}
            <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProviderOutboundClick(brand.slug, "terms")} className={linkClass}>
              Read the full Refer a Friend T&amp;Cs ↗
            </a>
          </p>
        </section>
      </div>

      {/* Mobile sticky copy bar */}
      <div className="starling-sticky fixed inset-x-0 bottom-0 z-40 border-t border-white/10 px-4 py-3 sm:hidden" style={{ background: AUBERGINE }}>
        <CodeTicket code={code} provider={brand.slug} tone="dark" className="!py-2" />
      </div>
      <style>{`
        :root { --more-offers-bar-offset: 92px; }
        @media (min-width: 640px) { :root { --more-offers-bar-offset: 0px; } }
      `}</style>
    </div>
  );
}
