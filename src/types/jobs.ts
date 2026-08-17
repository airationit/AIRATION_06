import { Currency } from "./masterdata";

/**
 * Named reference shape for nested relations (e.g. job_role, city, state)
 */
export interface EntityRef {
  id: string;
  name: string;
}

/**
 * Company summary in job list & detail
 */
export interface JobCompanyRef {
  id: string;
  company_name: string;
  company_logo: string | null;
  city?: string | EntityRef;
  state?: string | EntityRef;
}

/**
 * Public Job List Item (JobListSerializer)
 */
export interface JobListItem {
  id: string;
  title: string;
  company_name: string;
  company_logo: string | null;
  job_role: EntityRef | null;
  role_category?: EntityRef | null;
  job_type: EntityRef | null;
  work_mode: EntityRef | null;
  work_shift?: EntityRef | null;
  experience_level: EntityRef | null;
  salary_min: number | string | null;
  salary_max: number | string | null;
  currency: Currency | null;
  number_of_openings: number;
  location: string;
  city: EntityRef | null;
  state: EntityRef | null;
  match_threshold?: number;
  is_free_for_candidates?: boolean;
  required_skills: EntityRef[];
  additional_skills?: EntityRef[];
  custom_skills?: string[];
  compatibility_score?: number | null;
  compatibility_tips?: string[];
  compatibility_breakdown?: Record<string, unknown> | null;
  can_apply?: boolean;
  reason?: string | null;
  badge_active?: boolean;
  applied?: boolean;
  status: string;
  published_at: string;
  application_deadline?: string | null;
  views_count?: number;
  applications_count?: number;
  created_at: string;
}

/**
 * Public Job Detail (JobDetailSerializer)
 */
export interface JobDetail {
  id: string;
  title: string;
  company?: JobCompanyRef;
  created_by?: {
    id: string;
    mobile_number?: string;
    name?: string;
  };
  company_name: string;
  company_logo: string | null;
  description: string;
  responsibilities?: string;
  education_level?: string | EntityRef | null;
  education_specialization?: string | null;
  english_proficiency?: string | null;
  job_role: EntityRef | null;
  role_category?: EntityRef | null;
  job_type: EntityRef | null;
  work_mode: EntityRef | null;
  work_shift?: EntityRef | null;
  experience_level: EntityRef | null;
  salary_min: number | string | null;
  salary_max: number | string | null;
  currency: Currency | null;
  location: string;
  city: EntityRef | null;
  state: EntityRef | null;
  required_skills: EntityRef[];
  additional_skills?: EntityRef[];
  custom_skills?: string[];
  match_threshold?: number;
  is_free_for_candidates?: boolean;
  number_of_openings: number;
  is_walk_in?: boolean;
  compatibility_score?: number | null;
  compatibility_tips?: string[];
  compatibility_breakdown?: Record<string, unknown> | null;
  can_apply?: boolean;
  reason?: string | null;
  badge_active?: boolean;
  applied?: boolean;
  status: string;
  published_at: string;
  application_deadline?: string | null;
  expired_at?: string | null;
  views_count?: number;
  applications_count?: number;
  created_at: string;
  updated_at?: string | null;
  closed_at?: string | null;
}

/**
 * Minimal Job summary for Sitemap List API (GET /jobs/sitemap-list)
 */
export interface JobSitemapItem {
  id: string;
  title: string;
  city: string;
  updatedAt: string | null;
}

export interface JobSitemapData {
  total: number;
  jobs: JobSitemapItem[];
}

/**
 * Query search parameters for GET /jobs/
 */
export interface JobSearchParams {
  job_role?: string; // UUID or comma-separated UUIDs
  job_type?: string; // UUID
  work_mode?: string; // UUID
  work_shift?: string; // UUID
  experience_level?: string; // UUID
  city?: string; // UUID
  state?: string; // UUID
  salary_range?: string; // UUID
  skills?: string; // Comma-separated skill UUIDs
  is_free_for_candidates?: boolean;
  search?: string;
  ordering?:
    | "relevance"
    | "-relevance"
    | "compatibility_score"
    | "-compatibility_score"
    | "-published_at"
    | "published_at"
    | "-created_at"
    | "created_at";
  page?: number;
  page_size?: number;
}
