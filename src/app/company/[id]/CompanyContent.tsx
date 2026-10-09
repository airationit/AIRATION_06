"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  MapPin, Globe, Share2,
  Briefcase, User, Users, ChevronDown,
  Smartphone, Sparkles, Clock, CheckCircle2, ArrowUpRight
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Footer, InteractiveDots } from "@/components/shared";
import { apiClient } from "@/lib/api/client";
import { normalizeJobItem } from "@/lib/jobs-data";
import { JobCard } from "@/components/jobs/job-card";
import { Job } from "@/lib/jobs-data";

/**
 * Custom Building/Industry SVG matching the user's provided icon exactly
 */
function CompanyBuildingIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 3C9.5 2.17 10.17 1.5 11 1.5H20.5C21.33 1.5 22 2.17 22 3V21C22 21.55 21.55 22 21 22H3C2.45 22 2 21.55 2 21V10.5C2 9.67 2.67 9 3.5 9H9.5V3ZM4.5 15C4.5 14.17 5.17 13.5 6 13.5C6.83 13.5 7.5 14.17 7.5 15V22H4.5V15ZM12 5.5H14.5V8H12V5.5ZM17 5.5H19.5V8H17V5.5ZM12 10.5H14.5V13H12V10.5ZM17 10.5H19.5V13H17V10.5Z"
      />
    </svg>
  );
}

/**
 * Scalloped Crown / Rosette Verified Badge matching user's requested icon
 */
