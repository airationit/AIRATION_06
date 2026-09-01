import type { Metadata } from "next";
import { Suspense } from "react";
import { FeedbackContent } from "@/components/feedback/feedback-content";

export const metadata: Metadata = {
  title: "Candidate & Employer Reviews | Hirance - What Users Say",
  description:
    "Read verified reviews and feedback from job seekers and employers using Hirance—India's swipe-based hiring platform. Discover how fast hiring happens.",
  keywords: [
    "Hirance reviews",
    "Hirance user feedback",
    "candidate reviews Hirance",
    "employer feedback Hirance",
    "swipe hiring app reviews",
    "Hirance job seeker experience",
    "startup hiring platform reviews",
  ],
  alternates: {
    canonical: "https://hirance.com/feedback",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/feedback",
    title: "Candidate & Employer Reviews | Hirance",
    description:
      "Read verified user feedback and success stories from candidates and employers hiring on Hirance.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance User Feedback & Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candidate & Employer Reviews | Hirance",
    description:
      "Swipe. Match. Get Hired. Verified feedback from job seekers and employers.",
  },
};

export default function FeedbackPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: "Hirance User Reviews & Feedback",
    url: "https://hirance.com/feedback",
    description:
      "Verified reviews and feedback from candidates and employers using Hirance swipe-based hiring platform.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/og.png",
      slogan: "Swipe. Match. Get Hired.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "840",
      reviewCount: "840",
    },
  };

  return (
    <>
      {/* SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flex min-h-dvh items-center justify-center bg-background">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        }
      >
        <FeedbackContent />
      </Suspense>
    </>
  );
}
