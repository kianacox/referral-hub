"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getEarnBrandBySlug } from "@/lib/brands";

const navLinks = [
  { href: "/earn", label: "Earn" },
  { href: "/discounts", label: "Discounts" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Extract earn slug and check if brand uses standalone layout
  const earnSlug = pathname.startsWith("/earn/") ? pathname.split("/")[2] : null;
  const brand = earnSlug ? getEarnBrandBySlug(earnSlug) : null;
  if (brand?.standaloneLayout) return null;

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border)]"
      style={{ backgroundColor: "var(--header-footer-bg)" }}
    >
      <nav className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          aria-label="Home"
          className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--foreground)] hover:bg-[var(--card)]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile: burger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--foreground)] hover:bg-[var(--card)] md:hidden"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
        </button>
      </nav>

      {/* Mobile dropdown: overlay */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-full border-b border-[var(--border)] shadow-lg md:hidden"
          style={{ backgroundColor: "var(--header-footer-bg)" }}
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
