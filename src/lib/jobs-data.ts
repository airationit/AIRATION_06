export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  citySlug: string;
  roleSlug: string;
  jobType: "Full-Time" | "Part-Time" | "Remote" | "Internship";
  experience: string;
  experienceSlug: "freshers" | "entry-level" | "mid-level" | "senior-level" | "lead";
  salaryRange: string;
  skills: string[];
  matchScore: number; // Hirance signature AI Match Score
  postedDate: string;
  isVerified: boolean;
  department: string;
  description: string;
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

// Curated realistic jobs repository for Hirance
export const MOCK_JOBS: Job[] = [
  {
    id: "hirance-job-001",
    slug: "senior-react-developer-bangalore",
    title: "Senior React Developer",
    company: "Razorpay",
    location: "Bangalore, Karnataka",
    citySlug: "bangalore",
    roleSlug: "react-developer",
    jobType: "Full-Time",
    experience: "3-5 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹18L - ₹28L / yr",
    skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"],
    matchScore: 96,
    postedDate: "2026-08-12",
    isVerified: true,
    department: "Engineering",
    description:
      "Looking for a Senior React Engineer to scale our core merchant dashboard. Work directly with design and product teams.",
  },
  {
    id: "hirance-job-002",
    slug: "frontend-developer-remote",
    title: "Frontend Engineer (Next.js)",
    company: "Cred",
    location: "Remote / Work From Home",
    citySlug: "remote",
    roleSlug: "frontend-developer",
    jobType: "Remote",
    experience: "2-4 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹16L - ₹24L / yr",
    skills: ["Next.js", "React", "TypeScript", "Performance Optimization"],
    matchScore: 93,
    postedDate: "2026-08-13",
    isVerified: true,
    department: "Engineering",
    description:
      "Join our high-velocity team building ultra-smooth, responsive user interfaces for high-volume transactions.",
  },
  {
    id: "hirance-job-003",
    slug: "ui-ux-designer-mumbai",
    title: "Product & UI/UX Designer",
    company: "Swiggy",
    location: "Mumbai, Maharashtra",
    citySlug: "mumbai",
    roleSlug: "ui-ux-designer",
    jobType: "Full-Time",
    experience: "2-5 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹14L - ₹22L / yr",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    matchScore: 91,
    postedDate: "2026-08-11",
    isVerified: true,
    department: "Design",
    description:
      "Design next-generation consumer mobile and web experiences. Create frictionless user journeys from concept to delivery.",
  },
  {
    id: "hirance-job-004",
    slug: "backend-developer-node-delhi",
    title: "Backend Developer (Node.js / Go)",
    company: "Zomato",
    location: "Gurgaon, Delhi NCR",
    citySlug: "delhi-ncr",
    roleSlug: "backend-developer",
    jobType: "Full-Time",
    experience: "3-6 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹20L - ₹32L / yr",
    skills: ["Node.js", "PostgreSQL", "Redis", "Kafka", "Docker"],
    matchScore: 95,
    postedDate: "2026-08-14",
    isVerified: true,
    department: "Engineering",
    description:
      "Architect high-throughput microservices handling millions of daily requests with low latency.",
  },
  {
    id: "hirance-job-005",
    slug: "fresher-software-engineer-pune",
    title: "Junior Software Engineer (Fresher)",
    company: "Persistent Systems",
    location: "Pune, Maharashtra",
    citySlug: "pune",
    roleSlug: "frontend-developer",
    jobType: "Full-Time",
    experience: "0-1 yrs",
    experienceSlug: "freshers",
    salaryRange: "₹6L - ₹9L / yr",
    skills: ["JavaScript", "HTML/CSS", "React Basics", "Git"],
    matchScore: 89,
    postedDate: "2026-08-10",
    isVerified: true,
    department: "Engineering",
    description:
      "Great opportunity for fresh engineering graduates to learn modern web architecture and ship production features.",
  },
  {
    id: "hirance-job-006",
    slug: "python-ai-engineer-hyderabad",
    title: "Python / AI Engineer",
    company: "Microsoft",
    location: "Hyderabad, Telangana",
    citySlug: "hyderabad",
    roleSlug: "python-developer",
    jobType: "Full-Time",
    experience: "4-7 yrs",
    experienceSlug: "senior-level",
    salaryRange: "₹26L - ₹42L / yr",
    skills: ["Python", "PyTorch", "FastAPI", "LLM Integration", "AWS"],
    matchScore: 97,
    postedDate: "2026-08-12",
    isVerified: true,
    department: "Engineering",
    description:
      "Develop intelligent enterprise workflows powered by generative AI and real-time distributed data pipelines.",
  },
  {
    id: "hirance-job-007",
    slug: "product-manager-bangalore",
    title: "Growth Product Manager",
    company: "Groww",
    location: "Bangalore, Karnataka",
    citySlug: "bangalore",
    roleSlug: "product-manager",
    jobType: "Full-Time",
    experience: "4-6 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹24L - ₹36L / yr",
    skills: ["Product Strategy", "A/B Testing", "Data Analytics", "SQL"],
    matchScore: 94,
    postedDate: "2026-08-13",
    isVerified: true,
    department: "Product",
    description:
      "Lead growth experiments, user acquisition funnels, and retention flywheels for our investing platform.",
  },
  {
    id: "hirance-job-008",
    slug: "sales-business-development-delhi",
    title: "Business Development Manager",
    company: "Urban Company",
    location: "Delhi NCR",
    citySlug: "delhi-ncr",
    roleSlug: "sales-executive",
    jobType: "Full-Time",
    experience: "2-5 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹10L - ₹18L / yr + Incentives",
    skills: ["B2B Sales", "Client Acquisition", "Negotiation", "CRM"],
    matchScore: 90,
    postedDate: "2026-08-09",
    isVerified: true,
    department: "Sales",
    description:
      "Drive partner expansion and merchant onboarding across key North India business clusters.",
  },
  {
    id: "hirance-job-009",
    slug: "remote-ui-designer",
    title: "Visual & UI Designer",
    company: "InVideo",
    location: "Remote / Work From Home",
    citySlug: "remote",
    roleSlug: "ui-ux-designer",
    jobType: "Remote",
    experience: "1-3 yrs",
    experienceSlug: "entry-level",
    salaryRange: "₹9L - ₹15L / yr",
    skills: ["Figma", "Design Systems", "Motion UI", "Iconography"],
    matchScore: 92,
    postedDate: "2026-08-14",
    isVerified: true,
    department: "Design",
    description:
      "Create beautiful micro-interactions, responsive layouts, and visual design assets for video editing software.",
  },
  {
    id: "hirance-job-010",
    slug: "telecaller-inside-sales-pune",
    title: "Inside Sales / Telecaller Associate",
    company: "Byju's",
    location: "Pune, Maharashtra",
    citySlug: "pune",
    roleSlug: "telecaller",
    jobType: "Full-Time",
    experience: "0-2 yrs",
    experienceSlug: "freshers",
    salaryRange: "₹4.5L - ₹7L / yr + Incentives",
    skills: ["Communication", "Lead Follow-up", "English/Hindi", "Tele-calling"],
    matchScore: 88,
    postedDate: "2026-08-11",
    isVerified: true,
    department: "Sales",
    description:
      "Connect with prospective students and parents, understand their learning goals, and guide course enrollments.",
  },
  {
    id: "hirance-job-011",
    slug: "full-stack-developer-chennai",
    title: "Full Stack Engineer (React + Node)",
    company: "Freshworks",
    location: "Chennai, Tamil Nadu",
    citySlug: "chennai",
    roleSlug: "full-stack-developer",
    jobType: "Full-Time",
    experience: "3-5 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹18L - ₹26L / yr",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "GraphQL"],
    matchScore: 95,
    postedDate: "2026-08-13",
    isVerified: true,
    department: "Engineering",
    description:
      "Build scalable CRM features from front-to-back. High impact role with customer-first engineering culture.",
  },
  {
    id: "hirance-job-012",
    slug: "digital-marketing-specialist-mumbai",
    title: "Performance & Digital Marketer",
    company: "Nykaa",
    location: "Mumbai, Maharashtra",
    citySlug: "mumbai",
    roleSlug: "digital-marketing-specialist",
    jobType: "Full-Time",
    experience: "2-4 yrs",
    experienceSlug: "mid-level",
    salaryRange: "₹10L - ₹16L / yr",
    skills: ["Meta Ads", "Google Ads", "ROAS Optimization", "Analytics"],
    matchScore: 91,
    postedDate: "2026-08-10",
    isVerified: true,
    department: "Marketing",
    description:
      "Manage high-budget performance marketing campaigns across social, search, and programmatic ad channels.",
  },
];

