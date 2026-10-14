import type { Metadata } from "next";
import { JobsByDepartmentContent } from "../../components/jobs/jobs-by-department-content";

export const metadata: Metadata = {
  title: "Jobs By Department in India | Hirance Directory",
  description:
    "Explore verified job openings across active hiring departments in India including IT & Software, Sales & BD, Marketing, Human Resources, Finance, Operations, Customer Support & more. Apply with zero forms on Hirance.",
  keywords: [
    "Jobs by Department India",
    "IT Jobs",
    "Software Engineering Jobs",
    "Sales and BD Jobs",
    "Marketing Jobs",
    "HR Jobs",
    "Finance Jobs",
    "Operations Jobs",
    "Hirance department job directory",
  ],
  alternates: {
    canonical: "https://hirance.com/jobs-by-department",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/jobs-by-department",
    title: "Jobs By Department in India | Hirance Directory",
    description:
      "Explore verified job openings across active hiring departments in India. Apply with zero forms on Hirance.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Jobs By Department Directory",
      },
    ],
  },
};

export default function JobsByDepartmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jobs By Department in India | Hirance Directory",
    url: "https://hirance.com/jobs-by-department",
    description:
      "Explore verified job openings across active hiring departments in India. Apply with zero forms on Hirance.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobsByDepartmentContent />
    </>
  );
}
