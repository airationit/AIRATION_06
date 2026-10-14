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
      const canonicalSlug = generateCompanySlug(company.company_name, company.id) || id;
      const title = `${company.company_name} - Careers, Jobs & Company Profile | Hirance`;
      const description = `Explore open jobs, culture, and career opportunities at ${company.company_name} on Hirance. Swipe to apply directly to recruiters.`;
      const canonicalUrl = `${siteConfig.url}/company/${canonicalSlug}`;

      return {
        title,
        description,
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          type: "website",
          title,
          description,
          url: canonicalUrl,
          siteName: siteConfig.name,
          images: company.company_logo ? [{ url: company.company_logo }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: company.company_logo ? [company.company_logo] : undefined,
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

  // 1. Fetch company details
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

  const initialCompany = compRes.data;
  const canonicalSlug = generateCompanySlug(initialCompany.company_name, initialCompany.id);

  // Enforce clean SEO URL with company name:
  // e.g. /company/989b7939-fd77-4e90-abf0-7463e3eddeb5 -> /company/iph-technologies-pvt-ltd-989b7939-fd77-4e90-abf0-7463e3eddeb5
  if (canonicalSlug && id !== canonicalSlug) {
    redirect(`/company/${canonicalSlug}`);
  }

  // 2. Fetch categories and jobs from backend using cleanId
  const [catRes, jobsRes] = await Promise.all([
    fetchCompanyCategories(cleanId),
    fetchCompanyJobsList(cleanId),
  ]);

  const initialCategories = catRes?.success && Array.isArray(catRes.data) ? catRes.data : [];
  const initialJobs =
    jobsRes?.success && Array.isArray(jobsRes.data)
      ? jobsRes.data.map((raw) => normalizeJobItem(raw))
      : [];

  const canonicalUrl = `${siteConfig.url}/company/${canonicalSlug}`;

  // Organization Schema for SEO
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: initialCompany.company_name,
    url: canonicalUrl,
    logo: initialCompany.company_logo || undefined,
    sameAs: [initialCompany.website_link, initialCompany.linkedin_link].filter(Boolean),
    address: initialCompany.address
      ? {
          "@type": "PostalAddress",
          streetAddress: initialCompany.address,
          addressLocality: initialCompany.city?.name || undefined,
          addressRegion: initialCompany.state?.name || undefined,
          addressCountry: "IN",
        }
      : undefined,
  };

  // BreadcrumbList Schema for SEO
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Top Companies",
        item: `${siteConfig.url}/companies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: initialCompany.company_name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CompanyContent
        companyId={cleanId}
        initialCompany={initialCompany}
        initialCategories={initialCategories}
        initialJobs={initialJobs}
      />
    </>
  );
}