/**
 * Data Access Function: Fetches filtered jobs
 * Ready for Backend Integration:
 * When your backend API endpoint is ready, simply replace the local filter logic with:
 * const res = await fetch(`${BACKEND_URL}/api/v1/jobs?role=${params.roleSlug}&city=${params.citySlug}...`);
 */
export async function getJobs(params: {
  roleSlug?: string;
  citySlug?: string;
  experienceSlug?: string;
  jobType?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<JobsQueryResponse> {
  const page = params.page || 1;
  const limit = params.limit || 12;

  let filtered = [...MOCK_JOBS];

  if (params.roleSlug) {
    const roleSlugLower = params.roleSlug.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.roleSlug.includes(roleSlugLower) ||
        roleSlugLower.includes(j.roleSlug) ||
        j.title.toLowerCase().includes(roleSlugLower.replace(/-/g, " "))
    );
  }

  if (params.citySlug && params.citySlug !== "all") {
    const citySlugLower = params.citySlug.toLowerCase();
    if (citySlugLower === "remote") {
      filtered = filtered.filter((j) => j.jobType === "Remote" || j.citySlug === "remote");
    } else {
      filtered = filtered.filter(
        (j) => j.citySlug === citySlugLower || j.location.toLowerCase().includes(citySlugLower)
      );
    }
  }

  if (params.experienceSlug) {
    filtered = filtered.filter((j) => j.experienceSlug === params.experienceSlug);
  }

  if (params.jobType && params.jobType !== "all") {
    filtered = filtered.filter(
      (j) => j.jobType.toLowerCase() === params.jobType?.toLowerCase()
    );
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q)
    );
  }

  // If filtered result is small in mock mode, provide simulated base count for SEO realistic display
  const totalCount = filtered.length > 0 ? filtered.length * 8 + 14 : 36;

  const startIndex = (page - 1) * limit;
  const paginatedJobs = filtered.slice(startIndex, startIndex + limit);

  // If filtered list is empty, return top recommendations
  const jobsToReturn = paginatedJobs.length > 0 ? paginatedJobs : MOCK_JOBS.slice(0, 6);

  return {
    jobs: jobsToReturn,
    totalJobs: totalCount,
    page,
    totalPages: Math.ceil(totalCount / limit) || 1,
    activeFilters: {
      role: params.roleSlug,
      city: params.citySlug,
      jobType: params.jobType,
      experience: params.experienceSlug,
    },
  };
}
