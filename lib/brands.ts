import { isFinancePagesEnabled } from "@/lib/flags";

export type BrandCategory = "health" | "finance" | "bills";

export type BrandSection = "discounts" | "earn";

export type TrustpilotData = { url: string; score: number };

export type Brand = {
  id: string;
  name: string;
  slug: string;
  category: BrandCategory;
  /** Determines landing page route: /discounts/[category]/[slug] vs /earn/[slug] */
  section: BrandSection;
  logoPath: string;
  overview: string;
  offerSummary: string;
  /** Short reward chip shown on offer cards (e.g. "£30 cash") */
  refereeReward: string;
  /** Lower = shown first within its homepage section */
  rewardRank: number;
  referralLink?: string;
  referralCode?: string;
  /** App store / brand URL when using code instead of link */
  brandUrl?: string;
  /** If set, brand is only shown when matching env var is truthy */
  featureFlag?: "gymshark";
  /** Financial product (bank, BNPL, card-linked cashback…). Hidden unless ENABLE_FINANCE_PAGES is "true", whatever its category. */
  financial?: boolean;
  /** Primary CTA button label (e.g. "Get £25 now" for Ribbon) */
  primaryCtaLabel?: string;
  /** Trustpilot page URL and star score (e.g. 4.4) */
  trustpilot?: TrustpilotData;
  /** Where sign-up actually happens, for the finance-page independence disclaimer (e.g. "Starling's own app") */
  signUpPlace?: string;
  /** If true, the page ships its own footer, so the shared Footer is suppressed */
  standaloneLayout?: boolean;
};

const SHOW_GYMSHARK = process.env.NEXT_PUBLIC_SHOW_GYMSHARK === "true";

