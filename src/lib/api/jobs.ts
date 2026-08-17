import { apiClient } from "./client";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { JobListItem, JobDetail, JobSearchParams, JobSitemapData } from "@/types/jobs";

/**
 * Fetch candidate-facing public jobs list with filters and search (GET /jobs/)
 */
export async function fetchJobs(
  params?: JobSearchParams,
  options?: { revalidate?: number | false }
): Promise<PaginatedResponse<JobListItem>> {
  try {
    const queryParams: Record<string, string | number | boolean | undefined> = {};

    if (params) {
      if (params.job_role) queryParams.job_role = params.job_role;
      if (params.job_type) queryParams.job_type = params.job_type;
      if (params.work_mode) queryParams.work_mode = params.work_mode;
      if (params.work_shift) queryParams.work_shift = params.work_shift;
      if (params.experience_level) queryParams.experience_level = params.experience_level;
      if (params.city) queryParams.city = params.city;
      if (params.state) queryParams.state = params.state;
      if (params.salary_range) queryParams.salary_range = params.salary_range;
      if (params.skills) queryParams.skills = params.skills;
      if (params.is_free_for_candidates !== undefined) {
        queryParams.is_free_for_candidates = params.is_free_for_candidates;
      }
      if (params.search) queryParams.search = params.search;
      if (params.ordering) queryParams.ordering = params.ordering;
      if (params.page) queryParams.page = params.page;
      if (params.page_size) queryParams.page_size = params.page_size;
    }

    const res = await apiClient<PaginatedResponse<JobListItem>>("/jobs/", {
      params: queryParams,
      revalidate: options?.revalidate ?? 60, // 60s cache on Next.js server
    });

    return res;
  } catch (error) {
    console.error("fetchJobs error:", error);
    // Return empty paginated structure to prevent crashes
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch jobs",
      data: [],
      pagination: {
        count: 0,
        total_pages: 1,
        current_page: 1,
        next: null,
        previous: null,
      },
    };
  }
}

/**
 * Fetch candidate-facing public job detail by ID/UUID (GET /jobs/{pk}/)
 */
export async function fetchJobDetail(
  id: string,
  options?: { revalidate?: number | false }
): Promise<JobDetail | null> {
  try {
    const res = await apiClient<ApiResponse<JobDetail>>(`/jobs/${id}/`, {
      revalidate: options?.revalidate ?? 120,
    });
    return res.data || null;
  } catch (error) {
    console.error(`fetchJobDetail error for ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetch minimal public job listing for sitemap generation (GET /jobs/sitemap-list)
 */
export async function fetchJobSitemapList(): Promise<JobSitemapData> {
  try {
    const res = await apiClient<ApiResponse<JobSitemapData>>("/jobs/sitemap-list", {
      revalidate: 3600, // Edge cache 1 hour
    });
    return res.data || { total: 0, jobs: [] };
  } catch (error) {
    console.error("fetchJobSitemapList error:", error);
    return { total: 0, jobs: [] };
  }
}
