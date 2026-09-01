"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Sparkles,
  Smartphone,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Briefcase,
  MapPin,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Job, getJobs } from "@/lib/jobs-data";
import { JobCard } from "./job-card";
import { JobCardSkeleton } from "./job-card-skeleton";
import { JobFiltersSidebar, JobFilterValues } from "./job-filters-sidebar";
import { JobSeoLinks } from "./job-seo-links";
import { siteConfig } from "@/config/site";
import { useMasterdataStore } from "@/store/masterdata-store";
import { POPULAR_CITIES } from "@/config/jobs-taxonomy";
import { cn } from "@/lib/utils";
import { isCityMatch, normalizeCitySlug } from "@/lib/city-normalizer";
import { Footer } from "@/components/shared";
import { faqs } from "./jobs-faq-data";


// Helper to match jobs with selected city/location supporting all Indian aliases & variations
function isLocationMatch(job: Job, targetSlugOrId: string): boolean {
  if (!targetSlugOrId || targetSlugOrId === "all") return true;
  return isCityMatch(job.location, job.cityName, job.cityId, targetSlugOrId);
}

interface JobsContentProps {
  initialJobs: Job[];
  totalJobs: number;
  heading: string;
  subheading: string;
  breadcrumbLabel: string;
  roleSlug?: string;
  citySlug?: string;
  experienceSlug?: string;
  workModeSlug?: string;
  jobTypeSlug?: string;
  workShiftSlug?: string;
  initialSearch?: string;
}

