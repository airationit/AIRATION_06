import type { Metadata } from "next";
import { getJobs } from "@/lib/jobs-data";
import { generateJobSeoData, generateJobsJsonLd } from "@/lib/seo-engine";
import { JobsContent } from "@/components/jobs/jobs-content";
import { faqs } from "@/components/jobs/jobs-faq-data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Search Jobs & Career Opportunities in India (2026) | Hirance",
  description:
    "Explore verified job openings in tech, sales, design, and operations on Hirance. Swipe right to apply, get instant AI fit scores, and chat directly with employers.",
  keywords: [
    "jobs in india",
    "hirance jobs",
    "swipe to apply jobs",
    "software engineer jobs",
    "remote jobs india",
    "fresher jobs 2026",
    "sales jobs",
    "work from home jobs",
    "part time jobs",
    "top hiring companies india",
    "apply jobs online",
    "verified employer jobs",
    "full stack developer jobs",
    "react developer jobs",
    "python developer jobs",
    "telecaller jobs",
    "hr jobs in india",
    "data analyst jobs",
    "ui ux designer jobs",
    "digital marketing jobs",
    "finance and accounting jobs",
    "startup hiring india",
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
      "Explore verified job vacancies across top tech companies & startups in India. Swipe to apply directly on Hirance.",
    siteName: "Hirance",
  },
};

interface JobsPageProps {
  searchParams?: Promise<{
    keyword?: string;
    search?: string;
    workMode?: string;
    jobType?: string;
    shift?: string;
    city?: string;
    role?: string;
    filter?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const keyword = resolvedParams.keyword || resolvedParams.search || "";
  const workModeSlug = resolvedParams.workMode;
  const jobTypeSlug = resolvedParams.jobType;
  const workShiftSlug = resolvedParams.shift;
  const citySlug = resolvedParams.city || "all";
  const roleSlug = resolvedParams.role;

  const data = await getJobs({
    limit: 12,
    page: 1,
    search: keyword || undefined,
    workMode: workModeSlug,
    jobType: jobTypeSlug,
    workShift: workShiftSlug,
    citySlug: citySlug !== "all" ? citySlug : undefined,
    roleSlug,
  });

  const seo = generateJobSeoData(
    {
      pattern: "default",
      rawSlug: "",
    },
    data.totalJobs
  );

  const jsonLd = generateJobsJsonLd(seo, data.jobs);

  // Generated from the same `faqs` array rendered in the UI accordion — single source of truth
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <JobsContent
        initialJobs={data.jobs}
        totalJobs={data.totalJobs}
        heading={keyword ? `Jobs matching "${keyword}"` : "Find Your Next Career Move"}
        subheading={keyword ? "Explore verified openings matching your search criteria." : "Search verified job openings across India's fastest-growing startups and enterprises. Apply with one swipe."}
        breadcrumbLabel={keyword || "All Jobs"}
        initialSearch={keyword}
        workModeSlug={workModeSlug}
        jobTypeSlug={jobTypeSlug}
        workShiftSlug={workShiftSlug}
        citySlug={citySlug}
        roleSlug={roleSlug}
      />
    </>
  );
}
