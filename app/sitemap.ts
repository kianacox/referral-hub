import type { MetadataRoute } from "next";
import { getAllSlugs, CATEGORIES } from "@/lib/brands";

const BASE_URL = "https://referral-hub.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/discounts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/earn`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...CATEGORIES.map((category) => ({
      url: `${BASE_URL}/discounts/${category}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const landingPages: MetadataRoute.Sitemap = slugs.map(({ category, slug }) => ({
    url: `${BASE_URL}/discounts/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...landingPages];
}
