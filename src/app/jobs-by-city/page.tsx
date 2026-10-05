import type { Metadata } from "next";
import { JobsByCityContent } from "../../components/jobs/jobs-by-city-content";

export const metadata: Metadata = {
  title: "Jobs By City in India | Hirance Directory",
  description:
    "Explore verified job openings across 74+ major cities in India including New Delhi, Bengaluru, Mumbai, Hyderabad, Lucknow, Pune, Chennai & more. Apply with zero forms on Hirance.",
  keywords: [
    "Jobs by City India",
    "Jobs in Bangalore",
    "Jobs in Delhi NCR",
    "Jobs in Mumbai",
    "Jobs in Lucknow",
    "Jobs in Hyderabad",
    "Jobs in Pune",
    "Hirance city job directory",
  ],
  alternates: {
    canonical: "https://hirance.com/jobs-by-city",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/jobs-by-city",
    title: "Jobs By City in India | Hirance Directory",
    description:
      "Explore verified job openings across 74+ major cities in India. Apply with zero forms on Hirance.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Jobs By City Directory",
      },
    ],
  },
};

export default function JobsByCityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jobs By City in India | Hirance Directory",
    url: "https://hirance.com/jobs-by-city",
    description:
      "Explore verified job openings across 74+ major cities in India. Apply with zero forms on Hirance.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobsByCityContent />
    </>
  );
}
