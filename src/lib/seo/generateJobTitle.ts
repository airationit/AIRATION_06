import { Job } from "@/lib/jobs-data";
import { pickByHash } from "./hash";
import { siteConfig } from "@/config/site";

const SITE = siteConfig.name; // "Hirance"

/** Trim a string to maxLen without cutting a word in half */
function smartTrim(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  const trimmed = str.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  return lastSpace > maxLen * 0.7 ? trimmed.slice(0, lastSpace) : trimmed;
}

interface TitleTemplate {
  id: string;
  /** Return null if required fields are missing */
  build: (job: Job) => string | null;
}

const TITLE_TEMPLATES: TitleTemplate[] = [
  {
    id: "t1",
    build: ({ title, cityName, company }) =>
      `${title} Job in ${cityName || "India"} at ${company} | Apply Now`,
  },
  {
    id: "t2",
    build: ({ company, title, cityName }) =>
      `${company} is Hiring ${title} in ${cityName || "India"} – Apply Online`,
  },
  {
    id: "t3",
    build: ({ title, cityName, company }) =>
      `${title} Vacancy in ${cityName || "India"} | ${company} Careers`,
  },
  {
    id: "t4",
    build: ({ title, company, cityName }) =>
      `Apply for ${title} at ${company}, ${cityName || "India"}`,
  },
  {
    id: "t5",
    build: ({ title, cityName, experience, company }) =>
      `${title} Jobs in ${cityName || "India"} – ${experience} | ${company}`,
  },
  {
    id: "t6",
    build: ({ title, cityName, company }) =>
      `Urgent Hiring: ${title} in ${cityName || "India"} | ${company}`,
  },
  {
    id: "t7",
    build: ({ cityName, title, company }) =>
      cityName && cityName !== "India"
        ? `${cityName} mein ${title} ki Naukri – ${company} | Apply Now`
        : null,
  },
  {
    id: "t8",
    build: ({ title, cityName, salaryRange, company }) => {
      if (!salaryRange || salaryRange === "Competitive Salary") return null;
      return `${title} Job in ${cityName || "India"} – Salary ${salaryRange} | ${company}`;
    },
  },
  {
    id: "t9",
    build: ({ title, company, jobType }) =>
      `${title} (${jobType}) – ${company} | ${SITE} Jobs`,
  },
  {
    id: "t10",
    build: ({ title, company, cityName, experience }) =>
      `${company} Hiring ${title} – ${experience} | ${cityName || "India"}`,
  },
];

const MAX_TITLE = 60;

/**
 * Generate a deterministic, varied SEO title for a job.
 * The same job always gets the same title template (hash-based).
 */
export function generateJobTitle(job: Job): string {
  // Filter templates that can produce a result for this job's fields
  const valid = TITLE_TEMPLATES.filter((t) => t.build(job) !== null);
  if (valid.length === 0) {
    return smartTrim(`${job.title} at ${job.company} | ${SITE}`, MAX_TITLE);
  }

  // Pick template deterministically by job id
  const chosen = pickByHash(valid, job.id);
  const raw = chosen.build(job)!;
  return smartTrim(raw, MAX_TITLE);
}
