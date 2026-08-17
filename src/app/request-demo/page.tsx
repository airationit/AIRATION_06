import type { Metadata } from "next";
import { RequestDemoContent } from "@/components/demo/request-demo-content";

export const metadata: Metadata = {
  title: "Request a Demo | Hirance",
  description:
    "Schedule a 15-minute product walkthrough to see how Hirance helps enterprise employers post jobs in 60 seconds and match with pre-screened talent instantly.",
  keywords: [
    "Hirance demo",
    "request demo Hirance",
    "employer hiring platform demo",
    "swipe hiring app demo",
    "fast recruitment platform India",
    "60 second job posting demo",
    "Smart Score candidate match demo",
  ],
  alternates: {
    canonical: "https://hirance.com/request-demo",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/request-demo",
    title: "Request a Demo | Hirance",
    description:
      "Schedule a personalized walkthrough of India's 1st swipe-based hiring platform built for speed and quality.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Request a Demo - Hirance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Demo | Hirance",
    description:
      "Experience fast, AI-matched hiring in action. Book a live demo with the Hirance team.",
  },
};

export default function RequestDemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Request a Demo | Hirance",
    url: "https://hirance.com/request-demo",
    description:
      "Schedule a personalized product demo of Hirance's fast swipe-based hiring platform for enterprise recruitment.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/og.png",
      slogan: "Swipe. Match. Get Hired.",
    },
    mainEntity: {
      "@type": "ContactPoint",
      telephone: "+91-9793780913",
      email: "hello@hirance.com",
      contactType: "sales and recruitment demo",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <>
      {/* SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RequestDemoContent />
    </>
  );
}
