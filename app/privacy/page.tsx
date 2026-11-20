import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Referral Hub handles information when you visit the site.",
  alternates: { canonical: "https://referral-hub.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--body-text)] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">Privacy Policy</h1>
      <p className="text-sm text-[var(--muted)]">Last updated 20 November 2026</p>

      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy explains how Referral Hub (&ldquo;the site&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        handles information when you visit referral-hub.app. By using the site, you agree to this policy.
      </p>

      <h2>2. Information we collect</h2>
      <p>
        We do not ask you to provide any personal information. The site has no forms, accounts, logins or newsletter
        sign-ups.
      </p>
      <p>When you visit, some information is collected automatically:</p>
      <ul>
        <li>Pages viewed and how you interact with them, such as clicks on buttons and links</li>
        <li>Browser type, device type and operating system</li>
        <li>Approximate location (country or city), derived from your IP address</li>
        <li>The website that referred you to the site</li>
      </ul>

      <h2>3. How we use information</h2>
      <p>
        We use this information only to understand how the site is used and to improve it. We do not sell, rent or trade
        it, and we do not use it to identify you.
      </p>

      <h2>4. Cookies and analytics</h2>
      <p>The site uses the following analytics services:</p>
      <ul>
        <li>
          <strong>Google Analytics</strong>, which uses cookies to collect the usage information described above. You
          can opt out with Google&apos;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline">
            browser add-on
          </a>
          .
        </li>
        <li>
          <strong>Vercel Web Analytics</strong>, which counts page views without cookies.
        </li>
      </ul>
      <p>You can block or delete cookies at any time in your browser settings. The site will still work.</p>

      <h2>5. Hosting</h2>
      <p>
        The site is hosted by Vercel, which processes standard technical data (such as IP addresses) to deliver pages
        and keep the service secure.
      </p>

      <h2>6. Third-party websites</h2>
      <p>
        The site links to other brands&apos; websites and apps. When you follow a link, you leave Referral Hub, and any
        information you provide there is collected by that brand under its own privacy policy. We are not responsible
        for the privacy practices of other sites. The brand may record that you used a referral code or link so it can
        pay the referral reward.
      </p>

      <h2>7. Data retention</h2>
      <p>
        Analytics data is kept only for as long as the analytics providers&apos; standard retention settings allow, and
        is used in aggregate.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live, including under UK GDPR, you may have the right to access, correct or delete
        personal data held about you, or to object to its processing. As the site does not collect information that
        identifies you, there is usually no personal data to provide. You can stop analytics collection at any time by
        blocking cookies.
      </p>

      <h2>9. Children&apos;s privacy</h2>
      <p>The site is not aimed at children under 18 and does not knowingly collect information from them.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy from time to time. Changes take effect when posted on this page.</p>
    </article>
  );
}
