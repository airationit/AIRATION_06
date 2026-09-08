import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Professional Resume Samples & Templates | Hirance",
  description:
    "Explore 100+ proven resume samples and templates across software, sales, HR, finance, marketing, and fresher job categories.",
  alternates: {
    canonical: `${siteConfig.url}/services/resume-samples`,
  },
  openGraph: {
    title: "Professional Resume Samples & Templates | Hirance",
    description: "Free downloadable resume examples across 50+ job domains.",
    url: `${siteConfig.url}/services/resume-samples`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "Can I download these resume samples as Word documents?",
    answer:
      "Yes, all sample templates are available for free download in editable DOCX and PDF formats.",
  },
  {
    question: "Are these samples updated for current hiring standards?",
    answer:
      "All our templates are reviewed annually by recruitment leads to match modern hiring standards in India and abroad.",
  },
];

export default function ResumeSamplesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hirance Free Resume Samples & Templates",
    description: "Collection of industry-proven resume samples and templates for job seekers.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Free Templates"
        title="Resume Samples & Examples"
        titleGradient="Proven Formats for Every Industry"
        subtitle="Browse battle-tested resume templates tailored for freshers, mid-level professionals, and senior executives across tech, sales, and operations."
        features={[
          "100+ domain-specific resume samples",
          "Free download in MS Word DOCX & PDF",
          "Structured for maximum readability & ATS parsing",
          "Includes sample bullet points for key achievements",
        ]}
        ctaLabel="Browse All Resume Samples"
        ctaHref="/download-app"
        faqs={faqs}
      />
    </>
  );
}
