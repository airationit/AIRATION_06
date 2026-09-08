import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Free Online Resume Maker & Builder | Hirance",
  description:
    "Build a professional, ATS-friendly resume in 10 minutes with Hirance's free online resume maker. Instant PDF download with zero sign-up required.",
  alternates: {
    canonical: `${siteConfig.url}/services/resume-maker`,
  },
  openGraph: {
    title: "Free Online Resume Maker & Builder | Hirance",
    description: "Create an ATS-formatted professional resume online for free.",
    url: `${siteConfig.url}/services/resume-maker`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "Is the Hirance Resume Maker free?",
    answer:
      "Yes, our online resume builder is 100% free with no watermarks, hidden costs, or credit card requirements.",
  },
  {
    question: "Are the generated resumes ATS-friendly?",
    answer:
      "All templates built into our resume maker follow industry standard single-column ATS layouts accepted by fortune 500 portals.",
  },
];

export default function ResumeMakerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hirance Free Resume Maker",
    applicationCategory: "BusinessApplication",
    description: "Free online resume builder software producing ATS-compliant PDFs.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Free Resource"
        title="Free Online Resume Maker"
        titleGradient="Create Your Perfect Resume in 10 Minutes"
        subtitle="Step-by-step resume generator equipped with pre-written industry bullet points, ATS-formatted layouts, and 1-click PDF export."
        features={[
          "100% free PDF download with zero watermark",
          "Pre-written job summaries & skill suggestions",
          "Single & multi-column ATS-validated templates",
          "Mobile-friendly interface & instant live preview",
        ]}
        ctaLabel="Build My Resume Now"
        ctaHref="/download-app"
        faqs={faqs}
      />
    </>
  );
}
