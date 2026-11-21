import type { NextConfig } from "next";
import { isFinancePagesEnabled } from "./lib/flags";

// With finance pages off, /discounts/finance is not redirected, so it 404s.
const listCategories = isFinancePagesEnabled() ? "bills|health|finance" : "bills|health";

const nextConfig: NextConfig = {
  async redirects() {
    // List pages are consolidated into the homepage; brand landing pages remain.
    return [
      { source: "/discounts", destination: "/", permanent: true },
      {
        source: `/discounts/:category(${listCategories})`,
        destination: "/#:category",
        permanent: true,
      },
      { source: "/earn", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
