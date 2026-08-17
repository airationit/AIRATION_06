"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { POPULAR_CITIES, POPULAR_JOB_ROLES } from "@/config/jobs-taxonomy";
import { useMasterdataStore } from "@/store/masterdata-store";

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

  const { jobRoles, cities, loadMasterdata } = useMasterdataStore();

  useEffect(() => {
    loadMasterdata();
  }, [loadMasterdata]);

  // Combine taxonomy with live masterdata and deduplicate by slug
  const availableRoles = useMemo<{ slug: string; label: string }[]>(() => {
    const rolesList: { slug: string; label: string }[] =
      jobRoles.length > 0
        ? jobRoles.map((r) => ({
            slug: r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            label: r.name,
          }))
        : POPULAR_JOB_ROLES.map((r) => ({ slug: r.slug, label: r.label }));

    const seen = new Set<string>();
    return rolesList.filter((r) => {
      if (!r.slug || seen.has(r.slug)) return false;
      seen.add(r.slug);
      return true;
    });
  }, [jobRoles]);

  const availableCities = useMemo<{ slug: string; name: string }[]>(() => {
    const citiesList: { slug: string; name: string }[] =
      cities.length > 0
        ? cities.map((c) => ({
            slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            name: c.name,
          }))
        : POPULAR_CITIES.map((c) => ({ slug: c.slug, name: c.name }));

    const seen = new Set<string>();
    return citiesList.filter((c) => {
      if (!c.slug || seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    });
  }, [cities]);

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
    <div className="w-full rounded-2xl border border-border/80 bg-card/90 p-4 sm:p-5 shadow-sm backdrop-blur-md">
      <form
        onSubmit={handleApplyFilters}
        className="flex flex-col gap-3 md:flex-row md:items-center"
      >
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by job title, skill, or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onSearchChange) onSearchChange(e.target.value);
            }}
            className="h-11 w-full rounded-xl border border-border/80 bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Quick Role Select */}
        <div className="relative w-full md:w-56">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="h-11 w-full rounded-xl border border-border/80 bg-background px-3 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="" className="bg-background text-foreground">All Job Roles</option>
            {availableRoles.map((r) => (
              <option key={r.slug} value={r.slug} className="bg-background text-foreground">
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
            className="h-11 w-full rounded-xl border border-border/80 bg-background pl-10 pr-3 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="all" className="bg-background text-foreground">All Locations</option>
            {availableCities.map((c) => (
              <option key={c.slug} value={c.slug} className="bg-background text-foreground">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Find Jobs Button */}
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-500 hover:shadow-md shrink-0 cursor-pointer"
        >
          <span>Find Jobs</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Filter toggles */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3 text-xs">
        <span className="font-medium text-muted-foreground mr-1">Popular Filters:</span>
        {[
          { label: "All Openings", value: "all" },
          { label: "Remote", value: "Remote" },
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
                  ? "bg-brand-600 text-white shadow-xs"
                  : "border border-border/70 bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
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
