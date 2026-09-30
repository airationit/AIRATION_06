import { Job } from "@/lib/jobs-data";
import { stripHtml } from "@/lib/html-utils";
import { siteConfig } from "@/config/site";

const BASE_URL = siteConfig.url;

/**
 * Convert jobType string to schema.org employmentType enum value
 */
function toEmploymentType(jobType?: string): string {
  const t = (jobType || "").toLowerCase();
  if (t.includes("full")) return "FULL_TIME";
  if (t.includes("part")) return "PART_TIME";
  if (t.includes("intern")) return "INTERN";
  if (t.includes("contract") || t.includes("freelance")) return "CONTRACTOR";
  return "OTHER";
}

/**
 * Build a schema.org JobPosting + BreadcrumbList JSON-LD array for a single job.
 */
export function buildJobJsonLd(job: Job): object[] {
  const cleanDescription =
    stripHtml(job.description) ||
    `Apply for ${job.title} at ${job.company} in ${job.location}. Salary: ${job.salaryRange || "Competitive"}. View role details and apply directly on Hirance.`;

  const canonicalUrl = `${BASE_URL}/jobs/view/${job.slug}`;

  // validThrough: applicationDeadline or 60 days from now
  const validThrough =
    job.applicationDeadline ||
    new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

  const baseSalaryValue: Record<string, unknown> = {
    "@type": "QuantitativeValue",
    unitText: job.salaryRange?.includes("/ mo") ? "MONTH" : "YEAR",
  };

  if (job.salaryMin) baseSalaryValue.minValue = job.salaryMin;
  if (job.salaryMax) baseSalaryValue.maxValue = job.salaryMax;
  if (!job.salaryMin && !job.salaryMax) baseSalaryValue.value = job.salaryRange;

  const jobPosting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: cleanDescription,
    datePosted: job.postedDate || new Date().toISOString(),
    validThrough,
    employmentType: toEmploymentType(job.jobType),
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: BASE_URL,
      ...(job.companyLogo ? { logo: job.companyLogo } : {}),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.cityName || job.location,
        addressRegion: job.stateName || "India",
        addressCountry: "IN",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: baseSalaryValue,
    },
    url: canonicalUrl,
  };

  // Add skills if available
  if (job.skills && job.skills.length > 0) {
    jobPosting.skills = job.skills.join(", ");
  }

  // Add education requirement if available
  if (job.educationLevel) {
    jobPosting.educationRequirements = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: job.educationLevel,
    };
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Jobs",
        item: `${BASE_URL}/jobs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: canonicalUrl,
      },
    ],
  };

  return [breadcrumb, jobPosting];
}
