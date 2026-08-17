"use client";

import { create } from "zustand";
import { JobListItem, JobSearchParams } from "@/types/jobs";
import { fetchJobs as apiFetchJobs } from "@/lib/api/jobs";

interface FilterState {
  search: string;
  jobRole: string; // UUID or empty
  city: string; // UUID or empty
  jobType: string; // UUID or empty
  workMode: string; // UUID or empty
  experienceLevel: string; // UUID or empty
  ordering: JobSearchParams["ordering"];
  isFreeForCandidates?: boolean;
}

interface JobsStoreState {
  // Data
  jobs: JobListItem[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: FilterState;

  // Actions
  hydrate: (initialJobs: JobListItem[], totalCount: number, page?: number, totalPages?: number) => void;
  setSearch: (search: string) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setPage: (page: number) => void;
  setOrdering: (ordering: JobSearchParams["ordering"]) => void;
  resetFilters: () => void;
  loadJobs: () => Promise<void>;
}

const initialFilters: FilterState = {
  search: "",
  jobRole: "",
  city: "",
  jobType: "",
  workMode: "",
  experienceLevel: "",
  ordering: "-published_at",
  isFreeForCandidates: undefined,
};

export const useJobsStore = create<JobsStoreState>((set, get) => ({
  jobs: [],
  totalJobs: 0,
  currentPage: 1,
  totalPages: 1,
  pageSize: 12,
  isLoading: false,
  error: null,
  filters: initialFilters,

  hydrate: (initialJobs, totalCount, page = 1, totalPages = 1) => {
    set({
      jobs: initialJobs,
      totalJobs: totalCount,
      currentPage: page,
      totalPages: totalPages > 0 ? totalPages : Math.ceil(totalCount / get().pageSize) || 1,
    });
  },

  setSearch: (search: string) => {
    set((state) => ({
      filters: { ...state.filters, search },
      currentPage: 1,
    }));
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1,
    }));
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().loadJobs();
  },

  setOrdering: (ordering) => {
    set((state) => ({
      filters: { ...state.filters, ordering },
      currentPage: 1,
    }));
    get().loadJobs();
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
      currentPage: 1,
    });
    get().loadJobs();
  },

  loadJobs: async () => {
    const { filters, currentPage, pageSize } = get();
    set({ isLoading: true, error: null });

    try {
      const params: JobSearchParams = {
        page: currentPage,
        page_size: pageSize,
        search: filters.search || undefined,
        job_role: filters.jobRole || undefined,
        city: filters.city || undefined,
        job_type: filters.jobType || undefined,
        work_mode: filters.workMode || undefined,
        experience_level: filters.experienceLevel || undefined,
        ordering: filters.ordering || undefined,
        is_free_for_candidates: filters.isFreeForCandidates,
      };

      const response = await apiFetchJobs(params, { revalidate: 30 });

      if (response.success) {
        set({
          jobs: response.data,
          totalJobs: response.pagination.count,
          totalPages: response.pagination.total_pages,
          currentPage: response.pagination.current_page,
          isLoading: false,
        });
      } else {
        set({
          isLoading: false,
          error: response.message || "Failed to load jobs",
        });
      }
    } catch (error) {
      console.error("Error loading jobs in store:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load jobs",
      });
    }
  },
}));
