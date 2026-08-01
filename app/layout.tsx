import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerProvider } from "@/components/context/DisclaimerContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const interTight = Inter_Tight({
  variable: "--font-sans-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} spotlight-bg flex min-h-screen flex-col antialiased`}
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
