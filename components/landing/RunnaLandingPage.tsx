"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Plus, Star } from "lucide-react";
import {
  trackBrandTrustpilotClick,
  trackProviderAndroidCtaClick,
  trackProviderCodeCopy,
  trackProviderIosCtaClick,
} from "@/lib/analytics";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { COPIED } from "@/constants/copy";

// Dark "race bib" look from Claude Design (direction C).
const display = "font-[family-name:var(--font-barlow-condensed)] uppercase";
const accentText = "text-[#c8f169]";

/** Headline numbers read off the progress screenshots. */
const STATS = [
  { big: "250 km", label: "Total distance", accent: false },
  { big: "51", label: "Runs", accent: false },
  { big: "33+ hrs", label: "Running", accent: false },
  { big: "8:27/km", label: "Down from 9:39", accent: true },
];

/** Short captions for content.images, in the same order. */
const PROGRESS_CAPTIONS = [
  { label: "Start", detail: "April 2025 · 9:39/km" },
  { label: "Now", detail: "5.91 km · 8:27/km" },
  { label: "Total", detail: "250 km · 51 runs" },
];

type StoreLinksProps = {
  slug: string;
  ios?: string;
  android?: string;
  variant: "outline" | "solid";
};

function StoreLinks({ slug, ios, android, variant }: StoreLinksProps) {
  const className =
    variant === "outline"
      ? "flex min-h-[52px] flex-1 basis-40 items-center justify-center rounded-lg border border-[#3a4540] text-[15px] font-semibold text-white no-underline transition-colors hover:border-[#c8f169]"
      : "inline-flex min-h-[46px] items-center rounded-lg bg-[#c8f169] px-5 text-[15px] font-bold text-[#0e1311] no-underline transition-colors hover:bg-[#e2ff9e]";
  return (
    <div className="flex flex-wrap gap-3">
      {ios && (
        <a
          href={ios}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProviderIosCtaClick(slug)}
          className={className}
        >
          Download for iOS
        </a>
      )}
      {android && (
        <a
          href={android}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProviderAndroidCtaClick(slug)}
          className={className}
        >
          Download for Android
        </a>
      )}
    </div>
  );
}

type RunnaLandingPageProps = {
  brand: Brand;
  content: LandingPageContent;
};

