"use client";

import { useDisclaimer } from "@/components/context/DisclaimerContext";
import { usePathname } from "next/navigation";
import { getEarnBrandBySlug } from "@/lib/brands";

export function Footer() {
  const pathname = usePathname();
  const disclaimer = useDisclaimer();

  // Extract earn slug and check if brand uses standalone layout
  const earnSlug = pathname.startsWith("/earn/") ? pathname.split("/")[2] : null;
  const brand = earnSlug ? getEarnBrandBySlug(earnSlug) : null;
  if (brand?.standaloneLayout) return null;

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--header-footer-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-center text-sm text-[var(--muted)]">
          © 2026 referral hub. All rights reserved.
        </p>
        {disclaimer && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-[var(--muted)]">
            {disclaimer}
          </p>
        )}
      </div>
    </footer>
  );
}
