"use client";

import { useDisclaimer } from "@/components/context/DisclaimerContext";
import { usePathname } from "next/navigation";
import { getEarnBrandBySlug } from "@/lib/brands";

export function Footer() {
  const pathname = usePathname();
  const disclaimer = useDisclaimer();

  // Suppress chrome on standalone earn landing pages (e.g. Lloyds)
  const earnSlug = pathname.startsWith("/earn/") ? pathname.split("/")[2] : null;
  const brand = earnSlug ? getEarnBrandBySlug(earnSlug) : null;
  if (brand?.standaloneLayout) return null;

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--header-footer-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-7">
        <p className="text-center text-[13px] text-[var(--muted)]">
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
