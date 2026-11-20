import type { FaqItem } from "@/content/landing-pages";
import { CONTACT_EMAIL } from "@/constants/site";

/** Site-level Organization JSON-LD: who runs the site and how to reach them. */
export const SITE_ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Referral Hub",
  url: "https://referral-hub.app",
  email: CONTACT_EMAIL,
};

/** Builds FAQPage JSON-LD for AI overviews and rich results. */
export function buildFaqJsonLd(faq: FaqItem[]) {
  if (faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