export function RunnaLandingPage({ brand, content }: RunnaLandingPageProps) {
  const [copied, setCopied] = useState(false);
  const code = brand.referralCode!;
  const { ios, android } = content.appStoreLinks ?? {};

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      trackProviderCodeCopy(brand.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback ignored for brevity
    }
  }, [code, brand.slug]);

  return (
    <div className="bg-[#0e1311] font-[family-name:var(--font-geist-sans)] text-[#c9d1cc]">
      {/* Hero */}
      <section className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-14 px-6 pb-20 pt-14 sm:pt-[72px]">
        <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={brand.logoPath}
              alt={`${brand.name} logo`}
              width={44}
              height={44}
              className="rounded-xl"
            />
            <h1 className={`${display} text-2xl font-extrabold tracking-[0.08em] text-white`}>
              {brand.name}
            </h1>
          </div>
          <p
            className={`${display} text-[clamp(52px,8vw,104px)] font-extrabold leading-[0.88] text-white`}
          >
            Two weeks of Runna Premium <span className={accentText}>free</span> with my code.
          </p>
          {content.trustpilot && (
            <div className="flex flex-wrap items-center gap-2.5 text-[15px]">
              <span
                role="img"
                aria-label={`Trustpilot rating: ${content.trustpilot.score.toFixed(1)} out of 5`}
                className="inline-flex gap-0.5"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={18}
                    aria-hidden
                    className={
                      i <= Math.round(content.trustpilot!.score)
                        ? "fill-[#c8f169] text-[#c8f169]"
                        : "fill-[#34403a] text-[#34403a]"
                    }
                  />
                ))}
              </span>
              <span className="font-semibold text-white">
                {content.trustpilot.score.toFixed(1)}
              </span>
              <a
                href={content.trustpilot.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBrandTrustpilotClick(brand.slug)}
                className="text-[#c8f169] underline-offset-2 hover:text-[#e2ff9e] hover:underline"
              >
                Check out {brand.name} on Trustpilot
              </a>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
          {/* Race bib */}
          <div className="relative flex -rotate-[1.5deg] flex-col gap-2.5 rounded-[10px] bg-white px-7 pb-7 pt-[34px] text-[#0e1311] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <span aria-hidden className="absolute left-3 top-3 size-3 rounded-full bg-[#0e1311]" />
            <span aria-hidden className="absolute right-3 top-3 size-3 rounded-full bg-[#0e1311]" />
            <span aria-hidden className="absolute bottom-3 left-3 size-3 rounded-full bg-[#0e1311]" />
            <span aria-hidden className="absolute bottom-3 right-3 size-3 rounded-full bg-[#0e1311]" />
            <div
              className={`${display} rounded bg-[#c8f169] p-2 text-center text-xl font-extrabold tracking-[0.12em]`}
            >
              Your referral code
            </div>
            <code className="break-all pb-2 pt-[18px] text-center font-[family-name:var(--font-geist-mono)] text-[clamp(26px,3.4vw,38px)] font-bold tracking-[0.04em]">
              {code}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className={`${display} min-h-[54px] cursor-pointer rounded-lg bg-[#0e1311] text-xl font-extrabold tracking-[0.1em] text-white transition-colors hover:bg-[#26302c]`}
            >
              {copied ? COPIED : "Copy code"}
            </button>
          </div>
          <StoreLinks slug={brand.slug} ios={ios} android={android} variant="outline" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-[#222b27]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 px-6 py-7">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className={`${display} text-5xl font-extrabold leading-none ${s.accent ? accentText : "text-white"}`}
              >
                {s.big}
              </div>
              <div className="text-[13px] uppercase tracking-[0.08em]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why I use it */}
      <section className="mx-auto max-w-[1120px] px-6 pt-24">
        <h2 className={`${display} mb-[18px] text-[52px] font-extrabold leading-none text-white`}>
          Why I use it
        </h2>
        <p className="max-w-[720px] whitespace-pre-line text-lg leading-[1.75]">
          {content.whyIUseIt}
        </p>
      </section>

      {/* Progress */}
      {content.images && content.images.length > 0 && (
        <section className="mx-auto max-w-[1120px] px-6 pt-24">
          <h2 className={`${display} mb-7 text-[52px] font-extrabold leading-none text-white`}>
            My progress
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            {content.images.map((img, i) => (
              <figure key={img.src} className="flex flex-col gap-3">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1206}
                  height={2622}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="h-auto w-full rounded-[18px] border border-[#2a3430]"
                />
                {PROGRESS_CAPTIONS[i] && (
                  <figcaption className="text-sm">
                    <span className={`${display} text-xl font-extrabold text-white`}>
                      {PROGRESS_CAPTIONS[i].label}
                    </span>{" "}
                    · {PROGRESS_CAPTIONS[i].detail}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* How it works + what I get */}
      <section className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 px-6 pt-24">
        <div className="flex flex-col gap-3 rounded-2xl border border-[#222b27] bg-[#161d1a] p-7">
          <h2 className={`${display} text-[34px] font-extrabold text-white`}>How the offer works</h2>
          <p className="text-base leading-[1.65]">{content.howItWorks}</p>
          <div className="mt-1.5">
            <StoreLinks slug={brand.slug} ios={ios} android={android} variant="solid" />
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-[#222b27] bg-[#161d1a] p-7">
          <h2 className={`${display} text-[34px] font-extrabold text-white`}>What I get</h2>
          <p className="text-base leading-[1.65]">{content.whatDoIGet}</p>
        </div>
      </section>

      {/* FAQ */}
      {content.faq && content.faq.length > 0 && (
        <section
          className="mx-auto max-w-[1120px] px-6 pb-28 pt-24"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className={`${display} mb-5 text-[52px] font-extrabold leading-none text-white`}
          >
            Frequently asked questions
          </h2>
          <div className="border-t border-[#2a3430]">
            {content.faq.map((item) => (
              <details key={item.question} className="group border-b border-[#2a3430]">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-3 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    size={20}
                    aria-hidden
                    className="shrink-0 transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="mb-5 text-base leading-[1.65]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
