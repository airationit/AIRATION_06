"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, ArrowRight } from "lucide-react";
import { POPULAR_CITIES, POPULAR_JOB_ROLES } from "@/config/jobs-taxonomy";

interface JobFilterBarProps {
  initialSearch?: string;
  initialCity?: string;
  initialRole?: string;
  onSearchChange?: (term: string) => void;
  onCityChange?: (city: string) => void;
  onTypeChange?: (type: string) => void;
  activeType?: string;
}

export function JobFilterBar({
  initialSearch = "",
  initialCity = "all",
  initialRole = "",
  onSearchChange,
  onCityChange,
  onTypeChange,
  activeType = "all",
}: JobFilterBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedRole, setSelectedRole] = useState(initialRole);

  const handleApplyFilters = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If both role and city are selected, route to the programmatic SEO URL
    if (selectedRole && selectedCity && selectedCity !== "all") {
      router.push(`/jobs/${selectedRole}-in-${selectedCity}`);
      return;
    }

    if (selectedRole && (!selectedCity || selectedCity === "all")) {
      router.push(`/jobs/${selectedRole}`);
      return;
    }

    if ((!selectedRole || selectedRole === "all") && selectedCity && selectedCity !== "all") {
      router.push(`/jobs/jobs-in-${selectedCity}`);
      return;
    }

    // Default route to /jobs
    router.push(`/jobs`);
  };

  return (
    <div className="w-full rounded-2xl border border-border/60 bg-card/70 p-4 sm:p-5 shadow-sm backdrop-blur-md">
      <form
        onSubmit={handleApplyFilters}
        className="flex flex-col gap-3 md:flex-row md:items-center"
      >
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by job title, skills, or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onSearchChange) onSearchChange(e.target.value);
            }}
            className="h-11 w-full rounded-xl border border-border/70 bg-background/80 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Quick Role Select */}
        <div className="relative w-full md:w-56">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="h-11 w-full rounded-xl border border-border/70 bg-background/80 px-3 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">All Job Roles</option>
            {POPULAR_JOB_ROLES.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* City Select */}
        <div className="relative w-full md:w-52">
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              if (onCityChange) onCityChange(e.target.value);
            }}
            className="h-11 w-full rounded-xl border border-border/70 bg-background/80 pl-10 pr-3 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="all">All Locations</option>
            {POPULAR_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Find Jobs Button */}
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md shrink-0"
        >
          <span>Find Jobs</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Quick filter pill toggles */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3 text-xs">
        <span className="font-medium text-muted-foreground mr-1">Popular Filters:</span>
        {[
          { label: "All Openings", value: "all" },
          { label: "Remote / WFH", value: "Remote" },
          { label: "Full Time", value: "Full-Time" },
          { label: "Freshers", value: "freshers" },
        ].map((pill) => {
          const isActive = activeType === pill.value;
          return (
            <button
              key={pill.value}
              type="button"
              onClick={() => onTypeChange && onTypeChange(pill.value)}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-border/50 bg-background/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
