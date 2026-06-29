import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile packages that need it
  transpilePackages: ["three", "lenis"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Strict mode for catching bugs early
  reactStrictMode: true,
};

export default nextConfig;
