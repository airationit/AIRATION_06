"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";
import { fetchJobs } from "@/lib/api/jobs";
import { resolveCityFromLocation } from "@/lib/jobs-data";
import { JobListItem } from "@/types/jobs";

export function JobsByCityContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJobs, setActiveJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamically fetch public active jobs directly from backend API
  useEffect(() => {
    let mounted = true;
    async function loadActiveJobs() {
      try {
        const response = await fetchJobs({ page_size: 100 });
        if (mounted && response.data) {
          setActiveJobs(response.data);
        }
      } catch (err) {
        console.error("Failed to load active jobs for city directory:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadActiveJobs();
    return () => {
      mounted = false;
    };
  }, []);

  // Compute active cities strictly from real active job listings using normalized city resolution
  const citiesList = useMemo(() => {
    const cityDataMap = new Map<string, { displayName: string; canonicalSlug: string; count: number }>();

    activeJobs.forEach((job) => {
      // Filter out test/dummy jobs (e.g. title: "new", "test", "demo")
      const titleLower = (job.title || "").toLowerCase().trim();
      if (titleLower === "new" || titleLower === "test" || titleLower === "demo" || titleLower.length < 2) {
        return;
      }

      // Safely check status whether string, number, or object
      let statusStr = "";
      if (typeof job.status === "string") {
        statusStr = job.status.toLowerCase();
      } else if (typeof job.status === "number") {
        statusStr = job.status === 1 ? "active" : "inactive";
      } else if (job.status && typeof job.status === "object" && "name" in (job.status as any)) {
        statusStr = String((job.status as any).name || "").toLowerCase();
      }

      if (statusStr && statusStr !== "published" && statusStr !== "active" && statusStr !== "open") {
        return;
      }

      // Skip expired jobs if deadline passed
      if (job.application_deadline) {
        const deadline = new Date(job.application_deadline);
        if (!isNaN(deadline.getTime()) && deadline < new Date()) {
          return;
        }
      }

      const { cityName, citySlug } = resolveCityFromLocation(job.city?.name, job.location);

      if (cityName && citySlug && citySlug !== "all" && cityName !== "India" && cityName !== "Remote") {
        const existing = cityDataMap.get(citySlug);
        if (existing) {
          existing.count += 1;
        } else {
          cityDataMap.set(citySlug, {
            displayName: cityName,
            canonicalSlug: citySlug,
            count: 1,
          });
        }
      }
    });

    const dynamicCities: Array<{ name: string; canonicalSlug: string; count: number }> = [];

    cityDataMap.forEach(({ displayName, canonicalSlug, count }) => {
      if (count > 0) {
        dynamicCities.push({
          name: displayName,
          canonicalSlug,
          count,
        });
      }
    });

    return dynamicCities.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [activeJobs]);

  // Filter cities by search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return citiesList;
    const q = searchQuery.toLowerCase().trim();
    return citiesList.filter((city) =>
      city.name.toLowerCase().includes(q) || city.canonicalSlug.includes(q)
    );
  }, [citiesList, searchQuery]);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Interactive Dots Background Canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:pt-14 sm:pb-24">
        
        {/* Top Centered Search Bar Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="relative flex items-center w-full rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-card px-4 py-3 shadow-[0_6px_30px_rgba(0,0,0,0.05)] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all">
            <Search className="h-5 w-5 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="Search for city or department or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3.5 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
              aria-label="Search for city"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white px-2 py-1 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Jobs By City
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
             
            </p>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
              <span>Fetching active job cities...</span>
            </div>
          )}
        </div>

        {/* Cities Grid: Strictly active backend job cities without count suffix */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Loading active hiring cities...
            </p>
          </div>
        ) : filteredCities.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3.5 gap-x-6">
            {filteredCities.map((city) => (
              <Link
                key={city.canonicalSlug}
                href={`/jobs/jobs-in-${city.canonicalSlug}`}
                className="group inline-flex items-center text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors py-1.5"
              >
                <span className="truncate group-hover:translate-x-0.5 transition-transform">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {searchQuery ? `No cities found matching "${searchQuery}"` : "No active job listings in any cities currently."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline"
              >
                Reset Search
              </button>
            )}
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
