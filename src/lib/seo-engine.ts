import { JOBS_SEO_TEMPLATES, SeoPatternKey } from "@/config/jobs-seo-templates";
import { POPULAR_JOB_ROLES, POPULAR_CITIES, EXPERIENCE_LEVELS } from "@/config/jobs-taxonomy";
import { siteConfig } from "@/config/site";
import { normalizeCitySlug } from "./city-normalizer";
import { Job } from "./jobs-data";

export interface ParsedJobSlug {
  pattern: SeoPatternKey;
  roleSlug?: string;
  roleLabel?: string;
  citySlug?: string;
  cityName?: string;
  experienceSlug?: string;
  experienceLabel?: string;
  workModeSlug?: string;
  workModeLabel?: string;
  jobTypeSlug?: string;
  jobTypeLabel?: string;
  workShiftSlug?: string;
  workShiftLabel?: string;
  searchKeyword?: string;
  companyName?: string;
  isRemote?: boolean;
  rawSlug: string;
}

export interface GeneratedJobSeo {
  pattern: SeoPatternKey;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  breadcrumb: string;
  canonicalUrl: string;
  vars: {
    role?: string;
    city?: string;
    experience?: string;
    company?: string;
    count: number;
    year: string;
  };
}

/**
 * Utility to convert kebab-case to Title Case (e.g. "software-engineer" -> "Software Engineer")
 */
export function slugToTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Parse dynamic URL slugs for Hirance programmatic job routes
 */
