import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerProvider } from "@/components/context/DisclaimerContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Regular.woff2",
  variable: "--font-serif",
  weight: "400",
});

const interTight = localFont({
  src: "./fonts/InterTight-Variable.woff2",
  variable: "--font-sans-tight",
  weight: "300 700",
});

const fraunces = localFont({
  src: "./fonts/Fraunces-Variable.woff2",
  variable: "--font-fraunces",
  weight: "400 600",
});

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Medium.woff2", weight: "500" },
    { path: "./fonts/Poppins-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-poppins",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono-jb",
  weight: "400 600",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://referral-hub.app"),
  title: {
    default: "Referral Hub | Personal referral links & discounts",
    template: "%s | Referral Hub",
  },
  description:
    "A collection of personal referral links for brands I use—discounts and offers that are often better than current promotions. Try something new without paying full price.",
  openGraph: {
    siteName: "Referral Hub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${poppins.variable} spotlight-bg flex min-h-screen flex-col antialiased`}
      >
        <GoogleAnalytics />
        <Analytics />
        <DisclaimerProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </DisclaimerProvider>
      </body>
    </html>
  );
}
