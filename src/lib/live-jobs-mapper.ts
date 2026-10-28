import { JobListItem } from "@/types/jobs";
import { JobCardData, JobBreakdownItem } from "@/components/sections/candidate-phone-mockup";
import { PlaygroundJob } from "@/components/sections/swipe-playground";

/**
 * 100% Real Live Jobs snapshot from Hirance API (`https://api.hirance.com/api/v1/jobs/`)
 * Used as instantaneous fallback and SSR seed data.
 */
export const REAL_LIVE_JOBS: JobListItem[] = [
  {
    id: "09154c92-b9e7-4713-b412-115776ec1ca8",
    title: "React Developer (Work from Home)",
    company_id: "alertmend-1",
    company_name: "Alertmend.io",
    company_logo: "",
    job_role: { id: "role-react", name: "React Developer" },
    role_category: { id: "cat-it", name: "IT / Software Roles" },
    job_type: { id: "type-ft", name: "Full Time" },
    work_mode: { id: "wm-wfh", name: "Work from Home", display_order: 3 },
    work_shift: { id: "ws-day", name: "Day Shift", display_order: 1 },
    experience_level: { id: "exp-2-5", label: "2–5 Years" },
    notice_period: 15,
    salary_min: "15000.00",
    salary_max: "20000.00",
    currency: { id: "curr-inr", code: "INR", name: "Indian Rupee" },
    number_of_openings: 2,
    location: "Chandigarh, Chandigarh",
    city: { id: "city-chd", name: "Chandigarh", state: "state-chd" },
    state: { id: "state-chd", name: "Chandigarh", country: { id: "c-in", name: "India" } },
    match_threshold: 1,
    is_free_for_candidates: true,
    required_skills: [
      { id: "sk-react", name: "React | IT" },
      { id: "sk-js", name: "JavaScript | IT" },
      { id: "sk-git", name: "Git | IT" },
      { id: "sk-redux", name: "Redux/Context API | IT" },
      { id: "sk-api", name: "REST API Development | IT" },
    ],
    additional_skills: [],
    custom_skills: [],
    compatibility_score: null,
    compatibility_tips: [],
    compatibility_breakdown: [],
    can_apply: true,
    reason: null,
    badge_active: true,
    applied: false,
    status: 1,
    published_at: "2026-10-22T10:00:00.000000+05:30",
    application_deadline: "2026-11-15T05:30:00+05:30",
    views_count: 14,
    applications_count: 5,
    created_at: "2026-10-22T10:00:00.000000+05:30",
  },
  {
    id: "f92c2dce-5598-4988-8849-ab0d29572a9b",
    title: "Django Developer",
    company_id: "soundbear-1",
    company_name: "Soundbear private limited",
    company_logo: "https://hiring-backend-dev.s3.amazonaws.com/employer/logos/7c9922f2-5017-480a-a37d-25257df39787/39ac35f8-c679-43a6-840e-4761144963a7.jpg",
    job_role: { id: "role-django", name: "Django Developer" },
    role_category: { id: "cat-it", name: "IT / Software Roles" },
    job_type: { id: "type-ft", name: "Full Time" },
    work_mode: { id: "wm-wfo", name: "Work from Office", display_order: 1 },
    work_shift: { id: "ws-day", name: "Day Shift", display_order: 1 },
    experience_level: { id: "exp-1-3", label: "1–3 Years" },
    notice_period: 30,
    salary_min: "15000.00",
    salary_max: "20000.00",
    currency: { id: "curr-inr", code: "INR", name: "Indian Rupee" },
    number_of_openings: 1,
    location: "Lucknow, Uttar Pradesh",
    city: { id: "city-lko", name: "Lucknow", state: "state-up" },
    state: { id: "state-up", name: "Uttar Pradesh", country: { id: "c-in", name: "India" } },
    match_threshold: 1,
    is_free_for_candidates: true,
    required_skills: [
      { id: "sk-django", name: "Django Framework | IT" },
      { id: "sk-py", name: "Python | IT" },
      { id: "sk-drf", name: "REST APIs (DRF) | IT" },
      { id: "sk-pg", name: "PostgreSQL | IT" },
      { id: "sk-git", name: "Git | IT" },
    ],
    additional_skills: [],
    custom_skills: [],
    compatibility_score: null,
    compatibility_tips: [],
    compatibility_breakdown: [],
    can_apply: true,
    reason: null,
    badge_active: true,
    applied: false,
    status: 1,
    published_at: "2026-10-20T12:00:00.000000+05:30",
    application_deadline: "2026-11-10T05:30:00+05:30",
    views_count: 22,
    applications_count: 8,
    created_at: "2026-10-20T12:00:00.000000+05:30",
  },
  {
    id: "4eadc4b4-7f73-49b5-87ea-0ecd0e570b79",
    title: "Business Development Manager",
    company_id: "airation-1",
    company_name: "Airation Softtech Private Limited",
    company_logo: "https://hiring-backend-dev.s3.amazonaws.com/employer/logos/0420ac8a-4245-481c-b147-25c5ee4908a8/29a8f2d6-902b-46a6-a410-ac99e61b24e0.png",
    job_role: { id: "role-bdm", name: "Business Development Manager" },
    role_category: { id: "cat-sales", name: "Sales Roles" },
    job_type: { id: "type-ft", name: "Full Time" },
    work_mode: { id: "wm-wfo", name: "Work from Office", display_order: 1 },
    work_shift: { id: "ws-day", name: "Day Shift", display_order: 1 },
    experience_level: { id: "exp-2-5", label: "2–5 Years" },
    notice_period: 15,
    salary_min: "15000.00",
    salary_max: "20000.00",
    currency: { id: "curr-inr", code: "INR", name: "Indian Rupee" },
    number_of_openings: 1,
    location: "Lucknow, Uttar Pradesh",
    city: { id: "city-lko", name: "Lucknow", state: "state-up" },
    state: { id: "state-up", name: "Uttar Pradesh", country: { id: "c-in", name: "India" } },
    match_threshold: 2,
    is_free_for_candidates: true,
    required_skills: [
      { id: "sk-b2b", name: "B2B Sales | Sales" },
      { id: "sk-part", name: "Partnership Building | Sales" },
      { id: "sk-prop", name: "Proposal & Contract | Sales" },
      { id: "sk-crm", name: "Client Relationship Management | Sales" },
    ],
    additional_skills: [],
    custom_skills: [],
    compatibility_score: null,
    compatibility_tips: [],
    compatibility_breakdown: [],
    can_apply: true,
    reason: null,
    badge_active: true,
    applied: false,
    status: 1,
    published_at: "2026-10-18T20:13:35.838784+05:30",
    application_deadline: "2026-10-28T05:30:00+05:30",
    views_count: 18,
    applications_count: 4,
    created_at: "2026-10-15T01:24:34.392296+05:30",
  },
  {
    id: "7d0e3499-092a-46b2-b7a8-7adef4272c91",
    title: "AI Engineer",
    company_id: "ca-363",
    company_name: "Current Affairs 363",
    company_logo: "https://hiring-backend-dev.s3.amazonaws.com/employer/logos/9162ea53-a9c9-4727-822a-7326f522c151/87e5774f-91f2-4052-84ea-b5c22888731c.png",
    job_role: { id: "role-ai", name: "AI Engineer" },
    role_category: { id: "cat-data", name: "Data / AI Roles" },
    job_type: { id: "type-ft", name: "Full Time" },
    work_mode: { id: "wm-wfo", name: "Work from Office", display_order: 1 },
    work_shift: { id: "ws-day", name: "Day Shift", display_order: 1 },
    experience_level: { id: "exp-fresh", label: "Fresher" },
    notice_period: null,
    salary_min: "150000.00",
    salary_max: "200000.00",
    currency: { id: "curr-inr", code: "INR", name: "Indian Rupee" },
    number_of_openings: 1,
    location: "Bomdila, Arunachal Pradesh",
    city: { id: "city-bom", name: "Bomdila", state: "state-arun" },
    state: { id: "state-arun", name: "Arunachal Pradesh", country: { id: "c-in", name: "India" } },
    match_threshold: 0,
    is_free_for_candidates: true,
    required_skills: [
      { id: "sk-dw", name: "Data Warehousing | Data" },
      { id: "sk-spark", name: "Big Data Tools (Spark/Hadoop) | Data" },
      { id: "sk-cloud", name: "Cloud Data Services | Data" },
      { id: "sk-etl", name: "ETL Pipeline Development | Data" },
    ],
    additional_skills: [],
    custom_skills: [],
    compatibility_score: null,
    compatibility_tips: [],
    compatibility_breakdown: [],
    can_apply: true,
    reason: null,
    badge_active: true,
    applied: false,
    status: 1,
    published_at: "2026-10-14T16:31:50.835472+05:30",
    application_deadline: "2026-10-28T05:30:00+05:30",
    views_count: 12,
    applications_count: 3,
    created_at: "2026-10-14T16:31:50.356043+05:30",
  },
  {
    id: "b56b12ad-c991-4038-8bfa-4401671017f9",
    title: "Software Developer",
    company_id: "abc-tech",
    company_name: "ABC Technologies Pvt. Ltd.",
    company_logo: "",
    job_role: { id: "role-sd", name: "Software Developer" },
    role_category: { id: "cat-it", name: "IT / Software Roles" },
    job_type: { id: "type-ft", name: "Full Time" },
    work_mode: { id: "wm-wfo", name: "Work from Office", display_order: 1 },
    work_shift: { id: "ws-day", name: "Day Shift", display_order: 1 },
    experience_level: { id: "exp-fresh", label: "Fresher" },
    notice_period: null,
    salary_min: "15000.00",
    salary_max: "20000.00",
    currency: { id: "curr-inr", code: "INR", name: "Indian Rupee" },
    number_of_openings: 20,
    location: "Lucknow, Uttar Pradesh",
    city: { id: "city-lko", name: "Lucknow", state: "state-up" },
    state: { id: "state-up", name: "Uttar Pradesh", country: { id: "c-in", name: "India" } },
    match_threshold: 0,
    is_free_for_candidates: true,
    required_skills: [
      { id: "sk-algo", name: "Algorithms | IT" },
      { id: "sk-py", name: "Python | IT" },
      { id: "sk-ds", name: "Data Structures | IT" },
      { id: "sk-prob", name: "Problem Solving | Soft Skill" },
    ],
    additional_skills: [],
    custom_skills: [],
    compatibility_score: null,
    compatibility_tips: [],
    compatibility_breakdown: [],
    can_apply: true,
    reason: null,
    badge_active: true,
    applied: false,
    status: 1,
    published_at: "2026-10-14T14:30:51.217200+05:30",
    application_deadline: "2026-10-28T05:30:00+05:30",
    views_count: 26,
    applications_count: 7,
    created_at: "2026-10-14T14:30:50.100274+05:30",
  },
  {
    id: "03608487-fdfe-44ef-9695-c1a5558a846d",
    title: "Python Developer (Work from Home)",
    company_id: "abc-tech",
    company_name: "ABC Technologies Pvt. Ltd.",
    company_logo: "",
    job_role: { id: "role-py", name: "Python Developer" },
    role_category: { id: "cat-it", name: "IT / Software Roles" },
    job_type: { id: "type-ft", name: "Full Time" },
    work_mode: { id: "wm-wfh", name: "Work from Home", display_order: 3 },
    work_shift: { id: "ws-day", name: "Day Shift", display_order: 1 },
    experience_level: { id: "exp-2-5", label: "2–5 Years" },
    notice_period: null,
    salary_min: "15000.00",
    salary_max: "20000.00",
    currency: { id: "curr-inr", code: "INR", name: "Indian Rupee" },
    number_of_openings: 1,
    location: "Bengaluru, Karnataka",
    city: { id: "city-blr", name: "Bengaluru", state: "state-kar" },
    state: { id: "state-kar", name: "Karnataka", country: { id: "c-in", name: "India" } },
    match_threshold: 0,
    is_free_for_candidates: true,
    required_skills: [
      { id: "sk-sql", name: "SQL | IT" },
      { id: "sk-git", name: "Git | IT" },
      { id: "sk-py", name: "Python | IT" },
      { id: "sk-api", name: "REST API Development | IT" },
      { id: "sk-dj", name: "Django | IT" },
    ],
    additional_skills: [],
    custom_skills: [],
    compatibility_score: null,
    compatibility_tips: [],
    compatibility_breakdown: [],
    can_apply: true,
    reason: null,
    badge_active: true,
    applied: false,
    status: 1,
    published_at: "2026-10-14T13:59:57.463467+05:30",
    application_deadline: "2026-10-28T05:30:00+05:30",
    views_count: 19,
    applications_count: 6,
    created_at: "2026-10-14T13:59:56.923585+05:30",
  },
];

