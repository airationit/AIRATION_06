import { apiClient } from "./client";
import { PaginatedResponse } from "@/types/api";
import { CompanyItem, CompanySearchParams, CompanyDetail, CompanyJobCategory } from "@/types/companies";

let companiesMemoryCache: PaginatedResponse<CompanyItem> | null = null;
const companyDetailsMemoryCache = new Map<string, CompanyDetail>();

/**
 * Fetch public company directory with search and pagination (GET /api/v1/company/)
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

    const res = await apiClient<PaginatedResponse<CompanyItem>>("/api/v1/company/", {
      params: queryParams,
      revalidate: options?.revalidate ?? 300, // 5 minutes cache
    });

    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      companiesMemoryCache = res;
      return res;
    }

    if (companiesMemoryCache && (!queryParams.search || queryParams.search === "")) {
      return companiesMemoryCache;
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
    if (companiesMemoryCache && (!params?.search || params.search === "")) {
      return companiesMemoryCache;
    }
    if (typeof window === "undefined") {
      console.warn("fetchCompanies notice:", error instanceof Error ? error.message : error);
    }
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
export function deduplicateCompanies(
  list: CompanyItem[],
  detailsMap?: Record<string, CompanyDetail>,
  jobMap?: Map<string, { openings: number; city: string; industry: string }>
): CompanyItem[] {
  if (!Array.isArray(list) || list.length === 0) return [];
  const map = new Map<string, CompanyItem>();

  for (const item of list) {
    if (!item || !item.company_name) continue;
    const name = item.company_name.trim();
    if (!name) continue;

    // Clean, natural normalization: case-insensitive trimmed name
    const key = name.toLowerCase().trim();

    const existing = map.get(key);

    if (!existing) {
      map.set(key, item);
    } else {
      const existingLogo = Boolean(existing.company_logo?.trim());
      const itemLogo = Boolean(item.company_logo?.trim());

      const eDetail = detailsMap ? detailsMap[existing.id] : null;
      const iDetail = detailsMap ? detailsMap[item.id] : null;

      const eJob = jobMap
        ? jobMap.get(existing.id.toLowerCase()) || jobMap.get(existing.company_name.toLowerCase().trim())
        : null;
      const iJob = jobMap
        ? jobMap.get(item.id.toLowerCase()) || jobMap.get(item.company_name.toLowerCase().trim())
        : null;

      const eScore =
        (eJob?.openings ? 10 : 0) +
        (eDetail?.is_verified ? 5 : 0) +
        (existingLogo ? 2 : 0) +
        (eDetail?.city ? 3 : eDetail?.address ? 1 : 0) +
        (eDetail?.number_of_employees ? 3 : 0) +
        (eDetail?.industry ? 3 : 0);

      const iScore =
        (iJob?.openings ? 10 : 0) +
        (iDetail?.is_verified ? 5 : 0) +
        (itemLogo ? 2 : 0) +
        (iDetail?.city ? 3 : iDetail?.address ? 1 : 0) +
        (iDetail?.number_of_employees ? 3 : 0) +
        (iDetail?.industry ? 3 : 0);

      if (iScore > eScore) {
        map.set(key, item);
      }
    }
  }

  return Array.from(map.values());
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  const trimmed = slugOrId.trim();

  // 1. Direct UUID
  if (UUID_REGEX.test(trimmed)) {
    return trimmed;
  }

  // 2. Check for standard 36-char UUID pattern anywhere in slug
  const uuidMatch = trimmed.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuidMatch) return uuidMatch[0];

  // 3. If it ends with numeric ID like company-name-123
  const numMatch = trimmed.match(/-(\d+)$/);
  if (numMatch) return numMatch[1];

  return trimmed;
}

/**
 * Fetch company details by ID or slug from api.hirance.com.
 * Resilient: handles direct UUIDs, slug lookups, search fallbacks, and never throws unhandled errors.
 */