export function JobsContent({
  initialJobs,
  totalJobs: initialTotalJobs,
  heading,
  subheading,
  breadcrumbLabel,
  roleSlug = "",
  citySlug = "all",
  experienceSlug = "",
  workModeSlug,
  jobTypeSlug,
  workShiftSlug,
  initialSearch = "",
}: JobsContentProps) {
  const reducedMotion = useReducedMotion();
  
  // FAQ state management (matching how-it-works format)
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All Questions");
  
  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "All Questions" || faq.category === activeCategory
  );

  const fadeIn = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  const {
    loadMasterdata,
    jobRoles,
    cities,
    workModes,
    jobTypes,
    workShifts,
    roleCategories,
    experienceRanges,
    salaryRanges,
    skills,
  } = useMasterdataStore();

  useEffect(() => {
    loadMasterdata();
  }, [loadMasterdata]);

  // Server-side paginated jobs state
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [totalJobs, setTotalJobs] = useState<number>(initialTotalJobs);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    Math.max(1, Math.ceil(initialTotalJobs / 12))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 12;
  const isInitialMount = useRef(true);
  const streamTopRef = useRef<HTMLDivElement>(null);

  // Comprehensive filter state strictly matching jobs_browse.md query parameters
  const [filters, setFilters] = useState<JobFilterValues>({
    search: initialSearch || "",
    roleId: "",
    roleSlug: roleSlug,
    workModeId: workModeSlug || "",
    jobTypeId: jobTypeSlug || "",
    workShiftId: workShiftSlug || "",
    experienceId: experienceSlug || "",
    salaryRangeId: "",
    cityId: "",
    citySlug: citySlug || "all",
    stateId: "",
    selectedSkillIds: [],
    isFreeForCandidates: false,
    ordering: "-published_at",
  });

  const prevPropsRef = useRef({ roleSlug, citySlug, experienceSlug, workModeSlug, jobTypeSlug, workShiftSlug, initialSearch });

  // Sync props on route changes only when props actually change
  useEffect(() => {
    const prev = prevPropsRef.current;
    if (
      prev.citySlug !== citySlug ||
      prev.roleSlug !== roleSlug ||
      prev.experienceSlug !== experienceSlug ||
      prev.workModeSlug !== workModeSlug ||
      prev.jobTypeSlug !== jobTypeSlug ||
      prev.workShiftSlug !== workShiftSlug ||
      prev.initialSearch !== initialSearch
    ) {
      prevPropsRef.current = { roleSlug, citySlug, experienceSlug, workModeSlug, jobTypeSlug, workShiftSlug, initialSearch };
      setFilters((f) => ({
        ...f,
        citySlug: citySlug || "all",
        roleSlug: roleSlug || "",
        experienceId: experienceSlug || "",
        workModeId: workModeSlug || "",
        jobTypeId: jobTypeSlug || "",
        workShiftId: workShiftSlug || "",
        search: initialSearch || "",
      }));
      setCurrentPage(1);
    }
  }, [citySlug, roleSlug, experienceSlug, workModeSlug, jobTypeSlug, workShiftSlug, initialSearch]);

  // Synchronize slug-based filters with masterdata store once loaded
  useEffect(() => {
    if (!workModeSlug && !jobTypeSlug && !workShiftSlug) return;

    setFilters((prev) => {
      let updatedModeId = prev.workModeId;
      let updatedTypeId = prev.jobTypeId;
      let updatedShiftId = prev.workShiftId;

      if (workModeSlug) {
        const direct = workModes.find((x) => x.id === workModeSlug);
        if (direct) {
          updatedModeId = direct.id;
        } else if (workModeSlug === "remote" || workModeSlug.includes("home")) {
          const m = workModes.find((x) => x.name.toLowerCase().includes("home") || x.name.toLowerCase().includes("remote") || x.id.includes("remote"));
          if (m) updatedModeId = m.id;
        } else if (workModeSlug === "onsite" || workModeSlug.includes("office") || workModeSlug.includes("site")) {
          const m = workModes.find((x) => x.name.toLowerCase().includes("office") || x.name.toLowerCase().includes("site") || x.id.includes("onsite"));
          if (m) updatedModeId = m.id;
        } else if (workModeSlug === "field" || workModeSlug.includes("field")) {
          const m = workModes.find((x) => x.name.toLowerCase().includes("field") || x.id.includes("field"));
          if (m) updatedModeId = m.id;
        }
      }

      if (jobTypeSlug) {
        const direct = jobTypes.find((x) => x.id === jobTypeSlug);
        if (direct) {
          updatedTypeId = direct.id;
        } else if (jobTypeSlug === "full-time" || jobTypeSlug.includes("full")) {
          const t = jobTypes.find((x) => x.name.toLowerCase().includes("full") || x.id.includes("full"));
          if (t) updatedTypeId = t.id;
        } else if (jobTypeSlug === "part-time" || jobTypeSlug.includes("part")) {
          const t = jobTypes.find((x) => x.name.toLowerCase().includes("part") || x.id.includes("part"));
          if (t) updatedTypeId = t.id;
        } else if (jobTypeSlug === "both" || jobTypeSlug.includes("both")) {
          const t = jobTypes.find((x) => x.name.toLowerCase().includes("both") || x.id.includes("both"));
          if (t) updatedTypeId = t.id;
        }
      }

      if (workShiftSlug) {
        const direct = workShifts.find((x) => x.id === workShiftSlug);
        if (direct) {
          updatedShiftId = direct.id;
        } else if (workShiftSlug === "day" || workShiftSlug.includes("day")) {
          const s = workShifts.find((x) => x.name.toLowerCase().includes("day") || x.id.includes("day"));
          if (s) updatedShiftId = s.id;
        } else if (workShiftSlug === "night" || workShiftSlug.includes("night")) {
          const s = workShifts.find((x) => x.name.toLowerCase().includes("night") || x.id.includes("night"));
          if (s) updatedShiftId = s.id;
        } else if (workShiftSlug === "hybrid" || workShiftSlug.includes("hybrid")) {
          const s = workShifts.find((x) => x.name.toLowerCase().includes("hybrid") || x.id.includes("hybrid"));
          if (s) updatedShiftId = s.id;
        }
      }

      if (
        updatedModeId === prev.workModeId &&
        updatedTypeId === prev.jobTypeId &&
        updatedShiftId === prev.workShiftId
      ) {
        return prev;
      }

      return {
        ...prev,
        workModeId: updatedModeId,
        jobTypeId: updatedTypeId,
        workShiftId: updatedShiftId,
      };
    });
  }, [workModeSlug, jobTypeSlug, workShiftSlug, workModes, jobTypes, workShifts]);

  // Smooth scroll into directory section if keyword is searching for directory
  useEffect(() => {
    if (!initialSearch) return;
    const lower = initialSearch.toLowerCase();
    if (lower.includes("city") || lower.includes("location")) {
      const el = document.getElementById("directory-cities");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 450);
      }
    } else if (lower.includes("department") || lower.includes("role") || lower.includes("category")) {
      const el = document.getElementById("directory-departments");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 450);
      }
    }
  }, [initialSearch]);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Fetch jobs dynamically from backend on page or filter changes
  const executeSearch = useCallback(
    async (pageToFetch: number, activeFilters: JobFilterValues) => {
      setIsLoading(true);
      try {
        const skillsQuery =
          activeFilters.selectedSkillIds.length > 0
            ? skills
                .filter((s) => activeFilters.selectedSkillIds.includes(s.id))
                .map((s) => s.name)
                .join(",")
            : undefined;

        const res = await getJobs({
          roleSlug: activeFilters.roleSlug,
          roleId: activeFilters.roleId,
          citySlug: activeFilters.citySlug,
          cityId: activeFilters.cityId,
          stateId: activeFilters.stateId,
          experienceSlug: activeFilters.experienceId,
          experienceId: activeFilters.experienceId,
          salaryRangeId: activeFilters.salaryRangeId,
          jobTypeId: activeFilters.jobTypeId,
          workModeId: activeFilters.workModeId,
          workShiftId: activeFilters.workShiftId,
          skills: skillsQuery,
          isFreeForCandidates: activeFilters.isFreeForCandidates,
          search: activeFilters.search,
          ordering: activeFilters.ordering as any,
          page: pageToFetch,
          limit: pageSize,
        });

        setJobs(res.jobs);
        setTotalJobs(res.totalJobs);
        setTotalPages(Math.max(1, res.totalPages));
      } catch (err) {
        console.error("Failed to fetch server page:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [skills, pageSize]
  );

  // Trigger server-side fetch on page or filter changes (debounced for search text)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(
      () => {
        executeSearch(currentPage, filters);
      },
      filters.search ? 350 : 0
    );

    return () => clearTimeout(timer);
  }, [currentPage, filters, executeSearch]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (streamTopRef.current) {
      streamTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      roleId: "",
      roleSlug: "",
      workModeId: "",
      jobTypeId: "",
      workShiftId: "",
      experienceId: "",
      salaryRangeId: "",
      cityId: "",
      citySlug: "all",
      stateId: "",
      selectedSkillIds: [],
      isFreeForCandidates: false,
      ordering: "relevance",
    });
    setCurrentPage(1);
  };

  // Active filter label tags for quick dismissal
  const activeTags = useMemo(() => {
    const tags: { id: string; label: string; onRemove: () => void }[] = [];

    if (filters.search) {
      tags.push({
        id: "search",
        label: `"${filters.search}"`,
        onRemove: () => setFilters((f) => ({ ...f, search: "" })),
      });
    }

    if (filters.roleId || filters.roleSlug) {
      const roleObj = jobRoles.find((r) => r.id === filters.roleId);
      tags.push({
        id: "role",
        label: roleObj?.name || filters.roleSlug.replace(/-/g, " "),
        onRemove: () =>
          setFilters((f) => ({ ...f, roleId: "", roleSlug: "" })),
      });
    }

    if (filters.workModeId) {
      const modeObj = workModes.find((m) => m.id === filters.workModeId);
      const label =
        modeObj?.name ||
        (filters.workModeId === "585ed3ae-c9eb-4f89-a715-33544efa1c07" || filters.workModeId === "onsite"
          ? "Work from Office"
          : filters.workModeId === "8c974af2-6d8b-49c8-b891-0a5ce9847024" || filters.workModeId === "field"
          ? "Field Job"
          : filters.workModeId === "bf5f80ba-b651-47c0-be52-9978569789d7" || filters.workModeId === "remote"
          ? "Work from Home"
          : filters.workModeId);
      tags.push({
        id: "mode",
        label,
        onRemove: () => setFilters((f) => ({ ...f, workModeId: "" })),
      });
    }

    if (filters.jobTypeId) {
      const typeObj = jobTypes.find((t) => t.id === filters.jobTypeId);
      const label =
        typeObj?.name ||
        (filters.jobTypeId === "c2e13590-f69f-4bd4-9545-09cf81daae9e" || filters.jobTypeId === "full-time"
          ? "Full Time"
          : filters.jobTypeId === "fdde7c2d-88e6-4ecf-9fb5-596ca7f81c69" || filters.jobTypeId === "part-time"
          ? "Part Time"
          : filters.jobTypeId === "28ecf748-85c0-4deb-9133-8f24ec85fc11" || filters.jobTypeId === "both"
          ? "Both (Full-Time/Part-Time)"
          : filters.jobTypeId);
      tags.push({
        id: "type",
        label,
        onRemove: () => setFilters((f) => ({ ...f, jobTypeId: "" })),
      });
    }

    if (filters.workShiftId) {
      const shiftObj = workShifts.find((s) => s.id === filters.workShiftId);
      const label =
        shiftObj?.name ||
        (filters.workShiftId === "f7d70b0b-57c0-4014-8002-7d170de4c299" || filters.workShiftId === "day"
          ? "Day Shift"
          : filters.workShiftId === "6e9a009a-35af-4bfe-baa9-a77b56ca443b" || filters.workShiftId === "night"
          ? "Night Shift"
          : filters.workShiftId === "8a5eafb2-daef-4246-9e58-5331a2c94dcd" || filters.workShiftId === "hybrid"
          ? "Hybrid"
          : filters.workShiftId);
      tags.push({
        id: "shift",
        label,
        onRemove: () => setFilters((f) => ({ ...f, workShiftId: "" })),
      });
    }

    if (filters.experienceId) {
      const expObj = experienceRanges.find((e) => e.id === filters.experienceId);
      tags.push({
        id: "exp",
        label: expObj?.label || filters.experienceId,
        onRemove: () => setFilters((f) => ({ ...f, experienceId: "" })),
      });
    }

    if (filters.salaryRangeId) {
      const salObj = salaryRanges.find((s) => s.id === filters.salaryRangeId);
      tags.push({
        id: "salary",
        label: salObj?.label || "Salary Range",
        onRemove: () => setFilters((f) => ({ ...f, salaryRangeId: "" })),
      });
    }

    if (filters.citySlug && filters.citySlug !== "all") {
      const cityObj = cities.find((c) => c.id === filters.cityId);
      tags.push({
        id: "city",
        label: cityObj?.name || filters.citySlug.replace(/-/g, " "),
        onRemove: () =>
          setFilters((f) => ({ ...f, cityId: "", citySlug: "all" })),
      });
    }

    filters.selectedSkillIds.forEach((skillId) => {
      const skillObj = skills.find((s) => s.id === skillId);
      if (skillObj) {
        tags.push({
          id: `skill-${skillId}`,
          label: skillObj.name,
          onRemove: () =>
            setFilters((f) => ({
              ...f,
              selectedSkillIds: f.selectedSkillIds.filter((id) => id !== skillId),
            })),
        });
      }
    });

    return tags;
  }, [
    filters,
    jobRoles,
    cities,
    workModes,
    jobTypes,
    workShifts,
    experienceRanges,
    salaryRanges,
    skills,
  ]);

  return (
    <main className="min-h-dvh bg-white dark:bg-background pt-28 sm:pt-32 transition-colors flex flex-col justify-between">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-20 flex-1">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <Link href="/jobs" className="hover:text-foreground transition-colors">
            Jobs
          </Link>
          {breadcrumbLabel && breadcrumbLabel !== "All Jobs" && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
              <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none">
                {breadcrumbLabel}
              </span>
            </>
          )}
        </nav>

        {/* PAGE HERO / TITLE HEADER */}
        <div className="mt-6 mb-6 sm:mt-8 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {heading}
              </h1>
              <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {subheading}
              </p>
            </div>

            {/* Live Count Indicator */}
            <div className="flex items-center gap-2 self-start md:self-end rounded-xl border border-border/80 bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xs shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {totalJobs > 0 ? `${totalJobs} Live Openings` : `${initialTotalJobs} Positions`}
              </span>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH PROFESSIONAL SEARCH SECTION OVER FILTERS & CARDS */}
        <div className="relative overflow-hidden mb-8 rounded-2xl border border-border/70 bg-card/60 dark:bg-card/40 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-500/30 before:to-transparent">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5"
          >
            {/* 1. Keyword / Title / Skill Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Job title, skills, company, or keywords..."
                value={filters.search}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, search: e.target.value }));
                  setCurrentPage(1);
                }}
                className="h-11 sm:h-12 w-full rounded-xl border border-border/80 bg-background pl-10 pr-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, search: "" }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* 2. City / Location Select */}
            <div className="relative w-full md:w-48 lg:w-52">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={filters.citySlug || "all"}
                onChange={(e) => {
                  const val = e.target.value;
                  const cityObj = cities.find(
                    (c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === val || c.id === val
                  );
                  setFilters((f) => ({
                    ...f,
                    citySlug: val,
                    cityId: cityObj?.id || (val === "all" ? "" : val),
                  }));
                  setCurrentPage(1);
                }}
                className="h-11 sm:h-12 w-full rounded-xl border border-border/80 bg-background pl-10 pr-8 text-xs sm:text-sm font-medium text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
              >
                <option value="all">All Locations</option>
                {cities && cities.length > 0 ? (
                  cities.map((c) => {
                    const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <option key={c.id} value={slug}>
                        {c.name}
                      </option>
                    );
                  })
                ) : (
                  POPULAR_CITIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* 3. Experience Level Select */}
            <div className="relative w-full md:w-44 lg:w-48">
              <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={filters.experienceId}
                onChange={(e) => {
                  setFilters((f) => ({ ...f, experienceId: e.target.value }));
                  setCurrentPage(1);
                }}
                className="h-11 sm:h-12 w-full rounded-xl border border-border/80 bg-background pl-10 pr-8 text-xs sm:text-sm font-medium text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
              >
                <option value="">All Experience</option>
                {experienceRanges && experienceRanges.length > 0 ? (
                  experienceRanges.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.label}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="exp-0-1">0-1 yrs (Freshers)</option>
                    <option value="exp-1-3">1-3 yrs</option>
                    <option value="exp-3-5">3-5 yrs</option>
                    <option value="exp-5+">5+ yrs</option>
                  </>
                )}
              </select>
            </div>

            {/* 4. Professional Search Button on Right */}
            <button
              type="submit"
              className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 sm:px-8 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-500 hover:shadow-md active:scale-98 cursor-pointer shrink-0"
            >
              <Search className="h-4 w-4" />
              <span>Search Jobs</span>
            </button>
          </form>

          {/* Quick Discovery Shortcut Pills (Apna style) */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-border/50 text-xs">
            <span className="text-muted-foreground font-medium mr-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-brand-600 dark:text-brand-400" />
              Popular:
            </span>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  citySlug: f.citySlug === "remote" ? "all" : "remote",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.citySlug === "remote"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Work from Home
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  experienceId: f.experienceId === "freshers" ? "" : "freshers",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.experienceId === "freshers"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Freshers (0-1 yrs)
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  citySlug: f.citySlug === "bangalore" ? "all" : "bangalore",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.citySlug === "bangalore"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Bangalore
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  citySlug: f.citySlug === "delhi-ncr" ? "all" : "delhi-ncr",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.citySlug === "delhi-ncr"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Delhi NCR
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  citySlug: f.citySlug === "mumbai" ? "all" : "mumbai",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.citySlug === "mumbai"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Mumbai
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  citySlug: f.citySlug === "pune" ? "all" : "pune",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.citySlug === "pune"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Pune
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({
                  ...f,
                  citySlug: f.citySlug === "hyderabad" ? "all" : "hyderabad",
                }));
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg border px-2.5 py-1 font-medium transition-colors cursor-pointer",
                filters.citySlug === "hyderabad"
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-500/40 hover:text-foreground"
              )}
            >
              Hyderabad
            </button>
          </div>

          {/* Active Filter Tags */}
          {activeTags.length > 0 && (
            <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
              <span className="text-xs text-muted-foreground font-medium mr-1">
                Active filters:
              </span>
              {activeTags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-500/20 bg-brand-50/80 dark:bg-brand-950/30 px-2.5 py-1 text-xs font-medium text-brand-700 dark:text-brand-300"
                >
                  <span>{tag.label}</span>
                  <button
                    type="button"
                    onClick={tag.onRemove}
                    className="rounded-full hover:bg-brand-200/50 dark:hover:bg-brand-800/50 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors ml-auto cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main 2-Column Layout: Left Filters + Middle Jobs List */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <JobFiltersSidebar
              filters={filters}
              onChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              onReset={handleResetFilters}
              totalJobsCount={totalJobs}
              isMobileDrawerOpen={isMobileDrawerOpen}
              onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
            />
          </div>

          {/* MIDDLE SCREEN: JOB LISTINGS */}
          <div ref={streamTopRef} className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-5">
            {/* Stream Header Toolbar: Results count + Sort + Mobile Filter Trigger */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium flex items-center gap-2">
                {isLoading ? (
                  <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Updating jobs...</span>
                  </span>
                ) : (
                  <span>
                    Showing{" "}
                    <strong className="text-foreground">
                      {totalJobs === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
                      {Math.min(currentPage * pageSize, totalJobs)}
                    </strong>{" "}
                    of <strong className="text-foreground">{totalJobs}</strong>{" "}
                    {totalJobs === 1 ? "opening" : "openings"}
                  </span>
                )}
              </span>

              <div className="flex items-center gap-2.5">
                {/* Sort / Ordering Dropdown */}
                <div className="relative flex items-center">
                  <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={filters.ordering}
                    onChange={(e) => {
                      setFilters((f) => ({ ...f, ordering: e.target.value }));
                      setCurrentPage(1);
                    }}
                    className="h-9.5 rounded-xl border border-border/80 bg-background pl-8.5 pr-7 text-xs font-semibold text-foreground focus:border-brand-500 focus:outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="-published_at">Newest First</option>
                    <option value="published_at">Oldest First</option>
                    <option value="-compatibility_score">Most Relevant</option>
                    <option value="-created_at">Recently Created</option>
                  </select>
                </div>

                {/* Mobile Filters Button Trigger */}
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="flex lg:hidden h-9.5 items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                  <span>Filters</span>
                  {activeTags.length > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                      {activeTags.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Job Listings Grid with Skeleton Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-3.5 items-stretch">
                <JobCardSkeleton count={pageSize} />
              </div>
            ) : jobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-3.5 items-stretch">
                  {jobs.map((job, idx) => (
                    <JobCard key={job.id} job={job} index={idx} />
                  ))}
                </div>

                {/* Enhanced Server-Side Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
                    {/* Left status badge */}
                    <div className="text-xs text-muted-foreground font-medium order-2 sm:order-1">
                      Page <strong className="text-foreground">{currentPage}</strong> of{" "}
                      <strong className="text-foreground">{totalPages}</strong>{" "}
                      <span className="hidden md:inline">({totalJobs} total positions)</span>
                    </div>

                    {/* Pagination Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 order-1 sm:order-2">
                      {/* First Page Button */}
                      <button
                        type="button"
                        disabled={currentPage === 1 || isLoading}
                        onClick={() => handlePageChange(1)}
                        aria-label="First page"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground transition-all hover:border-brand-500/40 hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </button>

                      {/* Previous Button */}
                      <button
                        type="button"
                        disabled={currentPage === 1 || isLoading}
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        aria-label="Previous page"
                        className="inline-flex h-9 items-center gap-1 rounded-xl border border-border/70 bg-card px-2.5 sm:px-3 text-xs font-medium text-foreground transition-all hover:border-brand-500/40 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Prev</span>
                      </button>

                      {/* Numbered Buttons */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => {
                          if (totalPages <= 7) return true;
                          if (p === 1 || p === totalPages) return true;
                          if (Math.abs(p - currentPage) <= 1) return true;
                          return false;
                        })
                        .map((p, idx, arr) => {
                          const showEllipsisBefore = idx > 0 && p - arr[idx - 1] > 1;
                          return (
                            <div key={p} className="flex items-center gap-1">
                              {showEllipsisBefore && (
                                <span className="px-1 text-xs text-muted-foreground font-mono">
                                  ...
                                </span>
                              )}
                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handlePageChange(p)}
                                aria-current={currentPage === p ? "page" : undefined}
                                className={cn(
                                  "h-9 min-w-[36px] px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                                  currentPage === p
                                    ? "bg-brand-600 text-white shadow-xs font-bold ring-2 ring-brand-500/20"
                                    : "border border-border/70 bg-card text-muted-foreground hover:text-foreground hover:border-brand-500/40 hover:bg-muted"
                                )}
                              >
                                {p}
                              </button>
                            </div>
                          );
                        })}

                      {/* Next Button */}
                      <button
                        type="button"
                        disabled={currentPage === totalPages || isLoading}
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        aria-label="Next page"
                        className="inline-flex h-9 items-center gap-1 rounded-xl border border-border/70 bg-card px-2.5 sm:px-3 text-xs font-medium text-foreground transition-all hover:border-brand-500/40 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Last Page Button */}
                      <button
                        type="button"
                        disabled={currentPage === totalPages || isLoading}
                        onClick={() => handlePageChange(totalPages)}
                        aria-label="Last page"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground transition-all hover:border-brand-500/40 hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Authentic clean empty state without dummy jobs */
              <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center bg-card/60">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  No matching jobs found
                </h3>
                <p className="mt-1 max-w-sm mx-auto text-xs sm:text-sm text-muted-foreground">
                  We couldn't find any job openings matching your current filter criteria. Try clearing or expanding your filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-500 transition-colors shadow-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Mobile App Callout Banner */}
            <div className="mt-12 overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-50 via-card to-indigo-50/70 dark:from-brand-950/30 dark:via-card dark:to-indigo-950/30 p-6 sm:p-8 backdrop-blur-md shadow-xs">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Swipe-Based Hiring</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Get interviewed 3x faster with the Hirance App
                  </h3>
                  <p className="max-w-xl text-xs sm:text-sm text-muted-foreground">
                    Skip long application forms. Swipe right on roles you like and chat directly with verified hiring teams.
                  </p>
                </div>

                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-500 hover:shadow-lg shrink-0"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Download Hirance App</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Matching How It Works Page Style */}
        <section id="faq" className="relative py-20 sm:py-28 overflow-hidden border-t border-border/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Header (Clean & Professional) */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about finding jobs on Hirance.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {["All Questions", "Candidates", "Employers", "General"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenFaq(0);
                  }}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion FAQ Items (Clean Lines, No Cards) */}
            <div className="mt-10 divide-y divide-border/40 border-y border-border/40">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-4 sm:py-5 transition-colors">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg py-1"
                    >
                      <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 bg-brand-600 text-white dark:text-white" : ""
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${idx}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 pb-1 text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Full-Width Programmatic SEO Career Hubs */}
        <JobSeoLinks currentRoleSlug={roleSlug} currentCitySlug={citySlug} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
