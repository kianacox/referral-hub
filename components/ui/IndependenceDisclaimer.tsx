import { Info } from "lucide-react";

type IndependenceDisclaimerProps = {
  brandName: string;
  /** Where sign-up actually happens, e.g. "Starling's own app". */
  signUpPlace: string;
};

/** Above-the-fold notice on finance pages: who runs the page, and that it collects nothing. */
export function IndependenceDisclaimer({ brandName, signUpPlace }: IndependenceDisclaimerProps) {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--header-footer-bg)]">
      <p
        role="note"
        aria-label="Independence disclaimer"
        className="mx-auto flex max-w-6xl items-start gap-2.5 px-4 py-3 text-sm leading-snug text-[var(--foreground)]"
      >
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <strong className="font-semibold">Independent personal referral page.</strong> Not affiliated
          with, endorsed by or operated by {brandName}. I don&apos;t collect any of your details. You
          sign up in {signUpPlace}.
        </span>
      </p>
    </div>
  );
}
