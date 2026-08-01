import type { MetadataRoute } from "next";
import { getDiscountSlugs, getEarnSlugs } from "@/lib/brands";

const BASE_URL = "https://referral-hub.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const landingPages: MetadataRoute.Sitemap = [
    ...getDiscountSlugs().map(({ category, slug }) => ({
      url: `${BASE_URL}/discounts/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getEarnSlugs().map((slug) => ({
      url: `${BASE_URL}/earn/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...landingPages,
  ];
}
