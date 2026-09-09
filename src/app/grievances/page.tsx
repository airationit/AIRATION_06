import type { Metadata } from "next"
import { GrievancesContent } from "@/components/legal/grievances-content"

export const metadata: Metadata = {
  title: "Grievances & Complaint Redressal | IT Act Compliant | Hirance",
  description:
    "File a formal grievance with Hirance. Our Grievance Officer resolves complaints within 15–30 days as mandated by the IT Act, 2000 and DPDP Act, 2023. Contact us at grievance@hirance.com.",
  keywords: [
    "Hirance grievance redressal",
    "Hirance grievance officer",
    "file complaint Hirance",
    "IT Act 2000 grievance",
    "DPDP Act complaint India",
    "Airation Softtech grievance",
    "job platform complaint India",
    "data rights complaint Hirance",
    "how to complain Hirance",
    "candidate complaint Hirance",
  ],
  alternates: {
    canonical: "https://hirance.com/grievances",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/grievances",
    title: "Grievances & Complaint Redressal | Hirance",
    description:
      "Formal grievance redressal mechanism for Hirance users. IT Act 2000 and DPDP Act 2023 compliant. Responses within 15 days.",
    siteName: "Hirance",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hirance Grievance Redressal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grievances & Complaint Redressal | Hirance",
    description:
      "File a formal grievance with Hirance. Our Grievance Officer will respond within timelines mandated by the IT Act, 2000.",
  },
}

export default function GrievancesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Grievances & Complaint Redressal | Hirance",
    url: "https://hirance.com/grievances",
    description:
      "Formal grievance and complaint redressal page for Hirance (Airation Softtech), compliant with IT Act 2000 and DPDP Act 2023.",
    publisher: {
      "@type": "Organization",
      name: "Airation Softtech Private Limited",
      url: "https://hirance.com",
      email: "grievance@hirance.com",
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
      <GrievancesContent />
    </>
  )
}
