import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "controller.dazzlinganchal.fun",
      },
    ],
  },
};

export default nextConfig;