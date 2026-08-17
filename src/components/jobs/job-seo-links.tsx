"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, MapPin, Briefcase, Layers, Globe, ArrowRight } from "lucide-react";
import { useMasterdataStore } from "@/store/masterdata-store";
import {
  POPULAR_JOB_ROLES,
  POPULAR_CITIES,
} from "@/config/jobs-taxonomy";
import { cn } from "@/lib/utils";

interface JobSeoLinksProps {
  currentRoleSlug?: string;
  currentCitySlug?: string;
}

export function JobSeoLinks({ currentRoleSlug, currentCitySlug }: JobSeoLinksProps) {
  const { cities } = useMasterdataStore();

  // Expand / collapse states for each section
  const [showAllCities, setShowAllCities] = useState(false);
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllHubs, setShowAllHubs] = useState(false);

  // 1. All Cities List (Tier 1 & Tier 2)
  const allCities = useMemo(() => {
    if (cities && cities.length > 0) {
      return cities.map((c) => ({
        slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: c.name,
      }));
    }
    return POPULAR_CITIES;
  }, [cities]);

  const visibleCities = showAllCities ? allCities : allCities.slice(0, 10);

  // 2. Popular Job Roles & Special Tracks
  const popularRolesAndTracks = useMemo(
    () => [
      { label: "Frontend Developer Jobs", slug: "frontend-developer" },
      { label: "Full Stack Developer Jobs", slug: "full-stack-developer" },
      { label: "React Developer Jobs", slug: "react-developer" },
      { label: "Python Developer Jobs", slug: "python-developer" },
      { label: "Telecaller / Inside Sales Jobs", slug: "telecaller" },
      { label: "Sales Executive Jobs", slug: "sales-executive" },
      { label: "Business Development (BDM)", slug: "business-development-manager" },
      { label: "Human Resources (HR) Jobs", slug: "hr-manager" },
      { label: "Accounts & Finance Jobs", slug: "accountant" },
      { label: "Back Office Executive Jobs", slug: "back-office-executive" },
      { label: "Customer Support Jobs", slug: "customer-support-associate" },
      { label: "Data Entry Operator Jobs", slug: "data-entry-operator" },
      { label: "UI/UX Designer Jobs", slug: "ui-ux-designer" },
      { label: "Digital Marketing Jobs", slug: "digital-marketing-specialist" },
      { label: "Work from Home / Remote Jobs", slug: "remote-jobs" },
      { label: "Fresher Jobs (0-1 yrs)", slug: "freshers-jobs" },
      { label: "Part Time Jobs", slug: "part-time-jobs" },
      { label: "Internships with Stipend", slug: "internship-jobs" },
      { label: "Data Analyst Jobs", slug: "data-analyst" },
      { label: "DevOps & Cloud Jobs", slug: "devops-engineer" },
      { label: "QA & Software Testing Jobs", slug: "qa-automation-engineer" },
      { label: "Verified Employer Jobs", slug: "verified-jobs" },
    ],
    []
  );

  const visiblePopularRoles = showAllPopular
    ? popularRolesAndTracks
    : popularRolesAndTracks.slice(0, 10);

  // 3. Jobs by Department / Category
  const departments = useMemo(
    () => [
      { label: "Engineering & Software Development", slug: "software-developer-jobs" },
      { label: "Data Science, Analytics & AI", slug: "data-analyst" },
      { label: "Design, UI/UX & Creative", slug: "ui-ux-designer" },
      { label: "Marketing, SEO & Content Growth", slug: "digital-marketing-specialist" },
      { label: "Sales & Business Development", slug: "sales-executive" },
      { label: "Operations, Admin & Back Office", slug: "operations-executive" },
      { label: "Human Resources & Talent Acquisition", slug: "hr-manager" },
      { label: "Accounting, Banking & Finance", slug: "accountant" },
      { label: "Customer Support & Telecalling", slug: "customer-support-associate" },
    ],
    []
  );

  // 4. High-Demand Role & Location Combinations
  const trendingHubs = useMemo(
    () => [
      { label: "React Developers in Bangalore", slug: "react-developer-in-bangalore" },
      { label: "Remote Frontend Engineers", slug: "remote-frontend-developer" },
      { label: "UI/UX Designers in Mumbai", slug: "ui-ux-designer-in-mumbai" },
      { label: "Python & AI Jobs in Hyderabad", slug: "python-developer-in-hyderabad" },
      { label: "Full Stack Developers in Pune", slug: "full-stack-developer-in-pune" },
      { label: "Inside Sales / Telecallers in Delhi NCR", slug: "telecaller-in-delhi-ncr" },
      { label: "Fresher Jobs in Bangalore", slug: "freshers-jobs-in-bangalore" },
      { label: "Remote Product Designers", slug: "remote-product-designer" },
      { label: "DevOps & Cloud Engineers in Chennai", slug: "devops-engineer-in-chennai" },
      { label: "Data Analysts in Gurgaon", slug: "data-analyst-in-gurgaon" },
      { label: "Digital Marketing in Noida", slug: "digital-marketing-specialist-in-noida" },
      { label: "Fresher Jobs in Pune", slug: "freshers-jobs-in-pune" },
      { label: "Back Office Executives in Mumbai", slug: "back-office-executive-in-mumbai" },
      { label: "Accountants in Kolkata", slug: "accountant-in-kolkata" },
      { label: "Customer Support in Ahmedabad", slug: "customer-support-associate-in-ahmedabad" },
      { label: "Sales Executives in Jaipur", slug: "sales-executive-in-jaipur" },
      { label: "HR Executives in Chandigarh", slug: "hr-manager-in-chandigarh" },
      { label: "Software Engineers in Kochi", slug: "full-stack-developer-in-kochi" },
    ],
    []
  );

  const visibleTrendingHubs = showAllHubs ? trendingHubs : trendingHubs.slice(0, 10);

  return (
    <section
      aria-labelledby="career-directory-heading"
      className="mt-14 sm:mt-20 space-y-5 text-foreground"
    >
      {/* Directory Section Header */}
      <div className="flex flex-col gap-1">
        <h2
          id="career-directory-heading"
          className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
        >
          Explore Careers & Opportunities
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Discover verified job openings across top Indian locations, roles, and domains.
        </p>
      </div>

      {/* 2x2 Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* CARD 1: JOBS BY LOCATION */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 dark:bg-card/40 p-5 sm:p-6 backdrop-blur-md shadow-2xs transition-all duration-200 hover:border-border">
          <div>
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-border/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Jobs by Location
              </h3>
            </div>

            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5">
              {visibleCities.map((city) => {
                const isActive = currentCitySlug === city.slug;
                return (
                  <Link
                    key={city.slug}
                    href={`/jobs/jobs-in-${city.slug}`}
                    className={cn(
                      "group inline-flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 w-fit max-w-full",
                      isActive
                        ? "font-semibold text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/50"
                        : "text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/40 dark:hover:bg-brand-950/20"
                    )}
                  >
                    <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                      Jobs in {city.name}
                    </span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-brand-600 dark:text-brand-400 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {allCities.length > 10 && (
            <div className="mt-3.5 pt-3 border-t border-border/50 flex justify-start">
              <button
                type="button"
                onClick={() => setShowAllCities(!showAllCities)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/50 hover:bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span>
                  {showAllCities
                    ? "View less"
                    : `View all cities (${allCities.length})`}
                </span>
                {showAllCities ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* CARD 2: POPULAR JOB ROLES */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 dark:bg-card/40 p-5 sm:p-6 backdrop-blur-md shadow-2xs transition-all duration-200 hover:border-border">
          <div>
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-border/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 shrink-0">
                <Briefcase className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Popular Job Roles
              </h3>
            </div>

            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5">
              {visiblePopularRoles.map((role) => {
                const isActive = currentRoleSlug === role.slug;
                return (
                  <Link
                    key={role.slug}
                    href={`/jobs/${role.slug}`}
                    className={cn(
                      "group inline-flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 w-fit max-w-full",
                      isActive
                        ? "font-semibold text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/50"
                        : "text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/40 dark:hover:bg-brand-950/20"
                    )}
                  >
                    <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                      {role.label}
                    </span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-brand-600 dark:text-brand-400 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {popularRolesAndTracks.length > 10 && (
            <div className="mt-3.5 pt-3 border-t border-border/50 flex justify-start">
              <button
                type="button"
                onClick={() => setShowAllPopular(!showAllPopular)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/50 hover:bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span>
                  {showAllPopular
                    ? "View less"
                    : `View all roles (${popularRolesAndTracks.length})`}
                </span>
                {showAllPopular ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* CARD 3: JOBS BY DEPARTMENT */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 dark:bg-card/40 p-5 sm:p-6 backdrop-blur-md shadow-2xs transition-all duration-200 hover:border-border">
          <div>
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-border/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 shrink-0">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Jobs by Department
              </h3>
            </div>

            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5">
              {departments.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/jobs/${dept.slug}`}
                  className="group inline-flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 w-fit max-w-full text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/40 dark:hover:bg-brand-950/20"
                >
                  <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                    {dept.label}
                  </span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-brand-600 dark:text-brand-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 4: TRENDING CAREER HUBS */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 dark:bg-card/40 p-5 sm:p-6 backdrop-blur-md shadow-2xs transition-all duration-200 hover:border-border">
          <div>
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-border/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 shrink-0">
                <Globe className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Trending Career Hubs
              </h3>
            </div>

            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5">
              {visibleTrendingHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/jobs/${hub.slug}`}
                  className="group inline-flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 w-fit max-w-full text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/40 dark:hover:bg-brand-950/20"
                >
                  <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                    {hub.label}
                  </span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-brand-600 dark:text-brand-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {trendingHubs.length > 10 && (
            <div className="mt-3.5 pt-3 border-t border-border/50 flex justify-start">
              <button
                type="button"
                onClick={() => setShowAllHubs(!showAllHubs)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/50 hover:bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span>
                  {showAllHubs
                    ? "View less"
                    : `View all hubs (${trendingHubs.length})`}
                </span>
                {showAllHubs ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

