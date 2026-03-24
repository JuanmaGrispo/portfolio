import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "go.tasky.digital",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secdevs.com.ar",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
