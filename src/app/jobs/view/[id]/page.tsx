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
  
  console.log('[JobDetailPage] Rendering page for ID:', id);

  // Reuses the already-fetched (cached) job — zero extra API call
  const job = await getCachedJob(id);
  
  console.log('[JobDetailPage] Job data:', job ? `Found: ${job.title}` : 'Not found');

  if (!job) {
    console.error('[JobDetailPage] Job not found, returning 404 for ID:', id);
    
    // In development, show more helpful error
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
          <div className="max-w-2xl rounded-lg border border-red-200 bg-red-50 p-6 dark:bg-red-950/20">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Job Not Found (404)</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Could not fetch job data from API for ID: <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">{id}</code>
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-semibold">Possible reasons:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Job ID does not exist in the backend database</li>
                <li>Job has been deleted or expired</li>
                <li>API endpoint is not responding correctly</li>
                <li>Network connectivity issue</li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Check your terminal for detailed logs:</p>
              <code className="block rounded bg-gray-100 p-3 text-xs dark:bg-gray-800 overflow-x-auto">
                [getJobById] and [fetchJobDetail] logs
              </code>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="/jobs" className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
                View All Jobs
              </a>
              <a 
                href={`https://api.hirance.com/api/v1/jobs/${id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Test API Directly
              </a>
            </div>
          </div>
        </div>
      );
    }
    
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
