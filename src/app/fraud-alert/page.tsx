import type { Metadata } from "next"
import { FraudAlertContent } from "@/components/legal/fraud-alert-content"

export const metadata: Metadata = {
  title: "Fraud Alert — Protect Yourself from Fake Job Scams | Hirance",
  description:
    "Beware of fraudsters impersonating Hirance. Hirance never charges job seekers any fees. Learn how to identify fake job offers, verify official channels, and report fraud immediately.",
  keywords: [
    "Hirance fraud alert",
    "fake job offers India",
    "job scam India 2026",
    "Hirance impersonation scam",
    "how to identify fake recruiter",
    "job portal fraud India",
    "protect yourself from job scam",
    "Airation Softtech fraud",
    "report fake job offer India",
    "cybercrime helpline 1930",
    "is Hirance legitimate",
    "Hirance official channels",
  ],
  alternates: {
    canonical: "https://hirance.com/fraud-alert",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/fraud-alert",
    title: "Fraud Alert — Protect Yourself from Fake Job Scams | Hirance",
    description:
      "Hirance never charges candidates. Learn how to spot fake job offers and impersonators, and report fraud instantly.",
    siteName: "Hirance",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hirance Fraud Alert" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fraud Alert | Hirance",
    description:
      "Protect yourself from job scammers impersonating Hirance. Identify red flags, verify official channels, and report fraud.",
  },
}

export default function FraudAlertPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Fraud Alert | Hirance",
    url: "https://hirance.com/fraud-alert",
    description:
      "Official fraud alert page from Hirance (Airation Softtech). Educates job seekers on identifying fake job offers, impersonation scams, and how to report fraud.",
    publisher: {
      "@type": "Organization",
      name: "Airation Softtech Private Limited",
      url: "https://hirance.com",
      email: "fraud@hirance.com",
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
      <FraudAlertContent />
    </>
  )
}
