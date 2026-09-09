import type { Metadata } from "next"
import { TermsContent } from "@/components/terms/terms-content"

export const metadata: Metadata = {
  title: "Terms & Conditions | Hirance - Intellectual Property & User Content",
  description:
    "Official Terms and Conditions for Hirance (Airation Softech Pvt. Ltd.). Detailed terms governing platform usage, content ownership, intellectual property, takedown procedures, and legal disclaimers under Indian Law.",
  keywords: [
    "Hirance Terms and Conditions",
    "Airation Softech Terms of Service",
    "Hirance IP Policy",
    "Candidate content ownership",
    "Employer terms Hirance",
    "Copyright takedown policy",
    "Indian Law hiring terms",
    " Hirance terms and conditions",
    "Hirance legal terms",
    "Hirance user agreement",
    "Hirance copyright notice",
    "Hirance intellectual property",
    "Hirance user license",
    "Hirance acceptable use policy",
  ],
  alternates: {
    canonical: "https://hirance.com/terms",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/terms",
    title: "Terms & Conditions | Hirance Platform & IP Guidelines",
    description:
      "Comprehensive Terms & Conditions for Airation Softech Private Limited (Hirance), covering user content licenses, IP protection, and acceptable use.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Hirance",
    description:
      "Official Terms and Conditions for Hirance platform users, employers, and job seekers.",
  },
}

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions | Hirance",
    url: "https://hirance.com/terms",
    description:
      "Official Terms and Conditions of Airation Softech Private Limited (Hirance), governing intellectual property rights, user content, acceptable use, and dispute resolution.",
    publisher: {
      "@type": "Organization",
      name: "Airation Softech Private Limited",
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
      <TermsContent />
    </>
  )
}
