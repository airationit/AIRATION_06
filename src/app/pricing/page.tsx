import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import PricingPage from "@/components/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Token-Based Pricing | Post Jobs Free, Pay For Matches - Hirance",
  description:
    "Post jobs free. Pay for matches. Use tokens to access candidate contact details and hiring management features. Affordable plans for occasional, growing, and bulk hiring.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    title: "Hirance Token-Based Pricing | Post Jobs Free",
    description:
      "Post jobs free and pay only for matches. Unlock candidate contacts with flexible tokens on Hirance.",
    url: `${siteConfig.url}/pricing`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hirance Pricing | Post Jobs Free. Pay For Matches.",
    description:
      "Simple token-based pricing for recruiters and employers across India. Start free today.",
  },
};

export default function Pricing() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hirance Employer Pricing Plans",
    description:
      "Post jobs free. Pay for matches. Use tokens to access candidate contact details and management features.",
    url: `${siteConfig.url}/pricing`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingPage />
    </>
  );
}
