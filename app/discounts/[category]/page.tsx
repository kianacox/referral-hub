import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/brands";
import type { BrandCategory } from "@/lib/brands";
import { EditorialListHeader } from "@/components/list/EditorialListHeader";
import { ListPageFrame } from "@/components/list/ListPageFrame";
import {
  discountsCategoryEditorial,
  discountsCategorySupportingText,
} from "@/lib/list-page-editorial";
import { buildDiscountsCategoryMetadata } from "@/lib/discounts-category-metadata";
import { DiscountsPageContent } from "../DiscountsPageContent";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.includes(category as BrandCategory)) {
    return {};
  }
  return buildDiscountsCategoryMetadata(category as BrandCategory);
}

export default async function DiscountsCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!CATEGORIES.includes(category as BrandCategory)) notFound();

  return (
    <ListPageFrame>
      <EditorialListHeader
        {...discountsCategoryEditorial(category as BrandCategory)}
        supporting={discountsCategorySupportingText(
          category as BrandCategory
        )}
      />
      <DiscountsPageContent
        initialFilters={[]}
        categoryFromPath={category as BrandCategory}
      />
    </ListPageFrame>
  );
}
