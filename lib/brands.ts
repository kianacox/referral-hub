export type BrandCategory = "health" | "finance" | "bills";

export type BrandSection = "discounts" | "earn";

export type Brand = {
  id: string;
  name: string;
  slug: string;
  category: BrandCategory;
  /** Determines /discounts vs /earn; earn offers (e.g. rent cashback) live under /earn */
  section: BrandSection;
  logoPath: string;
  overview: string;
  offerSummary: string;
  refereeReward: string;
  /** Lower = better ROI, shown first on homepage */
  rewardRank: number;
  referralLink?: string;
  referralCode?: string;
  /** App store / brand URL when using code instead of link */
  brandUrl?: string;
  /** If set, brand is only shown when matching env var is truthy */
  featureFlag?: "gymshark";
  /** Override for primary CTA button label (e.g. "Get £25 now!" for Ribbon) */
  primaryCtaLabel?: string;
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
    logoPath: "/lloyds_logo.png",
    overview:
      "Get £50 cash paid directly into your new Lloyds current account when you open one using my personal refer-a-friend link. No switching required — just open and keep the account for 7 days.",
    offerSummary:
      "£50 cash paid into your new Lloyds current account within 30 working days.",
    refereeReward: "£50 cash",
    rewardRank: 1,
    referralLink:
      "https://apply.lloydsbank.co.uk/sales-content/cwa/l/onboardpca/index-app.html?from=ob&webDirect=true&redesign=true&token=8kMtnCauQOuTJv7Erekd8QZQyYpdXlfw0yAKZua0puM=#/refer-friend",
    primaryCtaLabel: "Claim £50 now",
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
      "Earn cashback on rent. Pay through Ribbon Rewards and collect points on a payment you’re already making.",
    offerSummary:
      "2,500 points (worth £25) when you pay rent for the first time.",
    refereeReward: "2,500 points (worth £25)",
    rewardRank: 2,
    referralLink: "https://www.ribbonrewards.io/?ref=KIAN63DB",
    primaryCtaLabel: "Get £25 now!",
  },
  {
    id: "virgin-media",
    name: "Virgin Media",
    slug: "virgin-media",
    category: "bills",
    section: "earn",
    logoPath: "/virgin_media_logo.png",
    overview:
      "Get rewarded when friends sign up to broadband, TV, or mobile. A premium referral journey with clear milestones.",
    offerSummary:
      "Get £50 cash when your referred friend places a qualifying order.",
    refereeReward: "£50 cash reward",
    rewardRank: 3,
    brandUrl: "https://www.virginmedia.com/refer-a-friend",
    primaryCtaLabel: "Claim £50 reward",
    standaloneLayout: true,
  },
  {
    id: "airtime",
    name: "Airtime",
    slug: "airtime",
    category: "bills",
    section: "discounts",
    logoPath: "/airtime_logo.png",
    overview:
      "Cashback on everyday spending by linking your accounts. Works in-app and tracks eligible purchases automatically—no need to rely on tracking cookies.",
    offerSummary: "£2 credit after spending £5 in your first 7 days.",
    refereeReward: "£2 credit after £5 spend in first 7 days",
    rewardRank: 2,
    referralCode: "UKV9QCKE",
    brandUrl: "https://airtime.app",
  },
  {
    id: "exhale-coffee",
    name: "Exhale Coffee",
    slug: "exhale-coffee",
    category: "health",
    section: "discounts",
    logoPath: "/exhale_logo.png",
    overview:
      "Healthy coffee subscription delivered to your door. Lower caffeine, fewer jitters and a better taste.",
    offerSummary: "50% off your first subscription order.",
    refereeReward: "50% off first order",
    rewardRank: 3,
    referralLink: "https://rc-refer.com/kiana-2esl05",
  },
  {
    id: "emma-budgeting",
    name: "Emma",
    slug: "emma-budgeting",
    category: "finance",
    section: "discounts",
    logoPath: "/emma_logo.png",
    overview:
      "Budgeting app that auto-categorises spending, tracks subscriptions and upcoming payments, and gives you a clear view across all your accounts.",
    offerSummary: "30-day free trial when you sign up via my link.",
    refereeReward: "30-day free trial",
    rewardRank: 4,
    referralLink: "https://emma.to/kianacox",
  },
  {
    id: "myprotein",
    name: "MyProtein",
    slug: "myprotein",
    category: "health",
    section: "discounts",
    logoPath: "/my_protein_logo.webp",
    overview:
      "Sports nutrition and protein with strong gluten-free options, including whey isolate that works in porridge and shakes.",
    offerSummary: "£15 off any order over £45 with my referral link.",
    refereeReward: "£15 off orders over £45",
    rewardRank: 5,
    referralLink:
      "https://www.myprotein.com/referrals.list?applyCode=KIANA-R2B",
  },
  {
    id: "runna",
    name: "Runna",
    slug: "runna",
    category: "health",
    section: "discounts",
    logoPath: "/runna_logo.png",
    overview:
      "Running app with structured plans for 5K, 10K, Hyrox and more. Guides you from beginner to regular runner.",
    offerSummary: "2 weeks of Runna Premium free with my referral code.",
    refereeReward: "2 weeks free premium",
    rewardRank: 6,
    referralCode: "RUNNA1WGGS6T",
    brandUrl: "https://www.runna.com",
  },
  {
    id: "provocan",
    name: "Provocan",
    slug: "provocan",
    category: "health",
    section: "discounts",
    logoPath: "/provocan_logo.jpg",
    overview:
      "Full-spectrum CBD oils and gummies, independently tested. A more affordable option for quality CBD.",
    offerSummary: "£10 off when you spend £45 or more.",
    refereeReward: "£10 off when you spend £45+",
    rewardRank: 7,
    referralLink: "https://prz.io/4groamaSO",
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
    refereeReward: "£10 off first order of £50+",
    rewardRank: 8,
    referralLink: "", // pending
    featureFlag: "gymshark",
  },
];

export function getVisibleBrands(): Brand[] {
  return ALL_BRANDS.filter((b) => {
    if (b.featureFlag === "gymshark") return SHOW_GYMSHARK;
    return true;
  });
}

export function getDiscountBrands(): Brand[] {
  return getVisibleBrands().filter((b) => b.section === "discounts");
}

export function getEarnBrands(): Brand[] {
  return getVisibleBrands().filter((b) => b.section === "earn");
}

export function getBrandsByCategory(category: BrandCategory): Brand[] {
  return getDiscountBrands().filter((b) => b.category === category);
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

export function getAllSlugs(): { category: BrandCategory; slug: string }[] {
  return getDiscountSlugs();
}

export const CATEGORIES: BrandCategory[] = ["bills", "health", "finance"];

export const CATEGORY_LABELS: Record<BrandCategory, string> = {
  bills: "Bills",
  health: "Health",
  finance: "Finance",
};
