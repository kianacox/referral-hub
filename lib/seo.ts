import type { FaqItem } from "@/content/landing-pages";

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

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ribbon Rewards",
    url: "https://www.ribbonrewards.io",
    sameAs: ["https://www.trustpilot.com/review/ribbonrewards.io"],
    description:
      "Ribbon Rewards helps UK renters earn points on rent payments routed through regulated UK banking infrastructure.",
  };
}

export function buildServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ribbon Rewards Rent Cashback",
    serviceType: "Rent payment rewards",
    provider: {
      "@type": "Organization",
      name: "Ribbon Rewards",
      url: "https://www.ribbonrewards.io",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    offers: {
      "@type": "Offer",
      description: "£25 sign-up bonus plus ongoing points on rent payments.",
      price: "0",
      priceCurrency: "GBP",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Regulated Banking Infrastructure",
        value: "Griffin Bank Ltd (FCA FRN 970920)",
      },
      {
        "@type": "PropertyValue",
        name: "Typical Cashback Rate",
        value: "1% to 1.5%",
      },
    ],
  };
}
