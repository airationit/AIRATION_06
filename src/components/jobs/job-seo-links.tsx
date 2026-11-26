"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMasterdataStore } from "@/store/masterdata-store";
import {
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
  const [showAllDepartments, setShowAllDepartments] = useState(false);

  // 1. All Cities List (Tier 1 & Tier 2)
  const allCities = useMemo(() => {
    const rawCities =
      cities && cities.length > 0
        ? cities.map((c) => ({
          slug: (c as { slug?: string }).slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: c.name,
        }))
        : POPULAR_CITIES;

    const seen = new Set<string>();
    const result: Array<{ slug: string; name: string }> = [];
    for (const city of rawCities) {
      if (city.slug && !seen.has(city.slug)) {
        seen.add(city.slug);
        result.push(city);
      }
    }
    return result;
  }, [cities]);

  const visibleCities = showAllCities ? allCities : allCities.slice(0, 10);

  // 2. Popular Job Roles & Special Tracks
  const popularRolesAndTracks = useMemo(() => {
    const items = [
      { label: "Frontend Developer Jobs", shortLabel: "Frontend Developer", slug: "frontend-developer" },
      { label: "Full Stack Developer Jobs", shortLabel: "Full Stack Developer", slug: "full-stack-developer" },
      { label: "React Developer Jobs", shortLabel: "React Developer", slug: "react-developer" },
      { label: "Python Developer Jobs", shortLabel: "Python Developer", slug: "python-developer" },
      { label: "Telecaller / Inside Sales Jobs", shortLabel: "Telecaller & Sales", slug: "telecaller" },
      { label: "Sales Executive Jobs", shortLabel: "Sales Executive", slug: "sales-executive" },
      { label: "Business Development (BDM)", shortLabel: "Business Dev (BD)", slug: "business-development-manager" },
      { label: "Human Resources (HR) Jobs", shortLabel: "HR Executive", slug: "hr-manager" },
      { label: "Accounts & Finance Jobs", shortLabel: "Accounts & Finance", slug: "accountant" },
      { label: "Back Office Executive Jobs", shortLabel: "Back Office Exec", slug: "back-office-executive" },
      { label: "Customer Support Jobs", shortLabel: "Customer Support", slug: "customer-support-associate" },
      { label: "Data Entry Operator Jobs", shortLabel: "Data Entry", slug: "data-entry-operator" },
      { label: "UI/UX Designer Jobs", shortLabel: "UI/UX Designer", slug: "ui-ux-designer" },
      { label: "Digital Marketing Jobs", shortLabel: "Digital Marketing", slug: "digital-marketing-specialist" },
      { label: "Work from Home / Remote Jobs", shortLabel: "Work from Home", slug: "remote-jobs" },
      { label: "Fresher Jobs (0-1 yrs)", shortLabel: "Freshers (0-1 yrs)", slug: "freshers-jobs" },
      { label: "Part Time Jobs", shortLabel: "Part Time Jobs", slug: "part-time-jobs" },
      { label: "Internships with Stipend", shortLabel: "Internships", slug: "internship-jobs" },
      { label: "Data Analyst Jobs", shortLabel: "Data Analyst", slug: "data-analyst" },
      { label: "DevOps & Cloud Jobs", shortLabel: "DevOps & Cloud", slug: "devops-engineer" },
      { label: "QA & Software Testing Jobs", shortLabel: "QA & Testing", slug: "qa-automation-engineer" },
      { label: "Verified Employer Jobs", shortLabel: "Verified Employers", slug: "verified-jobs" },
    ];
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });
  }, []);

  const visiblePopularRoles = showAllPopular
    ? popularRolesAndTracks
    : popularRolesAndTracks.slice(0, 10);

  // 3. Jobs by Department / Category
  const departments = useMemo(() => {
    const items = [
      { label: "Engineering & Software Development", shortLabel: "Engineering", slug: "software-developer-jobs" },
      { label: "Data Science, Analytics & AI", shortLabel: "Data Science & AI", slug: "data-analyst" },
      { label: "Design, UI/UX & Creative", shortLabel: "UI/UX & Design", slug: "ui-ux-designer" },
      { label: "Marketing, SEO & Content Growth", shortLabel: "Marketing & SEO", slug: "digital-marketing-specialist" },
      { label: "Sales & Business Development", shortLabel: "Sales & BD", slug: "sales-executive" },
      { label: "Operations, Admin & Back Office", shortLabel: "Operations & Admin", slug: "operations-executive" },
      { label: "Human Resources & Talent Acquisition", shortLabel: "HR & Hiring", slug: "hr-manager" },
      { label: "Accounting, Banking & Finance", shortLabel: "Finance & Accounts", slug: "accountant" },
      { label: "Customer Support & Telecalling", shortLabel: "Customer Support", slug: "customer-support-associate" },
      { label: "Product & Project Management", shortLabel: "Product Mgmt", slug: "product-management" },
      { label: "IT & Information Security", shortLabel: "IT & Security", slug: "it-information-security" },
      { label: "Quality Assurance & Testing", shortLabel: "QA & Testing", slug: "quality-assurance" },
      { label: "Logistics & Supply Chain", shortLabel: "Logistics", slug: "logistics-supply-chain" },
      { label: "Healthcare & Pharmaceuticals", shortLabel: "Healthcare", slug: "healthcare-doctor-hospital" },
      { label: "Hospitality & Tourism", shortLabel: "Hospitality", slug: "restaurant-hospitality-tourism" },
      { label: "Retail & eCommerce", shortLabel: "Retail & eCommerce", slug: "retail-ecommerce" },
      { label: "Content, Media & Journalism", shortLabel: "Content & Media", slug: "content-editorial-journalism" },
      { label: "Education & Teaching", shortLabel: "Education", slug: "education" },
      { label: "Legal & Regulatory Affairs", shortLabel: "Legal & Affairs", slug: "legal-regulatory" },
      { label: "Construction & Site Engineering", shortLabel: "Construction", slug: "construction-site-engineering" },
    ];
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });
  }, []);

  const visibleDepartments = showAllDepartments ? departments : departments.slice(0, 10);

  return (
    <section
      aria-labelledby="career-directory-heading"
      className="w-full border-t border-border/60 py-5 sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:gap-4">

        {/* SECTION 1: JOBS BY CATEGORIES */}
        <div id="directory-categories" className="pb-2 sm:pb-2.5 border-b border-border/40 scroll-mt-32">
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-2.5">
            Jobs by Categories
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-2 sm:gap-y-2.5 gap-x-3 sm:gap-x-6">
            {visibleDepartments.map((dept) => (
              <Link
                key={dept.slug}
                href={`/jobs/${dept.slug}`}
                className="text-[11.5px] xs:text-xs sm:text-sm font-normal text-muted-foreground hover:text-foreground hover:underline hover:underline-offset-4 transition-all duration-150 truncate leading-snug"
              >
                <span className="sm:hidden">{dept.shortLabel || dept.label}</span>
                <span className="hidden sm:inline">{dept.label}</span>
              </Link>
            ))}

            {departments.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllDepartments(!showAllDepartments)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer w-fit"
              >
                <span>{showAllDepartments ? "View less" : "View more"}</span>
                {showAllDepartments ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* SECTION 2: JOBS BY ROLES */}
        <div id="directory-roles" className="pb-2 sm:pb-2.5 border-b border-border/40">
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-2.5">
            Jobs by Roles
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-2 sm:gap-y-2.5 gap-x-3 sm:gap-x-6">
            {visiblePopularRoles.map((role) => {
              const isActive = currentRoleSlug === role.slug;
              return (
                <Link
                  key={role.slug}
                  href={`/jobs/${role.slug}`}
                  className={cn(
                    "text-[11.5px] xs:text-xs sm:text-sm font-normal transition-all duration-150 truncate leading-snug hover:underline hover:underline-offset-4",
                    isActive
                      ? "text-brand-400 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="sm:hidden">{role.shortLabel || role.label}</span>
                  <span className="hidden sm:inline">{role.label}</span>
                </Link>
              );
            })}

            {popularRolesAndTracks.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllPopular(!showAllPopular)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer w-fit"
              >
                <span>{showAllPopular ? "View less" : "View more"}</span>
                {showAllPopular ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* SECTION 3: JOBS BY CITIES */}
        <div id="directory-cities" className="pb-2 sm:pb-2.5 border-b border-border/40 scroll-mt-32">
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-2.5">
            Jobs by Cities
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-2 sm:gap-y-2.5 gap-x-3 sm:gap-x-6">
            {visibleCities.map((city) => {
              const isActive = currentCitySlug === city.slug;
              return (
                <Link
                  key={city.slug}
                  href={`/jobs/jobs-in-${city.slug}`}
                  className={cn(
                    "text-[11.5px] xs:text-xs sm:text-sm font-normal transition-all duration-150 truncate leading-snug hover:underline hover:underline-offset-4",
                    isActive
                      ? "text-brand-400 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="sm:hidden">{city.name}</span>
                  <span className="hidden sm:inline">Jobs in {city.name}</span>
                </Link>
              );
            })}

            {allCities.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllCities(!showAllCities)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer w-fit"
              >
                <span>{showAllCities ? "View less" : "View more"}</span>
                {showAllCities ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
