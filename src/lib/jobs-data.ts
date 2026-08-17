import { fetchJobs as apiFetchJobs, fetchJobDetail as apiFetchJobDetail } from "@/lib/api/jobs";
import { JobListItem, JobDetail, JobSearchParams } from "@/types/jobs";

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string | null;
  location: string;
  cityId?: string;
  cityName?: string;
  citySlug: string;
  stateId?: string;
  stateName?: string;
  jobRoleId?: string;
  roleName?: string;
  roleSlug: string;
  roleCategoryId?: string;
  roleCategoryName?: string;
  jobTypeId?: string;
  jobType: string;
  workModeId?: string;
  workMode?: string;
  workShiftId?: string;
  workShift?: string;
  experienceId?: string;
  experience: string;
  experienceSlug: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryRange: string;
  openings?: number;
  isFree?: boolean;
  skills: string[];
  requiredSkills?: { id: string; name: string }[];
  matchScore: number;
  postedDate: string;
  isVerified: boolean;
  canApply?: boolean;
  viewsCount?: number;
  applicationsCount?: number;
  description?: string;
  responsibilities?: string;
  educationLevel?: string;
  educationSpecialization?: string;
  englishProficiency?: string;
  isWalkIn?: boolean;
  applicationDeadline?: string;
  department?: string;
}

export interface JobsQueryResponse {
  jobs: Job[];
  totalJobs: number;
  page: number;
  totalPages: number;
  activeFilters: {
    role?: string;
    city?: string;
    jobType?: string;
    experience?: string;
  };
}

/**
 * Format salary into clean Indian currency strings
 */
export function formatSalary(
  min?: number | string | null,
  max?: number | string | null,
  currency?: { code?: string } | null
): string {
  const currSymbol = currency?.code === "USD" ? "$" : "₹";
  const numMin = min ? Math.round(Number(min)) : 0;
  const numMax = max ? Math.round(Number(max)) : 0;

  if (!numMin && !numMax) return "Competitive Salary";

  const isMonthly = (numMin > 0 && numMin < 150000) || (numMax > 0 && numMax < 150000);
  const period = isMonthly ? "/ mo" : "/ yr";

  const formatSingle = (val: number) => {
    if (isMonthly) {
      if (val >= 1000) {
        return `${currSymbol}${Math.round(val / 1000)}k`;
      }
      return `${currSymbol}${val.toLocaleString("en-IN")}`;
    }
    if (val >= 100000) {
      const inLakhs = (val / 100000).toFixed(val % 100000 === 0 ? 0 : 1);
      return `${currSymbol}${inLakhs}L`;
    }
    return `${currSymbol}${val.toLocaleString("en-IN")}`;
  };

  if (numMin && numMax) {
    return `${formatSingle(numMin)} - ${formatSingle(numMax)} ${period}`;
  }
  if (numMin) return `From ${formatSingle(numMin)} ${period}`;
  return `Up to ${formatSingle(numMax)} ${period}`;
}

/**
 * Clean noisy backend skill labels like "Communication | Soft Skill" -> "Communication"
 */
export function cleanSkillName(name: string): string {
  if (!name) return "";
  return name.replace(/\s*\|\s*.*$/g, "").trim();
}

/**
 * Helper to extract UUID from a SEO slug string
 */
export function extractJobId(slugOrId: string): string {
  if (!slugOrId) return "";
  const match = slugOrId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return match ? match[0] : slugOrId;
}

/**
 * Generate a clean, keyword-rich SEO slug for a job posting
 */
export function generateJobSlug(title: string, company: string, city: string, id: string): string {
  const cleanStr = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const parts = [cleanStr(title), cleanStr(company), cleanStr(city)].filter(Boolean);
  const prefix = parts.join("-");
  return prefix ? `${prefix}-${id}` : id;
}

import { normalizeCitySlug } from "./city-normalizer";

/**
 * Helper to extract a clean City Name & City Slug from location data
 */
