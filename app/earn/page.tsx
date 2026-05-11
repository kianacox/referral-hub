import type { Metadata } from "next";
import { EditorialListHeader } from "@/components/list/EditorialListHeader";
import { ListPageFrame } from "@/components/list/ListPageFrame";
import { earnEditorial } from "@/lib/list-page-editorial";
import { EARN_INTRO } from "@/constants/copy";
import { EarnPageContent } from "./EarnPageContent";

export const metadata: Metadata = {
  title: "Earn",
  description:
    "Earn rewards on spending you already do—e.g. cashback on rent with Ribbon Rewards. No discount codes, just earn.",
  alternates: { canonical: "https://referral-hub.app/earn" },
};

export default function EarnPage() {
  return (
    <ListPageFrame>
      <EditorialListHeader {...earnEditorial()} supporting={EARN_INTRO} />
      <EarnPageContent />
    </ListPageFrame>
  );
}
