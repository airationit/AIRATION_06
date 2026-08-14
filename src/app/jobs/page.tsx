import type { Metadata } from "next";
import { getJobs } from "@/lib/jobs-data";
import { generateJobSeoData, generateJobsJsonLd } from "@/lib/seo-engine";
import { JobsContent } from "@/components/jobs/jobs-content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Search Jobs & Career Opportunities in India (2026) | Hirance",
  description:
    "Explore 1,000+ verified job openings in tech, sales, design, and operations on Hirance. Swipe right to apply, get instant AI fit scores, and chat directly with employers.",
  keywords: [
    "jobs in india",
    "hirance jobs",
    "swipe to apply jobs",
    "software engineer jobs",
    "remote jobs india",
    "fresher jobs 2026",
    "sales jobs",
  ],
  alternates: {
    canonical: `${siteConfig.url}/jobs`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/jobs`,
    title: "Search Jobs & Career Opportunities | Hirance",
    description:
      "Explore verified job vacancies across top tech companies & startups in India. Swipe to apply with AI match score.",
    siteName: "Hirance",
  },
};

export default async function JobsPage() {
  const data = await getJobs({ limit: 12 });
  const seo = generateJobSeoData(
    {
      pattern: "default",
      rawSlug: "",
    },
    data.totalJobs
  );

  const jsonLd = generateJobsJsonLd(seo, data.jobs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobsContent
        initialJobs={data.jobs}
        totalJobs={data.totalJobs}
        heading="Find Your Next Career Move"
        subheading="Search verified job openings across India's fastest-growing startups and enterprises. Apply with one swipe."
        breadcrumbLabel="All Jobs"
      />
    </>
  );
}
