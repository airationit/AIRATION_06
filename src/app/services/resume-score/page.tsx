import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Free AI Resume Quality Score Checker | Hirance",
  description:
    "Check your resume score instantly. Test ATS keyword density, formatting errors, readability, and metric impact with Hirance's free AI scanner.",
  alternates: {
    canonical: `${siteConfig.url}/services/resume-score`,
  },
  openGraph: {
    title: "Free AI Resume Quality Score Checker | Hirance",
    description: "Instant AI score & feedback report for your resume.",
    url: `${siteConfig.url}/services/resume-score`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "How is the Resume Quality Score calculated?",
    answer:
      "Our AI model scans your resume against 50+ ATS parameters including section headers, word count, active verbs, quantification of results, and keyword placement.",
  },
  {
    question: "Is my resume data kept private?",
    answer:
      "Yes, your uploaded resume file is scanned securely and never shared with third parties or stored permanently.",
  },
];

export default function ResumeScorePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hirance AI Resume Quality Score Scanner",
    applicationCategory: "BusinessApplication",
    description: "Free automated resume scoring tool evaluating ATS compatibility and content impact.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Free AI Tool"
        title="Resume Quality Score"
        titleGradient="Instant AI ATS Audit & Feedback"
        subtitle="Upload your current resume PDF to get an instant 0-100 quality score, actionable keyword suggestions, and formatting error alerts."
        features={[
          "Instant overall 0-100 ATS compatibility score",
          "Detection of missing skills & industry keywords",
          "Readability & section structure checks",
          "100% free with detailed action item recommendations",
        ]}
        ctaLabel="Check My Resume Score"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
