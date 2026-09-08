import type { Metadata } from "next"
import { TrustSafetyContent } from "@/components/legal/trust-safety-content"

export const metadata: Metadata = {
  title: "Trust & Safety — How Hirance Keeps Your Job Search Safe | Hirance",
  description:
    "Discover how Hirance protects job seekers and employers through verified employers, zero-fee candidate policy, data encryption, and continuous platform monitoring. Trust is our foundation.",
  keywords: [
    "Hirance trust and safety",
    "safe job search platform India",
    "Hirance employer verification",
    "is Hirance safe",
    "Hirance candidate data protection",
    "job platform safety India",
    "Hirance security measures",
    "Airation Softtech safety",
    "Hirance zero fee candidates",
    "trusted hiring platform India",
    "secure job portal India 2026",
  ],
  alternates: {
    canonical: "https://hirance.com/trust-and-safety",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/trust-and-safety",
    title: "Trust & Safety | Hirance — A Platform You Can Trust",
    description:
      "Hirance is built on trust. Learn how we verify employers, protect candidate data, and maintain a safe hiring environment for all users.",
    siteName: "Hirance",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hirance Trust & Safety" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust & Safety | Hirance",
    description:
      "How Hirance keeps job seekers and employers safe through verified employers, zero-fee policy, and data protection.",
  },
}

export default function TrustSafetyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Trust & Safety | Hirance",
    url: "https://hirance.com/trust-and-safety",
    description:
      "Hirance's Trust & Safety page outlining employer verification, candidate data protection, content standards, and platform safety commitments.",
    publisher: {
      "@type": "Organization",
      name: "Airation Softtech Private Limited",
      url: "https://hirance.com",
      email: "hello@hirance.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "8/4, Sector-4, Jankipuram",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        postalCode: "226021",
        addressCountry: "IN",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrustSafetyContent />
    </>
  )
}
