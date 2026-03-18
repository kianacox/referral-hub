export type LandingPageLink = { label: string; url: string };

export type AppStoreLinks = { ios?: string; android?: string };

export type TrustpilotData = { url: string; score: number };

export type FaqItem = { question: string; answer: string };

export type LandingPageContent = {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  whyIUseIt: string;
  howItWorks: string;
  whatDoIGet: string;
  disclaimer?: string;
  /** Optional links to show after "Why I use it" (e.g. product links) */
  links?: LandingPageLink[];
  /** Optional app store links (e.g. for Runna) */
  appStoreLinks?: AppStoreLinks;
  /** Optional images to show (e.g. Runna screenshots) */
  images?: { src: string; alt: string }[];
  /** Trustpilot: URL to brand's Trustpilot page and star score (e.g. 4.4) */
  trustpilot?: TrustpilotData;
  /** FAQs for AI overviews and structured data – keep accurate */
  faq?: FaqItem[];
  /** Extra sections keyed by heading, value is body */
  extraSections?: Record<string, string>;
  /** Premium product layout: 3 key specs for hero product summary box */
  productSummary?: string[];
  /** Premium: benefit cards (icon: Zap | Shield | Clock | Leaf | Package) */
  keyBenefits?: { icon: string; title: string; description: string }[];
  /** Premium: how to redeem steps */
  howToRedeem?: string[];
  /** Premium: transparency disclaimer (referee + referrer) */
  transparency?: { referee: string; referrer: string };
  /** Premium: product specs table rows */
  productSpecs?: { label: string; value: string }[];
  /** Ribbon / premium hero: custom headline, subheadline, CTA label */
  heroHeadline?: string;
  heroSubheadline?: string;
  ctaLabel?: string;
  /** Ribbon: trust badge (e.g. Partnered with Griffin Bank Ltd) */
  trustBadge?: { partner: string; label: string };
  /** Ribbon: how it works steps (title + description) */
  howItWorksSteps?: { title: string; description: string }[];
  /** Ribbon: safety & trust section */
  safetySection?: { title: string; bullets: string[] };
  /** Ribbon: rewards table rows (label + value) */
  rewardsTable?: { label: string; value: string }[];
};

