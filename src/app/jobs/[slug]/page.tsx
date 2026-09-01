import type { Metadata } from "next";
import { parseJobSlug, generateJobSeoData, generateJobsJsonLd } from "@/lib/seo-engine";
import { getJobs, getJobById } from "@/lib/jobs-data";
import { JobsContent } from "@/components/jobs/jobs-content";
import { siteConfig } from "@/config/site";
import {
  fetchWorkModes,
  fetchJobTypes,
  fetchWorkShifts,
  fetchExperienceRanges,
  fetchJobRoles,
  fetchCities,
} from "@/lib/api/masterdata";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  try {
    // 1. Fetch 8 category preferences and taxonomies directly from API
    const [workModes, jobTypes, workShifts, expRanges, roles, cities] = await Promise.all([
      fetchWorkModes(),
      fetchJobTypes(),
      fetchWorkShifts(),
      fetchExperienceRanges(),
      fetchJobRoles(),
      fetchCities(),
    ]);

    // Dynamic 8 Category preference slugs from API
    workModes.forEach((mode) => {
      const name = mode.name.toLowerCase();
      if (name.includes("office") || name.includes("onsite")) {
        params.push({ slug: "work-from-office-jobs" });
      } else if (name.includes("field")) {
        params.push({ slug: "field-jobs" });
      } else if (name.includes("home") || name.includes("remote")) {
        params.push({ slug: "work-from-home-jobs" });
      } else {
        params.push({ slug: `${mode.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-jobs` });
      }
    });

    jobTypes.forEach((type) => {
      const name = type.name.toLowerCase();
      if (name === "full time") {
        params.push({ slug: "full-time-jobs" });
      } else if (name === "part time") {
        params.push({ slug: "part-time-jobs" });
      } else if (!name.includes("both")) {
        params.push({ slug: `${type.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-jobs` });
      }
    });

    workShifts.forEach((shift) => {
      const name = shift.name.toLowerCase();
      if (name.includes("day")) {
        params.push({ slug: "day-shift-jobs" });
      } else if (name.includes("night")) {
        params.push({ slug: "night-shift-jobs" });
      } else if (name.includes("hybrid")) {
        params.push({ slug: "hybrid-jobs" });
      } else {
        params.push({ slug: `${shift.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-jobs` });
      }
    });

    if (expRanges.some((e) => e.min_experience === 0 || e.label.toLowerCase().includes("fresher"))) {
      params.push({ slug: "freshers-jobs" });
    }

    // 2. Dynamic Role in City combinations from API
    const popularRoles = roles.slice(0, 10);
    const popularCities = cities.slice(0, 6);
    popularRoles.forEach((role) => {
      const roleSlug = role.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      popularCities.forEach((city) => {
        const citySlug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        params.push({ slug: `${roleSlug}-in-${citySlug}` });
      });
    });

    // 3. Dynamic Role-only routes from API
    roles.forEach((role) => {
      params.push({ slug: role.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") });
    });

    // 4. Dynamic City-only routes from API
    cities.forEach((city) => {
      params.push({ slug: `jobs-in-${city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` });
    });

    // 5. Dynamic Remote roles from API
    popularRoles.forEach((role) => {
      params.push({ slug: `remote-${role.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` });
    });
  } catch (error) {
    console.error("generateStaticParams API fetch error:", error);
  }

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
    workMode: parsed.workModeSlug,
    jobType: parsed.jobTypeSlug,
    workShift: parsed.workShiftSlug,
    search: parsed.searchKeyword,
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
    workMode: parsed.workModeSlug,
    jobType: parsed.jobTypeSlug,
    workShift: parsed.workShiftSlug,
    search: parsed.searchKeyword,
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
        workModeSlug={parsed.workModeSlug}
        jobTypeSlug={parsed.jobTypeSlug}
        workShiftSlug={parsed.workShiftSlug}
        initialSearch={parsed.searchKeyword}
      />
    </>
  );
}