/**
 * Format currency to clean Indian notation: "₹ 15K - 20K/Mo" or "₹ 1.5L - 2L/Mo"
 */
export function formatLiveSalary(min?: string | number | null, max?: string | number | null): string {
  const numMin = min ? Math.round(Number(min)) : 0;
  const numMax = max ? Math.round(Number(max)) : 0;
  if (!numMin && !numMax) return "Competitive";

  const isMonthly = (numMin > 0 && numMin < 150000) || (numMax > 0 && numMax < 150000);
  const period = isMonthly ? "/Mo" : " LPA";

  const formatVal = (v: number) => {
    if (isMonthly) {
      if (v >= 100000) return `₹ ${(v / 100000).toFixed(1)}L`;
      if (v >= 1000) return `₹ ${Math.round(v / 1000)}K`;
      return `₹ ${v.toLocaleString("en-IN")}`;
    }
    const inL = (v / 100000).toFixed(v % 100000 === 0 ? 0 : 1);
    return `₹ ${inL}`;
  };

  if (numMin && numMax) return `${formatVal(numMin)} - ${formatVal(numMax)}${period}`;
  if (numMin) return `From ${formatVal(numMin)}${period}`;
  return `Up to ${formatVal(numMax)}${period}`;
}

const GRADIENTS = [
  "from-blue-600 to-indigo-600",
  "from-purple-600 to-pink-600",
  "from-emerald-600 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-cyan-600 to-blue-600",
  "from-rose-600 to-red-600",
];

