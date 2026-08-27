import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/how-it-works/how-it-works-content";

export const metadata: Metadata = {
title: "How Hirance Works | Swipe to Apply, Post Jobs in 60 Seconds | Hirance",

description: "See how Hirance works: candidates swipe right to apply instantly with AI Match Scores, and employers post jobs in under 60 seconds with pre-filtered candidates. No forms, no resume uploads, no waiting.",

keywords: [
  "Hirance how it works",
  "how does swipe hiring work",
  "swipe based hiring platform",
  "India swipe job app",
  "AI job match score",
  "Smart Score job matching",
  "post jobs in 60 seconds",
  "post a job online free India",
  "fast job application",
  "pre-filtered candidates",
  "hire candidates fast",
  "apply for jobs without resume",
  "apply jobs without form filling",
  "job app India free",
  "best job app for freshers",
  "swipe to apply jobs",
  "Tinder style job app India",
  "AI recruitment platform India",
  "1 click interview scheduling",
  "bulk candidate shortlisting",
],
  alternates: {
    canonical: "https://hirance.com/how-it-works",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/how-it-works",
    title: "How It Works | Hirance - India's 1st Swipe-Based Hiring Platform",
    description:
      "Discover how hiring works on Hirance. Fast, transparent, and form-free hiring for candidates and employers.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance How It Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Hirance - India's 1st Swipe-Based Hiring Platform",
    description:
      "From instant swipe applications to 60-second job postings—see how hiring happens on Hirance.",
  },
};

export default function HowItWorksPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "How It Works | Hirance",
      url: "https://hirance.com/how-it-works",
      description:
        "Hirance is India's 1st swipe-based hiring platform connecting candidates and employers with AI match scores.",
      publisher: {
        "@type": "Organization",
        name: "Hirance",
        url: "https://hirance.com",
      },
      mainEntity: {
        "@type": "HowTo",
        name: "How to use Hirance swipe-based hiring platform",
        description:
          "Learn how candidates swipe right to apply for jobs and how employers post jobs in under 1 minute.",
        step: [
          {
            "@type": "HowToStep",
            name: "Swipe to Apply",
            text: "Candidates inspect AI match score on job cards and swipe right to apply instantly without filling forms or re-uploading resumes.",
          },
          {
            "@type": "HowToStep",
            name: "Post Jobs in 60 Seconds",
            text: "Employers generate AI job descriptions with one click and set filters before posting.",
          },
          {
            "@type": "HowToStep",
            name: "Instant Match & Scheduling",
            text: "Employers receive pre-filtered candidates with AI match scores and schedule interviews in one click.",
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Hirance's swipe-based hiring work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Candidates swipe right to apply for jobs and left to pass. Every job card shows an AI Match Score so candidates can apply to 10+ relevant jobs in under 60 seconds with zero form-filling.",
          },
        },
        {
          "@type": "Question",
          name: "What is the AI Match Score and how does it help me?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The AI Match Score calculates how closely a candidate's skills and experience fit a job opening (e.g., 94% Fit Score). This helps job seekers apply with confidence and helps employers instantly spot top candidates.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can employers post a job on Hirance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers can post a job in under 60 seconds. With 1-click AI job description generation, you don't need to type lengthy descriptions manually.",
          },
        },
        {
          "@type": "Question",
          name: "Is Hirance free for job candidates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Hirance is 100% free for candidates. You can build your profile once, swipe, and apply to unlimited jobs without any hidden charges or resume fees.",
          },
        },
        {
          "@type": "Question",
          name: "How does Hirance pre-filter candidates for employers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers select key criteria—such as location, experience level, and core skills—before publishing. Hirance automatically filters out non-matching profiles, so employers only review qualified applicants.",
          },
        },
        {
          "@type": "Question",
          name: "Do candidates need to upload a new resume for every application?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No! You set up your profile once on the Hirance app. When you swipe right, your verified profile and details are sent directly to the recruiter.",
          },
        },
        {
          "@type": "Question",
          name: "How does 1-click interview scheduling work on Hirance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers can select shortlisted candidates and trigger interview calendar invites directly from the dashboard in a single click, eliminating long email back-and-forths.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after I swipe right and apply for a job on Hirance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The candidate's application is instantly sent to the employer's dashboard along with their AI Match Score. If the employer approves, both parties get connected immediately.",
          },
        },
        {
          "@type": "Question",
          name: "Can recruiters send bulk status updates to applicants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Employers can send respectful status updates or bulk rejection notifications with one click, ensuring candidates are never left guessing about their status.",
          },
        },
        {
          "@type": "Question",
          name: "Where can candidates and employers get started on Hirance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Candidates can download the free Hirance mobile app on the Google Play Store. Employers can register and post jobs directly on hirance.com in under a minute.",
          },
        },
        {
          "@type": "Question",
          name: "Is Hirance a safe and legit hiring platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Hirance is a genuine, India-based hiring platform. Candidate profiles and contact details are only shared with verified employers after a candidate explicitly swipes right to apply.",
          },
        },
        {
          "@type": "Question",
          name: "How is Hirance different from traditional job portals like Naukri or Apna?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike traditional job portals that require long forms and manual scrolling, Hirance uses a swipe-based interface with instant AI Match Scores, letting candidates apply to multiple jobs in seconds.",
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
      <HowItWorksContent />
    </>
  );
}
