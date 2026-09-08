"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const { popularCities: cities } = useMasterdataStore();

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
      className="mt-14 sm:mt-20 w-full bg-slate-50/50 dark:bg-slate-900/20 py-10"
    >
      <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-10">

        {/* SECTION 1: JOBS BY LOCATION (Find Jobs) */}
        <div id="directory-cities" className="pb-8 border-b border-border/40 scroll-mt-32">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-6">
            Find Jobs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
            {visibleCities.map((city) => {
              const isActive = currentCitySlug === city.slug;
              return (
                <Link
                  key={city.slug}
                  href={`/jobs/jobs-in-${city.slug}`}
                  className={cn(
                    "text-sm font-medium transition-all duration-150 truncate",
                    isActive
                      ? "text-brand-600 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Jobs in {city.name}
                </Link>
              );
            })}
          </div>

          {allCities.length > 10 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCities(!showAllCities)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span>{showAllCities ? "View less" : "View more"}</span>
                {showAllCities ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* SECTION 2: POPULAR JOB ROLES (Popular Jobs) */}
        <div className="pb-8 border-b border-border/40">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-6">
            Popular Jobs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
            {visiblePopularRoles.map((role) => {
              const isActive = currentRoleSlug === role.slug;
              return (
                <Link
                  key={role.slug}
                  href={`/jobs/${role.slug}`}
                  className={cn(
                    "text-sm font-medium transition-all duration-150 truncate",
                    isActive
                      ? "text-brand-600 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {role.label}
                </Link>
              );
            })}
          </div>

          {popularRolesAndTracks.length > 10 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllPopular(!showAllPopular)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span>{showAllPopular ? "View less" : "View more"}</span>
                {showAllPopular ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* SECTION 3: JOBS BY DEPARTMENT */}
        <div id="directory-departments" className="pb-8 border-b border-border/40 scroll-mt-32">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-6">
            Jobs by Department
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
            {departments.map((dept) => (
              <Link
                key={dept.slug}
                href={`/jobs/${dept.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-150 truncate"
              >
                {dept.label}
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION 4: TRENDING CAREER HUBS */}
        <div className="pb-4">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-6">
            Trending Career Hubs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
            {visibleTrendingHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/jobs/${hub.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-150 truncate"
              >
                {hub.label}
              </Link>
            ))}
          </div>

          {trendingHubs.length > 10 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllHubs(!showAllHubs)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <span>{showAllHubs ? "View less" : "View more"}</span>
                {showAllHubs ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

