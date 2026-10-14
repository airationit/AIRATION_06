import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile packages that need it
  transpilePackages: ["three", "lenis", "gsap"],

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
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
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


  async redirects() {
    return [
      {
        source:
          "/((?!api|_next|favicon|favicons|icons|images|models|pics|videos|about|blog|companies|company|contact|cookies|delete-account|download-app|feedback|fonts|fraud-alert|free-job-alerts|gallery|grievances|how-it-works|job-search|jobs|mobile-privacy-policy|privacy|qr-marketing|request-demo|terms|trust-and-safety|vulnerability-disclosure|apple-app-site-association|robots|sitemap|manifest|og|hiranceiconlogo|\\.well-known).+)",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
