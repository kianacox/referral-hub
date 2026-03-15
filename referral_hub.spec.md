# Overview

To create a referral hub that hosts "landing pages" designed to drive high intent traffic to the partner websites through my referral link.

---

# Tech Stack

- React, tailwind, next.js, vercel for deployment
- google analytics for tracking

---

# Styling

- dark, clean, modern and responsive. Mobile-first design, styling done using tailwind css and globally set colour variables.

---

# Brands I have referral links/codes for

- Gymshark: pending. create route and content but hide behind feature flag that is vercel env variable
- MyProtein: https://www.myprotein.com/referrals.list?applyCode=KIANA-R2B
- ribbon rewards: https://www.ribbonrewards.io/?ref=KIAN63DB
- provocan: https://prz.io/4groamaSO
- exhale coffee: rc-refer.com/kiana-2esl05
- runna: RUNNA1WGGS6T
- emma: https://emma.to/kianacox
- airtime: UKV9QCKE

**Referee reward per brand:**

- Gymshark: £10 off when new customer places first order of £50 with gymshark
- MyProtein: £15 off on new customers first order
- Ribbon rewards: first time you pay rent, receieve 2500 points (worth £25)
- Provocan: £10 off when you spend £45 or more
- Exhale Coffee: 50% off first subscription order
- Runna: new users get 2 weeks of runna premium for free
- Emma: 30 day free trial
- Airtime: new users receive £2 credit after spending £5 in first 7 days of joining

---

# Routes

**Base url:** referral-hub.app

- **Home (main site landing page):** /
- **Discounts home:** /discounts
- **Earn home:** /earn (no content for this path just yet. Waiting for next trading212 referral offer)

## Health

- **Health brand discounts home (essentially just discounts home with health filter):** /discounts/health

**Health brand discount landing pages:**

- /discounts/health/exhale-coffee
- /discounts/health/myprotein
- /discounts/health/gymshark
- /discounts/health/runna
- /discounts/health/provocan

## Finance

- **Finance brand discounts home (just discounts home with finance filter):** /discounts/finance

**Finance brand discount landing pages:**

- /discounts/finance/emma-budgeting

## Bills

- **Bills discount home (just discounts home with bill filter):** /discounts/bills

**Bill discount brand landing pages:**

- /discounts/bills/ribbon-rewards
- /discounts/bills/airtime

---

# Pages and components

Each landing page should have it's own dynamicall set SEO title, metadata, keywords and json ld

Each page will have a shared navbar. The navbar will have the following option(s)

- discounts leading to /discounts

On mobile, the options should be accesible via a burger menu on the right of the topnav. Clicking the menu will open a dropdown with the option(s). When the dropdown is open, it should be dismissable via an x icon which will apear where the burger menu icon was.

Each page will have a shared footer. The footer should have the copy "2026 referral hub. All rights reserved". it should also be able to have a dynamically set option disclaimer for each of the landing page, i.e for my protein, "if you order using my referral link I will receive £15 off my next order. I am incredibly grateful for your support".

---

# Homepage (referral-hub.app)

This will contain information about the website. Essentially, it's my own personal referral hub. It's a collection of all my personal referral links for brands I use regularly or have subscriptions with, that give users discounts, normally ones that are better than any current promos run by the brand themselves. So if you're interested in trying abrand or produxt and you don't want to pay full price (because who does?) you can use my referral links.

underneath this introduction should be list of stylised "cards" that contain the ranked brands I have referral codes for. These should be ranked by reward relative to what a user has to do - e.g ribbon rewards gives cashback on rent payments. These are payments a user has to make anyway so this is a massive ROI for a user. In contrast £10 off when you spend £40 or more for provocan is less of a win for someone and is for more high intent users.

Each card should contain

1. The brand logo. These already exist under /public following the pattern brand_name_logo
2. A brief overview of the company and what they offer.
3. A concise breakdown of the offer.
4. Two CTAS in the form of buttons existing on the same row, with a gap between them. The first should be an immediate CTA, that either contains my referral link to the site with dynamic text matching the offer i.e get £10 off now! OR my referall code in a stylised copyable container that has a copy button that will copy my code to the users clipboard and a link to the homepage or app link to the brand/product. For example, runna will be an app link. The second link should be a link to that brand landing page, where I give a detailed review about why I use the brand, what products I use and why, a breakdown of how the offer works and more direct CTAS with either my referral link or an easy copy pasteable code and a link to the brand site.

---

# Discounts home: /discounts

This should follow the same style as the homepage, but only contain info cards for the referrals that are discounts (currently all of them)

There should be a brief introduction in the form of some text stating that these are the referral codes I have that offer discounts on the brands I use.

Above the list of info cards and below the intro paragraph should be filter buttons with the values

- bills
- health
- finance

applying these will only show referall cards relative to the brand type selected. So Gymshark should show under health. The filters should be multiselectable. There should be a clear all option when more than one filter is selected, which successfully removes all filters. Applying just the one filter should also change the page route from /discounts to /discounts/filters?=.

