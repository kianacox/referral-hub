import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earn",
  description: "Earn rewards. Coming soon.",
  alternates: { canonical: "https://referral-hub.app/earn" },
};

export default function EarnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
        Earn
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        More ways to earn will appear here when new referral offers are available.
      </p>
    </div>
  );
}
