"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Smartphone, ArrowUpRight } from "lucide-react";
import { Job } from "@/lib/jobs-data";
import { JobCard } from "./job-card";
import { JobFilterBar } from "./job-filter-bar";
import { JobSeoLinks } from "./job-seo-links";
import { siteConfig } from "@/config/site";

interface JobsContentProps {
  initialJobs: Job[];
  totalJobs: number;
  heading: string;
  subheading: string;
  breadcrumbLabel: string;
  roleSlug?: string;
  citySlug?: string;
  experienceSlug?: string;
}

export function JobsContent({
  initialJobs,
  totalJobs,
  heading,
  subheading,
  breadcrumbLabel,
  roleSlug,
  citySlug,
  experienceSlug,
}: JobsContentProps) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");

  const filteredJobs = useMemo(() => {
    let result = [...initialJobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (activeType !== "all") {
      if (activeType === "freshers") {
        result = result.filter((j) => j.experienceSlug === "freshers");
      } else {
        result = result.filter(
          (j) => j.jobType.toLowerCase() === activeType.toLowerCase()
        );
      }
    }

    return result;
  }, [initialJobs, search, activeType]);

  return (
    <div className="min-h-dvh pt-28 pb-20 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Breadcrumbs for SEO */}
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

        {/* Page Hero Header */}
        <div className="mt-6 mb-8 sm:mt-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {heading}
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {subheading}
              </p>
            </div>

            {/* Live Count Indicator */}
            <div className="flex items-center gap-2 self-start md:self-end rounded-xl border border-border/70 bg-card/60 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{totalJobs}+ Live Openings</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10">
          <JobFilterBar
            initialCity={citySlug || "all"}
            initialRole={roleSlug || ""}
            onSearchChange={setSearch}
            activeType={activeType}
            onTypeChange={setActiveType}
          />
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, idx) => (
              <JobCard key={job.id} job={job} index={idx} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 p-12 text-center">
            <h3 className="text-base font-semibold text-foreground">
              No matching jobs found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search keywords or switching filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveType("all");
              }}
              className="mt-4 inline-flex items-center rounded-lg bg-muted px-4 py-2 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Mobile App Callout Banner (Hirance Signature Swipe to Apply) */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-card/80 to-blue-950/20 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>India&apos;s 1st Swipe-Based Hiring App</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Get interviewed 3x faster with the Hirance App
              </h3>
              <p className="max-w-xl text-xs sm:text-sm text-muted-foreground">
                Skip long application forms. View your real-time AI Fit score, swipe right on roles you like, and chat directly with verified hiring teams.
              </p>
            </div>

            <a
              href={siteConfig.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg shrink-0"
            >
              <Smartphone className="h-4 w-4" />
              <span>Download Hirance App</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* SEO Internal Link Cluster */}
        <JobSeoLinks currentRoleSlug={roleSlug} currentCitySlug={citySlug} />
      </div>
    </div>
  );
}
