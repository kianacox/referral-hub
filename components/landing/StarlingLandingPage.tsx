"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, ShieldCheck, Wallet, PiggyBank } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";
import { trackProviderOutboundClick } from "@/lib/analytics";
import { CodeTicket } from "@/components/landing/starling/CodeTicket";
import {
  CODE_USES,
  DD_SOURCE_URL,
  DIRECT_DEBITS,
  DOES_NOT_COUNT,
  ELIGIBILITY,
  PROOF_FACTS,
  PROOF_SCREENSHOT,
  STEPS,
  TERMS_URL,
  WHY_STARLING,
} from "@/components/landing/starling/offer";

const WHY_ICONS = [Wallet, PiggyBank, ShieldCheck];
const pinClass = "grid size-[26px] place-items-center rounded-full bg-[var(--foreground)] text-[13px] font-extrabold text-white";
const linkClass ="font-medium text-[var(--accent-icon)] hover:text-[var(--accent)] hover:underline";

/** Code-first for ready-to-go visitors, a short pitch for the undecided, fine print folded away. */
export function StarlingLandingPage({ brand, content }: { brand: Brand; content: LandingPageContent }) {
  const code = brand.referralCode!;

  return (
    <div className="spotlight-bg">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:pt-16">
        {/* Hero: offer left, action right */}
        <section className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-icon)]">Starling referral code</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-6xl">
              Get <span className="text-[var(--accent)]">£25</span> for opening a Starling account
            </h1>
            <p className="mt-4 max-w-md text-lg text-[var(--body-text)]">
              Free account, no switch needed. Enter the code when you apply and meet the conditions in the app.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] sm:p-7">
            <CodeTicket code={code} provider={brand.slug} />
            <TrackedCtaLink
              href={brand.brandUrl!}
              provider={brand.slug}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[var(--cta-from)] to-[var(--cta-to)] px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Go to starlingbank.com
              <ArrowUpRight className="size-5" aria-hidden />
            </TrackedCtaLink>
            <p className="mt-3 text-center text-xs text-[var(--muted)]">Opens Starling&apos;s official site in a new tab. There&apos;s no referral link: the code is the only way to claim.</p>
          </div>
        </section>

        {/* Steps */}
        <ol className="mt-14 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-[var(--border)] bg-white p-5">
              <span className="text-5xl font-black text-[var(--accent)]/15">{i + 1}</span>
              <h2 className="mt-1 font-bold text-[var(--foreground)]">{s.title}</h2>
              <p className="mt-1 text-sm text-[var(--body-text)]">{s.body}</p>
            </li>
          ))}
        </ol>

        {/* Proof: the offer as my own app shows it, pinned to plain-English facts */}
        <section className="mt-14 grid items-center gap-6 md:grid-cols-[300px_1fr] md:gap-10">
          <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[18px] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)]">
            <Image
              src={PROOF_SCREENSHOT.src}
              alt="The How it works card from my Starling app: you'll both get £25 if your friend opens an account with your code and sets up a Direct Debit in 30 days, there's no minimum amount, and a code works for up to 10 people."
              width={PROOF_SCREENSHOT.width}
              height={PROOF_SCREENSHOT.height}
              sizes="300px"
              className="block h-auto w-full"
            />
            {PROOF_FACTS.map((f, i) => (
              <span key={f.title} style={{ top: f.pinTop }} className={`${pinClass} absolute left-[3%]`} aria-hidden>
                {i + 1}
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-icon)]">Straight from my app</p>
            <h2 className="mt-1 text-balance text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">This is the offer Starling shows me</h2>
            <p className="mt-2 text-[var(--body-text)]">
              Screenshot from my own personal Starling account (the Refer a friend screen), cropped to the offer card. It
              shows no account details. The numbered pins are mine.
            </p>
            <ol className="mt-5 space-y-4">
              {PROOF_FACTS.map((f, i) => (
                <li key={f.title} className="grid grid-cols-[26px_1fr] items-start gap-3">
                  <span className={pinClass} aria-hidden>{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">{f.title}</h3>
                    <p className="text-sm text-[var(--body-text)]">{f.body}</p>
                    {f.showCodesLeft && <CodesLeft {...CODE_USES} />}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-xs text-[var(--muted)]">Captured {PROOF_SCREENSHOT.capturedOn}</p>
          </div>
        </section>

        {/* Still deciding */}
        <section className="mt-14 rounded-3xl bg-[var(--foreground)] px-6 py-8 text-white sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight">Still deciding?</h2>
          <p className="mt-1 text-white/75">You keep your current bank. Starling just sits alongside it.</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {WHY_STARLING.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <li key={w.title}>
                  <Icon className="size-6 text-white" aria-hidden />
                  <h3 className="mt-2 font-semibold">{w.title}</h3>
                  <p className="text-sm text-white/75">{w.body}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Fine print, folded */}
        <section className="mx-auto mt-14 max-w-2xl">
          <h2 className="text-xl font-bold text-[var(--foreground)]">The fine print</h2>
          <div className="mt-4 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
            <Fold title="Who can use the code">
              <ul className="list-disc space-y-1 pl-5">{ELIGIBILITY.map((e) => <li key={e}>{e}</li>)}</ul>
            </Fold>
            <Fold title="What doesn't count towards the conditions">{DOES_NOT_COUNT}</Fold>
            <Fold title="Cheap Direct Debits, if you need one">
              <ul className="space-y-1">
                {DIRECT_DEBITS.map((d) => (
                  <li key={d.name}>
                    <span className="font-semibold text-[var(--foreground)]">{d.name}</span> · {d.detail}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm">
                Source:{" "}
                <a href={DD_SOURCE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProviderOutboundClick(brand.slug, "dd_source")} className={linkClass}>
                  beermoneyuk.co.uk bank-switching guide ↗
                </a>
              </p>
            </Fold>
            <Fold title="What I get">{content.whatDoIGet}</Fold>
          </div>
          <p className="mt-4 text-sm">
            <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackProviderOutboundClick(brand.slug, "terms")} className={linkClass}>
              Read the full Refer a Friend T&amp;Cs ↗
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

function CodesLeft({ left, total }: { left: number; total: number }) {
  return (
    <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-2.5 w-1.5 rounded-full ${i < left ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`} />
        ))}
      </span>
      <span className="font-mono">{left}/{total}</span> codes left
    </p>
  );
}

function Fold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group px-5 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between py-4 font-semibold text-[var(--foreground)]">
        {title}
        <ChevronDown className="size-5 text-[var(--muted)] transition group-open:rotate-180" aria-hidden />
      </summary>
      <div className="pb-4 text-[var(--body-text)]">{children}</div>
    </details>
  );
}
