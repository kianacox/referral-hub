"use client";

import { useState, useCallback } from "react";
import { COPIED, COPY_CODE } from "@/constants/copy";
import { trackProviderCodeCopy } from "@/lib/analytics";

type CopyableCodeProps = {
  code: string;
  label?: string;
  className?: string;
  /** Provider slug for GA event (e.g. runna, airtime) */
  provider?: string;
};

export function CopyableCode({ code, label = COPY_CODE, className = "", provider }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      if (provider) trackProviderCodeCopy(provider);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback ignored for brevity
    }
  }, [code, provider]);

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 ${className}`}
    >
      <code className="flex-1 font-mono text-sm font-medium text-[var(--foreground)]">
        {code}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--accent-foreground)] hover:opacity-90"
      >
        {copied ? COPIED : label}
      </button>
    </div>
  );
}
