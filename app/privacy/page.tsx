import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/copy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Referral Hub collects no personal details. This page explains the analytics it uses and what happens when you click through to a brand.",
  alternates: { canonical: "https://referral-hub.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--body-text)] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">Privacy Policy</h1>
      <p className="text-sm text-[var(--muted)]">Last updated 20 November 2026</p>

      <h2>The short version</h2>
      <p>
        Referral Hub doesn&apos;t collect your personal details. There are no forms, sign-ups, accounts or logins on
        this site, and I will never ask for your name, email, bank details or passwords.
      </p>

      <h2>Analytics</h2>
      <p>To see which pages are useful, the site uses:</p>
      <ul>
        <li>
          <strong>Vercel Web Analytics</strong>: counts page views without cookies and without identifying you.
        </li>
        <li>
          <strong>Google Analytics</strong>: sets first-party cookies and records which pages you view, your browser
          and device type, your approximate location (country or city level), and clicks on things like &ldquo;Copy
          code&rdquo; and outbound links. It doesn&apos;t record anything you type, because there&apos;s nowhere to
          type.
        </li>
      </ul>
      <p>
        You can block these with your browser&apos;s cookie settings or Google&apos;s{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline">
          opt-out add-on
        </a>
        .
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted by Vercel, which processes standard request data (such as IP address and browser) to serve
        pages and keep the service secure.
      </p>

      <h2>When you click through to a brand</h2>
      <p>
        Links and buttons take you straight to the brand&apos;s own website or app. Anything you enter there is
        collected by that brand under its own privacy policy, not by me. The brand will know you used my referral code
        or link so it can pay the reward.
      </p>

      <h2>Copying a code</h2>
      <p>The &ldquo;Copy&rdquo; buttons write the code to your clipboard. The site never reads your clipboard.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: {CONTACT_EMAIL}. More on the <Link href="/contact" className="underline">Contact</Link>{" "}
        page.
      </p>
    </article>
  );
}
