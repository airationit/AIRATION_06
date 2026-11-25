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
      { label: "Engineering & Software Development", slug: "software-developer-jobs" },
      { label: "Data Science, Analytics & AI", slug: "data-analyst" },
      { label: "Design, UI/UX & Creative", slug: "ui-ux-designer" },
      { label: "Marketing, SEO & Content Growth", slug: "digital-marketing-specialist" },
      { label: "Sales & Business Development", slug: "sales-executive" },
      { label: "Operations, Admin & Back Office", slug: "operations-executive" },
      { label: "Human Resources & Talent Acquisition", slug: "hr-manager" },
      { label: "Accounting, Banking & Finance", slug: "accountant" },
      { label: "Customer Support & Telecalling", slug: "customer-support-associate" },
      { label: "Product & Project Management", slug: "product-management" },
      { label: "IT & Information Security", slug: "it-information-security" },
      { label: "Quality Assurance & Testing", slug: "quality-assurance" },
      { label: "Logistics & Supply Chain", slug: "logistics-supply-chain" },
      { label: "Healthcare & Pharmaceuticals", slug: "healthcare-doctor-hospital" },
      { label: "Hospitality & Tourism", slug: "restaurant-hospitality-tourism" },
      { label: "Retail & eCommerce", slug: "retail-ecommerce" },
      { label: "Content, Media & Journalism", slug: "content-editorial-journalism" },
      { label: "Education & Teaching", slug: "education" },
      { label: "Legal & Regulatory Affairs", slug: "legal-regulatory" },
      { label: "Construction & Site Engineering", slug: "construction-site-engineering" },
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
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-2.5">
            Jobs by Categories
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-2 sm:gap-y-2.5 gap-x-4 sm:gap-x-6">
            {visibleDepartments.map((dept) => (
              <Link
                key={dept.slug}
                href={`/jobs/${dept.slug}`}
                className="text-sm font-normal text-muted-foreground hover:text-foreground hover:underline hover:underline-offset-4 transition-all duration-150 truncate"
              >
                {dept.label}
              </Link>
            ))}

            {departments.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllDepartments(!showAllDepartments)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer w-fit"
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
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-2.5">
            Jobs by Roles
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-2 sm:gap-y-2.5 gap-x-4 sm:gap-x-6">
            {visiblePopularRoles.map((role) => {
              const isActive = currentRoleSlug === role.slug;
              return (
                <Link
                  key={role.slug}
                  href={`/jobs/${role.slug}`}
                  className={cn(
                    "text-sm font-normal transition-all duration-150 truncate hover:underline hover:underline-offset-4",
                    isActive
                      ? "text-brand-400 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {role.label}
                </Link>
              );
            })}

            {popularRolesAndTracks.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllPopular(!showAllPopular)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer w-fit"
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
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-2.5">
            Jobs by Cities
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-2 sm:gap-y-2.5 gap-x-4 sm:gap-x-6">
            {visibleCities.map((city) => {
              const isActive = currentCitySlug === city.slug;
              return (
                <Link
                  key={city.slug}
                  href={`/jobs/jobs-in-${city.slug}`}
                  className={cn(
                    "text-sm font-normal transition-all duration-150 truncate hover:underline hover:underline-offset-4",
                    isActive
                      ? "text-brand-400 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Jobs in {city.name}
                </Link>
              );
            })}

            {allCities.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllCities(!showAllCities)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all cursor-pointer w-fit"
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
