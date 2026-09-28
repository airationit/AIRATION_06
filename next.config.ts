import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile packages that need it
  transpilePackages: ["three", "lenis"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hirance.com",
      },
      {
        protocol: "https",
        hostname: "**.hirance.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Ensure domain verification files are always served with application/json and CORS
  async headers() {
    return [
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
