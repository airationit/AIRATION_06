"use client";

import { useEffect, useState, useTransition, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  ArrowRight,
  ArrowUpRight,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Loader2,
  Mail,
  Building2,
  Laptop,
  Briefcase,
  FileText,
  Users,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { BlogCategory, BlogListItem, BlogTag } from "@/types/blogs";
import { useBlogsStore } from "@/store/blogs-store";
import { formatBlogReadTime } from "@/lib/api/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

interface BlogListContentProps {
  initialBlogs: BlogListItem[];
  totalCount: number;
  initialCategories: BlogCategory[];
  initialTags: BlogTag[];
  currentPage: number;
  totalPages: number;
  featuredJobs?: any[];
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Fallback high-fidelity articles matching the design screenshot
const FALLBACK_ARTICLES: BlogListItem[] = [
  {
    id: "fb-1",
    slug: "ats-rejection-truth-ai-resume-screening",
    title: "The ATS Rejection Truth: How AI Matching is Changing Resumes in 2026",
    excerpt:
      "Your resume may be strong, but if an applicant tracking system cannot properly read or match it, a recruiter may never see it. Learn how ATS parsing and AI matching work in 2026.",
    category: {
      id: "ai-future",
      name: "AI & FUTURE OF HIRING",
      slug: "ai-future-of-hiring",
    },
    cover_image: {
      url: "https://cdn.hirance.com/blogs/covers/374d81e3-2c27-4373-b185-b6ccd5240da6.webp",
      alt: "ATS AI Resume Screening",
    },
    published_at: "2026-09-30T14:57:00Z",
    read_time: "9",
    featured: true,
    views_count: 1420,
    tags: ["ATS", "AI Resume", "Hiring"],
    author: {
      id: "a-1",
      name: "Neelam S.",
      role: "Backend Engineer",
      avatar: "https://cdn.hirance.com/blogs/authors/18a9aa5d-3023-4b88-9bd1-135c9388e5b0.webp",
    },
  },
  {
    id: "fb-2",
    slug: "2026-return-to-office-hybrid-work-india",
    title: "The 2026 Return-to-Office Debate: Why Hybrid Work Still Matters for...",
    excerpt:
      "India's workplace is changing again. As companies strengthen their return-to-office policies, hybrid work models are evolving, and employees are looking for flexibility. Here's what to expect in 2026.",
    category: {
      id: "future-work",
      name: "FUTURE OF WORK & HIRING TRENDS",
      slug: "future-of-work-hiring-trends",
    },
    cover_image: {
      url: "https://cdn.hirance.com/blogs/covers/41a115c4-134f-4a7f-a1c2-654a3f3e3763.webp",
      alt: "Return to Office Debate",
    },
    published_at: "2026-09-30T10:30:00Z",
    read_time: "8",
    featured: false,
    views_count: 980,
    tags: ["Hybrid Work", "RTO", "Work Culture"],
    author: {
      id: "a-1",
      name: "Neelam S.",
      role: "Backend Engineer",
      avatar: "https://cdn.hirance.com/blogs/authors/18a9aa5d-3023-4b88-9bd1-135c9388e5b0.webp",
    },
  },
  {
    id: "fb-3",
    slug: "salesforce-cloud-architect-salaries-india",
    title: "The Hidden Goldmine: Salesforce and Cloud Architect Salaries in India...",
    excerpt:
      "Salesforce and cloud architecture are becoming important career paths for technology professionals in India. Explore salary ranges, in-demand skills, and growth opportunities.",
    category: {
      id: "salesforce-cloud",
      name: "SALESFORCE & CLOUD CAREERS",
      slug: "salesforce-cloud-careers",
    },
    cover_image: {
      url: "https://cdn.hirance.com/blogs/covers/149ea062-78dc-44e6-b285-c7fee5d99476.webp",
      alt: "Salesforce Cloud Architect Salaries",
    },
    published_at: "2026-09-28T12:00:00Z",
    read_time: "6",
    featured: false,
    views_count: 1120,
    tags: ["Salesforce", "Cloud Architect", "Salary Trends"],
    author: {
      id: "a-1",
      name: "Neelam S.",
      role: "Backend Engineer",
      avatar: "https://cdn.hirance.com/blogs/authors/18a9aa5d-3023-4b88-9bd1-135c9388e5b0.webp",
    },
  },
  {
    id: "fb-4",
    slug: "salesforce-cloud-architect-careers-india",
    title: "The Hidden Goldmine: Salesforce and Cloud Architect Careers in India",
    excerpt:
      "Salesforce and cloud architecture are becoming important career paths for technology professionals in India. Explore salary ranges, in-demand skills, and growth opportunities.",
    category: {
      id: "cloud-enterprise",
      name: "CLOUD & ENTERPRISE CAREERS",
      slug: "cloud-enterprise-careers",
    },
    cover_image: {
      url: "https://cdn.hirance.com/blogs/covers/a2d6079d-9dde-466a-ad73-b663d584149a.webp",
      alt: "Cloud Architect Careers",
    },
    published_at: "2026-09-28T09:15:00Z",
    read_time: "6",
    featured: false,
    views_count: 890,
    tags: ["Cloud", "Enterprise", "Career Growth"],
    author: {
      id: "a-1",
      name: "Neelam S.",
      role: "Backend Engineer",
      avatar: "https://cdn.hirance.com/blogs/authors/18a9aa5d-3023-4b88-9bd1-135c9388e5b0.webp",
    },
  },
  {
    id: "fb-5",
    slug: "how-to-prepare-for-job-interview-2026",
    title: "How to Prepare for a Job Interview in 2026: Complete Guide for Freshers...",
    excerpt:
      "Preparing for a job interview is about more than memorizing answers. Learn how to research, showcase your skills, and make a lasting impression.",
    category: {
      id: "interview-prep",
      name: "INTERVIEW PREPARATION",
      slug: "interview-preparation",
    },
    cover_image: {
      url: "https://cdn.hirance.com/blogs/covers/d04d161e-23e5-4cc6-b4a7-25bb77f9b560.webp",
      alt: "Job Interview Guide",
    },
    published_at: "2026-09-28T08:00:00Z",
    read_time: "5",
    featured: false,
    views_count: 1340,
    tags: ["Interview", "Freshers", "Hiring Tips"],
    author: {
      id: "a-1",
      name: "Neelam S.",
      role: "Backend Engineer",
      avatar: "https://cdn.hirance.com/blogs/authors/18a9aa5d-3023-4b88-9bd1-135c9388e5b0.webp",
    },
  },
  {
    id: "fb-6",
    slug: "ai-jobs-in-india-2026-top-career-opportunities",
    title: "AI Jobs in India 2026: Top Career Opportunities, Skills & How Freshers...",
    excerpt:
      "AI is transforming India's job market in 2026. Discover the fastest-growing AI career opportunities, required skills, and how freshers can get started.",
    category: {
      id: "career-adv",
      name: "CAREER ADVICE",
      slug: "career-advice",
    },
    cover_image: {
      url: "https://cdn.hirance.com/blogs/covers/926e13b4-a52f-40b2-a292-6b929ab9c13e.webp",
      alt: "AI Jobs in India 2026",
    },
    published_at: "2026-09-28T07:30:00Z",
    read_time: "6",
    featured: false,
    views_count: 2100,
    tags: ["AI Jobs", "Freshers", "Tech Careers"],
    author: {
      id: "a-1",
      name: "Neelam S.",
      role: "Backend Engineer",
      avatar: "https://cdn.hirance.com/blogs/authors/18a9aa5d-3023-4b88-9bd1-135c9388e5b0.webp",
    },
  },
];

// Category icon and styling helpers for dynamic backend categories
function getCategoryIcon(name: string, slug: string) {
  const s = (slug + " " + name).toLowerCase();
  if (s.includes("resume") || s.includes("cv")) return FileText;
  if (s.includes("interview")) return Users;
  if (s.includes("career") || s.includes("job") || s.includes("growth")) return Briefcase;
  if (s.includes("news") || s.includes("trend") || s.includes("fresher")) return Sparkles;
  if (s.includes("hr") || s.includes("guideline") || s.includes("advice")) return TrendingUp;
  if (s.includes("tech") || s.includes("platform") || s.includes("inovation") || s.includes("cloud")) return Laptop;
  if (s.includes("city") || s.includes("location")) return MapPin;
  return Briefcase;
}

const CATEGORY_COLORS = [
  "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
  "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
  "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
];

function getCategoryColor(index: number) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

// Fallback high-fidelity jobs for similar jobs sidebar
const FALLBACK_JOBS = [
  {
    id: "322071d5-55c8-4b8a-bb32-d9592ce128f5",
    title: "Junior Estimator",
    company_name: "Airation Softtech Private Limited",
    company_logo: "https://cdn.hirance.com/employer/logos/e058c453-53fb-41ae-8a78-5713817a5ad1/224670cc-fa2a-4b93-aa6c-e1bd220779df.png",
    location: "Lucknow",
    salary_range: "₹ 15,000 - 20,000 / mo",
    work_mode: "Work from Office",
  },
  {
    id: "job-software-dev-tcs",
    title: "Software Engineer",
    company_name: "Tata Consultancy Services",
    company_logo: "",
    location: "Bengaluru",
    salary_range: "₹ 8 - 12 LPA",
    work_mode: "Hybrid",
  },
  {
    id: "job-cloud-architect",
    title: "Cloud Solutions Architect",
    company_name: "Nexus Cloud Systems",
    company_logo: "",
    location: "Hyderabad",
    salary_range: "₹ 18 - 26 LPA",
    work_mode: "Remote",
  },
  {
    id: "job-full-stack",
    title: "Senior Full Stack Developer",
    company_name: "Airation Tech",
    company_logo: "",
    location: "Noida",
    salary_range: "₹ 12 - 18 LPA",
    work_mode: "Hybrid",
  },
];

// Helper to generate dynamic pagination with ellipsis windowing
function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  pages.push(1);

  if (currentPage <= 4) {
    for (let p = 2; p <= 5; p++) {
      pages.push(p);
    }
    pages.push("...");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push("...");
    for (let p = totalPages - 4; p <= totalPages; p++) {
      pages.push(p);
    }
  } else {
    pages.push("...");
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
}

export function BlogListContent({
  initialBlogs,
  totalCount,
  initialCategories,
  initialTags,
  currentPage: serverPage,
  totalPages: serverTotalPages,
  featuredJobs = [],
}: BlogListContentProps) {
  const [, startTransition] = useTransition();

  const {
    blogs,
    categories,
    totalBlogs,
    currentPage,
    totalPages,
    isLoading,
    filters,
    hydrate,
    setCategory,
    setSearch,
    setPage,
    resetFilters,
    loadBlogs,
  } = useBlogsStore();

  const [searchInput, setSearchInput] = useState<string>("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close category dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }
    if (showCategoryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategoryDropdown]);

  // Hydrate Store with initial SSR data or fallback
  useEffect(() => {
    const hasInitialBlogs = Boolean(initialBlogs && initialBlogs.length > 0);
    const dataToHydrate = hasInitialBlogs ? initialBlogs : FALLBACK_ARTICLES;
    const countToHydrate = hasInitialBlogs ? totalCount : (totalCount > 0 ? totalCount : FALLBACK_ARTICLES.length);
    const pagesToHydrate = serverTotalPages > 0 ? serverTotalPages : Math.max(1, Math.ceil(countToHydrate / 6));

    hydrate(
      dataToHydrate,
      countToHydrate,
      initialCategories,
      initialTags,
      serverPage || 1,
      pagesToHydrate
    );
  }, [initialBlogs, totalCount, initialCategories, initialTags, serverPage, serverTotalPages, hydrate]);

  // Debounced search handling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        setSearch(searchInput);
        startTransition(() => {
          loadBlogs();
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, filters.search, setSearch, loadBlogs]);

  // Handle card link share copy
  const handleShare = (e: React.MouseEvent, post: BlogListItem) => {
    e.preventDefault();
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2200);
    }
  };

  // Filter display posts (use store blogs or initial SSR blogs, fallback if empty)
  const hasAppliedFilter = filters.category !== "all" || Boolean(filters.search) || Boolean(filters.tag);
  const displayPosts = useMemo(() => {
    if (blogs && blogs.length > 0) return blogs;
    if (hasAppliedFilter) return [];
    if (initialBlogs && initialBlogs.length > 0) return initialBlogs;
    return FALLBACK_ARTICLES;
  }, [blogs, hasAppliedFilter, initialBlogs]);

  const latestSidebarPosts = displayPosts.slice(0, 4);
  const displayJobs = (featuredJobs && featuredJobs.length > 0) ? featuredJobs.slice(0, 4) : FALLBACK_JOBS;

  // Calculate truthful total articles and total pages (supports SSR & client store)
  const effectiveTotalBlogs =
    totalBlogs > 0
      ? totalBlogs
      : (hasAppliedFilter ? 0 : (totalCount > 0 ? totalCount : displayPosts.length));

  const effectiveTotalPages =
    totalPages > 0 && totalBlogs > 0
      ? totalPages
      : (serverTotalPages > 0 ? serverTotalPages : Math.max(1, Math.ceil((effectiveTotalBlogs || 1) / 6)));

  const pageNumbers = useMemo(() => {
    return getPageNumbers(currentPage, effectiveTotalPages);
  }, [currentPage, effectiveTotalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > effectiveTotalPages || newPage === currentPage || isLoading) return;
    setPage(newPage);
    if (typeof window !== "undefined") {
      const feedElement = document.getElementById("blog-feed");
      if (feedElement) {
        feedElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Dynamically derive backend categories from store / initialCategories
  const allBackendCategories = useMemo(() => {
    const list = (categories && categories.length > 0) ? categories : (initialCategories || []);
    // Ensure "All" is at the start
    const allItem = list.find((c) => c.slug === "all") || {
      id: null,
      name: "All",
      slug: "all",
      post_count: totalBlogs || displayPosts.length,
    };
    const rest = list.filter((c) => c.slug !== "all");
    // Sort so categories with posts come first, then others
    rest.sort((a, b) => (b.post_count || 0) - (a.post_count || 0));
    return [allItem, ...rest];
  }, [categories, initialCategories, totalBlogs, displayPosts.length]);

  // Compute top visible pills dynamically from backend (All + top 4-5 categories from backend)
  const visiblePills = useMemo(() => {
    const primaryPills = allBackendCategories.slice(0, 5);
    // If the active category is not in the first 5, include it so the user sees their selection
    const isSelectedInPills = primaryPills.some((p) => p.slug === filters.category);
    if (!isSelectedInPills && filters.category !== "all") {
      const selectedCat = allBackendCategories.find((c) => c.slug === filters.category);
      if (selectedCat) {
        return [...primaryPills, selectedCat];
      }
    }
    return primaryPills;
  }, [allBackendCategories, filters.category]);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Google Sans Flex and Caveat handwritten font styling for doodle annotations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .font-doodle {
          font-family: 'Caveat', 'Comic Sans MS', cursive;
        }
      `}</style>

      {/* Interactive Dots Background Canvas (Consistent with Homescreen) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* ========================================================
          1. HERO SECTION (Full-Width Top Banner Layout)
          ======================================================== */}
      <header className="relative pt-6 pb-3 sm:pt-8 sm:pb-4 lg:pb-5 overflow-hidden">
        {/* Ambient subtle light blue mesh glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-100/50 via-sky-50/40 to-transparent dark:from-blue-900/15 blur-3xl rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Content (Title, Subtitle, Search) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* NOTE: Rule 7 strictly obeyed: No chip badge over section or title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Insights on <span className="text-blue-600">Hiring Velocity</span>
              </h1>
              
              <p className="mt-4 text-sm sm:text-base lg:text-[17px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl">
                Actionable recruitment guides, candidate Smart Score benchmarks, and tech hiring specialists strategies from the next-gen swipe-based platform.
              </p>

              {/* Search Pill Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearch(searchInput);
                  startTransition(() => {
                    loadBlogs();
                  });
                }}
                className="relative flex items-center w-full max-w-xl mt-5"
                role="search"
                aria-label="Search hiring articles"
              >
                <div className="relative flex items-center w-full rounded-full border border-slate-200/90 dark:border-border/80 bg-white dark:bg-card p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all">
                  <Search className="ml-3.5 h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search articles, tips, trends, and more..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-transparent px-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                    aria-label="Search articles"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput("");
                        setSearch("");
                        startTransition(() => {
                          loadBlogs();
                        });
                      }}
                      className="p-1 mr-1 text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all active:scale-95 shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Right Graphic: Stacked Swipe Cards with 'Better Hiring Insights' Doodle */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              
              {/* Soft Radial Ambient Glow */}
              <div className="absolute w-72 h-72 rounded-full bg-blue-100/70 dark:bg-blue-950/40 blur-2xl -z-10" />

              {/* Hand-Drawn Doodle Annotation (Arrow + "Better Hiring Insights") */}
              <div className="absolute -top-3 sm:top-2 right-4 sm:right-6 z-20 pointer-events-none select-none">
                <div className="flex flex-col items-center">
                  <span className="font-doodle text-[20px] sm:text-[23px] text-blue-600 font-bold tracking-wide -rotate-6 whitespace-nowrap leading-none drop-shadow-xs">
                    Better <br /> Hiring <br /> Insights
                  </span>
                  {/* Curved Hand-Drawn Doodle Arrow SVG */}
                  <svg width="45" height="55" viewBox="0 0 50 60" fill="none" className="text-blue-600 mt-1 stroke-current -rotate-12">
                    <path
                      d="M 35 5 C 45 22, 10 28, 12 48"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 5 40 L 12 50 L 22 42"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              {/* Stacked Fanned Cards */}
              <div className="relative w-[280px] sm:w-[320px] h-[240px] flex items-center justify-center">
                
                {/* Back Fanned Card (Tilted -7deg) */}
                <div 
                  className="absolute w-[240px] sm:w-[270px] h-[190px] rounded-2xl bg-white dark:bg-card border border-slate-200/80 dark:border-border/60 shadow-lg p-4 transform -rotate-6 -translate-x-6 -translate-y-2 opacity-80"
                  aria-hidden="true"
                >
                  <div className="h-2 w-16 bg-blue-100 rounded-full mb-3" />
                  <div className="h-3 w-36 bg-slate-100 dark:bg-muted rounded-full mb-2" />
                  <div className="h-2.5 w-24 bg-slate-100 dark:bg-muted rounded-full" />
                </div>

                {/* Middle Card (Tilted 3deg) */}
                <div 
                  className="absolute w-[240px] sm:w-[270px] h-[190px] rounded-2xl bg-white dark:bg-card border border-slate-200/80 dark:border-border/60 shadow-md p-4 transform rotate-3 translate-x-4 translate-y-3 opacity-90"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">H</div>
                    <div>
                      <div className="h-3 w-28 bg-slate-100 dark:bg-muted rounded-full" />
                      <div className="h-2 w-16 bg-slate-100 dark:bg-muted rounded-full mt-1.5" />
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-muted rounded-full mb-2" />
                  <div className="h-2 w-3/4 bg-slate-100 dark:bg-muted rounded-full" />
                </div>

                {/* Front Main Card (Tilted -1.5deg) */}
                <motion.div
                  initial={{ opacity: 0, y: 12, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-[245px] sm:w-[275px] rounded-2xl bg-white dark:bg-card border border-slate-200/90 dark:border-border/80 shadow-2xl p-3.5 sm:p-4 hover:rotate-0 transition-transform duration-300"
                >
                  {/* Card Cover Image */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-muted/40 mb-3 border border-slate-100 dark:border-border/40">
                    <img
                      src="https://cdn.hirance.com/blogs/covers/374d81e3-2c27-4373-b185-b6ccd5240da6.webp"
                      alt="Software Engineer Hiring"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1.5 left-2 rounded-md bg-blue-600/90 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                      Match 94%
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-extrabold text-slate-900 dark:text-white leading-tight">
                        Software Engineer
                      </h4>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        Electronic Devices • Bengaluru
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Hirance App Icon Badge on Top */}
                <div className="absolute -top-3 left-6 z-20 w-11 h-11 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/30 flex items-center justify-center p-2.5 border-2 border-white dark:border-background">
                  <Image
                    src="/images/icon.png"
                    alt="Hirance Icon"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain brightness-0 invert"
                    priority
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================
          2. FEED & SIDEBAR SECTION (2-Column Main Content Layout)
          ======================================================== */}
      <section id="blog-feed" className="relative pb-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
            
            {/* ----------------------------------------------------
                LEFT COLUMN: Category Tabs, 2-Column Article Grid, Pagination
                ---------------------------------------------------- */}
            <div className="flex-1 min-w-0 w-full">
              
              {/* Quick Filter Category Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {visiblePills.map((cat) => {
                  const isActive = filters.category === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setCategory(cat.slug);
                        startTransition(() => {
                          loadBlogs();
                        });
                      }}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25"
                          : "bg-white dark:bg-muted/40 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 border border-slate-200/60 dark:border-border/40"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}

                {/* More Categories Dropdown */}
                {allBackendCategories.length > 5 && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold bg-white dark:bg-muted/40 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 dark:border-border/40 transition-all cursor-pointer"
                    >
                      More
                      <ChevronDown className={`h-3 w-3 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {showCategoryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-2 z-40 w-56 rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-xl p-2 max-h-64 overflow-y-auto"
                        >
                          {allBackendCategories.slice(5).map((cat) => {
                            const isActive = filters.category === cat.slug;
                            return (
                              <button
                                key={cat.slug}
                                type="button"
                                onClick={() => {
                                  setCategory(cat.slug);
                                  setShowCategoryDropdown(false);
                                  startTransition(() => {
                                    loadBlogs();
                                  });
                                }}
                                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                                  isActive
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-muted/40"
                                }`}
                              >
                                <span className="truncate">{cat.name}</span>
                                {isActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>


              {/* Loading Spinner */}
              {isLoading && (
                <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="text-xs font-medium">Loading articles...</span>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && displayPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-base font-bold text-slate-900 dark:text-white">No articles found</p>
                  <p className="mt-1 text-xs text-slate-500">Try searching for another keyword or reset filters.</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* 2-Column Article Grid (Matches Screenshot: 2 columns x 3 rows = 6 items) */}
              {!isLoading && displayPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {displayPosts.map((post, idx) => {
                    const isFirstFeatured = idx === 0 || post.featured;

                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.closest("button") || target.closest("a")) return;
                          window.open(`/blog/${post.slug}`, "_blank", "noopener,noreferrer");
                        }}
                        className="group flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        <div>
                          {/* Card Cover Image */}
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-muted/30"
                          >
                            {post.cover_image?.url ? (
                              <img
                                src={post.cover_image.url}
                                alt={post.cover_image.alt || post.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-full w-full bg-gradient-to-br from-blue-600/10 to-indigo-600/5" />
                            )}

                            {/* FEATURED badge on the first card / featured post (as in screenshot) */}
                            {isFirstFeatured && (
                              <span className="absolute top-3.5 left-3.5 z-10 rounded-full bg-[#1D4ED8] text-white px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase shadow-md">
                                FEATURED
                              </span>
                            )}
                          </Link>

                          {/* Card Body */}
                          <div className="p-5 pb-0">
                            {/* Category Text (Plain uppercase text per Rule 7: NO CHIPS OVER TITLES) */}
                            <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                              {post.category?.name || "RECRUITMENT & TECH"}
                            </p>

                            {/* Post Title */}
                            <h2 className="text-[16px] sm:text-[17px] font-semibold text-slate-900 dark:text-white leading-[1.35] line-clamp-2 group-hover:text-blue-600 transition-colors">
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {post.title}
                              </Link>
                            </h2>

                            {/* Excerpt */}
                            <p className="mt-2.5 text-[13px] text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer: Author + Metadata + Share Button */}
                        <div className="p-5 pt-4 mt-4 border-t border-slate-100 dark:border-border/40 flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Author Avatar */}
                            {post.author?.avatar ? (
                              <img
                                src={post.author.avatar}
                                alt={post.author.name || "Author"}
                                className="h-6 w-6 rounded-full object-cover shrink-0 border border-slate-200/80"
                              />
                            ) : (
                              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                                {post.author?.name ? post.author.name.charAt(0) : "N"}
                              </div>
                            )}

                            {/* Author Name • Date • Read Time */}
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {post.author?.name || "Neelam S."}
                              </span>
                              <span>•</span>
                              <span className="shrink-0">{formatDate(post.published_at)}</span>
                              <span>•</span>
                              <span className="shrink-0">{formatBlogReadTime(post.read_time)}</span>
                            </div>
                          </div>


                        </div>

                      </motion.article>
                    );
                  })}
                </div>
              )}

              {/* Pagination Controls */}
              {!isLoading && displayPosts.length > 0 && (
                <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-border/40">
                  <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
                    <span className="font-bold text-slate-900 dark:text-white">{effectiveTotalPages}</span>{" "}
                    <span>
                      (total {effectiveTotalBlogs} {effectiveTotalBlogs === 1 ? "article" : "articles"})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Prev Button */}
                    <button
                      type="button"
                      disabled={currentPage <= 1 || isLoading}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200/90 dark:border-border bg-white dark:bg-card px-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Prev</span>
                    </button>

                    {/* Dynamic Page Numbers */}
                    {pageNumbers.map((p, idx) => {
                      if (p === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="flex h-8 w-6 items-center justify-center text-xs font-bold text-slate-400 select-none"
                          >
                            ...
                          </span>
                        );
                      }

                      const isCurrent = p === currentPage;
                      return (
                        <button
                          key={p}
                          type="button"
                          disabled={isLoading}
                          onClick={() => handlePageChange(p)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                              : "border border-slate-200/90 dark:border-border bg-white dark:bg-card text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600"
                          }`}
                          aria-label={`Page ${p}`}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {p}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      type="button"
                      disabled={currentPage >= effectiveTotalPages || isLoading}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200/90 dark:border-border bg-white dark:bg-card px-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* ----------------------------------------------------
                RIGHT COLUMN: Sidebar (Matches Screenshot)
                ---------------------------------------------------- */}
            <aside className="w-full lg:w-[350px] xl:w-[370px] shrink-0 space-y-6 lg:sticky lg:top-24">

              {/* Card 1: "Latest Articles" */}
              <div className="rounded-[24px] border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">
                    Latest Articles
                  </h3>
                  <Link
                    href="/blog"
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="space-y-3.5">
                  {latestSidebarPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-muted/30 shrink-0 border border-slate-100 dark:border-border/40">
                        {post.cover_image?.url ? (
                          <img
                            src={post.cover_image.url}
                            alt={post.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-blue-600/10 to-indigo-600/5" />
                        )}
                      </div>

                      {/* Article Info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">
                          {post.category?.name || "HIRING"}
                        </p>
                        <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white leading-[1.35] line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                          {formatDate(post.published_at)} • {formatBlogReadTime(post.read_time)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              
              {/* Card 2: "Explore Jobs" */}
              <div className="rounded-[24px] border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">
                      Explore Jobs
                    </h3>
                  </div>
                  <Link
                    href="/jobs"
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {displayJobs.slice(0, 2).map((job: any) => {
                    const salary = job.salary_range || (job.salary_min ? `₹ ${Math.round(job.salary_min / 1000)}k - ${Math.round(job.salary_max / 1000)}k` : "Best in Industry");
                    const workMode = job.work_mode?.name || job.work_mode || "Full Time";
                    const location = job.location || "India";

                    return (
                      <Link
                        key={job.id}
                        href={`/jobs/${job.id}`}
                        className="group flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-border/40 bg-slate-50/60 dark:bg-muted/20 hover:border-blue-500/40 hover:bg-white dark:hover:bg-card hover:shadow-xs transition-all duration-200"
                      >
                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 p-1 flex items-center justify-center shrink-0">
                          {job.company_logo ? (
                            <img
                              src={job.company_logo}
                              alt={job.company_name}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-xs font-extrabold text-blue-600">
                              {job.company_name?.charAt(0) || "H"}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-[13px] font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                            {job.company_name} • {location}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">{salary}</span>
                            <span>•</span>
                            <span>{workMode}</span>
                          </div>
                        </div>

                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 self-center" />
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/jobs"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 py-2.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Explore All Openings</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Card 3: "Popular Categories" */}
              <div className="rounded-[24px] border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">
                    Popular Categories
                  </h3>
                  <span className="text-[11px] font-medium text-slate-400">
                    {allBackendCategories.filter(c => c.slug !== "all").length} categories
                  </span>
                </div>

                <div className="flex flex-col">
                  {allBackendCategories
                    .filter((cat) => cat.slug !== "all")
                    .slice(0, 8)
                    .map((cat, idx) => {
                      const Icon = getCategoryIcon(cat.name, cat.slug);
                      const isCatActive = filters.category === cat.slug;
                      return (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => {
                            setCategory(cat.slug);
                            window.scrollTo({ top: 380, behavior: "smooth" });
                          }}
                          className="w-full py-1.5 flex items-center justify-between text-left group cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 bg-slate-100 dark:bg-muted/40">
                              <Icon className="h-[10px] w-[10px] text-slate-400 dark:text-slate-500" />
                            </div>
                            <span className={`text-[12px] font-normal transition-colors truncate ${
                              isCatActive
                                ? "text-blue-600 font-medium"
                                : "text-slate-400 dark:text-slate-500 group-hover:text-blue-600"
                            }`}>
                              {cat.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            <span className="text-[12px] font-medium text-slate-400 dark:text-slate-500">
                              {cat.post_count !== undefined ? cat.post_count : 0}
                            </span>
                            <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. PRE-FOOTER CTA BANNER: "Experience Swipe-Based Hiring Today"
          ======================================================== */}
      <section className="relative pb-8 pt-10 sm:pt-14 lg:pt-16 overflow-hidden" aria-labelledby="cta-experience-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Main Card with minimum corner radius (rounded-2xl) */}
          <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            
            {/* 2-Column Grid Layout: col-8 (left) & col-4 (right) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 p-6 sm:p-10 lg:p-12">
              
              {/* Left Column: col-8 */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <h2
                  id="cta-experience-heading"
                  className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
                >
                  Experience <span className="text-blue-600">Swipe-Based Hiring</span><br /> 
                  <span className="text-slate-900 dark:text-white">Today</span>
                </h2>

                <p className="mt-3.5 text-[14px] sm:text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl line-clamp-2">
                  Whether you're recruiting top software talent or searching for your next career move, Hirance makes hiring instant with zero forms. Match directly with verified profiles, swipe tailored job cards, and connect in seconds.
                </p>

                {/* Inline Stats Row */}
                <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8">
                  <div>
                    <p className="text-[18px] sm:text-[20px] font-semibold text-slate-900 dark:text-white leading-none">50K+</p>
                    <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 mt-1">Active Jobs</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-border/60" />
                  <div>
                    <p className="text-[18px] sm:text-[20px] font-semibold text-slate-900 dark:text-white leading-none">2M+</p>
                    <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 mt-1">Candidates</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-border/60" />
                  <div>
                    <p className="text-[18px] sm:text-[20px] font-semibold text-slate-900 dark:text-white leading-none">60s</p>
                    <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 mt-1">To Post a Job</p>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                  <GooglePlayButton label="Apply for Jobs" />
                  <a
                    href="https://employer.hirance.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full border border-slate-200/90 dark:border-border bg-white dark:bg-card px-6 sm:px-7 text-xs sm:text-sm font-bold text-slate-800 dark:text-white shadow-xs transition-all hover:bg-slate-50 dark:hover:bg-muted/80 active:scale-95"
                  >
                    Post a Job in 60s
                  </a>
                </div>
              </div>

              {/* Right Column: col-4 */}
              <div className="lg:col-span-4 relative flex items-center justify-center min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
                {/* Background Shape Image behind Phone Mockup */}
                <img
                  src="/pics/bg-shape.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute pointer-events-none z-0 w-[400px] sm:w-[480px] lg:w-[540px] max-w-none h-auto object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                {/* Tilted Mobile Phone Image (Static) */}
                <img
                  src="/pics/mobile_mockup.png"
                  alt="Hirance Swipe App Mockup"
                  className="relative z-10 max-h-[260px] sm:max-h-[300px] lg:max-h-[340px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(37,99,235,0.22)] transform rotate-6"
                  loading="lazy"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          4. FOOTER (Shared Hirance Global Footer)
          ======================================================== */}
      <Footer />
    </main>
  );
}
