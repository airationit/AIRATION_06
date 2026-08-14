import { JOBS_SEO_TEMPLATES, SeoPatternKey } from "@/config/jobs-seo-templates";
import { POPULAR_JOB_ROLES, POPULAR_CITIES, EXPERIENCE_LEVELS } from "@/config/jobs-taxonomy";
import { siteConfig } from "@/config/site";

export interface ParsedJobSlug {
  pattern: SeoPatternKey;
  roleSlug?: string;
  roleLabel?: string;
  citySlug?: string;
  cityName?: string;
  experienceSlug?: string;
  experienceLabel?: string;
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
 * Supports patterns:
 * - {role}-jobs-in-{city} / {role}-in-{city}
 * - remote-{role}-jobs / remote-{role}
 * - freshers-jobs-in-{city} / freshers-in-{city}
 * - {experience}-{role}-jobs
 * - jobs-in-{city} / in-{city}
 * - {role}-jobs / {role}
 */
export function parseJobSlug(slug: string): ParsedJobSlug {
  const cleanSlug = slug.toLowerCase().replace(/-jobs$/, "").replace(/^jobs-in-/, "in-");

  // Check 1: remote-{role}
  if (cleanSlug.startsWith("remote-")) {
    const roleSlug = cleanSlug.replace(/^remote-/, "").replace(/-jobs$/, "");
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

  // Check 2: freshers-in-{city} or freshers-jobs-in-{city}
  const fresherMatch = cleanSlug.match(/^freshers(?:-jobs)?-in-(.+)$/);
  if (fresherMatch) {
    const citySlug = fresherMatch[1];
    const matchedCity = POPULAR_CITIES.find((c) => c.slug === citySlug);
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

  // Check 3: {role}-in-{city}
  const roleCityMatch = cleanSlug.match(/^(.+)-in-(.+)$/);
  if (roleCityMatch) {
    const maybeRole = roleCityMatch[1].replace(/-jobs$/, "");
    const maybeCity = roleCityMatch[2];

    // Check if the prefix is "jobs" (i.e. jobs-in-bangalore)
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

  // Check 4: {experience}-{role}
  for (const exp of EXPERIENCE_LEVELS) {
    if (cleanSlug.startsWith(exp.slug + "-")) {
      const roleSlug = cleanSlug.replace(exp.slug + "-", "").replace(/-jobs$/, "");
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

  // Check 5: Only City (e.g. "bangalore", "mumbai")
  const cityOnly = POPULAR_CITIES.find((c) => c.slug === cleanSlug || cleanSlug === `jobs-in-${c.slug}`);
  if (cityOnly) {
    return {
      pattern: "city",
      citySlug: cityOnly.slug,
      cityName: cityOnly.name,
      rawSlug: slug,
    };
  }

  // Check 6: Only Role (e.g. "react-developer", "ui-ux-designer")
  const roleOnly = POPULAR_JOB_ROLES.find((r) => r.slug === cleanSlug || cleanSlug === `${r.slug}-jobs`);
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
    roleSlug: cleanSlug,
    roleLabel: slugToTitleCase(cleanSlug),
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
 * Build JSON-LD Structured Data for Google (ItemList & BreadcrumbList)
 */
export function generateJobsJsonLd(
  seo: GeneratedJobSeo,
  jobs: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    postedDate: string;
  }>
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
          description: `Apply for ${job.title} at ${job.company} in ${job.location} on Hirance. Salary: ${job.salary}.`,
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
          employmentType: "FULL_TIME",
        },
      })),
    },
  ];
}
