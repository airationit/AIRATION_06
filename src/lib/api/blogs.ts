import { apiClient } from "./client";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import {
  BlogCategory,
  BlogDetail,
  BlogListItem,
  BlogSearchParams,
  BlogSitemapData,
  BlogTag,
} from "@/types/blogs";

/**
 * Format read_time string cleanly ("5" -> "5 min read", "5 min read" -> "5 min read")
 */
export function formatBlogReadTime(readTime?: string | number | null): string {
  if (!readTime) return "3 min read";
  const str = String(readTime).trim();
  if (str.toLowerCase().includes("min")) return str;
  return `${str} min read`;
}

/**
 * Fetch candidate/public-facing blogs list with filtering, search, and pagination
 * Endpoint: GET /api/v1/blogs/
 * Reference: BLOGAPI.md Section 2
 */
export async function fetchBlogs(
  params?: BlogSearchParams,
  options?: { revalidate?: number | false }
): Promise<PaginatedResponse<BlogListItem>> {
  try {
    const queryParams: Record<string, string | number | boolean | undefined> = {};

    if (params) {
      if (params.category && params.category !== "all") {
        queryParams.category = params.category;
      }
      if (params.tag) queryParams.tag = params.tag;
      if (params.search) queryParams.search = params.search;
      if (params.featured !== undefined) queryParams.featured = params.featured;
      if (params.ordering) queryParams.ordering = params.ordering;
      if (params.page) queryParams.page = params.page;
      if (params.page_size) queryParams.page_size = params.page_size;
    }

    const res = await apiClient<PaginatedResponse<BlogListItem>>("/api/v1/blogs/", {
      params: queryParams,
      revalidate: options?.revalidate ?? 60, // 60s cache
    });

    if (res && res.success && Array.isArray(res.data)) {
      return res;
    }

    return {
      success: true,
      message: res?.message || "No blogs found",
      data: [],
      pagination: res?.pagination || {
        count: 0,
        total_pages: 1,
        current_page: params?.page || 1,
        page_size: params?.page_size || 10,
        next: null,
        previous: null,
      },
    };
  } catch (error) {
    console.error("fetchBlogs API error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to load blogs",
      data: [],
      pagination: {
        count: 0,
        total_pages: 1,
        current_page: params?.page || 1,
        page_size: params?.page_size || 10,
        next: null,
        previous: null,
      },
    };
  }
}

/**
 * Fetch a single blog post by slug
 * Endpoint: GET /api/v1/blogs/{slug}/
 * Reference: BLOGAPI.md Section 3
 */
export async function fetchBlogBySlug(
  slug: string,
  options?: { revalidate?: number | false }
): Promise<BlogDetail | null> {
  if (!slug) return null;

  try {
    const cleanSlug = encodeURIComponent(slug.trim());
    const res = await apiClient<ApiResponse<BlogDetail>>(`/api/v1/blogs/${cleanSlug}/`, {
      revalidate: options?.revalidate ?? 120, // 2m cache
    });

    if (res && res.success && res.data) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.error(`fetchBlogBySlug for '${slug}' failed:`, error);
    return null;
  }
}

/**
 * Fetch active blog categories with post counts
 * Endpoint: GET /api/v1/blogs/categories/
 * Reference: BLOGAPI.md Section 4
 */
export async function fetchBlogCategories(
  options?: { revalidate?: number | false }
): Promise<BlogCategory[]> {
  try {
    const res = await apiClient<ApiResponse<BlogCategory[]>>("/api/v1/blogs/categories/", {
      revalidate: options?.revalidate ?? 3600, // 1 hour cache
    });

    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    return [{ id: null, name: "All", slug: "all", post_count: 0 }];
  } catch (error) {
    console.error("fetchBlogCategories failed:", error);
    return [{ id: null, name: "All", slug: "all", post_count: 0 }];
  }
}

/**
 * Fetch trending blog tags
 * Endpoint: GET /api/v1/blogs/tags/
 * Reference: BLOGAPI.md Section 5
 */
export async function fetchBlogTags(
  options?: { revalidate?: number | false }
): Promise<BlogTag[]> {
  try {
    const res = await apiClient<ApiResponse<BlogTag[]>>("/api/v1/blogs/tags/", {
      revalidate: options?.revalidate ?? 3600,
    });

    if (res && res.success && Array.isArray(res.data)) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.error("fetchBlogTags failed:", error);
    return [];
  }
}

/**
 * Fetch sitemap listing for blog articles
 * Endpoint: GET /api/v1/blogs/sitemap/
 * Reference: BLOGAPI.md Section 6
 */
export async function fetchBlogSitemap(
  options?: { revalidate?: number | false }
): Promise<BlogSitemapData> {
  try {
    const res = await apiClient<ApiResponse<BlogSitemapData>>("/api/v1/blogs/sitemap/", {
      revalidate: options?.revalidate ?? 3600,
    });

    if (res && res.success && res.data) {
      return res.data;
    }

    return { total: 0, items: [] };
  } catch (error) {
    console.error("fetchBlogSitemap failed:", error);
    return { total: 0, items: [] };
  }
}

/**
 * Record a blog view count increment
 * Endpoint: POST /api/v1/blogs/{slug}/view/
 * Reference: BLOGAPI.md Section 7
 */
export async function recordBlogView(slug: string): Promise<boolean> {
  if (!slug) return false;

  try {
    const cleanSlug = encodeURIComponent(slug.trim());
    const res = await apiClient<ApiResponse<null>>(`/api/v1/blogs/${cleanSlug}/view/`, {
      method: "POST",
      revalidate: false,
    });

    return res?.success ?? false;
  } catch (error) {
    console.error(`recordBlogView for '${slug}' failed:`, error);
    return false;
  }
}
