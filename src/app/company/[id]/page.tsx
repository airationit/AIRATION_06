import React, { cache } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  fetchCompanyById,
  fetchCompanyCategories,
  fetchCompanyJobsList,
  extractCompanyId,
  generateCompanySlug,
} from "@/lib/api/companies";
import { fetchJobDetail } from "@/lib/api/jobs";
import { normalizeJobItem, generateJobSlug } from "@/lib/jobs-data";
import { siteConfig } from "@/config/site";
import CompanyContent from "./CompanyContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Deduplicate server fetch between generateMetadata and CompanyPage.
 * React cache() ensures this runs only once per request.
 */
const getCachedCompany = cache(async (id: string) => {
  return await fetchCompanyById(id);
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const cleanId = extractCompanyId(id);
  try {
    const res = await getCachedCompany(id);
    if (res?.data?.company_name) {
      const company = res.data;
      const title = `${company.company_name} - Careers, Jobs & Company Profile | Hirance`;
      const description = `Explore open jobs, culture, and career opportunities at ${company.company_name} on Hirance.`;
      return {
        title,
        description,
        alternates: {
          canonical: `${siteConfig.url}/company/${id}`,
        },
        openGraph: {
          title,
          description,
          url: `${siteConfig.url}/company/${id}`,
          siteName: siteConfig.name,
          images: company.company_logo ? [{ url: company.company_logo }] : undefined,
        },
      };
    }

    const job = await fetchJobDetail(cleanId);
    if (job?.company_name) {
      return {
        title: `${job.company_name} - Jobs & Careers | Hirance`,
        description: `Explore jobs and career opportunities at ${job.company_name} on Hirance.`,
      };
    }
  } catch {
    // fallback
  }

  return {
    title: "Company Profile | Hirance",
    description: "View verified company details, culture, and active job openings on Hirance.",
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params;
  const cleanId = extractCompanyId(id);

  // 1. Fetch company details from api.hirance.com
  const compRes = await getCachedCompany(id);

  // Logical redirection: If company is not found by ID or slug, resolve logically
  if (!compRes?.success || !compRes?.data) {
    // A. Check if the ID belongs to a job posting
    const job = await fetchJobDetail(cleanId);
    if (job) {
      const jobSlug = generateJobSlug(
        job.title,
        job.company_name,
        job.city?.name || job.state?.name || "India",
        job.id
      );
      redirect(`/jobs/view/${jobSlug}`);
    }

    // B. Check if name can be extracted from slug (e.g. "aara-global-...")
    const potentialName = id
      .replace(cleanId, "")
      .replace(/[-_]+/g, " ")
      .trim();

    if (potentialName && potentialName.length > 2) {
      redirect(`/jobs?search=${encodeURIComponent(potentialName)}`);
    }

    // C. Default safe redirection to companies directory
    redirect("/companies");
  }

  // 2. Fetch categories and jobs from api.hirance.com
  const [catRes, jobsRes] = await Promise.all([
    fetchCompanyCategories(id),
    fetchCompanyJobsList(id),
  ]);

  const initialCompany = compRes.data;
  const initialCategories = catRes?.success && Array.isArray(catRes.data) ? catRes.data : [];
  const initialJobs =
    jobsRes?.success && Array.isArray(jobsRes.data)
      ? jobsRes.data.map((raw) => normalizeJobItem(raw))
      : [];

  return (
    <CompanyContent
      companyId={id}
      initialCompany={initialCompany}
      initialCategories={initialCategories}
      initialJobs={initialJobs}
    />
  );
}

