import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { QrMarketingContent } from "@/components/qr-marketing/qr-marketing-content";

export const metadata: Metadata = {
  title: "Download Hirance App | One-Tap Job Apply & Fast Candidate Hiring",
  description:
    "Download the Hirance mobile app. Get real-time job alerts, one-tap swipe applications, direct HR chat, and a free ATS-ready resume builder. For employers: post jobs in 60 seconds and hire top verified talent across India.",
  keywords: [
    "Hirance app download",
    "Hirance QR code",
    "Hirance mobile app",
    "job search app India",
    "direct HR chat job app",
    "call to apply jobs",
    "free resume builder app",
    "swipe to apply jobs India",
    "post jobs free India",
    "hire candidates fast",
    "verified employers India",
    "Hirance marketing",
  ],
  alternates: {
    canonical: `${siteConfig.url}/qr-marketing`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/qr-marketing`,
    title: "Download Hirance App | Fast Mobile Job Search & Instant HR Chat",
    description:
      "Find your next job in one tap or hire verified talent in minutes. Real-time job alerts, one-tap apply & direct HR chat on Hirance.",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Hirance App Download and Hiring Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Hirance App | One-Tap Job Search & Hiring",
    description:
      "Real-time job alerts, one-tap apply, and direct HR chat. Download the Hirance app or post jobs free today.",
    images: [siteConfig.ogImage],
  },
};

export default function QrMarketingPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Download Hirance App | QR Marketing",
      url: `${siteConfig.url}/qr-marketing`,
      description:
        "Download the Hirance mobile app or access the employer hiring portal. Fast, transparent matchmaking for job seekers and recruiters.",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/images/icon.png`,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Hirance",
      operatingSystem: "Android, iOS",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "India's swipe-based hiring platform with instant AI match scores, direct HR chat, and one-tap application.",
      url: siteConfig.links.playStore,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1250",
      },
    },
  ];

  return (
    <>
      {/* SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QrMarketingContent />
    </>
  );
}
