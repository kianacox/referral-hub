import Link from "next/link";
import { HOME_SECTIONS } from "@/lib/brands";
import { SITE_TAGLINE } from "@/constants/copy";

const chips = [
  { label: "All offers", href: "#top" },
  ...HOME_SECTIONS.map((s) => ({ label: s.title, href: `#${s.id}` })),
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-footer-bg)]">
      <nav className="mx-auto flex h-[52px] max-w-6xl items-center justify-between px-4">
        <Link href="#top" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] font-[family-name:var(--font-serif)] text-base text-white">
            R
          </span>
          <span className="text-[15px] font-semibold text-[var(--foreground)]">
            Referral Hub
          </span>
        </Link>
        <span className="hidden text-xs text-[var(--muted)] sm:inline">
          {SITE_TAGLINE}
        </span>
      </nav>
      <div className="border-t border-[#f1ede4] bg-[var(--header-footer-bg)]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          {chips.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="shrink-0 whitespace-nowrap rounded-full border border-[#dcd7cb] bg-[var(--main-bg)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--foreground)] no-underline transition-colors hover:border-[var(--accent)] hover:bg-white hover:text-[var(--accent)]"
            >
              {chip.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
