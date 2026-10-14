"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  Smartphone,
  RotateCcw,
  Building2,
  ArrowUpRight,
  X,
  Link2,
  Sparkles,
  Landmark,
  Package,
} from "lucide-react";
import { PaginationMeta } from "@/types/api";
import { CompanyItem, CompanyDetail } from "@/types/companies";
import { JobListItem } from "@/types/jobs";
import { fetchCompanies, deduplicateCompanies, fetchCompanyById, generateCompanySlug } from "@/lib/api/companies";
import { siteConfig } from "@/config/site";
import { Footer, InteractiveDots } from "@/components/shared";
import { initials, getCompanyColorTheme } from "@/config/companies";
import { motion, AnimatePresence } from "framer-motion";
import { JobSeoLinks } from "@/components/jobs/job-seo-links";
import { faqs } from "@/components/jobs/jobs-faq-data";

interface CompaniesContentProps {
  initialCompanies: CompanyItem[];
  initialJobs?: JobListItem[];
  initialCompanyDetails?: Record<string, CompanyDetail>;
  initialPagination: PaginationMeta;
}

const POPULAR_TAGS = [
  "Sales Roles",
  "IT / Software",
  "Design Roles",
  "Marketing Roles",
  "Lucknow",
  "Delhi",
  "Noida",
  "Kanpur",
  "Remote Friendly",
];

const INDUSTRIES_LIST = [
  "Sales Roles",
  "IT / Software Roles",
  "Design Roles",
  "Marketing Roles",
  "Hospitality Roles",
  "Operations Roles",
  "Finance Roles",
  "Construction & Engineering",
];

const COMPANY_SIZES = [
  "0-50 Employees",
  "51-100 Employees",
  "101-500 Employees",
  "500+ Employees",
];

const LOCATIONS_LIST = [
  "Lucknow",
  "Delhi",
  "Noida",
  "Kanpur",
  "Ahmedabad",
  "Bengaluru",
  "Mumbai",
  "Pune",
  "Remote Friendly",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Default" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
];

