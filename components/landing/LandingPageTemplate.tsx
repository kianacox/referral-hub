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

const headingIconClass = "size-5 shrink-0 text-[var(--muted)]";

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
      className="flex items-center gap-2 text-xl font-semibold text-[var(--foreground)]"
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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {brand.name}
        </h1>
        <p className="mt-2 text-lg text-[var(--muted)]">{brand.offerSummary}</p>
        {content.trustpilot && (
          <div className="mt-6 flex justify-center">
            <TrustpilotBadge brandName={brand.name} trustpilot={content.trustpilot} />
          </div>
        )}
        <div className="mt-6 flex justify-center">
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

      <section className="mb-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-md shadow-black/10">
        <SectionHeading icon={Heart}>Why I use it</SectionHeading>
        <div className="mt-3 whitespace-pre-line text-[var(--muted)] leading-relaxed">
          {content.whyIUseIt}
        </div>
        {content.links && content.links.length > 0 && (
          <ul className="mt-4 space-y-2">
            {content.links.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[var(--accent)] hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {content.images && content.images.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">My progress</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.images.map((img) => (
              <div key={img.src} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--main-bg)]">
                <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw, 33vw" />
              </div>
            ))}
            </div>
          </div>
        )}
      </section>

      <section className="mb-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-md shadow-black/10">
        <SectionHeading icon={Gift}>How the offer works</SectionHeading>
        <p className="mt-3 text-[var(--muted)] leading-relaxed">{content.howItWorks}</p>
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

      <section className="mb-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-md shadow-black/10">
        <SectionHeading icon={Info}>What do I get</SectionHeading>
        <p className="mt-3 text-[var(--muted)]">{content.whatDoIGet}</p>
      </section>

      {content.extraSections &&
        Object.entries(content.extraSections).map(([heading, body]) => (
          <section key={heading} className="mb-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-md shadow-black/10">
            <SectionHeading icon={BookOpen}>{heading}</SectionHeading>
            <ExtraSectionBody body={body} />
          </section>
        ))}

      {content.faq && content.faq.length > 0 && (
        <section className="mb-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-md shadow-black/10" aria-labelledby="faq-heading">
          <SectionHeading icon={HelpCircle} id="faq-heading">
            Frequently asked questions
          </SectionHeading>
          <ul className="mt-4 space-y-6">
            {content.faq.map((item, i) => (
              <li key={i}>
                <h3 className="font-medium text-[var(--foreground)]">{item.question}</h3>
                <p className="mt-1 text-[var(--muted)] leading-relaxed">{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {children}
    </div>
  );
}

function ExtraSectionBody({ body }: { body: string }) {
  const parts = body.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div className="mt-3 whitespace-pre-wrap text-[var(--muted)] leading-relaxed">
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
