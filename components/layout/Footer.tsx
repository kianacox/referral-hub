"use client";

import { useDisclaimer } from "@/components/context/DisclaimerContext";
import { usePathname } from "next/navigation";
import { findLandingPage, type LandingChromeItem } from "@/lib/landing-path";
import { FooterLegal } from "@/components/layout/FooterLegal";

export function Footer({ landingPages }: { landingPages: LandingChromeItem[] }) {
  const pathname = usePathname();
  const disclaimer = useDisclaimer();

  // Suppress chrome on standalone earn landing pages (e.g. Lloyds)
  const page = pathname.startsWith("/earn/") ? findLandingPage(landingPages, pathname) : undefined;
  if (page?.standaloneLayout) return null;

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
        <FooterLegal className="mt-4 text-[var(--muted)]" />
      </div>
    </footer>
  );
}
