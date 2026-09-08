import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Recruiter Resume Display Service | Hirance",
  description:
    "Increase candidate visibility. Showcase your profile prominently in corporate recruiter candidate searches across top tech companies and enterprises.",
  alternates: {
    canonical: `${siteConfig.url}/services/resume-display`,
  },
  openGraph: {
    title: "Recruiter Resume Display Service | Hirance",
    description: "Promoted resume display for corporate recruiter searches.",
    url: `${siteConfig.url}/services/resume-display`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "How does Resume Display work?",
    answer:
      "Your candidate profile is promoted to the top of talent search results whenever corporate HRs query for candidates in your field, skills, and target location.",
  },
  {
    question: "Will recruiters contact me directly?",
    answer:
      "Yes! Recruiters can view your contact info, chat with you directly on Hirance, or send interview invites straight to your email.",
  },
];

export default function ResumeDisplayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Resume Display Service",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "Promoted candidate profile placement in recruiter resume search database.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Recruiter Attention"
        title="Resume Display Service"
        titleGradient="Get Sourced by HRs Automatically"
        subtitle="Let opportunities find you. Put your profile front and center when recruiters actively search for talent in your domain."
        features={[
          "Featured listing in corporate HR database searches",
          "Includes profile view analytics & recruiter interest alerts",
          "Direct recruiter chat & phone call enablement",
          "Ideal for passive and active job seekers alike",
        ]}
        ctaLabel="Promote My Profile"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
