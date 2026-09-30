import { Job } from "@/lib/jobs-data";
import { stripHtml } from "@/lib/html-utils";
import { pickByHash } from "./hash";
import { siteConfig } from "@/config/site";

const SITE = siteConfig.name;
const MIN_DESC = 140;
const MAX_DESC = 160;

/** Trim description cleanly to 140-160 chars without cutting a word */
function trimDesc(str: string): string {
  const clean = str.replace(/\s+/g, " ").trim();
  if (clean.length <= MAX_DESC) return clean;
  const cut = clean.slice(0, MAX_DESC);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > MIN_DESC ? cut.slice(0, lastSpace) : cut.slice(0, MAX_DESC);
  return trimmed.endsWith(".") ? trimmed : trimmed + ".";
}

interface DescTemplate {
  id: string;
  build: (job: Job, cleanDesc: string) => string | null;
}

const DESC_TEMPLATES: DescTemplate[] = [
  {
    id: "d1",
    build: ({ title, company, cityName, salaryRange, experience }) =>
      `Looking for a ${title} job in ${cityName || "India"}? ${company} is hiring with ${experience} experience. Salary: ${salaryRange}. Apply instantly on ${SITE} — no forms, just swipe.`,
  },
  {
    id: "d2",
    build: ({ title, company, cityName, jobType }, cleanDesc) => {
      const snippet = cleanDesc ? cleanDesc.slice(0, 80).trim() : "";
      return `${company} is hiring ${title} (${jobType}) in ${cityName || "India"}. ${snippet ? snippet + "..." : `Direct hiring, no middlemen.`} Apply now on ${SITE}.`;
    },
  },
  {
    id: "d3",
    build: ({ title, company, cityName, experience, salaryRange }) =>
      `${title} vacancy at ${company}, ${cityName || "India"}. Required: ${experience}. Salary: ${salaryRange}. Connect directly with the employer — apply on ${SITE} app today.`,
  },
  {
    id: "d4",
    build: ({ title, company, cityName, salaryRange }) => {
      if (!salaryRange || salaryRange === "Competitive Salary") return null;
      return `${title} job in ${cityName || "India"} at ${company} paying ${salaryRange}. Skip the queue — swipe to apply on ${SITE} and get recruiter response within hours.`;
    },
  },
  {
    id: "d5",
    build: ({ title, company, cityName, experience }) =>
      `${cityName || "India"} mein ${title} ki naukri — ${company} direct hire kar raha hai. ${experience} experience chahiye. ${SITE} app pe swipe karke apply karein abhi.`,
  },
  {
    id: "d6",
    build: ({ title, company, cityName, skills }) => {
      const skillSnippet = skills?.slice(0, 3).join(", ") || "relevant skills";
      return `${company} seeks a ${title} in ${cityName || "India"} with expertise in ${skillSnippet}. No long forms — get hired faster with ${SITE}. Apply directly now.`;
    },
  },
];

/**
 * Generate a deterministic 140-160 char meta description for a job.
 */
export function generateJobDescription(job: Job): string {
  const cleanDesc = stripHtml(job.description);

  const valid = DESC_TEMPLATES.filter((t) => t.build(job, cleanDesc) !== null);
  if (valid.length === 0) {
    const fallback = `Apply for ${job.title} at ${job.company} in ${job.location}. Salary: ${job.salaryRange}. ${job.experience} experience. Hire faster on ${SITE}.`;
    return trimDesc(fallback);
  }

  const chosen = pickByHash(valid, job.id + "_desc");
  const raw = chosen.build(job, cleanDesc)!;
  return trimDesc(raw);
}