export default function CompaniesContent({
  initialCompanies,
  initialJobs = [],
  initialCompanyDetails = {},
  initialPagination,
}: CompaniesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search & Filters State
  const [searchInput, setSearchInput] = useState(searchParams?.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams?.get("location") || "");
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams?.get("industry") || "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    searchParams?.get("industry") ? [searchParams.get("industry")!] : []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams?.get("location") ? [searchParams.get("location")!] : []
  );
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortOpen]);

  const [industrySearch, setIndustrySearch] = useState("");
  const [showMoreIndustries, setShowMoreIndustries] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Accordion section toggles
  const [industryOpen, setIndustryOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [locationOpen, setLocationOpen] = useState(true);

  // FAQ Accordion & Category Filter State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("All Questions");

  const filteredFaqs = useMemo(() => {
    if (activeFaqCategory === "All Questions") return faqs;
    return faqs.filter((f) => f.category === activeFaqCategory);
  }, [activeFaqCategory]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(initialPagination?.current_page || 1);
  const [pagination, setPagination] = useState<PaginationMeta>(initialPagination);

  // All registered companies from /company/
  const [companies, setCompanies] = useState<CompanyItem[]>(initialCompanies);
  const [jobs] = useState<JobListItem[]>(initialJobs || []);
  const [companyDetails, setCompanyDetails] = useState<Record<string, CompanyDetail>>(
    initialCompanyDetails || {}
  );
  const [isLoading, setIsLoading] = useState(false);


  // Lookup map for vacancy openings, location, and technology
  const jobMap = useMemo(() => {
    const map = new Map<string, { openings: number; city: string; industry: string }>();
    for (const j of jobs) {
      const key = (j.company_id || j.company_name).toLowerCase().trim();
      const curr = map.get(key) || {
        openings: 0,
        city: j.city?.name || j.location || j.state?.name || "",
        industry: j.role_category?.name || j.job_role?.name || "",
      };
      curr.openings += j.number_of_openings || 1;
      map.set(key, curr);
      if (j.company_name) {
        map.set(j.company_name.toLowerCase().trim(), curr);
      }
    }
    return map;
  }, [jobs]);

  // Execute standard API fetch (using page_size=100 to retrieve all registered companies)
  const executeFetch = async (queryText: string, pageNum: number = 1) => {
    setIsLoading(true);
    try {
      const res = await fetchCompanies({
        search: queryText.trim() || undefined,
        page: pageNum,
        page_size: 100,
      });

      if (res && res.success) {
        const unique = deduplicateCompanies(res.data || [], companyDetails, jobMap);
        setCompanies(unique);
        if (res.pagination) {
          setPagination({ ...res.pagination, count: unique.length });
        }
      }
    } catch (err) {
      console.error("fetchCompanies error in CompaniesContent:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Search Submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    executeFetch(searchInput, 1);
  };

  // Handle Tag click
  const handleTagClick = (tag: string) => {
    if (LOCATIONS_LIST.includes(tag)) {
      if (selectedLocations.includes(tag)) {
        setSelectedLocations(selectedLocations.filter((l) => l !== tag));
      } else {
        setSelectedLocations([...selectedLocations, tag]);
      }
    } else if (INDUSTRIES_LIST.includes(tag)) {
      if (selectedIndustries.includes(tag)) {
        setSelectedIndustries(selectedIndustries.filter((i) => i !== tag));
      } else {
        setSelectedIndustries([...selectedIndustries, tag]);
      }
    } else {
      setSearchInput(tag);
      setCurrentPage(1);
      executeFetch(tag, 1);
    }
  };

  // Handle Page Change (instant client switch across all registered companies)
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchInput("");
    setSelectedLocation("");
    setSelectedIndustry("");
    setSelectedSizes([]);
    setSelectedIndustries([]);
    setSelectedLocations([]);
    setCurrentPage(1);
    executeFetch("", 1);
  };

  // Filter & Sort Companies
  const displayedCompanies = useMemo(() => {
    let list = [...companies];

    // Filter by Selected Locations
    if (selectedLocations.length > 0) {
      list = list.filter((c) => {
        const detail = companyDetails[c.id];
        const job =
          jobMap.get(c.id.toLowerCase()) ||
          jobMap.get(c.company_name.toLowerCase().trim());
        const loc = (
          detail?.city?.name ||
          job?.city ||
          (detail?.address ? extractCityFromAddress(detail.address) : "") ||
          detail?.state?.name ||
          ""
        ).toLowerCase();
        if (!loc) return false;
        return selectedLocations.some((selectedLoc) =>
          loc.includes(selectedLoc.toLowerCase())
        );
      });
    }

    // Filter by Selected Industries / Technology
    if (selectedIndustries.length > 0) {
      list = list.filter((c) => {
        const detail = companyDetails[c.id];
        const job =
          jobMap.get(c.id.toLowerCase()) ||
          jobMap.get(c.company_name.toLowerCase().trim());
        const ind = (detail?.industry || job?.industry || "").toLowerCase();
        if (!ind) return false;
        return selectedIndustries.some((selectedInd) =>
          ind.includes(selectedInd.toLowerCase())
        );
      });
    }

    // Filter by Selected Company Sizes (Employee Count from API)
    if (selectedSizes.length > 0) {
      list = list.filter((c) => {
        const detail = companyDetails[c.id];
        const emp = detail?.number_of_employees?.trim() || "";
        if (!emp) return false;
        return selectedSizes.some((s) => {
          if (s.startsWith("0-50")) return emp.includes("0-50");
          if (s.startsWith("51-100")) return emp.includes("51-100");
          if (s.startsWith("101-500")) return emp.includes("101-500");
          if (s.startsWith("500+")) return emp.includes("500") || emp.includes("501");
          return false;
        });
      });
    }

    // Sorting
    if (sortBy === "name_asc") {
      list.sort((a, b) => a.company_name.localeCompare(b.company_name));
    } else if (sortBy === "name_desc") {
      list.sort((a, b) => b.company_name.localeCompare(a.company_name));
    } else {
      // Default: prioritize verified and complete profiles (active openings, logo, city, employees, industry)
      list.sort((a, b) => {
        const aDetail = companyDetails[a.id];
        const bDetail = companyDetails[b.id];
        const aJob =
          jobMap.get(a.id.toLowerCase()) ||
          jobMap.get(a.company_name.toLowerCase().trim());
        const bJob =
          jobMap.get(b.id.toLowerCase()) ||
          jobMap.get(b.company_name.toLowerCase().trim());

        const aLoc = Boolean(
          aDetail?.city?.name ||
          aJob?.city ||
          (aDetail?.address ? aDetail.address.trim() : "") ||
          aDetail?.state?.name
        );
        const bLoc = Boolean(
          bDetail?.city?.name ||
          bJob?.city ||
          (bDetail?.address ? bDetail.address.trim() : "") ||
          bDetail?.state?.name
        );

        const aScore =
          (aLoc ? 15 : 0) +
          (aDetail?.number_of_employees ? 10 : 0) +
          (aDetail?.industry || aJob?.industry ? 10 : 0) +
          (aDetail?.is_verified ? 5 : 0) +
          (a.company_logo ? 5 : 0) +
          (aJob?.openings ? 3 : 0);

        const bScore =
          (bLoc ? 15 : 0) +
          (bDetail?.number_of_employees ? 10 : 0) +
          (bDetail?.industry || bJob?.industry ? 10 : 0) +
          (bDetail?.is_verified ? 5 : 0) +
          (b.company_logo ? 5 : 0) +
          (bJob?.openings ? 3 : 0);

        return bScore - aScore;
      });
    }

    return list;
  }, [companies, jobMap, companyDetails, selectedLocations, selectedIndustries, selectedSizes, sortBy]);

  const PAGE_SIZE = 12;
  const totalCount = displayedCompanies.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return displayedCompanies.slice(start, start + PAGE_SIZE);
  }, [displayedCompanies, currentPage]);

  // Track fetched company IDs to strictly prevent duplicate or infinite network requests
  const fetchedIdsRef = useRef<Set<string>>(new Set(Object.keys(companyDetails)));

  useEffect(() => {
    const missing = paginatedCompanies.filter(
      (c) => !companyDetails[c.id] && !fetchedIdsRef.current.has(c.id)
    );
    if (missing.length === 0) return;

    missing.forEach((c) => fetchedIdsRef.current.add(c.id));

    let isMounted = true;
    Promise.all(
      missing.map((c) =>
        fetchCompanyById(c.id, { revalidate: 300 })
          .then((res) => (res.success && res.data ? res.data : null))
          .catch(() => null)
      )
    ).then((results) => {
      if (!isMounted) return;
      setCompanyDetails((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const item of results) {
          if (item && item.id && !next[item.id]) {
            next[item.id] = item;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    });

    return () => {
      isMounted = false;
    };
  }, [paginatedCompanies, companyDetails]);

  const hasActiveFilters =
    searchInput ||
    selectedLocations.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedSizes.length > 0;

  // Filtered industry items for the sidebar search
  const visibleIndustries = useMemo(() => {
    let items = INDUSTRIES_LIST;
    if (industrySearch.trim()) {
      items = items.filter((ind) =>
        ind.toLowerCase().includes(industrySearch.toLowerCase().trim())
      );
    }
    return showMoreIndustries ? items : items.slice(0, 8);
  }, [industrySearch, showMoreIndustries]);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-[#F9F9F9] dark:bg-background pt-6 sm:pt-8 transition-colors">
      {/* Interactive dots canvas matching home page theme */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-16">
        {/* Breadcrumb Navigation matching site standard */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-xs text-muted-foreground mb-4"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-medium text-foreground">Companies</span>
        </nav>

        {/* Page Hero / Title Header */}
        <div className="mt-4 mb-6 sm:mt-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-[1.8rem] font-bold tracking-tight text-foreground">
                Discover Top Companies
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground truncate max-w-3xl">
                Explore leading startups and enterprises hiring on Hirance. Find the right company for your next career move.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-end rounded-xl border border-border/80 bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xs shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {totalCount > 0 ? `${totalCount}+ Companies` : "200+ Companies"}
              </span>
            </div>
          </div>
        </div>

        {/* 1 WHOLE WHITE CARD #FFFFFF - Enclosing Search Bar, Filter Dropdown Cards, and Popular Tags */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs mb-8 space-y-3.5">
          {/* Top Row: Search Form + Location Card + Industry Card + Search Button */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5"
          >
            {/* Search Input Box */}
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-slate-50/70 border border-slate-200/70 focus-within:border-blue-400 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search companies by name, industry, or keywords..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    executeFetch("", 1);
                  }}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Card Filter UI */}
            <div className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 lg:w-48 transition-colors">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedLocation(val);
                  executeFetch(searchInput, 1);
                }}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none pr-5"
              >
                <option value="">All Locations</option>
                {LOCATIONS_LIST.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
            </div>

            {/* Industry Card Filter UI */}
            <div className="relative flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 lg:w-48 transition-colors">
              <Landmark className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={selectedIndustry}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedIndustry(val);
                  if (val && !selectedIndustries.includes(val)) {
                    setSelectedIndustries([...selectedIndustries, val]);
                  } else if (!val) {
                    setSelectedIndustries([]);
                  }
                }}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none pr-5"
              >
                <option value="">All Industries</option>
                {INDUSTRIES_LIST.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
            </div>

            {/* Search Companies Button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Companies</span>
            </button>
          </form>

          {/* Bottom Row: Popular Tags (Inside the same white card!) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold mr-1 select-none">
              <Sparkles className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Popular:</span>
            </div>
            {POPULAR_TAGS.map((tag) => {
              const isSelected =
                selectedLocations.includes(tag) ||
                selectedIndustries.includes(tag) ||
                searchInput.toLowerCase() === tag.toLowerCase();

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer select-none ${
                    isSelected
                      ? "border-blue-500 bg-white text-blue-600 font-semibold shadow-2xs"
                      : "border-slate-200/80 bg-white hover:border-blue-400 hover:text-blue-600 text-slate-700 shadow-2xs"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              Filters {hasActiveFilters && "(Active)"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                mobileFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Main Content Layout (Sidebar + Company Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar with Section Icons */}
          <aside
            className={`lg:col-span-3 space-y-6 ${
              mobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-5">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Filters</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Filter 1: Industry with Landmark Icon */}
              <div className="space-y-3">
                <div
                  className="flex items-center justify-between cursor-pointer select-none group"
                  onClick={() => setIndustryOpen(!industryOpen)}
                >
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-slate-700 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Industry
                    </span>
                  </div>
                  {industryOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                {industryOpen && (
                  <>
                    {/* Sub search for industries */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={industrySearch}
                        onChange={(e) => setIndustrySearch(e.target.value)}
                        placeholder="Search industries..."
                        className="w-full rounded-lg border border-slate-200/80 bg-slate-50/70 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    {/* Industry Checkboxes */}
                    <div className="space-y-1 pt-1 max-h-72 overflow-y-auto pr-1">
                      {visibleIndustries.map((ind) => {
                        const checked = selectedIndustries.includes(ind);
                        return (
                          <label
                            key={ind}
                            className="flex items-center gap-2.5 py-0.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {
                                if (checked) {
                                  setSelectedIndustries(
                                    selectedIndustries.filter((i) => i !== ind)
                                  );
                                } else {
                                  setSelectedIndustries([...selectedIndustries, ind]);
                                }
                              }}
                              className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                            />
                            <span className="group-hover:text-slate-900 transition-colors">
                              {ind}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {INDUSTRIES_LIST.length > 8 && !industrySearch && (
                      <button
                        type="button"
                        onClick={() => setShowMoreIndustries(!showMoreIndustries)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-block pt-1 cursor-pointer"
                      >
                        {showMoreIndustries
                          ? "Show less ▴"
                          : `Show ${INDUSTRIES_LIST.length - 8} more ▾`}
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Filter 2: Company Size with Users Icon */}
              <div className="space-y-3 pt-3.5 border-t border-slate-100">
                <div
                  className="flex items-center justify-between cursor-pointer select-none group"
                  onClick={() => setSizeOpen(!sizeOpen)}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-700 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Company Size
                    </span>
                  </div>
                  {sizeOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                {sizeOpen && (
                  <div className="space-y-1 pt-1">
                    {COMPANY_SIZES.map((size) => {
                      const checked = selectedSizes.includes(size);
                      return (
                        <label
                          key={size}
                          className="flex items-center gap-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                setSelectedSizes(selectedSizes.filter((s) => s !== size));
                              } else {
                                setSelectedSizes([...selectedSizes, size]);
                              }
                            }}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                          />
                          <span className="group-hover:text-slate-900 transition-colors">
                            {size}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 3: Location with MapPin Icon */}
              <div className="space-y-3 pt-3.5 border-t border-slate-100">
                <div
                  className="flex items-center justify-between cursor-pointer select-none group"
                  onClick={() => setLocationOpen(!locationOpen)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-700 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Location
                    </span>
                  </div>
                  {locationOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                {locationOpen && (
                  <div className="space-y-1 pt-1 max-h-72 overflow-y-auto pr-1">
                    {LOCATIONS_LIST.map((loc) => {
                      const checked = selectedLocations.includes(loc);
                      return (
                        <label
                          key={loc}
                          className="flex items-center gap-2.5 py-0.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none group"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                setSelectedLocations(
                                  selectedLocations.filter((l) => l !== loc)
                                );
                              } else {
                                setSelectedLocations([...selectedLocations, loc]);
                              }
                            }}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                          />
                          <span className="group-hover:text-slate-900 transition-colors">
                            {loc}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Main Column */}
          <div className="lg:col-span-9 space-y-5">
            {/* Control Bar: Counter + Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2">
              <p className="text-xs sm:text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {totalCount === 0
                    ? "0"
                    : `${(currentPage - 1) * 12 + 1}-${Math.min(
                        currentPage * 12,
                        totalCount
                      )}`}
                </span>{" "}
                of <span className="font-semibold text-slate-900">{totalCount}</span> hiring companies
              </p>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-slate-500">Sort by:</span>
                <div ref={sortRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen(!sortOpen)}
                    aria-expanded={sortOpen}
                    aria-label="Sort options"
                    className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-slate-300 hover:bg-slate-50/50 transition-all cursor-pointer select-none"
                  >
                    <span>{SORT_OPTIONS.find((s) => s.value === sortBy)?.label || "Newest First"}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        sortOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-slate-200/90 bg-white p-1 shadow-lg shadow-slate-900/5 z-30 animate-in fade-in zoom-in-95 duration-100">
                      {SORT_OPTIONS.map((opt) => {
                        const isSelected = sortBy === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSortBy(opt.value);
                              setSortOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none ${
                              isSelected
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Companies Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200/70 bg-white p-5 animate-pulse flex items-start gap-3.5 sm:gap-4"
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-2.5">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-6 bg-slate-100 rounded-lg w-20" />
                        <div className="h-6 bg-slate-100 rounded-lg w-16" />
                        <div className="h-6 bg-slate-100 rounded-lg w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedCompanies.map((company, index) => {
                  const jobInfo =
                    jobMap.get(company.id.toLowerCase()) ||
                    jobMap.get(company.company_name.toLowerCase().trim());
                  const detail = companyDetails[company.id];
                  return (
                    <CompanyCard
                      key={`${company.id}-${index}`}
                      company={company}
                      index={index}
                      detail={detail}
                      jobInfo={jobInfo}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No companies found</h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any companies matching your active filters. Try broadening
                  your search or resetting filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                <p className="text-xs text-slate-500">
                  Page {currentPage} of {totalPages} ({totalCount} companies)
                </p>

                <div className="flex items-center gap-1.5">
                  {/* First page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    aria-label="First page"
                    className="p-2 rounded-lg border border-slate-200/90 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronsLeft className="w-3.5 h-3.5" />
                  </button>

                  {/* Previous page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    let pageNum = idx + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = Math.min(currentPage - 2 + idx, totalPages - 4 + idx);
                    }

                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`h-8 w-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "border border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-1 text-slate-400 text-xs">...</span>
                  )}

                  {/* Next page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Last page */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Last page"
                    className="p-2 rounded-lg border border-slate-200/90 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronsRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Promotional Hirance App Download Card */}
            <div className="rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-8 shadow-xs">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700">
                  <Smartphone className="w-3 h-3 text-blue-600" />
                  For Job Seekers
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Get discovered by top companies with the Hirance App
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  Create your profile, swipe on companies, and get personalized job recommendations.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-sm transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Download Hirance App</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section — Matching Hirance Platform Style */}
      <section id="faq" className="relative pt-12 pb-10 sm:pt-16 sm:pb-14 overflow-hidden border-t border-slate-200/70 bg-[#F9F9F9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Frequently Asked{" "}
              <span className="text-blue-600">
                Questions
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about finding jobs on Hirance.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-7 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
            {["All Questions", "Candidates", "Employers", "General"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveFaqCategory(cat);
                  setOpenFaq(0);
                }}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFaqCategory === cat
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion FAQ Items */}
          <div className="mt-8 divide-y divide-slate-100 border border-slate-200/80 bg-white rounded-xl px-5 py-3.5 sm:px-7 sm:py-4 shadow-2xs">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-3.5 sm:py-4 first:pt-0 last:pb-0 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg py-1 cursor-pointer"
                  >
                    <span className="text-sm sm:text-[15px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
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
                        <p className="pt-2.5 pb-1 text-xs sm:text-sm leading-relaxed text-slate-600">
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

      {/* Full-Width Programmatic SEO Career Hubs (Footer Links) */}
      <JobSeoLinks />

      {/* Global Site Footer */}
      <Footer />
    </main>
  );
}

