import { Star } from "lucide-react";
import type { TrustpilotData } from "@/content/landing-pages";

const STAR_SIZE = 14;

type TrustpilotBadgeProps = {
  brandName: string;
  trustpilot: TrustpilotData;
};

export function TrustpilotBadge({ brandName, trustpilot }: TrustpilotBadgeProps) {
  const { url, score } = trustpilot;
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.25 && score % 1 < 0.75;

  return (
    <div
      className="inline-flex flex-col items-center gap-1.5 rounded-full bg-white/95 px-4 py-2.5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.2),0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm"
      aria-label={`Trustpilot rating: ${score.toFixed(1)} out of 5`}
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="relative inline-block h-[14px] w-[14px] shrink-0">
            {i <= fullStars ? (
              <Star size={STAR_SIZE} className="shrink-0 fill-emerald-500 text-emerald-500" aria-hidden />
            ) : i === fullStars + 1 && hasHalf ? (
              <>
                <Star size={STAR_SIZE} className="absolute inset-0 text-slate-200" aria-hidden />
                <span className="absolute inset-0 w-[70%] overflow-hidden">
                  <Star size={STAR_SIZE} className="fill-emerald-500 text-emerald-500" aria-hidden />
                </span>
              </>
            ) : (
              <Star size={STAR_SIZE} className="text-slate-200" aria-hidden />
            )}
          </span>
        ))}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold text-emerald-600 underline decoration-emerald-600/60 underline-offset-2 hover:text-emerald-700 hover:decoration-emerald-600"
      >
        Check out {brandName} on Trustpilot
      </a>
    </div>
  );
}
