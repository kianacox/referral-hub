import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/site";

export const metadata: Metadata = {
  title: "About",
  description: "Referral Hub is a personal referral site where both of us benefit when you sign up with my code or link.",
  alternates: { canonical: "https://referral-hub.app/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--body-text)] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_p]:mt-3">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">About Referral Hub</h1>

      <p>
        Referral Hub is a personal referral site. It&apos;s where I share my own referral codes and links for apps and
        services I use.
      </p>

      <h2>How it works</h2>
      <p>
        Many brands run refer-a-friend schemes: when someone signs up with an existing customer&apos;s code or link, the
        brand rewards both of them. If you sign up with mine, you get the new-customer reward and I get the
        referrer&apos;s reward. It doesn&apos;t cost you anything extra and doesn&apos;t reduce what you get.
      </p>

      <h2>Independent</h2>
      <p>
        This site isn&apos;t affiliated with, endorsed by or operated by any of the brands listed. You always sign up
        directly with the brand, on its own website or app, and the brand sets the terms of each offer.
      </p>

      <h2>Your details</h2>
      <p>
        There are no forms, accounts or logins here, and I never ask for your details. See the{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link> for more.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about a code or this site? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
      </p>
    </article>
  );
}
