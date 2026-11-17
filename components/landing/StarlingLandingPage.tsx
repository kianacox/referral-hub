"use client";

import Image from "next/image";
import { Gift, ListOrdered, Info, Landmark } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { CopyableCode } from "@/components/ui/CopyableCode";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";
import { trackProviderOutboundClick } from "@/lib/analytics";

const TERMS_URL =
  "https://www.starlingbank.com/legal/terms/starling-referral-terms/";
const DD_SOURCE_URL = "https://www.beermoneyuk.co.uk/bank-switching";

/** Offer facts, all taken from the Starling Refer a Friend T&Cs (effective 24 Aug 2026). */
const OFFER_FACTS = [
  {
    label: "Reward",
    value:
      "£25, paid into a Space in your account within 30 days of meeting the reward conditions.",
  },
  {
    label: "Condition",
    value:
      "Complete the reward conditions shown in the app. These could include setting up one or more Direct Debits, or making payments from the account.",
  },
  {
    label: "Who can use it",
    value:
      "You're 18 or over, have never had a Starling account, and are opening a personal current account (not joint, teen, Under 16s or student).",
  },
  {
    label: "Doesn't count",
    value:
      "Standing orders, transfers to other bank accounts (including Starling ones), refunded or cancelled payments.",
  },
];

const STEPS = [
  {
    title: "Start a Starling application",
    body: "Apply for a Starling personal current account.",
  },
  {
    title: "Enter the code during your application",
    body: "Type VVDCRGY when asked for a referral code. You can only enter one code.",
  },
  {
    title: "Meet the conditions in the app",
    body: "Starling tells you in the app when you've earned the £25.",
  },
];

/** Cheap Direct Debits listed on beermoneyuk.co.uk's bank-switching guide. */
const DIRECT_DEBITS = [
  { name: "A charity donation", detail: "£1 a month (e.g. Cancer Research, Mind)" },
  { name: "Wealthify", detail: "£1 a month into savings" },
  { name: "Plum", detail: "£1 a month into savings" },
  { name: "Moneybox", detail: "Round-ups paid by Direct Debit" },
];

const headingIconClass = "size-5 shrink-0 text-[var(--accent-icon)]";
const cardClass =
  "rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm";
const textLinkClass =
  "text-[var(--accent-icon)] hover:text-[var(--accent)] hover:underline";

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--foreground)]">
      <Icon className={headingIconClass} aria-hidden />
      {children}
    </h2>
  );
}

type StarlingLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

export function StarlingLandingPage({ brand, content }: StarlingLandingPageProps) {
  const code = brand.referralCode!;

  return (
    <div className="mx-auto max-w-[600px] px-4 py-12 sm:py-20">
      <div className="mb-10">
        <Image
          src={brand.logoPath}
          alt={`${brand.name} logo`}
          width={126}
          height={25}
          className="mb-5 h-6 w-auto"
        />
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Get £25 when you open a Starling account with my code
        </h1>
        <p className="mt-2 text-lg text-[var(--body-text)]">
          There&apos;s no referral link. Copy the code and enter it during your
          Starling application.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <CopyableCode
            code={code}
            label="Copy code"
            provider={brand.slug}
            className="w-full max-w-xs"
          />
          <TrackedCtaLink
            href={brand.brandUrl!}
            provider={brand.slug}
            className="text-sm font-medium text-[var(--accent-icon)] hover:text-[var(--accent)] hover:underline"
          >
            Go to starlingbank.com ↗
          </TrackedCtaLink>
        </div>
      </div>

      <section className={`mb-8 ${cardClass}`}>
        <SectionHeading icon={Gift}>The offer</SectionHeading>
        <dl className="mt-3 flex flex-col gap-3">
          {OFFER_FACTS.map((f) => (
            <div key={f.label}>
              <dt className="text-sm font-semibold text-[var(--foreground)]">{f.label}</dt>
              <dd className="text-[var(--body-text)] leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm">
          <a
            href={TERMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProviderOutboundClick(brand.slug, "terms")}
            className={textLinkClass}
          >
            Read the full Refer a Friend T&amp;Cs ↗
          </a>
        </p>
      </section>

      <section className={`mb-8 ${cardClass}`}>
        <SectionHeading icon={ListOrdered}>How to use the code</SectionHeading>
        <ol className="mt-3 flex flex-col gap-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--border)] text-sm font-semibold text-[var(--foreground)]">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold text-[var(--foreground)]">{s.title}</span>
                <span className="text-[var(--body-text)]">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className={`mb-8 ${cardClass}`}>
        <SectionHeading icon={Landmark}>Easy Direct Debits to set up</SectionHeading>
        <p className="mt-3 text-[var(--body-text)]">
          If your reward conditions ask for a Direct Debit, these are low-cost ones
          people commonly use:
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {DIRECT_DEBITS.map((d) => (
            <li key={d.name} className="text-[var(--body-text)]">
              <span className="font-semibold text-[var(--foreground)]">{d.name}</span>
              {" · "}
              {d.detail}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--body-text)]">
          Source:{" "}
          <a
            href={DD_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProviderOutboundClick(brand.slug, "dd_source")}
            className={textLinkClass}
          >
            beermoneyuk.co.uk bank-switching guide ↗
          </a>
          . Remember, standing orders don&apos;t count.
        </p>
      </section>

      <section className={`mb-8 ${cardClass}`}>
        <SectionHeading icon={Info}>What I get</SectionHeading>
        <p className="mt-3 text-[var(--body-text)]">{content.whatDoIGet}</p>
      </section>
    </div>
  );
}
