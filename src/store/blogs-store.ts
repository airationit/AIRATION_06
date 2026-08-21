"use client";

import { create } from "zustand";
import {
  BlogCategory,
  BlogListItem,
  BlogSearchParams,
  BlogTag,
} from "@/types/blogs";
import {
  fetchBlogs as apiFetchBlogs,
  fetchBlogCategories as apiFetchCategories,
  fetchBlogTags as apiFetchTags,
} from "@/lib/api/blogs";

interface BlogFilterState {
  category: string;
  tag: string;
  search: string;
  ordering: string;
  featured?: boolean;
}

interface BlogsStoreState {
  // Data
  blogs: BlogListItem[];
  featuredBlog: BlogListItem | null;
  categories: BlogCategory[];
  tags: BlogTag[];
  totalBlogs: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: BlogFilterState;

  // Actions
  hydrate: (
    initialBlogs: BlogListItem[],
    totalCount: number,
    categories?: BlogCategory[],
    tags?: BlogTag[],
    page?: number,
    totalPages?: number,
    featuredBlog?: BlogListItem | null
  ) => void;
  setCategory: (category: string) => void;
  setTag: (tag: string) => void;
  setSearch: (search: string) => void;
  setOrdering: (ordering: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  loadBlogs: () => Promise<void>;
  loadCategoriesAndTags: () => Promise<void>;
}

const initialFilters: BlogFilterState = {
  category: "all",
  tag: "",
  search: "",
  ordering: "-published_at",
  featured: undefined,
};

export const useBlogsStore = create<BlogsStoreState>((set, get) => ({
  blogs: [],
  featuredBlog: null,
  categories: [],
  tags: [],
  totalBlogs: 0,
  currentPage: 1,
  totalPages: 1,
  pageSize: 9,
  isLoading: false,
  error: null,
  filters: initialFilters,

  hydrate: (
    initialBlogs,
    totalCount,
    categories = [],
    tags = [],
    page = 1,
    totalPages = 1,
    featuredBlog = null
  ) => {
    // Determine featured blog if not provided
    const featured =
      featuredBlog ||
      initialBlogs.find((b) => b.featured) ||
      initialBlogs[0] ||
      null;

    set({
      blogs: initialBlogs,
      totalBlogs: totalCount,
      categories: categories.length > 0 ? categories : get().categories,
      tags: tags.length > 0 ? tags : get().tags,
      currentPage: page,
      totalPages: totalPages > 0 ? totalPages : Math.ceil(totalCount / get().pageSize) || 1,
      featuredBlog: featured,
    });
  },

  setCategory: (category: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        category: category.toLowerCase(),
        tag: "", // Reset tag when switching category
      },
      currentPage: 1,
    }));
    get().loadBlogs();
  },

  setTag: (tag: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        tag: state.filters.tag === tag ? "" : tag, // Toggle tag
      },
      currentPage: 1,
    }));
    get().loadBlogs();
  },

  setSearch: (search: string) => {
    set((state) => ({
      filters: { ...state.filters, search },
      currentPage: 1,
    }));
  },

  setOrdering: (ordering: string) => {
    set((state) => ({
      filters: { ...state.filters, ordering },
      currentPage: 1,
    }));
    get().loadBlogs();
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().loadBlogs();
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
      currentPage: 1,
    });
    get().loadBlogs();
  },

  loadBlogs: async () => {
    const { filters, currentPage, pageSize } = get();
    set({ isLoading: true, error: null });

    try {
      const params: BlogSearchParams = {
        page: currentPage,
        page_size: pageSize,
        category: filters.category !== "all" ? filters.category : undefined,
        tag: filters.tag || undefined,
        search: filters.search || undefined,
        ordering: filters.ordering || undefined,
        featured: filters.featured,
      };

      const response = await apiFetchBlogs(params, { revalidate: 30 });

      if (response.success) {
        // If on page 1 with no filters, update featured post as well
        const isDefaultView = filters.category === "all" && !filters.tag && !filters.search && currentPage === 1;
        const newFeatured = isDefaultView
          ? response.data.find((b) => b.featured) || response.data[0] || null
          : get().featuredBlog;

        set({
          blogs: response.data,
          totalBlogs: response.pagination.count,
          totalPages: response.pagination.total_pages,
          currentPage: response.pagination.current_page,
          featuredBlog: newFeatured,
          isLoading: false,
        });
      } else {
        set({
          isLoading: false,
          error: response.message || "Failed to load blogs",
        });
      }
    } catch (error) {
      console.error("Error loading blogs in store:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load blogs",
      });
    }
  },

  loadCategoriesAndTags: async () => {
    try {
      const [categories, tags] = await Promise.all([
        apiFetchCategories({ revalidate: 3600 }),
        apiFetchTags({ revalidate: 3600 }),
      ]);

      set({ categories, tags });
    } catch (error) {
      console.error("Error loading blog categories and tags:", error);
    }
  },
}));
