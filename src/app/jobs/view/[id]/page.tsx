import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobById, getRelatedJobs } from "@/lib/jobs-data";
import { generateSingleJobJsonLd } from "@/lib/seo-engine";
import { siteConfig } from "@/config/site";
import { stripHtml } from "@/lib/html-utils";
import { JobDetailContent } from "@/components/jobs/job-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return {
      title: "Job Not Found | Hirance",
      description: "The requested job opening could not be found on Hirance.",
    };
  }

  const cleanDesc = stripHtml(job.description);
  const snippetDesc = cleanDesc
    ? cleanDesc.slice(0, 155) + (cleanDesc.length > 155 ? "..." : "")
    : `Apply for ${job.title} at ${job.company} in ${job.location}. Salary: ${job.salaryRange}. View role details and apply directly on Hirance.`;

  const title = `${job.title} at ${job.company} (${job.location}) | Hirance`;
  const canonicalUrl = `${siteConfig.url}/jobs/view/${job.slug}`;

  return {
    title,
    description: snippetDesc,
    keywords: [
      job.title,
      job.company,
      `${job.title} jobs`,
      `jobs in ${job.location}`,
      job.cityName ? `jobs in ${job.cityName}` : "jobs in india",
      ...(job.skills || []),
      "hirance hiring app",
      "direct hiring",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description: snippetDesc,
      siteName: "Hirance",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${job.title} at ${job.company}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: snippetDesc,
      images: ["/og.png"],
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  // Fetch related openings for the sidebar
  const relatedJobs = await getRelatedJobs(job, 3);
  const jsonLd = generateSingleJobJsonLd(job);

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