function CompanyVerifiedBadge({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6z"
        fill="#1D9BF0"
      />
      <path
        d="M10.438 16.758l-3.957-3.957 1.414-1.414 2.543 2.543 6.06-6.06 1.414 1.414-7.474 7.474z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function getValidUrl(urlStr: string) {
  if (!urlStr) return "";
  return urlStr.startsWith("http://") || urlStr.startsWith("https://") ? urlStr : `https://${urlStr}`;
}

interface Company {
  id: string;
  company_name: string;
  company_logo: string;
  industry: string;
  number_of_employees: string;
  address: string;
  city: { id: string; name: string } | null;
  state: { id: string; name: string } | null;
  website_link: string | null;
  linkedin_link: string | null;
  is_verified: boolean;
  email?: string;
  contact_email?: string;
}

export default function CompanyContent({ companyId }: { companyId: string }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  
  // Categories State
  const [categories, setCategories] = useState<{ id: string; name: string; open_jobs_count: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const json = await apiClient<any>(`/api/v1/company/${companyId}/`);
        if (json.success && json.data) {
          setCompany(json.data);
        } else {
          throw new Error(json.message || "Failed to load company details");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const json = await apiClient<any>(`/api/v1/company/${companyId}/job-categories/`);
        if (json && json.data) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    if (companyId) {
      fetchCompany();
      fetchCategories();
    }
  }, [companyId]);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      setLoadingJobs(true);
      try {
        const json = await apiClient<any>(`/api/v1/company/${companyId}/jobs/`, {
          params: selectedCategory ? { category_id: selectedCategory } : undefined,
        });
        if (json && json.data) {
          setJobs(json.data.map((raw: any) => normalizeJobItem(raw)));
        }
      } catch (err) {
        console.error("Failed to fetch company jobs", err);
      } finally {
        setLoadingJobs(false);
      }
    };

    if (companyId) {
      fetchCompanyJobs();
    }
  }, [companyId, selectedCategory]);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: company?.company_name || "Company Profile",
            url: window.location.href,
          });
          return;
        } catch {
          // fallback to clipboard
        }
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  if (error || !company) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center text-slate-600 mb-4">{error || "Company not found."}</div>
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          Return to home
        </Link>
      </main>
    );
  }

  const initials = company.company_name
    ? company.company_name
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CO";

  const openJobsCount = jobs.length > 0 
    ? jobs.length 
    : categories.reduce((acc, cat) => acc + (cat.open_jobs_count || 0), 0);

  // Derive location solely from real API data (city/state object, or jobs city, or address)
  const resolvedLocation = (() => {
    if (company.city?.name) {
      return `${company.city.name}${company.state?.name ? `, ${company.state.name}` : ""}`;
    }
    const jobWithCity = jobs.find((j) => j.cityName || j.location);
    if (jobWithCity) {
      if (jobWithCity.cityName) {
        return `${jobWithCity.cityName}${jobWithCity.stateName ? `, ${jobWithCity.stateName}` : ""}`;
      }
      if (jobWithCity.location) {
        return jobWithCity.location;
      }
    }
    if (company.address) {
      const parts = company.address.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        return parts.slice(-2).join(", ");
      }
    }
    return "Not specified";
  })();

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground justify-between">
      {/* Background Dots Canvas consistent with homescreen and blog */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/companies" className="hover:text-blue-600 transition-colors">Top Companies</Link>
          <span>›</span>
          <span className="font-semibold text-slate-700">{company.company_name} Overview</span>
        </div>

        {/* Top Card: Compact, Modern Header Bar (Matching Reference Image 2) */}
        <div className="bg-white dark:bg-card rounded-2xl md:rounded-[22px] border border-slate-200/90 dark:border-border px-5 py-4 sm:px-6 sm:py-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] mb-8 transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
            {/* Left: App-Icon Squircle + Title & Single Meta Line */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Squircle Logo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-950 text-white shrink-0 flex items-center justify-center overflow-hidden font-bold text-lg sm:text-xl shadow-xs border border-slate-200/60 dark:border-slate-800">
                {company.company_logo && !logoError ? (
                  <img
                    src={company.company_logo}
                    alt={company.company_name}
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain p-2 bg-white"
                  />
                ) : (
                  <span className="text-white font-extrabold tracking-tight">{initials}</span>
                )}
              </div>

              {/* Company Info */}
              <div className="min-w-0 flex flex-col justify-center">
                {/* Name + Verified Badge */}
                <div className="flex items-center gap-2 min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-[22px] font-bold text-slate-900 dark:text-foreground tracking-tight truncate">
                    {company.company_name}
                  </h1>
                  {company.is_verified && (
                    <span
                      className="inline-flex items-center justify-center shrink-0"
                      title="Verified Company"
                    >
                      <CompanyVerifiedBadge className="w-5 h-5 drop-shadow-2xs" />
                    </span>
                  )}
                </div>

                {/* Single Meta Row (Location | Industry | Employee Count) */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {/* Location */}
                  <span className="inline-flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{resolvedLocation}</span>
                  </span>

                  {/* Divider */}
                  {company.industry && company.industry.trim().length > 0 && (
                    <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:inline-block" aria-hidden="true" />
                  )}

                  {/* Industry */}
                  {company.industry && company.industry.trim().length > 0 && (
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{company.industry}</span>
                    </span>
                  )}

                  {/* Divider */}
                  {company.number_of_employees && company.number_of_employees.trim().length > 0 && (
                    <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:inline-block" aria-hidden="true" />
                  )}

                  {/* Employee Count */}
                  {company.number_of_employees && company.number_of_employees.trim().length > 0 && (
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {company.number_of_employees.toLowerCase().includes("employee")
                          ? company.number_of_employees
                          : `${company.number_of_employees} employees`}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Pill Action Buttons (Linkedin, Website, Share) */}
            <div className="flex items-center gap-2 sm:gap-2.5 self-start lg:self-center shrink-0">
              {/* LinkedIn Button */}
              <a
                href={
                  company.linkedin_link && company.linkedin_link.trim().length > 0
                    ? getValidUrl(company.linkedin_link)
                    : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(company.company_name)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                title="LinkedIn Profile"
              >
                <span className="flex items-center justify-center w-4 h-4 rounded bg-[#0A66C2] text-white text-[10px] font-bold leading-none">
                  in
                </span>
                <span>Linkedin</span>
              </a>

              {/* Website Button */}
              <a
                href={
                  company.website_link && company.website_link.trim().length > 0
                    ? getValidUrl(company.website_link)
                    : `https://www.google.com/search?q=${encodeURIComponent(company.company_name)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
                title="Official Website"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Website</span>
              </a>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs cursor-pointer select-none"
                title="Share Company Profile"
              >
                <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{copied ? "Copied" : "Share"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div id="job-openings-section" className="w-full scroll-mt-6">
          {/* Section Header & Category Filter Tabs (Matching Reference Image 2) */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Job Openings
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Explore available career opportunities at {company.company_name}
              </p>
            </div>

            {/* Category Filter Pills on Right */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("")}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                    selectedCategory === ""
                      ? "bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs"
                      : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span>All Roles</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedCategory === "" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {categories.reduce((acc, cat) => acc + (cat.open_jobs_count || 0), 0) || jobs.length}
                  </span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                      selectedCategory === cat.id
                        ? "bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                      {cat.open_jobs_count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2-Column Content Layout: Job Cards on Left, App Download Card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Jobs List */}
            <div className="lg:col-span-8 space-y-4">
              {loadingJobs ? (
                <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-xs flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-slate-600 text-sm font-medium">Updating job openings...</p>
                </div>
              ) : jobs.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {jobs.map((job, idx) => (
                    <JobCard key={job.id} job={job} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">No active positions in this category</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    {selectedCategory 
                      ? "Try switching to All Roles or check back later as new positions are posted regularly."
                      : "This company currently has no active job postings."}
                  </p>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View all open roles ({categories.reduce((acc, cat) => acc + (cat.open_jobs_count || 0), 0)})
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Apply Faster on App Sticky Card */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Apply Faster on App
                    </h3>
                    <p className="text-xs text-slate-500">
                      Swipe &amp; direct recruiter match
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mt-4">
                  Skip long forms. Connect directly with {company.company_name}&apos;s recruitment team with AI-matched job scores.
                </p>

                {/* Bullet Points */}
                <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Instant recruiter notifications</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>60-second swipe-to-apply process</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Free &amp; verified positions</span>
                  </div>
                </div>

                {/* Download CTA Button */}
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-5 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Download App &amp; Apply</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
