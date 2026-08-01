import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // List pages are consolidated into the homepage; brand landing pages remain.
    return [
      { source: "/discounts", destination: "/", permanent: true },
      {
        source: "/discounts/:category(bills|health|finance)",
        destination: "/#:category",
        permanent: true,
      },
      { source: "/earn", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
