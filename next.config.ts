import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old /discounts and /earn routes are consolidated into the homepage.
    return [
      { source: "/discounts", destination: "/", permanent: true },
      { source: "/discounts/:path*", destination: "/", permanent: true },
      { source: "/earn", destination: "/", permanent: true },
      { source: "/earn/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
