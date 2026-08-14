export interface JobCategory {
  slug: string;
  label: string;
  category: "Engineering" | "Design" | "Marketing" | "Sales" | "Operations" | "Product";
  popularRoles: string[];
}

export interface JobCity {
  slug: string;
  name: string;
  state: string;
  isPopular?: boolean;
}

export const POPULAR_JOB_ROLES = [
  { slug: "frontend-developer", label: "Frontend Developer", category: "Engineering" },
  { slug: "backend-developer", label: "Backend Developer", category: "Engineering" },
  { slug: "full-stack-developer", label: "Full Stack Developer", category: "Engineering" },
  { slug: "react-developer", label: "React Developer", category: "Engineering" },
  { slug: "node-js-developer", label: "Node.js Developer", category: "Engineering" },
  { slug: "python-developer", label: "Python Developer", category: "Engineering" },
  { slug: "mobile-app-developer", label: "Mobile App Developer", category: "Engineering" },
  { slug: "ui-ux-designer", label: "UI/UX Designer", category: "Design" },
  { slug: "product-designer", label: "Product Designer", category: "Design" },
  { slug: "graphic-designer", label: "Graphic Designer", category: "Design" },
  { slug: "product-manager", label: "Product Manager", category: "Product" },
  { slug: "digital-marketing-specialist", label: "Digital Marketing Specialist", category: "Marketing" },
  { slug: "content-writer", label: "Content Writer", category: "Marketing" },
  { slug: "seo-specialist", label: "SEO Specialist", category: "Marketing" },
  { slug: "sales-executive", label: "Sales Executive", category: "Sales" },
  { slug: "business-development-manager", label: "Business Development Manager", category: "Sales" },
  { slug: "telecaller", label: "Telecaller / Inside Sales", category: "Sales" },
  { slug: "hr-manager", label: "HR Manager", category: "Operations" },
  { slug: "operations-executive", label: "Operations Executive", category: "Operations" },
  { slug: "customer-support-associate", label: "Customer Support Associate", category: "Operations" },
] as const;

export const POPULAR_CITIES: JobCity[] = [
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", isPopular: true },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", isPopular: true },
  { slug: "delhi-ncr", name: "Delhi NCR", state: "Delhi", isPopular: true },
  { slug: "pune", name: "Pune", state: "Maharashtra", isPopular: true },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", isPopular: true },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", isPopular: true },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", isPopular: true },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", isPopular: true },
  { slug: "remote", name: "Remote / Work From Home", state: "All India", isPopular: true },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal" },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan" },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab/Haryana" },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh" },
  { slug: "kochi", name: "Kochi", state: "Kerala" },
];

export const EXPERIENCE_LEVELS = [
  { slug: "freshers", label: "Freshers (0-1 yrs)" },
  { slug: "entry-level", label: "Entry Level (1-3 yrs)" },
  { slug: "mid-level", label: "Mid Level (3-5 yrs)" },
  { slug: "senior-level", label: "Senior Level (5+ yrs)" },
  { slug: "lead", label: "Lead / Manager (8+ yrs)" },
] as const;

export const JOB_TYPES = [
  { slug: "full-time", label: "Full Time" },
  { slug: "part-time", label: "Part Time" },
  { slug: "remote", label: "Remote / WFH" },
  { slug: "internship", label: "Internship" },
] as const;
