import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Priority Applicant Service | Hirance",
  description:
    "Pin your job applications to the top of recruiter dashboards. Get 3x higher interview call rates by becoming a Priority Applicant on Hirance.",
  alternates: {
    canonical: `${siteConfig.url}/services/priority-applicant`,
  },
  openGraph: {
    title: "Priority Applicant Service | Hirance",
    description: "Get featured at the top of employer applicant queues.",
    url: `${siteConfig.url}/services/priority-applicant`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "What does Priority Applicant status do?",
    answer:
      "When recruiters view applicants for a job opening, Priority Applicants are badged and displayed at the very top of the list, dramatically increasing profile views.",
  },
  {
    question: "How long does Priority Applicant status last?",
    answer:
      "Priority status remains active for 30 days across all jobs you apply for on Hirance.",
  },
];

export default function PriorityApplicantPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Priority Applicant Service",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "Featured application status pinning candidates at the top of recruiter feeds.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Recruiter Spotlight"
        title="Priority Applicant Status"
        titleGradient="Be First in Line for Every Job"
        subtitle="Ensure hiring managers view your profile before thousands of competitors. Priority Applicants enjoy 3x higher callback rates."
        features={[
          "Top-of-list placement on recruiter dashboards",
          "Highlighted 'Priority Candidate' verification badge",
          "Direct SMS & app notifications when HR opens your resume",
          "Valid for 30 consecutive days of unlimited applications",
        ]}
        ctaLabel="Get Priority Status"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
