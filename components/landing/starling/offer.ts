/** Starling landing page data. Offer facts from the Starling Refer a Friend T&Cs (effective 24 Aug 2026). */

export const TERMS_URL =
  "https://www.starlingbank.com/legal/terms/starling-referral-terms/";
export const DD_SOURCE_URL = "https://www.beermoneyuk.co.uk/bank-switching";

export const STEPS = [
  {
    title: "Copy the code",
    body: "VVDCRGY. You'll need it in a minute.",
  },
  {
    title: "Apply for a personal account",
    body: "Enter the code when Starling asks for a referral code. You can only enter one.",
  },
  {
    title: "Meet the conditions in the app",
    body: "Starling shows you exactly what to do. £25 lands in a Space within 30 days.",
  },
];

export const ELIGIBILITY = [
  "You're 18 or over",
  "You've never had a Starling account",
  "You're opening a personal current account (not joint, teen, Under 16s or student)",
];

export const DOES_NOT_COUNT =
  "Standing orders, transfers to other bank accounts (including Starling ones), refunded or cancelled payments.";

/** Cheap Direct Debits listed on beermoneyuk.co.uk's bank-switching guide. */
export const DIRECT_DEBITS = [
  { name: "A charity donation", detail: "£1 a month (e.g. Cancer Research, Mind)" },
  { name: "Wealthify", detail: "£1 a month into savings" },
  { name: "Plum", detail: "£1 a month into savings" },
  { name: "Moneybox", detail: "Round-ups paid by Direct Debit" },
];

/** Screenshot of the Refer a friend screen in my Starling app, cropped to the "How it works" card. */
export const PROOF_SCREENSHOT = {
  src: "/starling_how_it_works.webp",
  width: 640,
  height: 893,
  capturedOn: "19 Nov 2026",
};

/** Update `left` by hand each time someone uses the code. */
export const CODE_USES = { left: 10, total: 10 };

/** Plain-English versions of the screenshot's lines. `pinTop` places each numbered pin over its line (% of image height). */
export const PROOF_FACTS = [
  {
    title: "We both get £25",
    body: "Once you open an account with my code and set up a Direct Debit within 30 days.",
    pinTop: "10.6%",
  },
  {
    title: "Any Direct Debit amount works",
    body: "There's no minimum. Some payment types don't count (see the fine print).",
    pinTop: "31.6%",
  },
  {
    title: "My code works for 10 people",
    body: "After that it stops. If it fails at sign-up, that's why.",
    pinTop: "56.8%",
    showCodesLeft: true,
  },
];

/** For lower-intent visitors. General Starling features, not referral terms: verify before shipping. */
export const WHY_STARLING = [
  { title: "No monthly fee", body: "A free personal current account. You don't have to close your current bank." },
  { title: "Spaces", body: "Split money into pots for bills, holidays or the £25 itself." },
  { title: "FSCS protected", body: "Starling is a UK-licensed bank, so eligible deposits are protected." },
];