export function parseJobSlug(slug: string): ParsedJobSlug {
  const lowerSlug = slug.toLowerCase().trim();

  // Check 1: Explicit "jobs-in-{city}" or "in-{city}" pattern
  const cityInMatch = lowerSlug.match(/^(?:jobs-in-|in-)(.+)$/);
  if (cityInMatch) {
    const cityPart = cityInMatch[1].replace(/-jobs$/, "");
    const normalizedCitySlug = normalizeCitySlug(cityPart);

    if (normalizedCitySlug === "remote") {
      return {
        pattern: "remote-role",
        citySlug: "remote",
        cityName: "Remote",
        isRemote: true,
        rawSlug: slug,
      };
    }
    const matchedCity = POPULAR_CITIES.find(
      (c) =>
        c.slug === normalizedCitySlug ||
        c.slug === cityPart ||
        c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cityPart ||
        c.name.toLowerCase() === cityPart
    );
    return {
      pattern: "city",
      citySlug: matchedCity ? matchedCity.slug : normalizedCitySlug,
      cityName: matchedCity ? matchedCity.name : slugToTitleCase(normalizedCitySlug),
      rawSlug: slug,
    };
  }

  // Check 2: "remote-{role}"
  if (lowerSlug.startsWith("remote-")) {
    const roleSlug = lowerSlug.replace(/^remote-/, "").replace(/-jobs$/, "");
    if (roleSlug === "" || roleSlug === "jobs") {
      return {
        pattern: "city",
        citySlug: "remote",
        cityName: "Remote",
        isRemote: true,
        rawSlug: slug,
      };
    }
    const matchedRole = POPULAR_JOB_ROLES.find((r) => r.slug === roleSlug);
    const roleLabel = matchedRole ? matchedRole.label : slugToTitleCase(roleSlug);
    return {
      pattern: "remote-role",
      roleSlug,
      roleLabel,
      citySlug: "remote",
      cityName: "Remote",
      isRemote: true,
      rawSlug: slug,
    };
  }

  // Check 3: "freshers-in-{city}" or "freshers-jobs-in-{city}"
  const fresherMatch = lowerSlug.match(/^freshers(?:-jobs)?-in-(.+)$/);
  if (fresherMatch) {
    const citySlug = fresherMatch[1].replace(/-jobs$/, "");
    const matchedCity = POPULAR_CITIES.find(
      (c) => c.slug === citySlug || c.name.toLowerCase() === citySlug
    );
    const cityName = matchedCity ? matchedCity.name : slugToTitleCase(citySlug);
    return {
      pattern: "freshers-city",
      experienceSlug: "freshers",
      experienceLabel: "Fresher",
      citySlug,
      cityName,
      rawSlug: slug,
    };
  }

  // Check 4: "{role}-in-{city}"
  const roleCityMatch = lowerSlug.match(/^(.+)-in-(.+)$/);
  if (roleCityMatch) {
    const maybeRole = roleCityMatch[1].replace(/-jobs$/, "");
    const maybeCity = roleCityMatch[2].replace(/-jobs$/, "");

    if (maybeRole === "jobs" || maybeRole === "in") {
      const matchedCity = POPULAR_CITIES.find((c) => c.slug === maybeCity);
      return {
        pattern: "city",
        citySlug: maybeCity,
        cityName: matchedCity ? matchedCity.name : slugToTitleCase(maybeCity),
        rawSlug: slug,
      };
    }

    const matchedRole = POPULAR_JOB_ROLES.find((r) => r.slug === maybeRole);
    const matchedCity = POPULAR_CITIES.find((c) => c.slug === maybeCity);

    return {
      pattern: "role-city",
      roleSlug: maybeRole,
      roleLabel: matchedRole ? matchedRole.label : slugToTitleCase(maybeRole),
      citySlug: maybeCity,
      cityName: matchedCity ? matchedCity.name : slugToTitleCase(maybeCity),
      rawSlug: slug,
    };
  }

  // Check 5: "{experience}-{role}"
  for (const exp of EXPERIENCE_LEVELS) {
    if (lowerSlug.startsWith(exp.slug + "-")) {
      const roleSlug = lowerSlug.replace(exp.slug + "-", "").replace(/-jobs$/, "");
      const matchedRole = POPULAR_JOB_ROLES.find((r) => r.slug === roleSlug);
      return {
        pattern: "experience-role",
        experienceSlug: exp.slug,
        experienceLabel: exp.label,
        roleSlug,
        roleLabel: matchedRole ? matchedRole.label : slugToTitleCase(roleSlug),
        rawSlug: slug,
      };
    }
  }

  // Check 6: Special Category Slugs (Work from Office, Field, Work from Home, Full-time, Part-time, Shifts, Freshers)
  if (
    lowerSlug === "work-from-office-jobs" ||
    lowerSlug === "work-from-office" ||
    lowerSlug === "office-jobs" ||
    lowerSlug === "in-office-jobs"
  ) {
    return {
      pattern: "work-from-office",
      workModeSlug: "585ed3ae-c9eb-4f89-a715-33544efa1c07",
      workModeLabel: "Work from Office",
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "field-jobs" ||
    lowerSlug === "field-job" ||
    lowerSlug === "field-work-jobs"
  ) {
    return {
      pattern: "field-jobs",
      workModeSlug: "8c974af2-6d8b-49c8-b891-0a5ce9847024",
      workModeLabel: "Field Job",
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "work-from-home-jobs" ||
    lowerSlug === "work-from-home" ||
    lowerSlug === "wfh-jobs" ||
    lowerSlug === "remote-jobs" ||
    lowerSlug === "remote"
  ) {
    return {
      pattern: "work-from-home",
      workModeSlug: "bf5f80ba-b651-47c0-be52-9978569789d7",
      workModeLabel: "Work from Home",
      citySlug: "remote",
      cityName: "Remote",
      isRemote: true,
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "full-time-jobs" ||
    lowerSlug === "full-time" ||
    lowerSlug === "fulltime-jobs"
  ) {
    return {
      pattern: "full-time",
      jobTypeSlug: "c2e13590-f69f-4bd4-9545-09cf81daae9e",
      jobTypeLabel: "Full Time",
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "part-time-jobs" ||
    lowerSlug === "part-time" ||
    lowerSlug === "parttime-jobs"
  ) {
    return {
      pattern: "part-time",
      jobTypeSlug: "fdde7c2d-88e6-4ecf-9fb5-596ca7f81c69",
      jobTypeLabel: "Part Time",
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "day-shift-jobs" ||
    lowerSlug === "day-shift" ||
    lowerSlug === "day-jobs"
  ) {
    return {
      pattern: "day-shift",
      workShiftSlug: "f7d70b0b-57c0-4014-8002-7d170de4c299",
      workShiftLabel: "Day Shift",
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "night-shift-jobs" ||
    lowerSlug === "night-shift" ||
    lowerSlug === "night-jobs"
  ) {
    return {
      pattern: "night-shift",
      workShiftSlug: "6e9a009a-35af-4bfe-baa9-a77b56ca443b",
      workShiftLabel: "Night Shift",
      rawSlug: slug,
    };
  }

  if (
    lowerSlug === "hybrid-jobs" ||
    lowerSlug === "hybrid" ||
    lowerSlug === "hybrid-shift-jobs" ||
    lowerSlug === "hybrid-shift"
  ) {
    return {
      pattern: "hybrid",
      workShiftSlug: "8a5eafb2-daef-4246-9e58-5331a2c94dcd",
      workShiftLabel: "Hybrid",
      rawSlug: slug,
    };
  }

  if (lowerSlug === "freshers-jobs" || lowerSlug === "freshers") {
    return {
      pattern: "freshers-city",
      experienceSlug: "freshers",
      experienceLabel: "Freshers & Entry Level",
      rawSlug: slug,
    };
  }

  if (lowerSlug === "free-to-apply-jobs" || lowerSlug === "free-jobs") {
    return {
      pattern: "role",
      roleSlug: "free-to-apply",
      roleLabel: "Verified & Free to Apply",
      rawSlug: slug,
    };
  }

  if (lowerSlug === "internship-jobs" || lowerSlug === "internships") {
    return {
      pattern: "role",
      roleSlug: "internship",
      roleLabel: "Internships with Stipend",
      rawSlug: slug,
    };
  }

  // Check 7: Standalone City (e.g. "bangalore", "mumbai", "pune")
  const cityOnly = POPULAR_CITIES.find(
    (c) =>
      c.slug === lowerSlug ||
      c.name.toLowerCase() === lowerSlug ||
      lowerSlug === `jobs-in-${c.slug}` ||
      lowerSlug === `${c.slug}-jobs`
  );
  if (cityOnly) {
    return {
      pattern: "city",
      citySlug: cityOnly.slug,
      cityName: cityOnly.name,
      rawSlug: slug,
    };
  }

  // Check 7: Standalone Role (e.g. "react-developer", "ui-ux-designer")
  const cleanRoleSlug = lowerSlug.replace(/-jobs$/, "");
  const roleOnly = POPULAR_JOB_ROLES.find(
    (r) => r.slug === cleanRoleSlug || r.slug === lowerSlug
  );
  if (roleOnly) {
    return {
      pattern: "role",
      roleSlug: roleOnly.slug,
      roleLabel: roleOnly.label,
      rawSlug: slug,
    };
  }

  // Fallback generic role / slug
  return {
    pattern: "role",
    roleSlug: cleanRoleSlug,
    roleLabel: slugToTitleCase(cleanRoleSlug),
    rawSlug: slug,
  };
}

/**
 * Generate complete SEO tags & headings for any slug + live count
 */
export function generateJobSeoData(
  parsed: ParsedJobSlug,
  totalJobsCount: number = 35
): GeneratedJobSeo {
  const template = JOBS_SEO_TEMPLATES[parsed.pattern] || JOBS_SEO_TEMPLATES["default"];
  const currentYear = new Date().getFullYear().toString();

  const role = parsed.roleLabel || "Career";
  const city = parsed.cityName || "India";
  const experience = parsed.experienceLabel || "Entry Level";
  const company = parsed.companyName || "Top Companies";
  const count = totalJobsCount > 0 ? totalJobsCount : 25;

  const replaceTags = (text: string): string => {
    return text
      .replace(/{role}/g, role)
      .replace(/{city}/g, city)
      .replace(/{experience}/g, experience)
      .replace(/{company}/g, company)
      .replace(/{count}/g, count.toString())
      .replace(/{year}/g, currentYear);
  };

  const canonicalUrl = `${siteConfig.url}/jobs/${parsed.rawSlug}`;

  return {
    pattern: parsed.pattern,
    metaTitle: replaceTags(template.title),
    metaDescription: replaceTags(template.description),
    heading: replaceTags(template.heading),
    subheading: replaceTags(template.subheading),
    breadcrumb: replaceTags(template.breadcrumb),
    canonicalUrl,
    vars: {
      role,
      city,
      experience,
      company,
      count,
      year: currentYear,
    },
  };
}

/**
 * Build JSON-LD Structured Data for Job Directory (ItemList & BreadcrumbList)
 */
export function generateJobsJsonLd(
  seo: GeneratedJobSeo,
  jobs: Job[]
) {
  return [
    {
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
          name: "Jobs",
          item: `${siteConfig.url}/jobs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: seo.breadcrumb,
          item: seo.canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: seo.heading,
      description: seo.metaDescription,
      numberOfItems: jobs.length,
      itemListElement: jobs.map((job, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "JobPosting",
          title: job.title,
          description: `Apply for ${job.title} at ${job.company} in ${job.location} on Hirance. Salary: ${job.salaryRange || "Competitive"}.`,
          hiringOrganization: {
            "@type": "Organization",
            name: job.company,
            sameAs: siteConfig.url,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location,
              addressCountry: "IN",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: {
              "@type": "QuantitativeValue",
              unitText: "YEAR",
            },
          },
          datePosted: job.postedDate || "2026-08-01",
          employmentType: job.jobType === "Full-Time" ? "FULL_TIME" : "OTHER",
        },
      })),
    },
  ];
}

import { stripHtml } from "./html-utils";

/**
 * Build Schema.org JobPosting and BreadcrumbList for a Single Job Detail Page
 */
export function generateSingleJobJsonLd(job: Job) {
  const cleanDescription =
    stripHtml(job.description) ||
    `Apply for ${job.title} at ${job.company} in ${job.location}. Salary: ${job.salaryRange || "Competitive"}. View role details and swipe to apply directly on Hirance.`;

  return [
    {
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
          name: "Jobs",
          item: `${siteConfig.url}/jobs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: job.title,
          item: `${siteConfig.url}/jobs/view/${job.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: cleanDescription,
      datePosted: job.postedDate || new Date().toISOString(),
      validThrough: job.applicationDeadline || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      employmentType:
        job.jobType?.toLowerCase().includes("full")
          ? "FULL_TIME"
          : job.jobType?.toLowerCase().includes("part")
          ? "PART_TIME"
          : job.jobType?.toLowerCase().includes("intern")
          ? "INTERN"
          : "OTHER",
      hiringOrganization: {
        "@type": "Organization",
        name: job.company,
        sameAs: siteConfig.url,
        logo: job.companyLogo || undefined,
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
        value: {
          "@type": "QuantitativeValue",
          value: job.salaryRange,
          unitText: job.salaryRange.includes("/ mo") ? "MONTH" : "YEAR",
        },
      },
    },
  ];
}

