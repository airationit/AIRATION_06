import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About Us | Hirance - India's 1st Swipe-Based Hiring Platform",
  description:
    "Hirance is India's 1st swipe-based hiring platform. Swipe. Match. Get Hired. Post jobs in under 1 minute & apply instantly with zero forms, zero scrolling, and zero waiting.",
  keywords: [
    "Hirance about us",
    "India swipe job app",
    "swipe based hiring platform",
    "Smart Score job match",
    "post jobs under 1 minute",
    "fast job application",
    "pre-filtered candidates",
    "fastest hiring app in India",
    "hire candidates fast",
    "Hirance company",
    "who is Hirance",
    "is Hirance legit",
    "is Hirance safe",
    "Hirance startup India",
    "Hirance mission",
    "Tinder for jobs India",
    "best job app in India 2026",
  ],
  alternates: {
    canonical: "https://hirance.com/about-us",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/about-us",
    title: "About Us | Hirance - India's 1st Swipe-Based Hiring Platform",
    description:
      "Hirance is India's 1st swipe-based hiring platform built to solve recruitment speed for candidates and employers.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "About Us - Hirance - India's 1st Swipe-Based Hiring Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Hirance - India's 1st Swipe-Based Hiring Platform",
    description:
      "Swipe. Match. Get Hired. Fastest way to Post & Apply for jobs with real-time Smart Scores.",
  },
};

export default function AboutUsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Us | Hirance",
      url: "https://hirance.com/about-us",
      description:
        "Hirance is India's 1st swipe-based hiring platform, built to solve recruitment speed with real-time Smart Scores, 60-second job postings, and zero forms.",
      publisher: {
        "@type": "Organization",
        name: "Hirance",
        url: "https://hirance.com",
        logo: "https://hirance.com/og.png",
        slogan: "Swipe. Match. Get Hired.",
        description:
          "India's 1st swipe-based hiring platform connecting candidates and employers faster.",
      },
      mainEntity: {
        "@type": "Organization",
        name: "Hirance",
        url: "https://hirance.com",
        sameAs: [
          "https://play.google.com/store/apps/details?id=com.hirance",
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Hirance and what is its mission?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirance is India's 1st swipe-based hiring platform. Our mission is to make hiring instant, transparent, and form-free for job seekers and recruiters across India.",
          },
        },
        {
          "@type": "Question",
          name: "Why was Hirance created?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We built Hirance to eliminate recruitment friction—long job application forms, endless scrolling, resume re-uploads, and candidate ghosting.",
          },
        },
        {
          "@type": "Question",
          name: "What does 'Swipe. Match. Get Hired.' mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Candidates swipe right on jobs to apply instantly and left to pass. An AI Smart Score calculates profile fit in real-time, making job search fast and effortless.",
          },
        },
        {
          "@type": "Question",
          name: "How is Hirance different from traditional job portals?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirance replaces 10-page application forms with single swipes, allows employers to post jobs in under 60 seconds, and delivers pre-filtered candidates instantly.",
          },
        },
        {
          "@type": "Question",
          name: "Is Hirance an Indian platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Hirance is proudly built in India to empower job seekers and companies with fast, modern recruitment technology.",
          },
        },
        {
          "@type": "Question",
          name: "Who can use Hirance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirance is built for both candidates looking for tech, sales, marketing, operations, and business roles, and employers ranging from startups to growing enterprises.",
          },
        },
        {
          "@type": "Question",
          name: "Is Hirance completely free for job seekers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Job seekers can download the Hirance app, create a profile once, and swipe to apply to unlimited jobs without paying anything.",
          },
        },
        {
          "@type": "Question",
          name: "How does Hirance help recruiters hire faster?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "With 1-click AI job description generation and pre-filtered candidate matching, recruiters cut hiring timelines from weeks to just days.",
          },
        },
        {
          "@type": "Question",
          name: "How does Hirance protect user privacy and profile data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hirance uses bank-grade security protocols. Candidate profiles and contact details are only shared with verified hiring managers when a candidate swipes right.",
          },
        },
        {
          "@type": "Question",
          name: "How can candidates and employers get started?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Candidates can download the free Hirance mobile app on Google Play. Employers can register and post jobs directly on hirance.com in under 60 seconds.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {/* SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
