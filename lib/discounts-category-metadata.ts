import type { Metadata } from "next";
import type { BrandCategory } from "@/lib/brands";
import { CATEGORY_LABELS } from "@/lib/brands";

const SITE = "https://referral-hub.app";

export function buildDiscountsCategoryMetadata(
  category: BrandCategory
): Metadata {
  const label = CATEGORY_LABELS[category];
  const title = `${label} discounts`;
  const description = `Referral codes and discounts in ${label}—brands I use. Browse offers or change category.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Referral Hub`,
      description,
    },
    alternates: { canonical: `${SITE}/discounts/${category}` },
  };
}
