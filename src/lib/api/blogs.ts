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
import {
  FALLBACK_BLOG_CATEGORIES,
  FALLBACK_BLOG_LIST_ITEMS,
  FALLBACK_BLOG_TAGS,
  FALLBACK_BLOGS,
} from "@/data/blogs";

/**
 * Fetch candidate/public-facing blogs list with filtering, search, and pagination
 * Endpoint: GET /api/v1/blogs/
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
      revalidate: options?.revalidate ?? 60, // 60s ISR cache
    });

    if (res && res.success && Array.isArray(res.data)) {
      // If backend has full dataset (or if searching/filtering), return API response.
      // If backend has only partial data (less than local dataset), fall through to local fallback.
      const isFiltered = params?.search || (params?.category && params.category !== "all") || params?.tag;
      if (isFiltered || (res.pagination?.count ?? res.data.length) >= FALLBACK_BLOG_LIST_ITEMS.length) {
        return res;
      }
    }

    throw new Error(res?.message || "API returned incomplete dataset, using local static blogs");
  } catch (error) {
    console.warn("fetchBlogs API failed or is not fully populated, using local dataset:", error);

    // ── Local fallback: filter, sort & paginate FALLBACK_BLOG_LIST_ITEMS ──
    let filtered = [...FALLBACK_BLOG_LIST_ITEMS];

    if (params) {
      if (params.category && params.category !== "all") {
        filtered = filtered.filter(
          (b) =>
            b.category.slug.toLowerCase() === params.category!.toLowerCase() ||
            b.category.name.toLowerCase() === params.category!.toLowerCase()
        );
      }

      if (params.tag) {
        const tagLower = params.tag.toLowerCase();
        filtered = filtered.filter((b) =>
          b.tags.some((t) => t.toLowerCase() === tagLower || t.toLowerCase().replace(/\s+/g, "-") === tagLower)
        );
      }

      if (params.search) {
        const q = params.search.toLowerCase().trim();
        filtered = filtered.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.excerpt.toLowerCase().includes(q) ||
            b.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      if (params.featured !== undefined) {
        filtered = filtered.filter((b) => b.featured === params.featured);
      }

      if (params.ordering === "-views_count") {
        filtered.sort((a, b) => b.views_count - a.views_count);
      } else if (params.ordering === "published_at") {
        filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
      } else {
        // default: newest first
        filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      }
    }

    const page = params?.page || 1;
    const pageSize = params?.page_size || 10;
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

    return {
      success: true,
      message: "Blogs fetched successfully (local dataset)",
      data: paginatedItems,
      pagination: {
        count: totalCount,
        total_pages: totalPages,
        current_page: page,
        page_size: pageSize,
        next: page < totalPages ? `?page=${page + 1}` : null,
        previous: page > 1 ? `?page=${page - 1}` : null,
      },
    };
  }
}

/**
 * Fetch a single blog post by slug
 * Endpoint: GET /api/v1/blogs/{slug}/
 */
export async function fetchBlogBySlug(
  slug: string,
  options?: { revalidate?: number | false }
): Promise<BlogDetail | null> {
  if (!slug) return null;

  try {
    const res = await apiClient<ApiResponse<BlogDetail>>(`/api/v1/blogs/${slug}/`, {
      revalidate: options?.revalidate ?? 120, // 2m ISR cache
    });

    if (res && res.success && res.data) {
      return res.data;
    }

    throw new Error(res?.message || `Post with slug '${slug}' not found`);
  } catch (error) {
    console.warn(`fetchBlogBySlug for '${slug}' failed, checking fallback dataset:`, error);
    const fallback = FALLBACK_BLOGS.find((b) => b.slug === slug);
    return fallback || null;
  }
}

/**
 * Fetch active blog categories with post counts
 * Endpoint: GET /api/v1/blogs/categories/
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

    throw new Error(res?.message || "Invalid category response");
  } catch (error) {
    console.warn("fetchBlogCategories failed, using fallback:", error);
    return FALLBACK_BLOG_CATEGORIES;
  }
}

/**
 * Fetch trending blog tags
 * Endpoint: GET /api/v1/blogs/tags/
 */
export async function fetchBlogTags(
  options?: { revalidate?: number | false }
): Promise<BlogTag[]> {
  try {
    const res = await apiClient<ApiResponse<BlogTag[]>>("/api/v1/blogs/tags/", {
      revalidate: options?.revalidate ?? 3600,
    });

    if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    throw new Error(res?.message || "Invalid tags response");
  } catch (error) {
    console.warn("fetchBlogTags failed, using fallback:", error);
    return FALLBACK_BLOG_TAGS;
  }
}

/**
 * Fetch sitemap listing for blog articles
 * Endpoint: GET /api/v1/blogs/sitemap/
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

    throw new Error(res?.message || "Invalid sitemap response");
  } catch (error) {
    console.warn("fetchBlogSitemap failed, generating from fallback:", error);
    return {
      total: FALLBACK_BLOGS.length,
      items: FALLBACK_BLOGS.map((b) => ({
        slug: b.slug,
        url: `https://hirance.com/blog/${b.slug}`,
        published_at: b.published_at,
        updated_at: b.updated_at || b.published_at,
        change_freq: "monthly",
        priority: b.featured ? 0.9 : 0.8,
      })),
    };
  }
}

/**
 * Record a blog view count increment
 * Endpoint: POST /api/v1/blogs/{slug}/view/
 */
export async function recordBlogView(slug: string): Promise<boolean> {
  if (!slug) return false;

  try {
    const res = await apiClient<ApiResponse<null>>(`/api/v1/blogs/${slug}/view/`, {
      method: "POST",
      revalidate: false,
    });

    return res?.success ?? false;
  } catch (error) {
    console.warn(`recordBlogView for '${slug}' failed:`, error);
    return false;
  }
}
