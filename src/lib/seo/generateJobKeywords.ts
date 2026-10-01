import { Job } from "@/lib/jobs-data";

const MAX_KEYWORDS = 25;

/**
 * Generate 15-25 unique, lowercase, SEO-optimized keywords for a job posting.
 * Mixes English & Hinglish search intent patterns.
 */
export function generateJobKeywords(job: Job): string[] {
  const { title, company, cityName, location, experience, roleCategoryName, skills } = job;
  const city = cityName || location || "India";
  const t = title.toLowerCase();
  const c = city.toLowerCase();
  const co = company.toLowerCase();

  const raw: string[] = [
    // Core English keywords
    `${t} job`,
    `${t} jobs`,
    `${t} jobs in ${c}`,
    `${t} vacancy`,
    `${t} vacancy in ${c}`,
    `${t} job near me`,
    `${t} job opening`,
    `${t} hiring ${c}`,
    `${t} salary in ${c}`,
    `${co} careers`,
    `${co} hiring`,
    `${co} jobs`,
    `jobs in ${c}`,
    `${c} jobs today`,
    `${c} job vacancy`,

    // Experience-based
    experience?.toLowerCase().includes("fresher") || experience?.toLowerCase().includes("0-1")
      ? `${t} fresher jobs`
      : `${t} experienced jobs`,
    `${t} ${experience || "jobs"}`,

    // Category / department
    ...(roleCategoryName ? [`${roleCategoryName.toLowerCase()} jobs`, `${roleCategoryName.toLowerCase()} jobs in ${c}`] : []),

    // Hinglish patterns
    `${c} mein ${t} job`,
    `${t} ki naukri ${c}`,
    `${t} job kaise milegi`,
    `${c} job vacancy today`,
    `${t} bharti ${c}`,
    `private job ${c}`,
    `direct hiring ${c}`,
    "hirance jobs",
    "swipe to apply jobs",
    "zero form apply job",
  ];

  // Skill keywords — top 5
  if (skills && skills.length > 0) {
    skills.slice(0, 5).forEach((skill) => {
      const s = skill.toLowerCase();
      raw.push(`${s} jobs`);
      raw.push(`${s} jobs in ${c}`);
    });
  }

  // Deduplicate, filter empty strings, lowercase, cap at MAX_KEYWORDS
  const seen = new Set<string>();
  const result: string[] = [];
  for (const kw of raw) {
    const clean = kw.trim().toLowerCase();
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      result.push(clean);
      if (result.length >= MAX_KEYWORDS) break;
    }
  }

  return result;
}
