import type { BrandCategory } from "@/lib/brands";
import { CATEGORY_LABELS } from "@/lib/brands";

export type EditorialHeading = {
  eyebrow: string;
  headline: string;
};

export function homeEditorial(): EditorialHeading {
  return {
    eyebrow: "Personal referrals",
    headline: "Referral Hub",
  };
}

export function earnEditorial(): EditorialHeading {
  return {
    eyebrow: "Cashback & rewards",
    headline: "Earn",
  };
}

export function discountsIndexEditorial(): EditorialHeading {
  return {
    eyebrow: "Discounts & offers",
    headline: "Discounts",
  };
}

export function discountsCategoryEditorial(
  category: BrandCategory
): EditorialHeading {
  return {
    eyebrow: "Discounts & offers",
    headline: `${CATEGORY_LABELS[category]} discounts`,
  };
}

export function discountsCategorySupportingText(category: BrandCategory): string {
  const label = CATEGORY_LABELS[category];
  return `${label} offers I use and share—filter or browse everything below.`;
}