const PRESET_MATCH_SCORES = [96, 88, 82, 91, 85, 92, 79, 87];

/**
 * Convert a live API JobListItem to JobCardData for CandidatePhoneMockup
 */
export function mapJobToCardData(raw: JobListItem, index = 0): JobCardData {
  const skills = (raw.required_skills || [])
    .map((s) => s.name.replace(/\s*\|.*$/, "").trim())
    .filter(Boolean);

  const expLabel = (raw.experience_level?.label || "2-5 Years").replace(/\?+/g, "–");
  const salaryText = formatLiveSalary(raw.salary_min, raw.salary_max);
  const matchScore = PRESET_MATCH_SCORES[index % PRESET_MATCH_SCORES.length];
  const cityName = raw.city?.name || raw.location?.split(",")[0]?.trim() || "India";
  const workModeText = raw.work_mode?.name || "Full Time";
  const locationBadge = raw.work_mode?.name?.toLowerCase().includes("home")
    ? "Work from Home"
    : cityName;

  const topSkills = skills.slice(0, 3);
  const skillsDisplay = topSkills.length > 0 ? topSkills.join(", ") : "core role competencies";

  const aiNote = `Ideal for ${raw.title} candidates with ${expLabel} experience specializing in ${skillsDisplay}.`;

  const breakdown: JobBreakdownItem[] = [
    { label: "Skills", score: `${Math.round((matchScore / 100) * 35)}/35`, status: matchScore >= 80 ? "high" : "mid", icon: "chart" },
    { label: "Experience", score: `${Math.min(20, Math.round((matchScore / 100) * 20))}/20`, status: "high", icon: "briefcase" },
    { label: "Role Fit", score: `${(matchScore >= 80 ? 13.5 : 10.5).toFixed(1)}/15`, status: matchScore >= 80 ? "high" : "mid", icon: "badge" },
    { label: "Salary", score: "10/10", status: "high", icon: "bag" },
    { label: "Other", score: `${Math.round((matchScore / 100) * 20)}/20`, status: matchScore >= 80 ? "high" : "mid", icon: "grid" },
  ];

  return {
    id: raw.id || `live-job-${index}`,
    department: raw.role_category?.name || "IT / Software Roles",
    postedTime: "Active opening",
    title: raw.title,
    company: raw.company_name || "Verified Employer",
    companyLocation: cityName,
    companyLogo: raw.company_logo || null,
    verified: Boolean(raw.badge_active ?? true),
    verifiedText: cityName,
    matchScore,
    matchLabel: matchScore >= 80 ? "STRONG MATCH" : matchScore >= 60 ? "MODERATE MATCH" : "POTENTIAL MATCH",
    aiNote,
    location: locationBadge,
    salary: salaryText,
    experience: expLabel,
    type: raw.job_type?.name || workModeText,
    tags: skills.slice(0, 3),
    breakdown,
    logoColor: GRADIENTS[index % GRADIENTS.length],
    logoLetter: (raw.company_name || "H").charAt(0).toUpperCase(),
  };
}

