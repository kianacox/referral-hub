import Link from "next/link";
import Image from "next/image";
import { Heart, Gift, Info, HelpCircle, BookOpen } from "lucide-react";
import type { Brand } from "@/lib/brands";
import type { LandingPageContent } from "@/content/landing-pages";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { CopyableCode } from "@/components/ui/CopyableCode";
import { TrustpilotBadge } from "@/components/ui/TrustpilotBadge";
import { AppStoreCtas } from "@/components/landing/AppStoreCtas";
import { TrackedCtaLink } from "@/components/landing/TrackedCtaLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const headingIconClass = "size-5 shrink-0 text-[var(--accent-icon)]";
const cardClass =
  "rounded-xl border border-[#1F1F1F] bg-[#0A0A0A] p-5 sm:p-6 shadow-md shadow-black/5";

/** Renders "Why I use it" text with optional markdown-style inline links [label](url). */
function WhyIUseItWithLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, url] = match;
          const isExternal =
            url.startsWith("http") && !url.includes("referral-hub.app");
          return (
            <Link
              key={i}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-[var(--accent-icon)] hover:text-[var(--accent)] hover:underline"
            >
              {label}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function SectionHeading({
  icon: Icon,
  children,
  id,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--foreground)]"
    >
      <Icon className={headingIconClass} aria-hidden />
      {children}
    </h2>
  );
}

type LandingPageTemplateProps = {
  brand: Brand;
  content: LandingPageContent;
  children?: React.ReactNode;
};

function CtaLabel(brand: Brand): string {
  if (brand.referralLink && brand.referralLink.trim() !== "") {
    const s = brand.offerSummary.toLowerCase();
    if (s.includes("£")) return "Get discount now";
    if (s.includes("free") || s.includes("trial")) return "Start free trial";
    if (s.includes("%")) return "Get 50% off";
    return "Use my link";
  }
  return "Use my code";
}

export function LandingPageTemplate({ brand, content, children }: LandingPageTemplateProps) {
  const hasLink = brand.referralLink && brand.referralLink.trim() !== "";
  const hasCode = brand.referralCode;
  const hasAppStoreLinks = content.appStoreLinks && (content.appStoreLinks.ios || content.appStoreLinks.android);
  const showBrandUrl = brand.brandUrl && !hasAppStoreLinks;

  return (
    <div className="mx-auto max-w-[600px] px-4 py-12 sm:py-20">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {brand.name}
        </h1>
        <p className="mt-2 text-lg text-[var(--body-text)]">{brand.offerSummary}</p>
        {content.trustpilot && (
          <div className="mt-6 flex justify-center">
            <TrustpilotBadge brandName={brand.name} trustpilot={content.trustpilot} brand={brand.slug} />
          </div>
        )}
        <div
          className="mt-6 flex justify-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
          style={{ boxShadow: "0 0 24px rgba(99, 102, 241, 0.08)" }}
        >
          {hasLink && (
            <CtaBlock
              referralLink={brand.referralLink}
              label={CtaLabel(brand)}
              brandUrl={showBrandUrl ? brand.brandUrl : undefined}
              provider={brand.slug}
            />
          )}
          {hasCode && !hasLink && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <CopyableCode code={brand.referralCode!} provider={brand.slug} />
              {showBrandUrl && (
                <TrackedCtaLink
                  href={brand.brandUrl!}
                  provider={brand.slug}
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
                >
                  Go to site
                </TrackedCtaLink>
              )}
            </div>
          )}
        </div>
      </div>

      <section className={`mb-10 overflow-hidden ${cardClass}`}>
        <SectionHeading icon={Heart}>Why I use it</SectionHeading>
        <div className="mt-3 whitespace-pre-line text-[var(--body-text)] leading-[1.6]">
          <WhyIUseItWithLinks text={content.whyIUseIt} />
        </div>
        {content.images && content.images.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">My progress</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.images.map((img) => (
              <div key={img.src} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[#1F1F1F] bg-[var(--main-bg)]">
                <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw, 33vw" />
              </div>
            ))}
            </div>
          </div>
        )}
      </section>

      <section className={`mb-10 overflow-hidden ${cardClass}`}>
        <SectionHeading icon={Gift}>How the offer works</SectionHeading>
        <p className="mt-3 text-[var(--body-text)] leading-relaxed">{content.howItWorks}</p>
        {content.appStoreLinks && (content.appStoreLinks.ios || content.appStoreLinks.android) && (
          <AppStoreCtas
            provider={brand.slug}
            ios={content.appStoreLinks.ios}
            android={content.appStoreLinks.android}
          />
        )}
        <div className="mt-4 flex justify-center">
          {hasLink && (
            <CtaBlock
              referralLink={brand.referralLink}
              label={CtaLabel(brand)}
              brandUrl={showBrandUrl ? brand.brandUrl : undefined}
              provider={brand.slug}
            />
          )}
          {hasCode && !hasLink && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <CopyableCode code={brand.referralCode!} provider={brand.slug} />
              {showBrandUrl && (
                <TrackedCtaLink
                  href={brand.brandUrl!}
                  provider={brand.slug}
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--main-bg)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
                >
                  Go to site
                </TrackedCtaLink>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={`mb-10 overflow-hidden ${cardClass}`}>
        <SectionHeading icon={Info}>What I get</SectionHeading>
        <p className="mt-3 text-[var(--body-text)]">{content.whatDoIGet}</p>
      </section>

      {content.extraSections &&
        Object.entries(content.extraSections).map(([heading, body]) => (
          <section key={heading} className={`mb-10 overflow-hidden ${cardClass}`}>
            <SectionHeading icon={BookOpen}>{heading}</SectionHeading>
            <ExtraSectionBody body={body} />
          </section>
        ))}

      {content.faq && content.faq.length > 0 && (
        <section
          className={`mb-10 overflow-hidden ${cardClass}`}
          aria-labelledby="faq-heading"
        >
          <SectionHeading icon={HelpCircle} id="faq-heading">
            Frequently asked questions
          </SectionHeading>
          <FaqAccordion items={content.faq} />
        </section>
      )}

      {children}
    </div>
  );
}

function ExtraSectionBody({ body }: { body: string }) {
  const parts = body.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div className="mt-3 whitespace-pre-wrap text-[var(--body-text)] leading-relaxed">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="text-[var(--foreground)]">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </div>
  );
}
