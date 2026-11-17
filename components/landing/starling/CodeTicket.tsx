"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackProviderCodeCopy } from "@/lib/analytics";

type CodeTicketProps = {
  code: string;
  provider: string;
  /** "light" for pale backgrounds, "dark" for the aubergine hero. */
  tone?: "light" | "dark";
  className?: string;
};

/** Large tap-to-copy code. The whole ticket is the button, so it's an easy target on mobile. */
export function CodeTicket({ code, provider, tone = "light", className = "" }: CodeTicketProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      trackProviderCodeCopy(provider);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the code is still visible to type by hand.
    }
  }

  const dark = tone === "dark";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy code ${code}`}
      className={`group flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-dashed px-5 py-4 text-left transition ${
        dark
          ? "border-white/40 bg-white/10 hover:bg-white/15"
          : "border-[var(--accent-icon)]/50 bg-[#effaf5] hover:bg-[#e2f5ec]"
      } ${className}`}
    >
      <span>
        <span className={`block text-xs font-semibold uppercase tracking-widest ${dark ? "text-white/70" : "text-[var(--muted)]"}`}>
          Referral code
        </span>
        <span className={`block font-mono text-3xl font-bold tracking-[0.15em] ${dark ? "text-white" : "text-[var(--foreground)]"}`}>
          {code}
        </span>
      </span>
      <span
        className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${
          copied
            ? "bg-[var(--accent-icon)] text-white"
            : dark
              ? "bg-white text-[#321E37]"
              : "bg-[var(--accent)] text-white"
        }`}
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