export const ALL_BRANDS: Brand[] = [
  {
    id: "lloyds-bank",
    financial: true,
    name: "Lloyds Bank",
    slug: "lloyds-bank",
    category: "finance",
    section: "earn",
    logoPath: "/lloyds_logo.svg",
    overview:
      "Open a Lloyds current account with my refer-a-friend link, keep it open for 7 days, and the £30 lands within 30 working days. FSCS-protected UK bank.",
    offerSummary:
      "£30 paid into your new current account — no switching needed.",
    refereeReward: "£30 cash",
    rewardRank: 1,
    // UPDATE EVERY 14 DAYS — referral links expire after 14 days
    referralLink:
      "https://apply.lloydsbank.co.uk/pca/onboard/lloyds/index-app.html?from=ob&channel=referrals&journeyType=raf&referralToken=8kMtnCauQOuTJv7Erekd8Xce2oCa9pBctvdQSozXGkU=",
    primaryCtaLabel: "Claim your £30",
    signUpPlace: "Lloyds Bank's own website",
    standaloneLayout: true,
  },
  {
    id: "ribbon-rewards",
    name: "Ribbon Rewards",
    slug: "ribbon-rewards",
    category: "bills",
    section: "earn",
    logoPath: "/ribbon_rewards_logo.webp",
    overview:
      "You're paying rent anyway — route it through Ribbon Rewards and collect points on every payment. First payment earns 2,500 points, worth £25.",
    offerSummary: "£25 in points the first time you pay rent through Ribbon.",
    refereeReward: "£25 back",
    rewardRank: 2,
    referralLink: "https://www.ribbonrewards.io/?ref=KIAN63DB",
    primaryCtaLabel: "Get £25 now",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/ribbonrewards.io",
      score: 4.7,
    },
  },
  {
    id: "virgin-media",
    name: "Virgin Media",
    slug: "virgin-media",
    category: "bills",
    section: "earn",
    logoPath: "/virgin_media_logo.png",
    overview:
      "Virgin's refer-a-friend pays £50 once your qualifying order goes through — a clear, milestone-based journey from order to payout.",
    offerSummary:
      "£50 cash when you sign up to broadband, TV or mobile through a referral.",
    refereeReward: "£50 cash",
    rewardRank: 3,
    referralLink: "https://aklam.io/izBRNjvv",
    brandUrl: "https://www.virginmedia.com/help/refer-a-friend",
    primaryCtaLabel: "Claim £50 now",
  },
  {
    id: "airtime",
    financial: true,
    name: "Airtime",
    slug: "airtime",
    category: "bills",
    section: "discounts",
    logoPath: "/airtime_logo.png",
    overview:
      "Link your accounts and Airtime tracks eligible purchases automatically — cashback on everyday spending without relying on tracking cookies.",
    offerSummary: "£2 credit after spending £5 in your first 7 days.",
    refereeReward: "£2 credit",
    rewardRank: 4,
    referralCode: "UKV9QCKE",
    brandUrl: "https://airtime.app",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/airtimerewards.co.uk",
      score: 3.6,
    },
  },
  {
    id: "exhale-coffee",
    name: "Exhale Coffee",
    slug: "exhale-coffee",
    category: "health",
    section: "discounts",
    logoPath: "/exhale_logo.png",
    overview:
      "Coffee grown for health — lower caffeine, fewer jitters, better taste, delivered to your door on a flexible subscription.",
    offerSummary: "Half price on your first subscription order of healthy coffee.",
    refereeReward: "50% off",
    rewardRank: 5,
    referralLink: "https://rc-refer.com/kiana-2esl05",
    primaryCtaLabel: "Get 50% off",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/exhalecoffee.com",
      score: 4.8,
    },
  },
  {
    id: "klarna",
    financial: true,
    name: "Klarna",
    slug: "klarna",
    category: "finance",
    section: "discounts",
    logoPath: "/klarna_logo.svg",
    overview:
      "Join a Klarna membership through my invite link and get a reward paid as Klarna cashback points — £6 on Everywhere up to £40 on Max.",
    offerSummary:
      "Up to £40 in cashback points when you join a Klarna membership.",
    refereeReward: "Up to £40",
    rewardRank: 6,
    referralLink: "https://l.klarna.com/22XC/invite_WWkVC66J0KPFJS3Y",
    primaryCtaLabel: "Get up to £40",
    signUpPlace: "Klarna's own app",
  },
  {
    id: "starling-bank",
    financial: true,
    name: "Starling Bank",
    slug: "starling-bank",
    category: "finance",
    section: "discounts",
    logoPath: "/starling_logo.svg",
    overview:
      "There's no referral link: enter my code during your Starling account application, then complete the reward conditions shown in the app (these could include setting up a Direct Debit).",
    offerSummary:
      "£25 when you open a Starling account with my code and meet the reward conditions.",
    refereeReward: "£25 cash",
    rewardRank: 7,
    referralCode: "VVDCRGY",
    brandUrl: "https://www.starlingbank.com/",
    signUpPlace: "Starling's own app",
  },
  {
    id: "myprotein",
    name: "MyProtein",
    slug: "myprotein",
    category: "health",
    section: "discounts",
    logoPath: "/my_protein_logo.webp",
    overview:
      "Sports nutrition with strong gluten-free options, including whey isolate that works in porridge and shakes.",
    offerSummary: "£15 off any order over £45 with my referral link.",
    refereeReward: "£15 off",
    rewardRank: 8,
    referralLink:
      "https://www.myprotein.com/referrals.list?applyCode=KIANA-R2B",
    primaryCtaLabel: "Get £15 off",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/myprotein.com",
      score: 4.4,
    },
  },
  {
    id: "runna",
    name: "Runna",
    slug: "runna",
    category: "health",
    section: "discounts",
    logoPath: "/runna_logo.png",
    overview:
      "Structured running plans for 5K, 10K, Hyrox and more — Runna guides you from your first run to race day.",
    offerSummary: "Two weeks of Runna Premium free with my code.",
    refereeReward: "2 wks free",
    rewardRank: 9,
    referralCode: "RUNNA1WGGS6T",
    brandUrl: "https://www.runna.com",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/runna.com",
      score: 4.0,
    },
  },
  {
    id: "gymshark",
    name: "Gymshark",
    slug: "gymshark",
    category: "health",
    section: "discounts",
    logoPath: "/gymshark_logo.png",
    overview: "Sportswear and gym wear for training and everyday use.",
    offerSummary:
      "£10 off when new customers place their first order of £50 or more.",
    refereeReward: "£10 off",
    rewardRank: 11,
    referralLink: "", // pending
    featureFlag: "gymshark",
  },
];

