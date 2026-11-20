import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/constants/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to contact the person who runs Referral Hub.",
  alternates: { canonical: "https://referral-hub.app/contact" },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--body-text)] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_p]:mt-3">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">Contact</h1>
      <p>
        Questions about a referral offer, a broken code, or this site: email me at{" "}
        <strong className="text-[var(--foreground)]">{CONTACT_EMAIL}</strong>.
      </p>

      <h2>Problems with your account</h2>
      <p>
        I&apos;m an individual customer, not the bank or app, so I can&apos;t see or change your account. For anything
        about your account, application or reward payment, contact the brand directly through its official app or
        website.
      </p>
      <p>I will never ask for your bank details, passwords, PINs or security codes.</p>
    </article>
  );
}
