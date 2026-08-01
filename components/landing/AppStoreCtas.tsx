"use client";

import { trackProviderIosCtaClick, trackProviderAndroidCtaClick } from "@/lib/analytics";

type AppStoreCtasProps = {
  provider: string;
  ios?: string;
  android?: string;
};

export function AppStoreCtas({ provider, ios, android }: AppStoreCtasProps) {
  if (!ios && !android) return null;

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      {ios && (
        <a
          href={ios}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProviderIosCtaClick(provider)}
          className="rounded-lg border border-[var(--border)] bg-[var(--main-bg)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
        >
          Download for iOS
        </a>
      )}
      {android && (
        <a
          href={android}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProviderAndroidCtaClick(provider)}
          className="rounded-lg border border-[var(--border)] bg-[var(--main-bg)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]"
        >
          Download for Android
        </a>
      )}
    </div>
  );
}