export const FEATURED_BRAND_SLUG = "lloyds-bank";

function isBrandVisible(b: Brand): boolean {
  if (b.featureFlag === "gymshark" && !SHOW_GYMSHARK) return false;
  if (b.financial && !isFinancePagesEnabled()) return false;
  return true;
}

export function getVisibleBrands(): Brand[] {
  return ALL_BRANDS.filter(isBrandVisible);
}

/** Undefined when the featured brand is hidden by a flag; the homepage then skips the hero. */
export function getFeaturedBrand(): Brand | undefined {
  const brand = ALL_BRANDS.find((b) => b.slug === FEATURED_BRAND_SLUG);
  if (!brand) throw new Error(`Featured brand ${FEATURED_BRAND_SLUG} missing`);
  return isBrandVisible(brand) ? brand : undefined;
}

export function getBrandsByCategory(category: BrandCategory): Brand[] {
  return getVisibleBrands()
    .filter((b) => b.category === category)
    .sort((a, b) => a.rewardRank - b.rewardRank);
}

export function getDiscountBrands(): Brand[] {
  return getVisibleBrands().filter((b) => b.section === "discounts");
}

export function getEarnBrands(): Brand[] {
  return getVisibleBrands().filter((b) => b.section === "earn");
}

export function getBrandBySlug(
  category: BrandCategory,
  slug: string,
): Brand | undefined {
  const brand = ALL_BRANDS.find(
    (b) =>
      b.section === "discounts" && b.category === category && b.slug === slug,
  );
  return brand && isBrandVisible(brand) ? brand : undefined;
}

export function getEarnBrandBySlug(slug: string): Brand | undefined {
  const brand = ALL_BRANDS.find((b) => b.section === "earn" && b.slug === slug);
  return brand && isBrandVisible(brand) ? brand : undefined;
}

/** Slugs for /discounts/[category]/[slug] static generation */
export function getDiscountSlugs(): {
  category: BrandCategory;
  slug: string;
}[] {
  return getDiscountBrands().map((b) => ({
    category: b.category,
    slug: b.slug,
  }));
}

/** Slugs for /earn/[slug] static generation */
export function getEarnSlugs(): string[] {
  return getEarnBrands().map((b) => b.slug);
}

/** Landing page URL for a brand */
export function getBrandLandingHref(brand: Brand): string {
  return brand.section === "earn"
    ? `/earn/${brand.slug}`
    : `/discounts/${brand.category}/${brand.slug}`;
}

export type HomeSection = {
  id: BrandCategory;
  title: string;
  /** One-word label for the mobile category tabs */
  shortTitle: string;
  blurb: string;
};

/** Homepage section order and copy */
export const HOME_SECTIONS: HomeSection[] = [
  {
    id: "bills",
    title: "Bills & home",
    shortTitle: "Bills",
    blurb:
      "Money back on payments you're already making — rent, broadband and everyday spending.",
  },
  {
    id: "health",
    title: "Health & fitness",
    shortTitle: "Health",
    blurb: "Discounts on the coffee, protein and training apps I actually use.",
  },
  {
    id: "finance",
    title: "Money & banking",
    shortTitle: "Money",
    blurb:
      "Cash for opening an account or joining a membership, and a clearer view of where your money goes.",
  },
];

/** Homepage sections that have at least one visible brand. */
export function getVisibleHomeSections(): HomeSection[] {
  return HOME_SECTIONS.filter((s) => getBrandsByCategory(s.id).length > 0);
}

export const CATEGORIES: BrandCategory[] = ["bills", "health", "finance"];

export const CATEGORY_LABELS: Record<BrandCategory, string> = {
  bills: "Bills & home",
  health: "Health & fitness",
  finance: "Money & banking",
};

/** Reads a `?category=` value; anything unknown means "all offers". */
export function toBrandCategory(
  value: string | null | undefined,
): BrandCategory | undefined {
  return CATEGORIES.find((c) => c === value);
}
