import type { Metadata } from "next";
import Link from "next/link";
import { SITE_OWNER } from "@/constants/copy";

export const metadata: Metadata = {
  title: "About",
  description: "Who runs Referral Hub, why it exists, and how referral rewards work here.",
  alternates: { canonical: "https://referral-hub.app/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--body-text)] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_p]:mt-3">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">About Referral Hub</h1>

      <h2>Who runs it</h2>
      <p>
        Referral Hub is a personal website run by me, {SITE_OWNER}, an individual in the UK. It isn&apos;t a company,
        and it isn&apos;t run by, affiliated with or endorsed by any of the brands it lists.
      </p>

      <h2>Why it exists</h2>
      <p>
        Lots of apps and banks I use have refer-a-friend schemes. This site is where I share my own referral codes and
        links for them, with a plain explanation of what you get and what you need to do.
      </p>

      <h2>How the money works</h2>
      <p>
        When someone signs up with my code or link, the brand usually rewards both of us under its standard
        refer-a-friend scheme, the same one any customer can use. It doesn&apos;t cost you anything and doesn&apos;t
        reduce your reward. Each page says what I get.
      </p>

      <h2>What this site doesn&apos;t do</h2>
      <p>
        There are no forms, accounts or logins here, and I never ask for your details. You always sign up directly with
        the brand, on its own website or app. See the <Link href="/privacy" className="underline">Privacy Policy</Link>{" "}
        for the analytics the site uses, or <Link href="/contact" className="underline">get in touch</Link>.
      </p>
    </article>
  );
}