function resolveCityFromLocation(cityNameRaw?: string, locationRaw?: string): { cityName: string; citySlug: string } {
  let cityName = cityNameRaw?.trim() || "";
  const locationStr = locationRaw?.trim() || "";

  if (!cityName && locationStr) {
    const locLower = locationStr.toLowerCase();
    if (locLower.includes("bengaluru") || locLower.includes("bangalore")) {
      cityName = "Bengaluru";
    } else if (locLower.includes("mumbai") || locLower.includes("bombay")) {
      cityName = "Mumbai";
    } else if (locLower.includes("delhi") || locLower.includes("ncr") || locLower.includes("noida") || locLower.includes("gurgaon") || locLower.includes("gurugram")) {
      cityName = "Delhi NCR";
    } else if (locLower.includes("hyderabad")) {
      cityName = "Hyderabad";
    } else if (locLower.includes("pune")) {
      cityName = "Pune";
    } else if (locLower.includes("chennai")) {
      cityName = "Chennai";
    } else if (locLower.includes("kolkata")) {
      cityName = "Kolkata";
    } else if (locLower.includes("ahmedabad")) {
      cityName = "Ahmedabad";
    } else if (locLower.includes("jaipur")) {
      cityName = "Jaipur";
    } else if (locLower.includes("remote") || locLower.includes("wfh")) {
      cityName = "Remote";
    } else {
      const parts = locationStr.split(",").map((p) => p.trim());
      cityName = parts.length > 1 ? parts[parts.length - 1] : locationStr;
    }
  }

  const rawSlug = (cityName || "india")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const citySlug = normalizeCitySlug(rawSlug);

  return { cityName: cityName || "India", citySlug };
}

/**
 * Normalize backend JobListItem or JobDetail into a clean, uniform UI Job model
 * Strictly maps fields specified in jobs_browse.md
 */
export function normalizeJobItem(raw: JobListItem | JobDetail): Job {
  const { cityName, citySlug } = resolveCityFromLocation(raw.city?.name, raw.location);
  const stateName = typeof raw.state === "object" ? raw.state?.name : "";
  const locationStr = raw.location?.trim()
    ? raw.location
    : cityName && stateName && cityName !== stateName
    ? `${cityName}, ${stateName}`
    : cityName || stateName || "India";

  const roleName = raw.job_role?.name || raw.title;
  const roleSlug = roleName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const rawSkills = [
    ...(raw.required_skills?.map((s) => s.name) || []),
    ...(raw.custom_skills || []),
  ].filter(Boolean);

  const cleanedSkills = Array.from(
    new Set(rawSkills.map(cleanSkillName).filter(Boolean))
  );

  // Experience level resolution
  const expObj = raw.experience_level as { id?: string; label?: string; name?: string } | null;
  const expLabel = expObj?.label || expObj?.name || "1-3 yrs";
  let expSlug = "mid-level";
  const expLower = expLabel.toLowerCase();
  if (expLower.includes("0-1") || expLower.includes("0-2") || expLower.includes("fresher") || expLower.includes("entry")) {
    expSlug = "freshers";
  } else if (expLower.includes("1-3") || expLower.includes("2-5") || expLower.includes("mid")) {
    expSlug = "mid-level";
  } else if (expLower.includes("5+") || expLower.includes("senior") || expLower.includes("lead")) {
    expSlug = "senior-level";
  }

  const matchScore =
    raw.compatibility_score ??
    (raw.match_threshold ? Math.min(98, Math.max(82, 85 + raw.match_threshold * 5)) : 94);

  // Generate SEO-friendly slug
  const seoSlug = generateJobSlug(raw.title, raw.company_name, cityName || locationStr, raw.id);

  return {
    id: raw.id,
    slug: seoSlug,
    title: raw.title,
    company: raw.company_name,
    companyLogo: raw.company_logo,
    location: locationStr,
    cityId: raw.city?.id,
    cityName: cityName || "India",
    citySlug,
    stateId: raw.state?.id,
    stateName: stateName || undefined,
    jobRoleId: raw.job_role?.id,
    roleName,
    roleSlug,
    roleCategoryId: raw.role_category?.id,
    roleCategoryName: raw.role_category?.name,
    jobTypeId: raw.job_type?.id,
    jobType: raw.job_type?.name || "Full Time",
    workModeId: raw.work_mode?.id,
    workMode: raw.work_mode?.name || "Work from Office",
    workShiftId: raw.work_shift?.id,
    workShift: raw.work_shift?.name,
    experienceId: expObj?.id,
    experience: expLabel,
    experienceSlug: expSlug,
    salaryMin: raw.salary_min != null ? Number(raw.salary_min) : undefined,
    salaryMax: raw.salary_max != null ? Number(raw.salary_max) : undefined,
    salaryRange: formatSalary(raw.salary_min, raw.salary_max, raw.currency),
    openings: raw.number_of_openings || 1,
    isFree: raw.is_free_for_candidates,
    skills: cleanedSkills.length > 0 ? cleanedSkills : ["Communication", "Problem Solving"],
    requiredSkills: raw.required_skills || [],
    matchScore,
    postedDate: raw.published_at || raw.created_at || new Date().toISOString(),
    isVerified: true,
    canApply: raw.can_apply,
    viewsCount: raw.views_count,
    applicationsCount: raw.applications_count,
    description: "description" in raw ? raw.description : undefined,
    responsibilities: "responsibilities" in raw ? raw.responsibilities : undefined,
    educationLevel: raw.education_level
      ? typeof raw.education_level === "object"
        ? raw.education_level.name
        : String(raw.education_level)
      : undefined,
    educationSpecialization: "education_specialization" in raw ? raw.education_specialization || undefined : undefined,
    englishProficiency: "english_proficiency" in raw ? raw.english_proficiency || undefined : undefined,
    isWalkIn: "is_walk_in" in raw ? Boolean(raw.is_walk_in) : false,
    applicationDeadline: "application_deadline" in raw ? raw.application_deadline || undefined : undefined,
    department: raw.role_category?.name || raw.job_role?.name || undefined,
  };
}

