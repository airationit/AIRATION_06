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
 * Public Job List Item (JobListFlatSerializer / JobListSerializer)
 */
export interface JobListItem {
  id: string;
  title: string;
  company_id?: string | null;
  company_name: string;
  company_logo: string | null;
  job_role: EntityRef | null;
  role_category?: EntityRef | null;
  job_type: EntityRef | null;
  work_mode: (EntityRef & { display_order?: number }) | null;
  work_shift?: (EntityRef & { display_order?: number }) | null;
  experience_level: { id?: string; label?: string; name?: string } | null;
  notice_period?: number | null;
  salary_min: number | string | null;
  salary_max: number | string | null;
  currency: Currency | null;
  number_of_openings: number;
  location: string;
  city: (EntityRef & { state?: string }) | null;
  state: (EntityRef & { country?: string | EntityRef }) | null;
  match_threshold?: number | string;
  is_free_for_candidates?: boolean;
  required_skills: EntityRef[];
  additional_skills?: EntityRef[];
  custom_skills?: string[];
  compatibility_score?: number | null;
  compatibility_tips?: string[] | any[];
  compatibility_breakdown?: unknown[] | Record<string, unknown> | null;
  can_apply?: boolean;
  reason?: string | null;
  badge_active?: boolean;
  is_verified?: boolean;
  isVerified?: boolean;
  applied?: boolean;
  status: string | number;
  published_at: string | null;
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
  company_id?: string;
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
  is_verified?: boolean;
  isVerified?: boolean;
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
 * Query search parameters for GET /api/v1/jobs/
 */
export interface JobSearchParams {
  company_id?: string; // Comma-separated company UUIDs; matches any company
  category_id?: string; // Comma-separated role category UUIDs; matches any category
  job_role?: string; // Comma-separated job role UUIDs; matches any role
  job_type?: string; // Comma-separated job type UUIDs; matches any type
  work_mode?: string; // Comma-separated work mode UUIDs; matches any mode
  work_shift?: string; // Comma-separated work shift UUIDs; matches any shift
  experience_level?: string; // Comma-separated experience level UUIDs
  city?: string; // Comma-separated city UUIDs; matches any city ID or close location spelling
  state?: string; // Comma-separated state UUIDs; matches any state
  min_salary?: number; // Jobs whose maximum salary is at least this value
  max_salary?: number; // Jobs whose minimum salary is at most this value
  salary_range?: string; // Backwards compatible UUID or range
  skills?: string; // Comma-separated skill UUIDs
  is_free_for_candidates?: boolean; // Jobs that do not consume daily apply quota
  search?: string; // Text search in title/description
  ordering?:
    | "relevance"
    | "-relevance"
    | "compatibility_score"
    | "-compatibility_score"
    | "-published_at"
    | "published_at"
    | "-created_at"
    | "created_at";
  page?: number; // Default 1
  page_size?: number; // Default 10, max 100
}
