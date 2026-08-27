import type { Metadata } from "next"
import { PrivacyPolicyContent } from "@/components/privacy/privacy-content"

export const metadata: Metadata = {
   title: "Privacy Policy | Candidate Data Protection & DPDP Act Compliance | Hirance",
  description:
    "Read Hirance's Privacy Policy to learn how we collect, use, and protect your personal data as a job seeker or employer. Fully compliant with India's DPDP Act 2023 and IT Act 2000.",
  keywords: [
    "Hirance Privacy Policy",
    "Airation Softtech Privacy Policy",
    "DPDP Act 2023 compliance",
    "Candidate data protection",
    "Job seeker privacy India",
    "IT Act 2000 candidate data",
    "Grievance Officer Hirance",
    "Hirance data security",
    "how Hirance uses my data",
    "is Hirance safe with my data",
    "Hirance data deletion request",
    "how does Hirance protect candidate information",
    "job app privacy policy India",
    "employer data privacy Hirance",
    "personal data protection India job app",
  ],
  alternates: {
    canonical: "https://hirance.com/privacy",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/privacy",
    title: "Privacy Policy | Hirance Candidate & Job Seeker Protection",
    description:
      "Comprehensive Privacy Policy of Hirance (Airation Softtech Pvt. Ltd.), compliant with DPDP Act 2023 & IT Act 2000.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Hirance - Candidate Data Protection",
    description:
      "Hirance candidate privacy policy under India's Digital Personal Data Protection Act 2023.",
  },
}

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Hirance",
    url: "https://hirance.com/privacy",
    description:
      "Official Privacy Policy of Airation Softtech Private Limited (Hirance), detailing personal data collection, legal bases, security measures, and candidate rights under the DPDP Act 2023.",
    publisher: {
      "@type": "Organization",
      name: "Airation Softtech Private Limited",
      url: "https://hirance.com",
      email: "airation.it@gmail.com",
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
      <PrivacyPolicyContent />
    </>
  )
}
