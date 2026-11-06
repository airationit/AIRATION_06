import type { Metadata } from "next";
import { TokenPricingContent } from "@/components/sections";
import { Footer, InteractiveDots } from "@/components/shared";

export const metadata: Metadata = {
  title: "Pricing & Token Plans | Hirance — Post Jobs Free, Pay for Matches",
  description:
    "Transparent token-based pricing for employers on Hirance. Post unlimited jobs for free, and use tokens to access verified candidate contact details and management features.",
  keywords: [
    "Hirance pricing",
    "token based hiring",
    "post jobs free",
    "pay for matches",
    "recruitment tokens",
    "employer hiring plans",
    "Hirance Pro Pack",
    "Hirance Lite Pack",
    "Hirance Max Pack",
    "recruiter pricing India",
  ],
  alternates: {
    canonical: "https://hirance.com/pricing",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hirance.com/pricing",
    title: "Pricing & Token Plans | Hirance — Post Jobs Free, Pay for Matches",
    description:
      "Post jobs free. Pay for matches. Use tokens to access candidate contact details and management features with Lite, Pro, and Max plans.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Token-Based Employer Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Token Plans | Hirance — Post Jobs Free, Pay for Matches",
    description:
      "Post jobs free. Pay for matches. Token-based hiring plans for startups, growing teams, and high-volume recruiters.",
    images: ["/og.png"],
  },
};

export default function PricingPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Pricing & Token Plans | Hirance",
      url: "https://hirance.com/pricing",
      description:
        "Post jobs free. Pay for matches. Use tokens to access candidate contact details and management features.",
    },
    {
      "@context": "https://schema.org",
      "@type": "PriceSpecification",
      name: "Hirance Token Hiring Plans",
      priceCurrency: "INR",
      description: "Hirance token-based pricing starting from ₹1,999 per pack.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative flex min-h-dvh flex-col overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20">
        {/* Background Canvas Dots consistent with homepage */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <InteractiveDots />
        </div>

        <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <TokenPricingContent />
        </section>

        <Footer />
      </main>
    </>
  );
}
