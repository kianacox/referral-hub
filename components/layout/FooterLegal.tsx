import Link from "next/link";
import { FOOTER_INDEPENDENCE } from "@/constants/copy";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
];

/** Independence line plus About / Privacy. Inherits text colour so it works on light and dark footers. */
export function FooterLegal({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center text-xs ${className}`}>
      <p className="mx-auto max-w-2xl">{FOOTER_INDEPENDENCE}</p>
      <nav aria-label="Site information" className="mt-3 flex justify-center gap-4">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="underline underline-offset-2 hover:opacity-80" style={{ color: "inherit" }}>
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
