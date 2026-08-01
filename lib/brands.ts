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
  /** Primary CTA button label (e.g. "Get £25 now" for Ribbon) */
  primaryCtaLabel?: string;
  /** Trustpilot page URL and star score (e.g. 4.4) */
  trustpilot?: TrustpilotData;
  /** If true, suppress Navbar and Footer on standalone landing page */
  standaloneLayout?: boolean;
};

const SHOW_GYMSHARK = process.env.NEXT_PUBLIC_SHOW_GYMSHARK === "true";

export const ALL_BRANDS: Brand[] = [
  {
    id: "lloyds-bank",
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
    // UPDATE EVERY 30 DAYS — Lloyds referral links expire after 30 days
    referralLink:
      "https://apply.lloydsbank.co.uk/sales-content/cwa/l/onboardpca/index-app.html?from=ob&webDirect=true&redesign=true&token=8kMtnCauQOuTJv7Erekd8SYVDBQRccq+vMEqUuZAxwk=#/refer-friend",
    primaryCtaLabel: "Claim your £30",
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
    brandUrl: "https://www.virginmedia.com/refer-a-friend",
    primaryCtaLabel: "See how to claim £50",
  },
  {
    id: "airtime",
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
    id: "emma-budgeting",
    name: "Emma",
    slug: "emma-budgeting",
    category: "finance",
    section: "discounts",
    logoPath: "/emma_logo.png",
    overview:
      "Emma auto-categorises your spending, flags forgotten subscriptions and upcoming payments, and gives you one clear view across every account.",
    offerSummary:
      "30 days of Emma free — see all your accounts and subscriptions in one place.",
    refereeReward: "Free month",
    rewardRank: 6,
    referralLink: "https://emma.to/kianacox",
    primaryCtaLabel: "Start free trial",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/emma-app.com",
      score: 4.4,
    },
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
    rewardRank: 7,
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
    rewardRank: 8,
    referralCode: "RUNNA1WGGS6T",
    brandUrl: "https://www.runna.com",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/runna.com",
      score: 4.0,
    },
  },
  {
    id: "provocan",
    name: "Provocan",
    slug: "provocan",
    category: "health",
    section: "discounts",
    logoPath: "/provocan_logo.jpg",
    overview:
      "Full-spectrum CBD oils and gummies, independently tested — a more affordable route to quality CBD.",
    offerSummary: "£10 off when you spend £45 or more.",
    refereeReward: "£10 off",
    rewardRank: 9,
    referralLink: "https://prz.io/4groamaSO",
    primaryCtaLabel: "Get £10 off",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/provacan.co.uk",
      score: 4.6,
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
    rewardRank: 10,
    referralLink: "", // pending
    featureFlag: "gymshark",
  },
];

export const FEATURED_BRAND_SLUG = "lloyds-bank";

export function getVisibleBrands(): Brand[] {
  return ALL_BRANDS.filter((b) => {
    if (b.featureFlag === "gymshark") return SHOW_GYMSHARK;
    return true;
  });
}

export function getFeaturedBrand(): Brand {
  const brand = ALL_BRANDS.find((b) => b.slug === FEATURED_BRAND_SLUG);
  if (!brand) throw new Error(`Featured brand ${FEATURED_BRAND_SLUG} missing`);
  return brand;
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
  if (!brand) return undefined;
  if (brand.featureFlag === "gymshark" && !SHOW_GYMSHARK) return undefined;
  return brand;
}

export function getEarnBrandBySlug(slug: string): Brand | undefined {
  const brand = ALL_BRANDS.find((b) => b.section === "earn" && b.slug === slug);
  if (!brand) return undefined;
  if (brand.featureFlag === "gymshark" && !SHOW_GYMSHARK) return undefined;
  return brand;
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
  blurb: string;
};

/** Homepage section order and copy */
export const HOME_SECTIONS: HomeSection[] = [
  {
    id: "bills",
    title: "Bills & home",
    blurb:
      "Money back on payments you're already making — rent, broadband and everyday spending.",
  },
  {
    id: "health",
    title: "Health & fitness",
    blurb: "Discounts on the coffee, protein and training apps I actually use.",
  },
  {
    id: "finance",
    title: "Money & banking",
    blurb:
      "Cash for opening an account, and a clearer view of where your money goes.",
  },
];

export const CATEGORIES: BrandCategory[] = ["bills", "health", "finance"];

export const CATEGORY_LABELS: Record<BrandCategory, string> = {
  bills: "Bills & home",
  health: "Health & fitness",
  finance: "Money & banking",
};
