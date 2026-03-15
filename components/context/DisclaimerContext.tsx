"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { LANDING_PAGE_CONTENT } from "@/content/landing-pages";

const DisclaimerContext = createContext<string | null>(null);

export function useDisclaimer() {
  const ctx = useContext(DisclaimerContext);
  return ctx ?? null;
}

export function DisclaimerProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const disclaimer = useMemo(() => {
    const match = pathname.match(/^\/discounts\/[^/]+\/([^/]+)$/);
    const slug = match?.[1];
    if (!slug) return null;
    return LANDING_PAGE_CONTENT[slug]?.disclaimer ?? null;
  }, [pathname]);

  const value = useMemo(() => disclaimer, [disclaimer]);

  return (
    <DisclaimerContext.Provider value={value}>
      {children}
    </DisclaimerContext.Provider>
  );
}
