import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/brands";
import type { BrandCategory } from "@/lib/brands";
import { DiscountsPageContent } from "../DiscountsPageContent";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function DiscountsCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!CATEGORIES.includes(category as BrandCategory)) notFound();

  return (
    <DiscountsPageContent
      initialFilters={[]}
      categoryFromPath={category as BrandCategory}
    />
  );
}
