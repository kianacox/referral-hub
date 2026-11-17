"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Rocket, Search, X } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { trackProviderOutboundClick } from "@/lib/analytics";
import { CodeTicket } from "./CodeTicket";
import {
  DD_SOURCE_URL,
  DIRECT_DEBITS,
  DOES_NOT_COUNT,
  ELIGIBILITY,
  FAQ,
  STEPS,
  TERMS_URL,
  WHY_STARLING,
} from "./offer";

const linkClass = "font-medium text-[var(--accent-icon)] hover:text-[var(--accent)] hover:underline";

/** Option B, "Two doors": one hero, then the page splits into a ready-now path and a still-deciding path. */
export function StarlingOptionB({ brand, content }: { brand: Brand; content: LandingPageContent }) {
  const code = brand.referralCode!;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="mx-auto max-w-2xl text-center">
        <Image src={brand.logoPath} alt={`${brand.name} logo`} width={126} height={25} className="mx-auto mb-6 h-6 w-auto" />
        <div className="mx-auto inline-flex items-baseline gap-2 rounded-full bg-[#effaf5] px-4 py-1.5 text-sm font-semibold text-[var(--accent)]">
          £25 cash · code only · free account
        </div>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
          £25 from Starling, for a free bank account you can keep on the side
        </h1>
        <div className="mx-auto mt-8 max-w-md">
          <CodeTicket code={code} provider={brand.slug} />
        </div>
        <nav className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold" aria-label="Choose your path">
          <a href="#ready" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[var(--foreground)] hover:border-[var(--accent-icon)]">
            <Rocket className="size-4 text-[var(--accent-icon)]" aria-hidden /> I&apos;m ready <ArrowDown className="size-3.5" aria-hidden />
          </a>
          <a href="#deciding" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[var(--foreground)] hover:border-[#321E37]">
            <Search className="size-4 text-[#321E37]" aria-hidden /> I&apos;m still deciding <ArrowDown className="size-3.5" aria-hidden />
          </a>
        </nav>
      </section>

      {/* The two doors */}
      <div className="mt-14 grid items-start gap-6 md:grid-cols-2">
        <section id="ready" className="scroll-mt-20 rounded-3xl bg-[var(--accent)] p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Ready now</p>
          <h2 className="mt-1 text-2xl font-bold">Claim it in 3 steps</h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[var(--accent)]">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="text-white/80">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <TrackedCtaLink
            href={brand.brandUrl!}
            provider={brand.slug}
            className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-[var(--accent)] transition hover:bg-[#effaf5]"
          >
            Go to starlingbank.com <ArrowUpRight className="size-5" aria-hidden />
          </TrackedCtaLink>
        </section>

        <section id="deciding" className="scroll-mt-20 rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#321E37]/60">Still deciding</p>
          <h2 className="mt-1 text-2xl font-bold text-[var(--foreground)]">Is it worth it?</h2>
          <ul className="mt-6 space-y-4">
            {WHY_STARLING.map((w) => (
              <li key={w.title} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-[var(--accent-icon)]" aria-hidden />
                <span>
                  <span className="block font-semibold text-[var(--foreground)]">{w.title}</span>
                  <span className="text-[var(--body-text)]">{w.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <FaqAccordion items={FAQ} />
        </section>
      </div>

      {/* Eligibility at a glance */}
      <section className="mt-14 grid gap-6 rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">You can use the code if</h2>
          <ul className="mt-3 space-y-2">
            {ELIGIBILITY.map((e) => (
              <li key={e} className="flex gap-2 text-[var(--body-text)]">
                <Check className="mt-0.5 size-5 shrink-0 text-[var(--accent-icon)]" aria-hidden /> {e}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">These don&apos;t count</h2>
          <p className="mt-3 flex gap-2 text-[var(--body-text)]">
            <X className="mt-0.5 size-5 shrink-0 text-[#b4434b]" aria-hidden /> {DOES_NOT_COUNT}
          </p>
          <h3 className="mt-5 font-semibold text-[var(--foreground)]">Need a Direct Debit? Cheap ones:</h3>
          <p className="mt-1 text-sm text-[var(--body-text)]">
            {DIRECT_DEBITS.map((d) => d.name).join(" · ")} (
            <a href={DD_SOURCE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProviderOutboundClick(brand.slug, "dd_source")} className={linkClass}>
              beermoneyuk guide ↗
            </a>
            )
          </p>
        </div>
      </section>

      <p className="mt-6 text-center text-sm text-[var(--body-text)]">
        {content.whatDoIGet}{" "}
        <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProviderOutboundClick(brand.slug, "terms")} className={linkClass}>
          Full Refer a Friend T&amp;Cs ↗
        </a>
      </p>
    </div>
  );
}
