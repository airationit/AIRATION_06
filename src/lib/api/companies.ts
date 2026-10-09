import { apiClient } from "./client";
import { PaginatedResponse } from "@/types/api";
import { CompanyItem, CompanySearchParams } from "@/types/companies";

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
