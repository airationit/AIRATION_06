import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ServicePageLayout } from "@/components/services/service-page-layout";

export const metadata: Metadata = {
  title: "Candidate Subscription Plans | Hirance",
  description:
    "Explore Basic & Premium candidate monthly subscription plans on Hirance. Unlock unlimited swipe applications, recruiter direct chat, and priority matching.",
  alternates: {
    canonical: `${siteConfig.url}/services/subscription-plans`,
  },
  openGraph: {
    title: "Candidate Subscription Plans | Hirance",
    description: "Basic & Premium monthly subscription plans for job seekers.",
    url: `${siteConfig.url}/services/subscription-plans`,
    siteName: siteConfig.name,
  },
};

const faqs = [
  {
    question: "What is included in the Premium Candidate Plan?",
    answer:
      "Premium includes priority applicant badge, unlimited direct recruiter chats, priority resume display, and AI application match scoring.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can pause or cancel your subscription anytime with one click in the Hirance app settings.",
  },
];

export default function SubscriptionPlansPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hirance Candidate Subscription Plans",
    provider: { "@type": "Organization", name: "Hirance" },
    description: "Monthly basic and premium plans for candidate career growth.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        badge="Monthly Subscriptions"
        title="Basic & Premium Plans"
        titleGradient="Supercharge Your Hiring Success"
        subtitle="Choose a flexible monthly plan to unlock direct HR chat messaging, application tracking, and priority candidate badges."
        features={[
          "Unlimited swipe applications on mobile & web",
          "Direct recruiter messaging & WhatsApp connect",
          "Includes free monthly resume score checks",
          "Transparent pricing with zero hidden fees",
        ]}
        ctaLabel="View Subscription Plans"
        ctaHref="/contact"
        faqs={faqs}
      />
    </>
  );
}
