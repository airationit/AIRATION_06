import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Professional Resume Critique & Evaluation | Hirance",
  description:
    "Get an in-depth audit of your resume by senior hiring managers. Discover formatting errors, missing keywords, and weak sections holding back your callbacks.",
  alternates: {
    canonical: `${siteConfig.url}/services/resume-critique`,
  },
  openGraph: {
    title: "Professional Resume Critique & Evaluation | Hirance",
    description: "Detailed evaluation report on your resume by expert recruiters.",
    url: `${siteConfig.url}/services/resume-critique`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "What is included in a Resume Critique?",
    answer:
      "You receive a 4-page detailed PDF breakdown covering ATS compatibility, structural alignment, action verb impact, typography consistency, and specific recommendations for improvement.",
  },
  {
    question: "How fast will I receive my evaluation?",
    answer:
      "Resume critiques are delivered within 24 to 48 hours directly to your registered email.",
  },
];

export default function ResumeCritiquePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Resume Critique Service",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "Comprehensive resume evaluation report from industry recruiters.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Resume Evaluation"
        title="Resume Critique Report"
        titleGradient="Uncover Why You Aren't Getting Called"
        subtitle="Get detailed feedback from active corporate recruiters explaining why your current resume might be getting rejected by automated tracking software."
        features={[
          "ATS readability & parsing score analysis",
          "Line-by-line section improvement suggestions",
          "Keyword gap analysis for your target roles",
          "24 to 48 hour express turnaround",
        ]}
        ctaLabel="Get Resume Evaluated"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