export const LANDING_PAGE_CONTENT: Record<string, LandingPageContent> = {
  "exhale-coffee": {
    seoTitle: "Get 50% off your first Exhale Coffee subscription order",
    seoDescription:
      "Use my referral link for 50% off your first Exhale Coffee order. Healthy coffee subscription with less caffeine and fewer jitters, delivered to your door.",
    keywords: [
      "exhale coffee",
      "coffee subscription",
      "coffee subscription discount",
      "exhale coffee discount",
      "healthy coffee",
    ],
    whyIUseIt: `I drink a lot of coffee—I have a three-year-old who doesn’t sleep well, a full-time job and unmedicated ADHD, so I’ve always relied on it. I drink cappuccinos and espressos at home with a [Swan espresso machine and milk frother](https://www.amazon.co.uk/Swan-SK22110GRN-Espresso-Machine-Pressure/dp/B07KGR92MD), and I was going through ground beans quickly. Two problems: my anxiety was getting worse, and I kept running out and having to dash out for expensive Co-op beans.

I wasn’t actually looking for a subscription. I got a free bag of Exhale healthy coffee with a [MyProtein order](https://referral-hub.app/discounts/health/myprotein) and thought I’d try it. That bag changed things. The coffee tastes much better—almost chocolatey—and I use the [ultra-fine dark roast](https://exhalecoffee.com/products/organic-darkish-roast?variant=39634306203694&selling_plan=711354876280). I get far fewer jitters and less anxiety, I spend less, I never run out because it’s delivered every two weeks, and it’s genuinely delicious.`,
    howItWorks:
      "Use my referral link to get 50% off your first subscription order.",
    whatDoIGet: "£5 for every referral.",
    disclaimer:
      "If you subscribe using my referral link I receive £5 per referral. I’m grateful for your support.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/exhalecoffee.com",
      score: 4.8,
    },
    faq: [
      {
        question: "How do I get 50% off Exhale Coffee?",
        answer:
          "Use the referral link on this page to get 50% off your first subscription order. The discount is applied when you sign up for a subscription through Exhale Coffee.",
      },
      {
        question: "What is Exhale Coffee?",
        answer:
          "Exhale Coffee is a healthy coffee subscription brand. The coffee is lower in caffeine, designed to reduce jitters, and delivered to your door. They offer organic options including ultra-fine dark roast.",
      },
      {
        question: "Is Exhale Coffee subscription flexible?",
        answer:
          "Yes. You can manage your subscription (including rescheduling or pausing) through your Exhale account. Delivery frequency is flexible.",
      },
    ],
    productSummary: [
      "Organic & pesticide free",
      "Optimized caffeine (fewer jitters)",
      "Eco-friendly packaging",
    ],
    keyBenefits: [
      {
        icon: "Zap",
        title: "Smooth energy",
        description:
          "Lower caffeine content designed to reduce anxiety and jitters while still giving you a clean lift.",
      },
      {
        icon: "Shield",
        title: "Health-first",
        description:
          "Organic, pesticide-free beans. A better choice for daily drinkers who care about what they put in their body.",
      },
      {
        icon: "Clock",
        title: "Delivered on schedule",
        description:
          "Subscription delivery flexible so you never run out. Pause or reschedule anytime.",
      },
    ],
    howToRedeem: [
      "Click the referral link below.",
      "Choose your subscription and roast on Exhale Coffee.",
      "50% off is applied at checkout on your first order.",
    ],
    transparency: {
      referee:
        "You receive 50% off your first subscription order when you sign up via the referral link on this page.",
      referrer:
        "I receive £5 per referral when you subscribe using my link. I use this site to share offers I genuinely use.",
    },
    productSpecs: [
      {
        label: "Roast level",
        value: "Light to dark (e.g. Ultra-Fine Dark Roast)",
      },
      {
        label: "Caffeine vs standard coffee",
        value: "Optimized / reduced for fewer jitters",
      },
      { label: "Origin & certification", value: "Organic, pesticide free" },
      { label: "Delivery", value: "Flexible subscription" },
    ],
  },
  myprotein: {
    seoTitle: "MyProtein discount: £15 off your order | Referral code",
    seoDescription:
      "Get £15 off MyProtein with my referral link. Wide range of sports nutrition including gluten-free whey isolate. Plus a gluten-free protein porridge recipe.",
    keywords: [
      "myprotein discount",
      "myprotein referral",
      "protein powder discount",
      "gluten free protein powder",
      "myprotein uk",
    ],
    whyIUseIt: `I’ve used MyProtein for years. After being diagnosed with coeliac disease I struggled to find protein powder I could have. MyProtein has a dedicated [gluten-free section](https://www.myprotein.com/thezone/supplements/whey-protein-gluten-free/), and their [Impact Whey Isolate in vanilla](https://www.myprotein.com/p/sports-nutrition/impact-whey-isolate-powder/10530911/?variation=13442785) works perfectly for me—no issues at all. I have a scoop every morning in my porridge and it makes it taste like custard.`,
    howItWorks:
      "Use my referral link and you’ll get £15 off any order over £45.",
    whatDoIGet: "£15 credit on my MyProtein account.",
    disclaimer:
      "If you order using my referral link I receive £15 off my next order. I’m very grateful for your support.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/myprotein.com",
      score: 4.4,
    },
    faq: [
      {
        question: "How do I get £15 off MyProtein?",
        answer:
          "Use the referral link on this page when you order. You get £15 off any order over £45. The discount is applied at checkout.",
      },
      {
        question: "Does MyProtein have gluten-free protein powder?",
        answer:
          "Yes. MyProtein has a dedicated gluten-free section including Impact Whey Isolate, which is suitable for people with coeliac disease. Always check the product page for the latest allergen information.",
      },
      {
        question: "What is the MyProtein referral offer?",
        answer:
          "New customers who use a referral link get £15 off orders over £45. The referrer receives £15 credit on their MyProtein account when the referred customer places an order.",
      },
    ],
    extraSections: {
      "Gluten-free protein porridge recipe": `**Ingredients**
40g gluten-free oats
1 scoop MyProtein whey isolate
1 tablespoon sugar
250ml soy milk
1 banana
1 tbsp salted caramel sauce

**Method**
1. Put the oats, protein powder and sugar into a pan and mix.
2. Add the milk and stir until smooth. Place over a medium heat and stir constantly.
3. Remove from the heat when the porridge is slightly runnier than you want—it will keep thickening in the pan.
4. Pour into a bowl, add sliced banana and drizzle with the salted caramel sauce.`,
    },
  },
  gymshark: {
    seoTitle: "Gymshark discount: £10 off your first order",
    seoDescription:
      "Gymshark referral offer: £10 off when new customers spend £50 or more.",
    keywords: ["gymshark discount", "gymshark referral", "gymshark code"],
    whyIUseIt: "More content coming soon.",
    howItWorks:
      "New customers get £10 off when they place their first order of £50 or more with Gymshark.",
    whatDoIGet:
      "I receive a reward when you place your first qualifying order.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/gymshark.com",
      score: 3.7,
    },
    faq: [
      {
        question: "How do I get £10 off Gymshark?",
        answer:
          "New customers get £10 off when they place their first order of £50 or more with Gymshark. Use the referral link when you sign up or at checkout.",
      },
      {
        question: "What does Gymshark sell?",
        answer:
          "Gymshark sells sportswear and gym wear including leggings, tops, hoodies and training gear. They are known for fitness and casual athletic wear.",
      },
    ],
  },
  runna: {
    seoTitle: "2 weeks free Runna Premium | Referral code",
    seoDescription:
      "Get 2 weeks of Runna Premium free with my referral code. Running plans for 5K, 10K, Hyrox and more. Download the app and start today.",
    keywords: [
      "runna app",
      "runna referral",
      "runna free trial",
      "running app discount",
      "runna premium",
    ],
    whyIUseIt: `I originally downloaded Runna to train for a Hyrox. I was about to be made redundant and had a wellbeing fund to use, so I signed up for the yearly subscription and started the 5K beginner plan. I didn’t expect to enjoy it as much as I do. Running has helped with my anxiety and sleep, and it gets me outside and moving—important when you work at a desk. I’ve also become the person who can actually keep up with a three-year-old in Aldi. I went from barely managing 60 seconds of running to completing 5K at around 8:30 per km.`,
    howItWorks:
      "Download the Runna app and enter my referral code to get two weeks of Premium free. Download links for iOS and Android are below.",
    whatDoIGet:
      "£10 credit towards the Runna apparel store when someone I refer starts a Premium subscription.",
    appStoreLinks: {
      ios: "https://apps.apple.com/gb/app/runna-running-plans-coach/id1594204443",
      android:
        "https://play.google.com/store/apps/details?id=com.runbuddy.prod",
    },
    images: [
      {
        src: "/runna_first_run.png",
        alt: "My first Runna run, April 2025: Easy Effort, 3.74 km in 36:04 at 9:39/km — run/walk intervals.",
      },
      {
        src: "/runna_recent_run.png",
        alt: "A recent Runna run: 6 km Progressive Repeat, 5.91 km in 50:00 at 8:27/km — showing pace improvement.",
      },
      {
        src: "/runna_total_km.png",
        alt: "Total distance tracked in Runna: 250 km so far with my current shoes, 51 runs, 33+ hours of running.",
      },
    ],
    trustpilot: {
      url: "https://uk.trustpilot.com/review/runna.com",
      score: 4.0,
    },
    faq: [
      {
        question: "How do I get 2 weeks free Runna Premium?",
        answer:
          "Download the Runna app (iOS or Android), then enter the referral code on this page when signing up. You get two weeks of Runna Premium free.",
      },
      {
        question: "What is Runna?",
        answer:
          "Runna is a running app that provides structured training plans for distances like 5K, 10K and events like Hyrox. It coaches you from beginner to regular runner with tailored plans.",
      },
      {
        question: "Is Runna free?",
        answer:
          "Runna has a free tier and a Premium subscription. With a referral code you get two weeks of Premium free. After that you can subscribe or use the free version.",
      },
    ],
  },
  provocan: {
    seoTitle: "Provocan CBD discount: £10 off when you spend £45",
    seoDescription:
      "Get £10 off Provocan CBD with my referral link. Full-spectrum oils and gummies, independently tested. Discount for new customers.",
    keywords: [
      "provocan",
      "provocan discount",
      "provocan referral",
      "cbd discount",
      "cbd referral code",
      "cbd products uk",
    ],
    whyIUseIt: `I have a medicinal cannabis prescription for ADHD and insomnia. Part of my treatment plan included using CBD to help with side effects like morning grogginess, but I’ve found that daily use also helps my anxiety and inflammation-related pain in my back and knees. The CBD oil from my prescription provider was expensive, so I switched to Provocan—same quality, much lower price. They offer full-spectrum oils and other products that are independently tested. I use the 10mg CBD gummies; I didn’t get on with the oil, but the gummies work well and taste good.`,
    howItWorks:
      "Use my referral link to get £10 off when you spend £45 or more.",
    whatDoIGet: "1,000 rewards points (worth £10).",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/provacan.co.uk",
      score: 4.6,
    },
    faq: [
      {
        question: "How do I get £10 off Provocan?",
        answer:
          "Use the referral link on this page. When you spend £45 or more on your order you get £10 off. The discount is applied at checkout.",
      },
      {
        question: "What is Provocan?",
        answer:
          "Provocan is a CBD brand offering full-spectrum oils and gummies. Products are independently tested. They are often used for relaxation, anxiety support and inflammation-related discomfort.",
      },
      {
        question: "Are Provocan products tested?",
        answer:
          "Provocan states that their products are independently tested. Check the product page or Provocan website for the latest testing and certificate information.",
      },
    ],
  },
  "emma-budgeting": {
    seoTitle: "Emma budgeting app: 30-day free trial",
    seoDescription:
      "Try Emma free for 30 days with my referral link. Budgeting app that auto-categorises spending, tracks subscriptions and gives you a clear view across all your accounts.",
    keywords: [
      "emma app",
      "emma budgeting",
      "emma free trial",
      "budgeting app discount",
      "emma referral",
    ],
    whyIUseIt: `I manage our household finances and use Emma to track spending and set our budget. It auto-categorises transactions, learns when your subscriptions go out and alerts you to upcoming payments or when you’re close to a budget limit. I find it invaluable—it gives me visibility that my normal banking apps don’t, and that includes every account in one place.`,
    howItWorks:
      "Download Emma and sign up via my referral link to get a 30-day free trial. Download for iOS or Android below.",
    whatDoIGet: "£50 in Emma credits.",
    appStoreLinks: {
      ios: "https://apps.apple.com/gb/app/emma-budget-planner-tracker/id1270062373",
      android: "https://play.google.com/store/apps/details?id=com.emmaprod",
    },
    disclaimer:
      "If you sign up using my referral link I receive £50 in Emma credits. Thank you for your support.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/emma-app.com",
      score: 4.4,
    },
    faq: [
      {
        question: "How do I get the Emma app free trial?",
        answer:
          "Download the Emma app and sign up using the referral link on this page. You get a 30-day free trial of Emma Premium.",
      },
      {
        question: "What is the Emma app?",
        answer:
          "Emma is a budgeting app that connects to your bank accounts, auto-categorises transactions, tracks subscriptions and upcoming payments, and helps you set and monitor budgets across all your accounts.",
      },
      {
        question: "Is Emma app free?",
        answer:
          "Emma offers a free trial. After the trial, Emma has a subscription for premium features. Check the Emma website or app store for current pricing.",
      },
    ],
  },
  "ribbon-rewards": {
    seoTitle: "Ribbon Rewards: Earn £25 + 1% Cashback on Your Rent Payments",
    seoDescription:
      "Stop letting your biggest monthly expense go unrewarded. Join thousands of UK renters earning points on every pound spent on rent. Partnered with Griffin Bank Ltd.",
    keywords: [
      "ribbon rewards",
      "rent cashback",
      "rent payment rewards",
      "ribbon rewards referral",
      "rent rewards uk",
    ],
    whyIUseIt: `I pay rent anyway, so I was keen to get something back on a payment I’m already making. The rewards are genuinely useful—you can spend points on vouchers for travel, hotels and Amazon. I tend to save mine through the year and use them at Christmas.`,
    howItWorks:
      "Sign up, get your dedicated rent account from Griffin Bank, pay rent through Ribbon, and earn 1 point per £1 (1.5 for partner properties). Redeem for vouchers.",
    whatDoIGet: "2,500 points (worth £25).",
    disclaimer:
      "If you use my referral link I receive 2,500 points (worth £25). I’m grateful for your support.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/ribbonrewards.io",
      score: 4.9,
    },
    heroHeadline: "Earn £25 + 1% Cashback on Your Rent Payments",
    heroSubheadline:
      "Stop letting your biggest monthly expense go unrewarded. Join thousands of UK renters earning points on every pound spent on rent.",
    ctaLabel: "Get £25 now!",
    trustBadge: {
      partner: "Partnered with Griffin Bank Ltd",
      label: "Fully UK Regulated",
    },
    howItWorksSteps: [
      {
        title: "Link your account",
        description:
          "Sign up and get your unique dedicated rent account provided by Griffin Bank.",
      },
      {
        title: "Pay Rent",
        description:
          "Transfer your rent to your new Ribbon account; it forwards to your landlord instantly via Faster Payments.",
      },
      {
        title: "Earn Points",
        description:
          "Get 1 point for every £1 paid (1.5 points for partner properties).",
      },
      {
        title: "Redeem",
        description: "Swap points for vouchers at Amazon, ASDA, TUI, and more.",
      },
    ],
    safetySection: {
      title: "Is your money safe?",
      bullets: [
        "Regulated Infrastructure: Accounts are provided by Griffin Bank Ltd, an FCA-authorised UK Bank (FRN: 970920).",
        "FSCS Protected: Eligible deposits are protected up to £85,000 by the Financial Services Compensation Scheme.",
        "Instant Forwarding: Your rent doesn't sit in a pot; it's forwarded to your landlord instantly.",
      ],
    },
    rewardsTable: [
      { label: "Rent £800/mo", value: "£96/year in points" },
      { label: "Rent £1,500/mo", value: "£180/year in points" },
      { label: "Sign-up bonus", value: "£25 instant" },
    ],
    faq: [
      {
        question: "Does my landlord need to sign up?",
        answer:
          "No, you just pay your rent to your new account instead of their old one.",
      },
      {
        question: "Are there fees?",
        answer: "No, Ribbon is completely free for tenants.",
      },
      {
        question: "What vouchers can I get?",
        answer: "Amazon, Tesco, M&S, Airbnb, and more.",
      },
    ],
  },
  airtime: {
    seoTitle: "Airtime referral code: £2 credit when you join",
    seoDescription:
      "Get £2 credit with Airtime when you sign up using my referral code and spend £5 in your first 7 days. Cashback on everyday spending without relying on cookies.",
    keywords: [
      "airtime",
      "airtime referral code",
      "airtime discount",
      "cashback app",
      "bill payment rewards",
    ],
    whyIUseIt: `Airtime gives me cashback on spending I was already doing, and it’s much simpler than other cashback sites. Those often don’t work in apps and rely on you opening the retailer’s site through their link so cookies can track the sale—and even then tracking sometimes fails. With Airtime you link the accounts you spend from and it automatically applies cashback to eligible purchases. You can also buy vouchers through Airtime for extra cashback—we spend about £40 on Just Eat each month, so I buy £40 of vouchers through Airtime when I get paid. You can use your Airtime balance towards your phone bill.`,
    howItWorks:
      "Sign up with my referral code and spend £5 within your first 7 days to receive £2 credit. Download the app for iOS or Android below.",
    whatDoIGet: "£5 credit on my account.",
    appStoreLinks: {
      ios: "https://apps.apple.com/gb/app/airtime-mobile-rewards/id975840117",
      android: "https://play.google.com/store/apps/details?id=com.karrot",
    },
    disclaimer:
      "If you sign up using my referral code I receive £5 in credit. Thank you for your support.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/airtimerewards.co.uk",
      score: 3.6,
    },
    faq: [
      {
        question: "How do I get £2 credit with Airtime?",
        answer:
          "Sign up to Airtime using the referral code on this page. Once you spend £5 within your first 7 days you receive £2 credit on your Airtime account.",
      },
      {
        question: "What is Airtime?",
        answer:
          "Airtime is a cashback app that links to your spending accounts and automatically applies cashback to eligible purchases. You can also buy vouchers (e.g. for retailers) through Airtime for extra cashback. Balance can be used towards your phone bill.",
      },
      {
        question: "How does Airtime cashback work?",
        answer:
          "You link your bank or payment accounts to Airtime. When you make eligible purchases, Airtime tracks them and adds cashback to your account. Unlike some cashback sites, it works in-app and does not rely on clicking through from a specific link or cookie tracking.",
      },
    ],
  },
};