/**
 * Extract recognized city from raw address string (e.g. Jankipuram, Lucknow, Delhi)
 */
function extractCityFromAddress(addr: string): string {
  if (!addr || !addr.trim()) return "";
  const match = addr.match(
    /\b(Lucknow|Jankipuram|Delhi|Noida|Kanpur|Bareilly|Gorakhpur|Patna|Chandigarh|Bengaluru|Bangalore|Hyderabad|Mumbai|Pune|Gurugram|Gurgaon|Prayagraj|Allahabad|Changlang|Bomdila)\b/i
  );
  if (match) {
    const val = match[1].toLowerCase();
    if (val === "jankipuram") return "Lucknow";
    return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
  }
  const parts = addr
    .split(/[,;\n]+/)
    .map((p) => p.trim())
    .filter((p) => p && !/^\d{5,6}$/.test(p) && !/^india$/i.test(p));
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (/^(uttar pradesh|up|maharashtra|delhi|bihar|karnataka|india)$/i.test(part)) continue;
    if (/^(sector|plot|lane|road|street|house|flat|h\.no)/i.test(part)) continue;
    return part;
  }
  return parts[parts.length - 1] || "";
}

/**
 * Clean format for role category and industry
 */
function formatIndustry(ind?: string | null): string {
  if (!ind || !ind.trim()) return "";
  const clean = ind.trim();
  if (/information technology|software|it \/ software/i.test(clean)) return "IT & Software";
  if (/internet|e-commerce/i.test(clean)) return "E-Commerce";
  if (/healthcare|life sciences/i.test(clean)) return "Healthcare";
  if (/consumer goods/i.test(clean)) return "Consumer";
  if (/logistics|supply chain/i.test(clean)) return "Logistics";
  if (/media & entertainment/i.test(clean)) return "Media";
  if (/financial services|fintech/i.test(clean)) return "Fintech";
  if (/educational technology|edtech/i.test(clean)) return "EdTech";
  if (/sales/i.test(clean)) return "Sales & BD";
  if (/design/i.test(clean)) return "Design";
  if (/marketing/i.test(clean)) return "Marketing";
  if (/hospitality/i.test(clean)) return "Hospitality";
  return clean;
}

