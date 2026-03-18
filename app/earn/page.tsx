import type { Metadata } from "next";
import { EarnPageContent } from "./EarnPageContent";

export const metadata: Metadata = {
  title: "Earn | Referral Hub – Cashback & rewards",
  description:
    "Earn rewards on spending you already do—e.g. cashback on rent with Ribbon Rewards. No discount codes, just earn.",
  alternates: { canonical: "https://referral-hub.app/earn" },
};

export default function EarnPage() {
  return <EarnPageContent />;
}
