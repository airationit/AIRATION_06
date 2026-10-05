"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";
import { fetchJobs } from "@/lib/api/jobs";
import { JobListItem } from "@/types/jobs";

interface DepartmentItem {
  name: string;
  slug: string;
  count: number;
}

export function JobsByDepartmentContent() {
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
        console.error("Failed to load active jobs for department directory:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadActiveJobs();
    return () => {
      mounted = false;
    };
  }, []);

  // Compute active departments strictly from backend active job listings
  const departmentsList = useMemo(() => {
    const deptDataMap = new Map<string, { displayName: string; canonicalSlug: string; count: number }>();

    activeJobs.forEach((job) => {
      // Filter out test/dummy jobs
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

      let rawDept = job.role_category?.name || job.job_role?.name || (job as any).department || "";
      if (!rawDept) return;

      // Clean up department label
      let cleanDept = rawDept
        .replace(/\s*Roles$/i, "")
        .replace(/^IT\s*\/\s*Software$/i, "IT & Software")
        .replace(/^Sales$/i, "Sales & BD")
        .replace(/^Design$/i, "Design & Creative")
        .replace(/^HR$/i, "Human Resources")
        .replace(/^Admin$/i, "Admin & Office Support")
        .trim();

      if (cleanDept.toLowerCase() === "custom") return;

      const slug = cleanDept.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      if (cleanDept && slug) {
        const existing = deptDataMap.get(slug);
        if (existing) {
          existing.count += 1;
        } else {
          deptDataMap.set(slug, {
            displayName: cleanDept,
            canonicalSlug: slug,
            count: 1,
          });
        }
      }
    });

    const dynamicDepts: DepartmentItem[] = [];

    deptDataMap.forEach(({ displayName, canonicalSlug, count }) => {
      if (count > 0) {
        dynamicDepts.push({
          name: displayName,
          slug: canonicalSlug,
          count,
        });
      }
    });

    return dynamicDepts.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [activeJobs]);

  // Filter departments by live search query
  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return departmentsList;
    const q = searchQuery.toLowerCase().trim();
    return departmentsList.filter(
      (dept) =>
        dept.name.toLowerCase().includes(q) || dept.slug.includes(q)
    );
  }, [departmentsList, searchQuery]);

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
              aria-label="Search for department"
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
              Jobs By Department
            </h1>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
              <span>Fetching active hiring departments...</span>
            </div>
          )}
        </div>

        {/* Departments Grid: Dynamic active backend hiring departments */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Loading active hiring departments...
            </p>
          </div>
        ) : filteredDepartments.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3.5 gap-x-6">
            {filteredDepartments.map((dept) => (
              <Link
                key={dept.slug}
                href={`/jobs?search=${encodeURIComponent(dept.name)}`}
                className="group flex items-center text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors py-1.5"
                title={dept.name}
              >
                <span className="truncate group-hover:translate-x-0.5 transition-transform">
                  {dept.name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {searchQuery
                ? `No departments found matching "${searchQuery}"`
                : "No active job listings in any departments currently."}
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
