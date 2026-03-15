"use client";

import Link from "next/link";
import { trackProviderCtaClick } from "@/lib/analytics";

type TrackedCtaLinkProps = {
  href: string;
  provider: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export function TrackedCtaLink({
  href,
  provider,
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={() => trackProviderCtaClick(provider)}
      className={className}
    >
      {children}
    </Link>
  );
}