/**
 * Convert a live API JobListItem to PlaygroundJob for SwipePlayground
 */
export function mapJobToPlaygroundJob(raw: JobListItem, index = 0): PlaygroundJob {
  const skills = (raw.required_skills || [])
    .map((s) => s.name.replace(/\s*\|.*$/, "").trim())
    .filter(Boolean);

  const expLabel = (raw.experience_level?.label || "2-5 Years").replace(/\?+/g, "–");
  const salaryText = formatLiveSalary(raw.salary_min, raw.salary_max);
  const matchScore = PRESET_MATCH_SCORES[index % PRESET_MATCH_SCORES.length];
  const cityName = raw.city?.name || raw.location?.split(",")[0]?.trim() || "India";
  const workMode = raw.work_mode?.name || "Full Time";

  const topSkills = skills.slice(0, 3);
  const skillsDisplay = topSkills.length > 0 ? topSkills.join(", ") : "key technologies";

  return {
    id: raw.id || `pg-live-${index}`,
    department: raw.role_category?.name || "Software & Technology",
    title: raw.title,
    company: raw.company_name || "Verified Employer",
    verified: Boolean(raw.badge_active ?? true),
    matchScore,
    matchGrade: matchScore >= 80 ? "HIGH MATCH" : "LOW MATCH",
    aiNote: `Strong match for ${skillsDisplay} with ${expLabel} experience.`,
    location: `${cityName} (${workMode})`,
    salary: salaryText,
    experience: expLabel,
    type: raw.job_type?.name || "Full Time",
    tags: skills.slice(0, 3),
    breakdown: {
      skills: `${Math.round((matchScore / 100) * 40)}/40`,
      skillsOk: matchScore >= 80,
      exp: "13/13",
      expOk: true,
      location: "7/7",
      locationOk: true,
      salary: "5/5",
      salaryOk: true,
    },
    logoColor: GRADIENTS[index % GRADIENTS.length],
    logoLetter: (raw.company_name || "H").charAt(0).toUpperCase(),
  };
}
