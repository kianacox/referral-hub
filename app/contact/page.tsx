import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to get in touch with Referral Hub.",
  alternates: { canonical: "https://referral-hub.app/contact" },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--body-text)] [&_p]:mt-3">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">Contact</h1>
      <p>
        Questions about a code or this site? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
      </p>
    </article>
  );
}
