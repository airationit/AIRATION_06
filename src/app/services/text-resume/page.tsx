import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Professional Text Resume Writing Service | Hirance",
  description:
    "Get an ATS-optimized, professionally written text resume formatted to pass HR scanners and land top-tier interview callbacks in India.",
  alternates: {
    canonical: `${siteConfig.url}/services/text-resume`,
  },
  openGraph: {
    title: "Professional Text Resume Writing Service | Hirance",
    description: "ATS-optimized text resume crafted by expert HR writers.",
    url: `${siteConfig.url}/services/text-resume`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "What is an ATS-optimized text resume?",
    answer:
      "An ATS (Applicant Tracking System) text resume uses standard fonts, clear headings, and targeted keywords to ensure HR software accurately parses your work experience and skills.",
  },
  {
    question: "How long does it take to receive the completed text resume?",
    answer:
      "First drafts are delivered within 48 to 72 business hours after you submit your current career details and target job roles.",
  },
  {
    question: "Can I request revisions after receiving my draft?",
    answer:
      "Yes, all Hirance resume writing packages include up to 2 complimentary revision rounds within 14 days.",
  },
];

export default function TextResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Text Resume Writing Service",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "ATS-compliant professional text resume writing service for job seekers.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Resume Writing"
        title="Professional Text Resume"
        titleGradient="Built to Pass ATS Scanners"
        subtitle="Crafted by experienced hiring experts to highlight your core strengths, quantifiable achievements, and target role keywords."
        features={[
          "100% ATS-compliant layout & typography",
          "Keyword optimization tailored to your industry",
          "Highlight quantifiable achievements & metrics",
          "Editable MS Word & PDF formats included",
        ]}
        ctaLabel="Order Text Resume"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
