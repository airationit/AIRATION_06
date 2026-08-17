import type { Metadata } from "next";
import { parseJobSlug, generateJobSeoData, generateJobsJsonLd } from "@/lib/seo-engine";
import { getJobs, getJobById } from "@/lib/jobs-data";
import { JobsContent } from "@/components/jobs/jobs-content";
import { siteConfig } from "@/config/site";
import { POPULAR_JOB_ROLES, POPULAR_CITIES } from "@/config/jobs-taxonomy";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const topCities = POPULAR_CITIES.filter((c) => c.isPopular);
  const params: { slug: string }[] = [];

  // 1. Role in City combinations
  POPULAR_JOB_ROLES.slice(0, 10).forEach((role) => {
    topCities.slice(0, 6).forEach((city) => {
      params.push({ slug: `${role.slug}-in-${city.slug}` });
    });
  });

  // 2. Role-only routes
  POPULAR_JOB_ROLES.forEach((role) => {
    params.push({ slug: role.slug });
  });

  // 3. City-only routes
  POPULAR_CITIES.forEach((city) => {
    params.push({ slug: `jobs-in-${city.slug}` });
  });

  // 4. Remote roles
  POPULAR_JOB_ROLES.forEach((role) => {
    params.push({ slug: `remote-${role.slug}` });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if slug is UUID
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  if (isUuid) {
    const singleJob = await getJobById(slug);
    if (singleJob) {
      return {
        title: `${singleJob.title} at ${singleJob.company} (${singleJob.location}) | Hirance`,
        description: `Apply for ${singleJob.title} at ${singleJob.company} in ${singleJob.location}. Salary: ${singleJob.salaryRange}. Swipe to apply on Hirance.`,
      };
    }
  }

  const parsed = parseJobSlug(slug);

  const data = await getJobs({
    roleSlug: parsed.roleSlug,
    citySlug: parsed.citySlug,
    experienceSlug: parsed.experienceSlug,
  });

  const seo = generateJobSeoData(parsed, data.totalJobs);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: [
      seo.heading,
      parsed.roleLabel ? `${parsed.roleLabel} jobs` : "jobs in india",
      parsed.cityName ? `jobs in ${parsed.cityName}` : "remote jobs",
      "hirance hiring app",
      "swipe to apply",
    ],
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seo.canonicalUrl,
      title: seo.metaTitle,
      description: seo.metaDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default async function DynamicJobCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // If slug contains a UUID (e.g. direct job detail URL), redirect to clean /jobs/view/[slug]
  const hasUuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(slug);
  if (hasUuid) {
    redirect(`/jobs/view/${slug}`);
  }

  const parsed = parseJobSlug(slug);

  const data = await getJobs({
    roleSlug: parsed.roleSlug,
    citySlug: parsed.citySlug,
    experienceSlug: parsed.experienceSlug,
    limit: 12,
    page: 1,
  });

  const seo = generateJobSeoData(parsed, data.totalJobs);
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
        heading={seo.heading}
        subheading={seo.subheading}
        breadcrumbLabel={seo.breadcrumb}
        roleSlug={parsed.roleSlug}
        citySlug={parsed.citySlug}
        experienceSlug={parsed.experienceSlug}
      />
    </>
  );
}
