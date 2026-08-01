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
  /** Ribbon: KYC onboarding checkpoints */
  onboardingStages?: { title: string; details: string }[];
  /** Ribbon: explicit referral transparency block */
  transparencyDisclosure?: { title: string; body: string };
  /** Ribbon: social proof screenshot gallery */
  socialProofImages?: { src: string; alt: string; caption?: string }[];
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
    seoTitle: "Ribbon Rewards Referral Code KIAN63DB: Get £25 + Rent Cashback",
    seoDescription:
      "Use Ribbon Rewards to earn cashback on rent you already pay. Get a £25 sign-up bonus with referral code KIAN63DB and earn 1% to 1.5% points on monthly rent.",
    keywords: [
      "ribbon rewards",
      "rent cashback",
      "rent payment rewards",
      "ribbon rewards referral",
      "rent rewards uk",
    ],
    whyIUseIt: `I pay rent anyway, so I was keen to get something back on a payment I’m already making. The rewards are genuinely useful—you can spend points on vouchers for travel, hotels and Amazon. I tend to save mine through the year and use them at Christmas.`,
    howItWorks:
      "Sign up using the referral link, receive your own dedicated UK bank details from Griffin Bank, route rent through that account, and automatically earn points on each payment.",
    whatDoIGet: "2,500 points (worth £25).",
    disclaimer:
      "If you use my referral link and receive your referral reward, Ribbon also pays me a matching referral reward at no extra cost to you.",
    trustpilot: {
      url: "https://uk.trustpilot.com/review/ribbonrewards.io",
      score: 4.7,
    },
    heroHeadline: "Ribbon Rewards Referral Code KIAN63DB: Get £25 + 1% Rent Cashback",
    heroSubheadline:
      "Ribbon turns your monthly rent transfer into ongoing rewards. Keep paying rent as normal, while earning 1% to 1.5% back in points redeemable for gift cards.",
    ctaLabel: "Get £25 now!",
    trustBadge: {
      partner: "Partnered with Griffin Bank Ltd",
      label: "FCA authorised infrastructure (FRN 970920)",
    },
    howItWorksSteps: [
      {
        title: "Create your account",
        description:
          "Complete sign-up and get your own UK sort code and account number in your name.",
      },
      {
        title: "Redirect rent payment",
        description:
          "Update your standing order so rent goes to your Ribbon account first.",
      },
      {
        title: "Funds forward instantly",
        description:
          "Griffin forwards the payment to your landlord over Faster Payments with your usual reference.",
      },
      {
        title: "Earn and redeem points",
        description: "Receive points after verified payments and redeem for shopping, travel, and food vouchers.",
      },
    ],
    onboardingStages: [
      {
        title: "Stage 1 (25%) - Identity",
        details: "Name, email, date of birth, and phone number.",
      },
      {
        title: "Stage 2 (50%) - Address",
        details: "UK residential address verification for banking.",
      },
      {
        title: "Stage 3 (75%) - Compliance",
        details: "Employment, income, and source of funds checks.",
      },
      {
        title: "Stage 4 (100%) - Rent details",
        details: "Enter rent amount and confirm referral code KIAN63DB is populated.",
      },
    ],
    safetySection: {
      title: "Security and trust",
      bullets: [
        "Accounts are provided by Griffin Bank Ltd, regulated by the FCA and PRA (FRN 970920).",
        "Eligible deposits are protected by FSCS up to £85,000.",
        "Payments are forwarded over Faster Payments, so landlords receive rent as a normal UK bank transfer.",
        "No landlord sign-up is required, and you keep your normal payment reference.",
      ],
    },
    rewardsTable: [
      { label: "£600 monthly rent", value: "£97 first-year value (£72 cashback + £25 bonus)" },
      { label: "£1,000 monthly rent", value: "£145 first-year value (£120 cashback + £25 bonus)" },
      { label: "£1,500 monthly rent", value: "£205 first-year value (£180 cashback + £25 bonus)" },
      { label: "£2,000 monthly rent", value: "£265 first-year value (£240 cashback + £25 bonus)" },
    ],
    transparencyDisclosure: {
      title: "Full transparency disclosure",
      body: "Using referral code KIAN63DB gives you a boosted £25 sign-up bonus after your first successful rent payment. Ribbon also pays me a matching referral bonus at no extra cost to you or your landlord. I only benefit when your reward is successfully credited.",
    },
    socialProofImages: [
      {
        src: "/ribbon_proof_of_use.jpg",
        alt: "Ribbon activity feed showing successful rent transfer, proof of payment, and bonus points credited",
        caption: "This is one of my real rent payments showing the transfer, proof of payment, and points landing successfully.",
      },
      {
        src: "/ribbon_shopping_rewards.jpg",
        alt: "Ribbon shopping rewards screen showing Amazon and Apple voucher redemption point tiers",
        caption: "These are some of the shopping vouchers I can choose from once points build up.",
      },
      {
        src: "/ribbon_travel_rewards.jpg",
        alt: "Ribbon travel and delivery rewards screen showing Hotels.com and Deliveroo voucher redemption tiers",
        caption: "Travel and food options are available too, with clear point amounts for each reward level.",
      },
    ],
    faq: [
      {
        question: "Is Ribbon Rewards safe to use for rent payments?",
        answer:
          "Yes. Ribbon gives you a personal account provided by Griffin Bank Ltd, a regulated UK bank infrastructure provider (FRN 970920). Eligible balances are covered by FSCS up to £85,000.",
      },
      {
        question: "How do I make sure I get the £25 bonus with code KIAN63DB?",
        answer:
          "Sign up through the referral link and verify KIAN63DB is present during the final onboarding stage before submission. The bonus is credited after your first successful rent payment.",
      },
      {
        question: "Will my landlord know I am using Ribbon?",
        answer:
          "No. Your landlord receives a normal UK bank transfer with your existing payment reference, and no landlord action is required.",
      },
      {
        question: "How does the 1.5% cashback rate work?",
        answer:
          "Standard earn rate is 1 point per £1 of rent. Some partner properties can earn 1.5 points per £1, increasing total annual value.",
      },
      {
        question: "Is there a hard credit check?",
        answer:
          "No. Identity checks are performed for AML/KYC compliance, but this is a soft verification process and does not create a hard credit search.",
      },
      {
        question: "Can I use Ribbon with private landlords and housing associations?",
        answer:
          "Yes. Ribbon works with private landlords, letting agents, and housing associations as long as your rent recipient accepts UK bank transfer payments.",
      },
    ],
  },
  "virgin-media": {
    seoTitle: "Virgin Media referral: Get £50 cash when a friend joins",
    seoDescription:
      "Use my Virgin Media referral page to claim a £50 cash reward when your friend signs up to a qualifying Virgin Media service.",
    keywords: [
      "virgin media referral",
      "virgin media refer a friend",
      "virgin media £50",
      "virgin media reward",
      "virgin media broadband referral",
    ],
    whyIUseIt:
      "Virgin Media gives a clear referral flow and tangible cash reward when someone joins. The process is simple: share the link, your friend chooses their package, and your reward unlocks once the qualifying criteria are met.",
    howItWorks:
      "Share your referral link, your friend places a qualifying order, and you receive a £50 cash reward once eligibility checks complete.",
    whatDoIGet: "£50 cash reward for each successful referral.",
    disclaimer:
      "Referral rewards are subject to Virgin Media terms, eligibility criteria, and validation windows. Always review the latest terms on the provider website before referring.",
    heroHeadline: "Get £50 cash when your friend signs up.",
    heroSubheadline:
      "Refer Virgin Media and earn a real cash reward for successful qualifying orders across broadband, TV, and mobile packages.",
    ctaLabel: "Claim £50 reward",
    faq: [
      {
        question: "How and when do I get the £50?",
        answer:
          "Once your service has been installed and you're past Virgin's 14-day cooling-off period, Aklamio confirms the reward — usually 60 days after install. You then log into your Aklamio account and withdraw the £50 to your bank account via BACS or to PayPal. Most people see the money in their account within five working days of requesting withdrawal. In some cases Aklamio can take up to 9 weeks if there are extra checks.",
      },
      {
        question: "Is this legitimate? Sounds suspicious.",
        answer:
          "Yes — Aklamio is Virgin Media's official refer-a-friend partner, listed on Virgin's own help pages. The link sends you straight to Aklamio's portal, which forwards to Virgin's real checkout. You're never asked for payment by anyone except Virgin Media, and the cashback is paid by Aklamio after Virgin confirms your service is live.",
      },
      {
        question: "Can I stack this with Virgin's switching offer?",
        answer:
          "Yes — the £50 Aklamio cashback usually stacks with Virgin's standard new-customer promotions, including the up to £250 switching credit for early termination fees from your previous provider. So you can potentially pocket £50 cash from Aklamio and up to £250 bill credit from Virgin. Read Virgin's offer terms before ordering to confirm.",
      },
      {
        question: "What if I cancel during the 14-day cooling-off?",
        answer:
          "The £50 doesn't pay out. Aklamio waits until your 14-day customer satisfaction guarantee period has expired before confirming the reward, so you need to stay with Virgin past that window. After 14 days you're free to do whatever — keep the service, switch later — and the £50 still pays out at the 60-day mark.",
      },
      {
        question: "Which packages qualify?",
        answer:
          "All of Virgin's main consumer packages: superfast fibre broadband (M125 through Gig1), digital TV bundles, home phone, and Volt bundles when paired with O2. Mobile-only Virgin Mobile referrals pay £25, not £50. Excluded: Mates Rates, My Rates, Tribe, Partner Rates, 30-day rolling contracts, Essential broadband social tariffs, and any upgrade or extension to an existing Virgin contract.",
      },
      {
        question: "Do I need to do anything during sign-up?",
        answer:
          "Just start your application via the red button on this page. The Aklamio link tracks your referral automatically — you enter your email so Aklamio can match the eventual payout to you, then you're forwarded to Virgin's normal checkout. If you'd rather order over the phone, Virgin's telesales accept the referral code RQWFQWKO at the point of sale.",
      },
      {
        question: "What's Volt and is it worth it?",
        answer:
          "Volt is the bundle you get when your household has both Virgin Media broadband and an O2 Pay Monthly mobile plan. At no extra cost you get: a free broadband speed boost to the next tier (up to 1Gbps), double mobile data on every eligible O2 plan in the household, a WiFi guarantee with up to 3 free WiFi pods if needed, and free roaming in 75 countries via O2 Travel Inclusive Zone. If you (or anyone in your home) is already on O2 Pay Monthly, Volt is the no-brainer pick.",
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
  "lloyds-bank": {
    seoTitle: "Get £30 free — Lloyds Bank refer-a-friend | Personal Referral Hub",
    seoDescription:
      "Use my personal Lloyds Bank refer-a-friend link to open a new current account and earn £30 cash within 30 days. FCA-regulated, takes 10 minutes, no switching required.",
    keywords: [
      "lloyds refer a friend",
      "lloyds £30 bonus",
      "lloyds current account bonus",
      "club lloyds referral",
      "bank account bonus uk",
      "lloyds referral link",
    ],
    whyIUseIt:
      "Lloyds pay £30 directly into your new current account within 30 working days of opening it. No switching required — just open the account in your sole name and keep it open for 7 days. It takes about 10 minutes online and the money lands automatically.",
    howItWorks:
      "Use my referral link to open a qualifying Lloyds current account in your sole name. Keep it open for at least 7 days, and the £30 is credited within 30 working days.",
    whatDoIGet: "£30 into my existing Lloyds account for each successful referral.",
    disclaimer:
      "This is a personal referral page run by an individual Lloyds customer. It is not affiliated with, endorsed by, or operated by Lloyds Bank plc. When you open a qualifying account using my link, both you and I receive £30 under Lloyds’ standard refer-a-friend programme. Terms set by Lloyds and may change.",
    faq: [
      {
        question: "How long does the £30 payment take?",
        answer:
          "Lloyds pays the £30 as a cash credit into your new account within 30 working days of you opening it. The clock starts when your account is fully open and you’ve kept it open for the required 7-day minimum.",
      },
      {
        question: "Is the £30 taxable?",
        answer:
          "Cash incentives like this are generally not classed as taxable income for most UK personal customers. That said, tax treatment depends on your personal circumstances and HMRC rules can change. If you’re unsure — particularly if you’re self-employed or a higher-rate taxpayer — check HMRC guidance or speak to a tax adviser. I can’t give tax advice.",
      },
      {
        question: "Which account types qualify?",
        answer:
          "The Lloyds Classic Account, Club Lloyds, Club Lloyds Silver, Club Lloyds Platinum and Premier accounts all qualify, as long as you open in your sole name. Under 19s, Smart Start and Student accounts don’t qualify under the refer-a-friend scheme.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. Clicking the referral link takes you directly to Lloyds Bank’s own website, where you fill out the application. I never see your personal or financial information — Lloyds simply notes that you used my referral link so we both get paid. Lloyds is authorised by the PRA and regulated by the FCA and PRA, and deposits are protected up to £85,000 by the FSCS.",
      },
      {
        question: "Do I need to switch my old bank account to qualify?",
        answer:
          "No — no switching required. The refer-a-friend bonus is paid simply for opening a qualifying new Lloyds account in your sole name and keeping it open for 7 days. You don’t need to move direct debits, change your salary, or close your existing account. You can keep your current bank exactly as it is.",
      },
      {
        question: "Are there any other Lloyds bonuses currently available?",
        answer:
          "Lloyds’ last public switching bonus ended on 30 April 2026, so the refer-a-friend route on this page is currently the most reliable way to earn money for opening a new Lloyds account. New switch offers may launch at any time — if one does, I’ll update this page so you can decide which works best for you. Bookmark it and check back.",
      },
    ],
  },
};