---

# Health brand landing page content

Each landing page should have an SEO optimised title intended to drive engagement i.e get 50% off your first exhale coffee subscription order now!

## /discounts/health/exhale-coffee

**Why I use it?**

I drink an ungodly amount of coffee. I have a 3 year old who doesn't sleep, a full time career and unmedicated ADHD so I'm pretty addicted. I was going through a lot of coffee ( I drink cappucinos and espressos as I have a little swan espresso machine with a milk frother ) (link: https://www.amazon.co.uk/Swan-SK22110GRN-Espresso-Machine-Pressure/dp/B07KGR92MD/ref=sr_1_1?adgrpid=185645391999&dib=eyJ2IjoiMSJ9.vk3si9IKRLUkPN4miZjrmDGN6XJC7SXfm7t068mZLoTCpy5w15L30ya_JVq_6aUAdQ7pQ1zT3XmxnR3Aeh2eoWfRLrkzVE5sLAT2aJgnQz8Fgr5SbBJc-7aTNEyQcijZV0cCOYVnhbAKFiSfTLODp7C-XyEILJuWeOKZVBjk6XA6SOEDq5M3lQUs_udlacr1rINp_fojjquuW3FhMOt7UdoXZrhkkkzWF7kIdD7bO76IBH_vGiWFsoFUzm3c5dG2EBRkd1n142qWcNq7CAhhl3sXg038sMRDohsDxvyFLRc.118WlKb5_4CgpyGX4EjFZ3c8bZvynbNJyvRlHUZtZmI&dib_tag=se&gad_source=1&hvadid=793561800671&hvdev=c&hvexpln=0&hvlocphy=9180867&hvnetw=g&hvocijid=7176674558753009007--&hvqmt=e&hvrand=7176674558753009007&hvtargid=kwd-608995014661&hydadcr=19141_2407660_11106&keywords=swan%2Bretro%2Bcoffee%2Bmachine&mcid=d1d7e081feee375bab2d69d9e43d070f&qid=1773592667&sr=8-1&th=1) and was noticing 1. My anxiety was bad and 2. It was the most annoying thing having to go out in the morning to get more EXPENSIVE co op ground coffee beans every few weeks when I'd ran out and forgotten to replace the bag.

I wasn't actually looking for a coffee subscription - I got a free bag of exhale healthy coffee through a myprotein purchase (link to myprotein landing page here) and thought I might as well try it, it's free and I might as well try to make something I use daily (and will continue to use daily for the rest of my life) a bit healthier.

Lowkey that bag changed my life. The coffee tasted so much better, like chocolate. I use the ultra fine dark roast coffee (product link https://exhalecoffee.com/products/organic-darkish-roast?variant=39634306203694&selling_plan=711354876280). I've noticed that I get way less jitters and anxiety, I spend less momney, I never run out because my coffee is delivered to my door every two weeks, and it's delicious.

**How the offer works**

Get 50% off your first subscription order when using my referal link

**What do I get (for footer transparency)**

£5 for every referral

The page should have a CTA above the fold at the top of the page and also one in the how the offer works sections. The page colour and styling should match the overall site styling, but also take elements of the exhale coffee branding for alignment.

Seo should be otpimised for people looking for coffee subscriptions, discounts on coffee subscriptions and discounts on exhale coffee.

## /discounts/health/myprotein

**Why I use it**

- I've used it for years but was recently diagnosed as celiac and had a nightmare finding appropriate protein powder. I noticed myprotein had a dedicated gluten free section (https://www.myprotein.com/thezone/supplements/whey-protein-gluten-free/) and found that I can use their why protein isolate vanilla flavour (https://www.myprotein.com/p/sports-nutrition/impact-whey-isolate-powder/10530911/?variation=13442785) with no issues. I have it every morning in my porridge and it makes it taste like custard. Include link to recipe section

**How the offer works**

When buying through my referral link recieve £15 off any order over £45.

**Gluten free protein Porridge recipe**

40g gluten free oats
1 scoop my protein whey isolate
1 tablespoon sugar
250ml soy milk
1 bananna
1 tbsp salted caramel sauce

Method

1. measure out 40g oats into a pan. add the scoop of protein powser and the tablespoon of sugar
2. mix all the dry ingredients together then add the milk
3. stir until smooth, then put on the hob over a medium heat. stir constantly
4. take away from the heat when the consistency is slightly runnier than how you want it ( it will continue to thicken in the pan )
5. pour into a bowl. Chop a banana on top. add the tbsp of salted caramel sauce over the top as a drizzle.
6. enjoy!

**What do I get?**

£15 credit on myprotein

The page should be optimised for people searching for myprotein discounts, protein powder discounts and gluten free protein powder.

## /discounts/health/gymshark

Content will come later for this

## /discounts/health/runna

**Why I use it**

Originally downloaded to train for a hyrox. I was also being made redundant and had a wellbeing fund to use upo before departure so got the yearly sub for runna. I started the 5k beginner plan and discovered that I actually LOVE running. It helps with my anxiety. It helps with insomnia. It helps me run after my 3 year old when she elopes from me in Aldi. And it gets me outside and moving. I work behind a desk and I know how bad that is for me so I know regular movement is super important. I went from only being able to run for about 60 seconds to running 5k with an average time of 8:30 per km. Include screenshots of

first run (under public/runna_first_run)
most recent run (under public/runna_recent_run)
total km ran during subscription time (under public/runna_total_km)

**how it works**

download the runna app and enter my referral code for two free weeks of premium. add links to ios and android download.

**What do I get?**

£10 credit towards the runna apparell store when a referred person starts a runna premium subscription

## /discounts/health/provocan

**Why I use it**

I have a medicinal cannabis subscription for adhd and insomnia. Part of the treatment plan recommendation was to use cbd to help offset any negative side effects (i.e grogginess in the morning) but I've noticed daily use helps me in other ways - it helps to manage my anxiety and also helps pain I have from inflammation in my back and knees. I started to use provocan because the cbd oil I was getting from my cannabis provider was too expensive. Provovan was way cheaper for the same qualiry of product. Provocan offers full spectrum oils and other products that have been independently tested (fact check this!). I use the 10mg cbd gummies. Icl, I originally tried the oil and it was vile. The gummies on the other hand, are very nice.

**How it works**

when you use my referral link get £10 off when spending £45 or more

**What do I get?**

1000 rewards points (worth £10)

should be optmised for users searching for cbd products, cbd product discounts, cbd product referral codes, and provocan discounts and referral codes

---

# Finance brand landing page content

## /discounts/finance/emma-budgeting

**Base plan (from Pages and components + Referee reward):**

- SEO optimised title (e.g. drive engagement for Emma budgeting / 30-day free trial).
- **Why I use it:** I manage the household expenses. I use it to track spending and inform our budget. It intelligently auto categorises transactions, learns when subscriptions come out and when and notifies you when you have upcoming payments or when you're about to hit a budget limit. I find it invaluable. It gives me a level of visibility my normal banking apps don't give me and it also gives me visibility over all of our bank accounts.

- **How the offer works:** 30 day free trial (referee reward per brand) when customer downloads emma and signs up via my referral link.
- **What do I get (for footer transparency):** £50 in emma credits.
- CTA above the fold and in the how the offer works section; referral link: https://emma.to/kianacox.
- Page styling matches overall site; optional Emma branding alignment.
- SEO: optimise for Emma budgeting, budgeting app discounts, Emma app referral / free trial.

---

# Bills brand landing page content

## /discounts/bills/ribbon-rewards

**Base plan (from Pages and components + Referee reward):**

- SEO optimised title (e.g. drive engagement for rent cashback / Ribbon Rewards).
- **Why I use it:** Because I'm paying rent anyway so obviously I'm going to jump at the opportunity to get cashback on a massive payment I'm already making. And the way you can spend points are actually valuable - you can spend points on vouchers for air travel, hotels and even amazon (facts check this). My typically play is to hoard points all year to use for christmas.

- **How the offer works:** First time you pay rent, receive 2500 points (worth £25) (referee reward per brand).

- **What do I get (for footer transparency):** 2500 points (worth £25)

- CTA above the fold and in the how the offer works section; referral link: https://www.ribbonrewards.io/?ref=KIAN63DB.
- Page styling matches overall site; optional Ribbon Rewards branding alignment.
- SEO: optimise for ribbon rewards, rent cashback, rent payment rewards, referral codes.

## /discounts/bills/airtime

**Base plan (from Pages and components + Referee reward):**

- SEO optimised title (e.g. drive engagement for Airtime / bill credit).
- **Why I use it:** Because it's a product that gives me cashback on spending I was already doing. It's way more effortless than other cashback sites, which don't work on apps, and also require you to open a brand site through the cashback site to make sure the tracking cookies are correctly applied. And even then sometimes cookie tracking fails. With airtime you can just link all the accounts you spend from and airtime automatically gives cashback on eligible purchases. You can also use airtime to buy vouchers for cashback ( i.e we will typically spend £40 on just eat every month so when I get paid I buy £40 worth of vouchers through airtime for cashback). You can use the balance on your airtime account for discounts on your phone bill.

- **How the offer works:** New users receive £2 credit after spending £5 in first 7 days of joining when signing up using my referral code (referee reward per brand).

- **What do I get (for footer transparency):** £5 in credit on my account.

- CTA above the fold and in the how the offer works section; referral code in copyable container: UKV9QCKE, plus link to brand site/app.
- Page styling matches overall site; optional Airtime branding alignment.
- SEO: optimise for airtime, bill payment rewards, airtime referral code / discount.

NOTE: Where we find repetition of code designing components we should extract these snippets into a shared component library that can be used throughout the referral hub. We should use reusable components throughout the application and also hardcode text into contants files for easy modification.

The canonical url for this site will be https://referral-hub.app
