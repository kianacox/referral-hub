"use client";

import { useDisclaimer } from "@/components/context/DisclaimerContext";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const disclaimer = useDisclaimer();
  const hideForStandaloneEarn = pathname === "/earn/virgin-media";

  if (hideForStandaloneEarn) return null;

  return (
    <footer
      className="mt-auto border-t border-[var(--border)]"
      style={{ backgroundColor: "var(--header-footer-bg)" }}
    >
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
