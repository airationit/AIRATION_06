import React, { cache } from "react";
import type { Metadata } from "next";
import {
  fetchCompanyById,
  fetchCompanyCategories,
  fetchCompanyJobsList,
} from "@/lib/api/companies";
import { normalizeJobItem } from "@/lib/jobs-data";
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

  // 1. Fetch company details first to know exact backend host (api.hirance.com vs prod.hirance.com)
  const compRes = await getCachedCompany(id);
  const source = compRes?.source;

  // 2. Fetch categories and jobs targeted strictly to that backend
  const [catRes, jobsRes] = await Promise.all([
    fetchCompanyCategories(id, source),
    fetchCompanyJobsList(id, undefined, source),
  ]);

  const initialCompany = compRes?.success && compRes.data ? compRes.data : null;
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
      initialSource={source}
    />
  );
}