/**
 * Clean Company Card Component representing registered companies directly from API
 * Displays the 3 metadata chips: Location, Vacancy/Openings, and Technology/Industry
 */
function CompanyCard({
  company,
  index,
  detail,
  jobInfo,
}: {
  company: CompanyItem;
  index: number;
  detail?: CompanyDetail;
  jobInfo?: { openings: number; city: string; industry: string };
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const theme = getCompanyColorTheme(company.company_name, index);

  // 1. City / Location from GET /api/v1/company/<uuid:pk>/ or jobs API
  const location =
    detail?.city?.name?.trim() ||
    jobInfo?.city?.trim() ||
    (detail?.address ? extractCityFromAddress(detail.address) : "") ||
    (detail?.state?.name ? detail.state.name.split("(")[0].trim() : "");

  // 2. Number of employees directly from GET /api/v1/company/<uuid:pk>/
  const rawEmployees = detail?.number_of_employees?.trim() || "";
  const formattedEmployees = rawEmployees
    ? (/employee/i.test(rawEmployees) ? rawEmployees : `${rawEmployees} Employees`)
    : "";

  // 3. Technology / Industry from GET /api/v1/company/<uuid:pk>/ or jobs API
  const rawIndustry = detail?.industry || jobInfo?.industry || "";
  const targetHref = `/company/${generateCompanySlug(company.company_name, company.id) || company.id}`;

  return (
    <Link
      href={targetHref}
      className="group relative flex items-center gap-3.5 sm:gap-4 rounded-lg border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all duration-200 h-full min-h-[88px] sm:min-h-[92px]"
    >
      {/* Company Logo / Monogram */}
      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
        {company.company_logo && !logoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={company.company_logo}
            alt={company.company_name}
            className="w-full h-full object-contain p-2"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-bold text-xs sm:text-sm select-none"
            style={{
              backgroundColor: theme.bg === "#FFFFFF" ? "#F1F5F9" : theme.bg,
              color: theme.isLight ? "#0F172A" : "#FFFFFF",
            }}
          >
            {initials(company.company_name)}
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
          {company.company_name}
        </h3>

        {/* Real metadata chips: City, Number of Employees, and Technology */}
        <div className="mt-2 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs flex-nowrap overflow-hidden">
          {/* City / Location Chip */}
          {location && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-lg bg-slate-50/90 border border-slate-100 text-slate-600 shrink-0">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="whitespace-nowrap">{location}</span>
            </div>
          )}

          {/* Number of Employees Chip */}
          {formattedEmployees && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-lg bg-slate-50/90 border border-slate-100 text-slate-600 shrink-0">
              <Users className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="whitespace-nowrap">{formattedEmployees}</span>
            </div>
          )}

          {/* Technology / Industry Chip */}
          {formattedIndustry && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-lg bg-slate-50/90 border border-slate-100 text-slate-600 shrink-0">
              <Briefcase className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="whitespace-nowrap">{formattedIndustry}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
