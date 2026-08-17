import type { Metadata } from "next";
import { parseJobSlug, generateJobSeoData, generateJobsJsonLd } from "@/lib/seo-engine";
import { getJobs } from "@/lib/jobs-data";
import { JobsContent } from "@/components/jobs/jobs-content";
import { siteConfig } from "@/config/site";

import { POPULAR_JOB_ROLES, POPULAR_CITIES } from "@/config/jobs-taxonomy";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Allows any other dynamic slug combination to be rendered on-demand & cached
export const dynamicParams = true;

export async function generateStaticParams() {
  const topCities = POPULAR_CITIES.filter((c) => c.isPopular);
  const params: { slug: string }[] = [];

  // 1. Role in City combinations (e.g. react-developer-in-bangalore)
  POPULAR_JOB_ROLES.forEach((role) => {
    topCities.forEach((city) => {
      params.push({ slug: `${role.slug}-in-${city.slug}` });
    });
  });

  // 2. Role-only routes (e.g. react-developer)
  POPULAR_JOB_ROLES.forEach((role) => {
    params.push({ slug: role.slug });
  });

  // 3. City-only routes (e.g. jobs-in-bangalore)
  POPULAR_CITIES.forEach((city) => {
    params.push({ slug: `jobs-in-${city.slug}` });
  });

  // 4. Remote roles (e.g. remote-frontend-developer)
  POPULAR_JOB_ROLES.forEach((role) => {
    params.push({ slug: `remote-${role.slug}` });
  });

  // 5. Fresher routes by city (e.g. freshers-jobs-in-pune)
  topCities.forEach((city) => {
    params.push({ slug: `freshers-jobs-in-${city.slug}` });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
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
  const parsed = parseJobSlug(slug);

  const data = await getJobs({
    roleSlug: parsed.roleSlug,
    citySlug: parsed.citySlug,
    experienceSlug: parsed.experienceSlug,
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
