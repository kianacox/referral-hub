import type { Metadata } from "next";
import { DiscountsPageContent } from "./DiscountsPageContent";

export const metadata: Metadata = {
  title: "Discounts",
  description:
    "Referral codes for brands I use, with discounts for you. Filter by Bills, Health, or Finance.",
  openGraph: { title: "Discounts | Referral Hub", description: "Referral codes and discounts for brands I use." },
  alternates: { canonical: "https://referral-hub.app/discounts" },
};

type PageProps = {
  searchParams: Promise<{ filters?: string }>;
};

export default async function DiscountsPage({ searchParams }: PageProps) {
  const { filters } = await searchParams;
  const filterList = filters ? filters.split(",").filter(Boolean) : [];
  const validFilters = filterList.filter((f) =>
    ["health", "finance", "bills"].includes(f)
  ) as ("health" | "finance" | "bills")[];

  return (
    <DiscountsPageContent
      initialFilters={validFilters}
      categoryFromPath={null}
    />
  );
}
