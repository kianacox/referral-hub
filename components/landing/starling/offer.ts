/** Shared Starling offer data for the redesign options. Facts from the Starling Refer a Friend T&Cs (effective 24 Aug 2026). */

export const TERMS_URL =
  "https://www.starlingbank.com/legal/terms/starling-referral-terms/";
export const DD_SOURCE_URL = "https://www.beermoneyuk.co.uk/bank-switching";

/** Starling brand aubergine, taken from the logo SVG. */
export const AUBERGINE = "#321E37";

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

/** For lower-intent visitors. General Starling features, not referral terms: verify before shipping. */
export const WHY_STARLING = [
  { title: "No monthly fee", body: "A free personal current account. You don't have to close your current bank." },
  { title: "Spaces", body: "Split money into pots for bills, holidays or the £25 itself." },
  { title: "FSCS protected", body: "Starling is a UK-licensed bank, so eligible deposits are protected." },
];

export const FAQ = [
  {
    question: "Do I have to switch my main bank?",
    answer:
      "No. You can open Starling alongside your current bank. You only need to meet the reward conditions shown in the app.",
  },
  {
    question: "Why is there no referral link?",
    answer:
      "Starling referrals are code-only. Enter VVDCRGY during your application when asked for a referral code.",
  },
  {
    question: "What if my conditions ask for a Direct Debit?",
    answer:
      "A £1 a month charity donation or savings app Direct Debit works. Standing orders don't count.",
  },
  {
    question: "What do you get?",
    answer:
      "Starling pays me the same £25. It doesn't reduce your reward or cost you anything.",
  },
];