/**
 * Public Job fetching adapter querying the live Hirance API directly
 */
export async function getJobs(params: {
  roleSlug?: string;
  roleId?: string;
  citySlug?: string;
  cityId?: string;
  stateId?: string;
  experienceSlug?: string;
  experienceId?: string;
  jobType?: string;
  jobTypeId?: string;
  workMode?: string;
  workModeId?: string;
  workShiftId?: string;
  salaryRangeId?: string;
  skills?: string;
  isFreeForCandidates?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  ordering?: JobSearchParams["ordering"];
}): Promise<JobsQueryResponse> {
  const page = params.page || 1;
  const limit = params.limit || 12;

  try {
    const searchTerms = [
      params.search,
      params.roleSlug ? params.roleSlug.replace(/-/g, " ") : undefined,
      params.citySlug && params.citySlug !== "all" && !params.cityId
        ? params.citySlug.replace(/-/g, " ")
        : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    const apiParams: JobSearchParams = {
      page,
      page_size: limit,
      job_role: params.roleId || undefined,
      city: params.cityId || undefined,
      state: params.stateId || undefined,
      job_type: params.jobTypeId || undefined,
      work_mode: params.workModeId || undefined,
      work_shift: params.workShiftId || undefined,
      experience_level: params.experienceId || undefined,
      salary_range: params.salaryRangeId || undefined,
      skills: params.skills || undefined,
      is_free_for_candidates: params.isFreeForCandidates || undefined,
      search: searchTerms || undefined,
      ordering:
        params.ordering && params.ordering !== "relevance"
          ? params.ordering
          : searchTerms
          ? "relevance"
          : "-published_at",
    };

    const response = await apiFetchJobs(apiParams, { revalidate: 60 });

    if (response && response.success && Array.isArray(response.data)) {
      const normalizedJobs = response.data.map(normalizeJobItem);
      const totalCount = response.pagination?.count ?? normalizedJobs.length;
      const totalPages =
        response.pagination?.total_pages ?? Math.max(1, Math.ceil(totalCount / limit));

      return {
        jobs: normalizedJobs,
        totalJobs: totalCount,
        page: response.pagination?.current_page ?? page,
        totalPages,
        activeFilters: {
          role: params.roleSlug,
          city: params.citySlug,
          jobType: params.jobType,
          experience: params.experienceSlug,
        },
      };
    }
  } catch (error) {
    console.error("Live jobs API error:", error);
  }

  return {
    jobs: [],
    totalJobs: 0,
    page: 1,
    totalPages: 1,
    activeFilters: {
      role: params.roleSlug,
      city: params.citySlug,
      jobType: params.jobType,
      experience: params.experienceSlug,
    },
  };
}

/**
 * Fetch a single job detail by ID or Slug strictly from live API
 */
export async function getJobById(slugOrId: string): Promise<Job | null> {
  const cleanId = extractJobId(slugOrId);
  if (!cleanId) return null;

  try {
    const detail = await apiFetchJobDetail(cleanId, { revalidate: 120 });
    if (detail) {
      return normalizeJobItem(detail);
    }
  } catch (error) {
    console.error(`getJobById error for ${cleanId}:`, error);
  }

  return null;
}

/**
 * Fetch 2-3 related jobs by role or city to show in the sidebar
 */
export async function getRelatedJobs(currentJob: Job, limit: number = 3): Promise<Job[]> {
  try {
    const res = await getJobs({
      roleId: currentJob.jobRoleId,
      cityId: currentJob.cityId,
      limit: limit + 2,
    });

    const filtered = res.jobs.filter((j) => j.id !== currentJob.id);
    if (filtered.length >= limit) {
      return filtered.slice(0, limit);
    }

    // Fallback by city
    const fallbackRes = await getJobs({
      citySlug: currentJob.citySlug,
      limit: limit + 2,
    });

    const combined = [
      ...filtered,
      ...fallbackRes.jobs.filter((j) => j.id !== currentJob.id && !filtered.some((f) => f.id === j.id)),
    ];

    return combined.slice(0, limit);
  } catch (error) {
    console.error("getRelatedJobs error:", error);
    return [];
  }
}

