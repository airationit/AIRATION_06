import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Jobs4u Personal Job Matching Service | Hirance",
  description:
    "Get AI-curated job recommendations matching your skills, preferred salary, and target location delivered directly to your WhatsApp and Hirance app feed.",
  alternates: {
    canonical: `${siteConfig.url}/services/jobs4u`,
  },
  openGraph: {
    title: "Jobs4u Personal Job Matching Service | Hirance",
    description: "Tailored AI job alerts matched to your preferences.",
    url: `${siteConfig.url}/services/jobs4u`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "How does Jobs4u filter vacancies?",
    answer:
      "Jobs4u analyzes your preferred job role, location, shift preferences, and salary requirements, matching them against active verified job postings.",
  },
  {
    question: "Is Jobs4u free to use?",
    answer:
      "Yes! You can set up basic Jobs4u alerts for free on the Hirance mobile app or receive instant WhatsApp alerts.",
  },
];

export default function Jobs4uPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Jobs4u Matching Service",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "Automated AI job matching and personalized vacancy delivery.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Job Matching"
        title="Jobs4u Smart Matching"
        titleGradient="Never Miss a Relevant Vacancy"
        subtitle="Stop scrolling through thousands of unrelated listings. Jobs4u delivers verified vacancies tailored strictly to your career aspirations."
        features={[
          "Instant alert notifications on WhatsApp & app",
          "Filtered by salary, location, experience, and shift",
          "Direct 1-swipe application process",
          "Zero spam from unverified consultancies",
        ]}
        ctaLabel="Subscribe to Jobs4u Alerts"
        ctaHref="/free-job-alerts"
        faqs={faqs}
      />
    </>
  );
}
