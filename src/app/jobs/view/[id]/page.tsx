import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getJobById, getRelatedJobs } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";
import { JobDetailContent } from "@/components/jobs/job-detail-content";
import { generateJobTitle } from "@/lib/seo/generateJobTitle";
import { generateJobDescription } from "@/lib/seo/generateJobDescription";
import { generateJobKeywords } from "@/lib/seo/generateJobKeywords";
import { buildJobJsonLd } from "@/lib/seo/buildJobJsonLd";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Deduplicate the API call between generateMetadata() and the page component.
 * React cache() ensures this function is only executed once per request,
 * even when called from both generateMetadata and the default export.
 */
const getCachedJob = cache(async (id: string) => {
  return await getJobById(id);
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getCachedJob(id);

  const BASE_URL = siteConfig.url;

  if (!job) {
    return {
      title: "Job Not Found | Hirance",
      description: "The requested job opening could not be found on Hirance.",
      robots: { index: false, follow: true },
    };
  }

  // Check if job is expired — noindex expired/closed jobs
  const isExpired =
    job.applicationDeadline && new Date(job.applicationDeadline) < new Date();

  const title = generateJobTitle(job);
  const description = generateJobDescription(job);
  const keywords = generateJobKeywords(job);

  // Always use the clean slug canonical — no query params
  const canonicalUrl = `${BASE_URL}/jobs/view/${job.slug}`;

  // Dynamic OG image is served by opengraph-image.tsx in this route segment
  // Also provide explicit absolute URL for platforms that need it
  const ogImageUrl = `${BASE_URL}/jobs/view/${id}/opengraph-image`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: isExpired
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${job.title} at ${job.company} – Apply on Hirance`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Reuses the already-fetched (cached) job — zero extra API call
  const job = await getCachedJob(id);

  if (!job) {
    notFound();
  }

  // Fetch related openings for the sidebar
  const relatedJobs = await getRelatedJobs(job, 6);

  // Enhanced JSON-LD: JobPosting + BreadcrumbList
  const jsonLd = buildJobJsonLd(job);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobDetailContent job={job} relatedJobs={relatedJobs} />
    </>
  );
}
