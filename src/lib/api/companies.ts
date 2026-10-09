import { apiClient } from "./client";
import { PaginatedResponse } from "@/types/api";
import { CompanyItem, CompanySearchParams, CompanyDetail, CompanyJobCategory } from "@/types/companies";

/**
 * Fetch public company directory with search and pagination (GET /company/?search=)
 * Retrieves actual company records: id, company_name, company_logo
 */
export async function fetchCompanies(
  params?: CompanySearchParams,
  options?: { revalidate?: number | false }
): Promise<PaginatedResponse<CompanyItem>> {
  try {
    const queryParams: Record<string, string | number | boolean | undefined> = {
      search: params?.search !== undefined ? params.search : "",
    };

    if (params) {
      if (params.page !== undefined) queryParams.page = params.page;
      if (params.page_size !== undefined) queryParams.page_size = params.page_size;
    }

    const res = await apiClient<PaginatedResponse<CompanyItem>>("/company/", {
      params: queryParams,
      revalidate: options?.revalidate ?? 300, // 5 minutes cache
    });

    if (res && res.success && Array.isArray(res.data)) {
      return res;
    }

    return {
      success: true,
      message: res?.message || "Companies fetched successfully.",
      data: res?.data || [],
      pagination: res?.pagination || {
        count: 0,
        total_pages: 1,
        current_page: 1,
        next: null,
        previous: null,
      },
    };
  } catch (error) {
    console.error("fetchCompanies error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch companies",
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
 * Deduplicate company items by normalized company name.
 * If multiple entries share the same company name, keeps the one with a valid logo.
 */
export function deduplicateCompanies(list: CompanyItem[]): CompanyItem[] {
  if (!Array.isArray(list) || list.length === 0) return [];
  const map = new Map<string, CompanyItem>();

  for (const item of list) {
    if (!item || !item.company_name) continue;
    const name = item.company_name.trim();
    if (!name) continue;

    // Normalize: alphanumeric only, lowercase
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const existing = map.get(key);

    if (!existing) {
      map.set(key, item);
    } else {
      // Prioritize entry with valid company_logo
      if (!existing.company_logo?.trim() && item.company_logo?.trim()) {
        map.set(key, item);
      }
    }
  }

  return Array.from(map.values());
}

/**
 * Slugify a company name into a URL-safe lowercase kebab-case string
 */
export function slugifyCompanyName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate a clean, SEO-friendly URL slug for a company
 * e.g. "iph-technologies-pvt-ltd-989b7939-fd77-4e90-abf0-7463e3eddeb5"
 */
export function generateCompanySlug(name?: string, id?: string): string {
  if (!id) return "";
  const cleanName = slugifyCompanyName(name || "");
  return cleanName ? `${cleanName}-${id}` : id;
}

/**
 * Extract clean UUID or ID from a company slug or raw ID string
 */
export function extractCompanyId(slugOrId: string): string {
  if (!slugOrId) return "";
  // 1. Check for standard 36-char UUID pattern anywhere in slug
  const uuidMatch = slugOrId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuidMatch) return uuidMatch[0];

  // 2. If it ends with numeric ID like company-name-123
  const numMatch = slugOrId.match(/-(\d+)$/);
  if (numMatch) return numMatch[1];

  return slugOrId;
}

/**
 * Fetch company details by ID or slug from the live API.
 * Uses resilient routing: attempts primary api.hirance.com (/company/{id}/)
 * and falls back to prod.hirance.com (/api/v1/company/{id}/).
 */
export async function fetchCompanyById(
  idOrSlug: string,
  options?: { revalidate?: number | false }
): Promise<{ success: boolean; data: CompanyDetail | null; message?: string }> {
  const cleanId = extractCompanyId(idOrSlug);
  if (!cleanId) {
    return { success: false, data: null, message: "Invalid company ID" };
  }

  // 1. Primary: /company/{id}/ (routes to api.hirance.com)
  try {
    const res = await apiClient<{ success: boolean; data: CompanyDetail; message?: string }>(
      `/company/${cleanId}/`,
      {
        revalidate: options?.revalidate ?? 300,
      }
    );

    if (res && res.success && res.data) {
      return res;
    }
  } catch {
    // Continue to fallback
  }

  // 2. Fallback: /api/v1/company/{id}/ (routes to prod.hirance.com)
  try {
    const fallbackRes = await apiClient<{ success: boolean; data: CompanyDetail; message?: string }>(
      `/api/v1/company/${cleanId}/`,
      {
        revalidate: options?.revalidate ?? 300,
      }
    );

    if (fallbackRes && fallbackRes.success && fallbackRes.data) {
      return fallbackRes;
    }

    return {
      success: false,
      data: null,
      message: fallbackRes?.message || "Company not found.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Company not found.",
    };
  }
}

/**
 * Fetch company job categories with resilient fallback
 */
export async function fetchCompanyCategories(
  companyId: string
): Promise<{ success: boolean; data: CompanyJobCategory[] }> {
  const cleanId = extractCompanyId(companyId);
  if (!cleanId) return { success: false, data: [] };

  // 1. Primary: api.hirance.com
  try {
    const res = await apiClient<{ success: boolean; data: CompanyJobCategory[] }>(
      `/company/${cleanId}/job-categories/`
    );
    if (res && res.success && Array.isArray(res.data)) {
      return res;
    }
  } catch {
    // Fallback
  }

  // 2. Fallback: prod.hirance.com
  try {
    const fallbackRes = await apiClient<{ success: boolean; data: CompanyJobCategory[] }>(
      `/api/v1/company/${cleanId}/job-categories/`
    );
    if (fallbackRes && fallbackRes.success && Array.isArray(fallbackRes.data)) {
      return fallbackRes;
    }
  } catch {
    // Suppressed
  }

  return { success: false, data: [] };
}

/**
 * Fetch company jobs with resilient fallback
 */
export async function fetchCompanyJobsList(
  companyId: string,
  categoryId?: string
): Promise<{ success: boolean; data: any[] }> {
  const cleanId = extractCompanyId(companyId);
  if (!cleanId) return { success: false, data: [] };

  const params = categoryId ? { category_id: categoryId } : undefined;

  // 1. Primary: api.hirance.com
  try {
    const res = await apiClient<{ success: boolean; data: any[] }>(
      `/company/${cleanId}/jobs/`,
      { params }
    );
    if (res && res.success && Array.isArray(res.data)) {
      return res;
    }
  } catch {
    // Fallback
  }

  // 2. Fallback: prod.hirance.com
  try {
    const fallbackRes = await apiClient<{ success: boolean; data: any[] }>(
      `/api/v1/company/${cleanId}/jobs/`,
      { params }
    );
    if (fallbackRes && fallbackRes.success && Array.isArray(fallbackRes.data)) {
      return fallbackRes;
    }
  } catch {
    // Suppressed
  }

  return { success: false, data: [] };
}
