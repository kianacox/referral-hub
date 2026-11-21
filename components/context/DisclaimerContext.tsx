"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { findLandingPage, type LandingChromeItem } from "@/lib/landing-path";

const DisclaimerContext = createContext<string | null>(null);

export function useDisclaimer() {
  const ctx = useContext(DisclaimerContext);
  return ctx ?? null;
}

export function DisclaimerProvider({
  landingPages,
  children,
}: {
  landingPages: LandingChromeItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const disclaimer = useMemo(
    () => findLandingPage(landingPages, pathname)?.disclaimer ?? null,
    [landingPages, pathname],
  );

  const value = useMemo(() => disclaimer, [disclaimer]);

  return (
    <DisclaimerContext.Provider value={value}>
      {children}
    </DisclaimerContext.Provider>
  );
}