export async function fetchCompanyById(
  idOrSlug: string,
  options?: { revalidate?: number | false }
): Promise<{ success: boolean; data: CompanyDetail | null; message?: string }> {
  if (!idOrSlug || !idOrSlug.trim()) {
    return { success: false, data: null, message: "Invalid company ID" };
  }

  const raw = idOrSlug.trim();
  const cleanId = extractCompanyId(raw);

  // Check in-memory cache first to avoid hitting rate limits
  if (companyDetailsMemoryCache.has(cleanId)) {
    return { success: true, data: companyDetailsMemoryCache.get(cleanId)! };
  }
  if (companyDetailsMemoryCache.has(raw)) {
    return { success: true, data: companyDetailsMemoryCache.get(raw)! };
  }

  const isUUID = UUID_REGEX.test(cleanId);

  // 1. If we have a valid UUID, fetch directly from GET /api/v1/company/<uuid:pk>/
  if (isUUID) {
    try {
      const res = await apiClient<{ success: boolean; data: CompanyDetail; message?: string }>(
        `/api/v1/company/${cleanId}/`,
        {
          revalidate: options?.revalidate ?? 300,
        }
      );

      if (res && res.success && res.data) {
        companyDetailsMemoryCache.set(cleanId, res.data);
        companyDetailsMemoryCache.set(raw, res.data);
        return res;
      }
    } catch {
      // Direct UUID fetch failed; continue to fallbacks
    }
  }

  // 2. If cleanId is not a UUID or direct UUID call failed, search registered companies
  try {
    const searchParam = raw
      .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "")
      .replace(/[-_]+/g, " ")
      .trim() || raw;

    const searchRes = await fetchCompanies({ search: searchParam, page_size: 10 });

    if (searchRes && searchRes.success && Array.isArray(searchRes.data) && searchRes.data.length > 0) {
      const matched =
        searchRes.data.find(
          (c) =>
            c.id.toLowerCase() === cleanId.toLowerCase() ||
            c.company_name.toLowerCase().trim() === searchParam.toLowerCase()
        ) || searchRes.data[0];

      if (matched) {
        // Fetch details using the matched registered UUID if available
        if (UUID_REGEX.test(matched.id)) {
          try {
            const detailRes = await apiClient<{ success: boolean; data: CompanyDetail; message?: string }>(
              `/api/v1/company/${matched.id}/`,
              { revalidate: options?.revalidate ?? 300 }
            );
            if (detailRes && detailRes.success && detailRes.data) {
              companyDetailsMemoryCache.set(cleanId, detailRes.data);
              companyDetailsMemoryCache.set(raw, detailRes.data);
              companyDetailsMemoryCache.set(matched.id, detailRes.data);
              return detailRes;
            }
          } catch {
            // Suppressed
          }
        }

        // Resilient fallback CompanyDetail built from real directory record
        const fallbackDetail: CompanyDetail = {
          id: matched.id,
          company_name: matched.company_name,
          company_logo: matched.company_logo || "",
          industry: "",
          number_of_employees: "",
          address: "",
          city: null,
          state: null,
          website_link: null,
          linkedin_link: null,
          is_verified: false,
        };
        companyDetailsMemoryCache.set(cleanId, fallbackDetail);
        companyDetailsMemoryCache.set(raw, fallbackDetail);
        return { success: true, data: fallbackDetail };
      }
    }
  } catch {
    // Search fallback suppressed
  }

  if (companyDetailsMemoryCache.has(cleanId)) {
    return { success: true, data: companyDetailsMemoryCache.get(cleanId)! };
  }

  return {
    success: false,
    data: null,
    message: "Company not found.",
  };
}

/**
 * Fetch company job categories from api.hirance.com.
 * Gracefully returns empty array on 404 or missing categories.
 */
export async function fetchCompanyCategories(
  companyId: string
): Promise<{ success: boolean; data: CompanyJobCategory[] }> {
  const cleanId = extractCompanyId(companyId);
  if (!cleanId) return { success: true, data: [] };

  try {
    const apiRes = await apiClient<{ success: boolean; data: CompanyJobCategory[] }>(
      `/company/${cleanId}/job-categories/`
    );
    if (apiRes && apiRes.success && Array.isArray(apiRes.data)) {
      return apiRes;
    }
  } catch {
    // Suppressed: 404/not found is normal for companies without custom categories
  }
  return { success: true, data: [] };
}

/**
 * Fetch company jobs from api.hirance.com:
 * 1. Checks /company/{cleanId}/jobs/
 * 2. Checks /jobs/?company_id={cleanId}
 */
export async function fetchCompanyJobsList(
  companyId: string,
  categoryId?: string
): Promise<{ success: boolean; data: any[] }> {
  const cleanId = extractCompanyId(companyId);
  if (!cleanId) return { success: false, data: [] };

  // 1. Primary: Query /company/{id}/jobs/ on api.hirance.com
  try {
    const params = categoryId ? { category_id: categoryId } : undefined;
    const apiRes = await apiClient<{ success: boolean; data: any[] }>(
      `/company/${cleanId}/jobs/`,
      { params, revalidate: 60 }
    );
    if (apiRes && apiRes.success && Array.isArray(apiRes.data) && apiRes.data.length > 0) {
      return apiRes;
    }
  } catch {
    // Suppressed
  }

  // 2. Also check /api/v1/jobs/?company_id= on api.hirance.com
  try {
    const queryParams: Record<string, string | number | undefined> = {
      company_id: cleanId,
      page_size: 50,
    };
    if (categoryId) {
      queryParams.category_id = categoryId;
      queryParams.role_category = categoryId;
    }

    const jobsRes = await apiClient<{ success?: boolean; data?: any[] }>("/api/v1/jobs/", {
      params: queryParams,
      revalidate: 60,
    });

    if (jobsRes && Array.isArray(jobsRes.data) && jobsRes.data.length > 0) {
      return { success: true, data: jobsRes.data };
    }
  } catch {
    // Suppressed
  }

  return { success: true, data: [] };
}
