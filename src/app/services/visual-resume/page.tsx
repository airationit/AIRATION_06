import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Visual Resume Design Service | Hirance",
  description:
    "Stand out in creative, design, marketing, and leadership roles with a high-impact, beautifully designed visual resume created by professional designers.",
  alternates: {
    canonical: `${siteConfig.url}/services/visual-resume`,
  },
  openGraph: {
    title: "Visual Resume Design Service | Hirance",
    description: "Modern graphical resume designed for creative & executive roles.",
    url: `${siteConfig.url}/services/visual-resume`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "Who should get a visual resume?",
    answer:
      "Visual resumes are ideal for designers, marketing managers, product leaders, UI/UX professionals, and senior executives who want to showcase portfolio highlights and key visual metrics.",
  },
  {
    question: "Do I get both visual and text versions?",
    answer:
      "Yes! Every visual resume package includes an ATS-friendly text version so you can apply to traditional portals as well as send direct emails to recruiters.",
  },
];

export default function VisualResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Visual Resume Design Service",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "High-impact graphical visual resume design for creative & executive professionals.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Design & Layout"
        title="Visual Resume Design"
        titleGradient="Make an Unforgettable Impression"
        subtitle="Transform your career history into a visual masterpiece with custom typography, infographics, and portfolio callouts designed for leadership and creative roles."
        features={[
          "Custom visual layout & infographic charts",
          "High-resolution PDF ready for print & web",
          "Includes complimentary ATS-text version",
          "Designed by senior creative specialists",
        ]}
        ctaLabel="Order Visual Resume"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
