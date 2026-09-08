import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Job & Cover Letter Samples | Hirance",
  description:
    "Download winning cover letter samples and job application letter templates. Customize opening lines, skill highlights, and closing call-to-actions.",
  alternates: {
    canonical: `${siteConfig.url}/services/cover-letter-samples`,
  },
  openGraph: {
    title: "Job & Cover Letter Samples | Hirance",
    description: "Free job application letter & cover letter templates.",
    url: `${siteConfig.url}/services/cover-letter-samples`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "Do employers still read cover letters?",
    answer:
      "Yes! Over 65% of hiring managers report that a concise, tailored cover letter significantly improves a candidate's likelihood of getting an interview.",
  },
  {
    question: "How long should a cover letter be?",
    answer:
      "Ideal cover letters are short, crisp, and 250-300 words long—focusing on 2 core achievements and why you want to join the company.",
  },
];

export default function CoverLetterSamplesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hirance Free Job & Cover Letter Samples",
    description: "High-converting cover letter templates and job application letter examples.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Free Templates"
        title="Job & Cover Letter Samples"
        titleGradient="Write Winning Application Letters"
        subtitle="Craft compelling application emails and cover letters that captivate hiring managers from the very first paragraph."
        features={[
          "Short & impactful 250-word cover letter templates",
          "Free to copy, edit, and download",
          "Tailored samples for freshers, career switchers, and leads",
          "Includes follow-up email templates for interview status",
        ]}
        ctaLabel="Explore Cover Letters"
        ctaHref="/download-app"
        faqs={faqs}
      />
    </>
  );
}
