"use client";

import { useState, useMemo } from "react";
import {
  Search,
  RotateCcw,
  Check,
  ChevronDown,
  X,
  SlidersHorizontal,
  Briefcase,
  Building2,
  Clock,
  Sun,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { useMasterdataStore } from "@/store/masterdata-store";
import { POPULAR_CITIES, POPULAR_JOB_ROLES } from "@/config/jobs-taxonomy";
import { cn } from "@/lib/utils";

export interface JobFilterValues {
  search: string;
  roleId: string;
  roleSlug: string;
  workModeId: string;
  jobTypeId: string;
  workShiftId: string;
  experienceId: string;
  salaryRangeId: string;
  cityId: string;
  citySlug: string;
  stateId: string;
  selectedSkillIds: string[];
  isFreeForCandidates?: boolean;
  ordering: string;
}

interface JobFiltersSidebarProps {
  filters: JobFilterValues;
  onChange: (newFilters: JobFilterValues) => void;
  onReset: () => void;
  totalJobsCount?: number;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export function JobFiltersSidebar({
  filters,
  onChange,
  onReset,
  totalJobsCount,
  isMobileDrawerOpen,
  onCloseMobileDrawer,
}: JobFiltersSidebarProps) {
  const {
    jobRoles,
    workModes,
    jobTypes,
    workShifts,
    salaryRanges,
    cities,
  } = useMasterdataStore();

  const [roleSearch, setRoleSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  // Accordion toggle states
  const [expandedSections, setExpandedSections] = useState({
    role: true,
    workMode: true,
    jobType: true,
    workShift: true,
    salary: true,
    location: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // 1. Job Roles list from /masterdata/job-roles/
  const availableRoles = useMemo(() => {
    if (jobRoles && jobRoles.length > 0) {
      return jobRoles.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      }));
    }
    return POPULAR_JOB_ROLES.map((r) => ({
      id: r.slug,
      name: r.label,
      slug: r.slug,
    }));
  }, [jobRoles]);

  const filteredRoles = useMemo(() => {
    let list = availableRoles;
    if (roleSearch.trim()) {
      const q = roleSearch.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    return showAllRoles ? list : list.slice(0, 6);
  }, [availableRoles, roleSearch, showAllRoles]);

  // 2. Work Modes list from /masterdata/work-modes/
  const availableWorkModes = useMemo(() => {
    if (workModes && workModes.length > 0) return workModes;
    return [
      { id: "wfo", name: "In Office" },
      { id: "hybrid", name: "Hybrid" },
      { id: "remote", name: "Remote" },
    ];
  }, [workModes]);

  // 3. Job Types list from /masterdata/job-types/
  const availableJobTypes = useMemo(() => {
    if (jobTypes && jobTypes.length > 0) return jobTypes;
    return [
      { id: "full-time", name: "Full Time" },
      { id: "part-time", name: "Part Time" },
    ];
  }, [jobTypes]);

  // 4. Work Shifts list from /masterdata/work-shifts/
  const availableWorkShifts = useMemo(() => {
    if (workShifts && workShifts.length > 0) return workShifts;
    return [
      { id: "day", name: "Day Shift" },
      { id: "night", name: "Night Shift" },
      { id: "rotational", name: "Rotational Shift" },
    ];
  }, [workShifts]);

  // 5. Salary Ranges list from /masterdata/salary-ranges/
  const availableSalaryRanges = useMemo(() => {
    if (salaryRanges && salaryRanges.length > 0) return salaryRanges;
    return [
      { id: "sal-1", label: "Up to ₹25,000 / mo" },
      { id: "sal-2", label: "₹25,000 - ₹50,000 / mo" },
      { id: "sal-3", label: "₹50,000 - ₹1,00,000 / mo" },
      { id: "sal-4", label: "₹1,00,000+ / mo" },
    ];
  }, [salaryRanges]);

  // 6. Cities list from /masterdata/cities/
  const availableCities = useMemo(() => {
    if (cities && cities.length > 0) {
      return cities.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      }));
    }
    return POPULAR_CITIES.map((c) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
    }));
  }, [cities]);

  const filteredCities = useMemo(() => {
    let list = availableCities;
    if (citySearch.trim()) {
      const q = citySearch.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return showAllCities ? list : list.slice(0, 6);
  }, [availableCities, citySearch, showAllCities]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.roleId || filters.roleSlug) count++;
    if (filters.workModeId) count++;
    if (filters.jobTypeId) count++;
    if (filters.workShiftId) count++;
    if (filters.salaryRangeId) count++;
    if (filters.cityId || (filters.citySlug && filters.citySlug !== "all")) count++;
    return count;
  }, [filters]);

  const content = (
    <div className="space-y-5">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <h2 className="text-base font-bold tracking-tight text-foreground">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. JOB ROLE SECTION */}
      <div className="border-b border-border/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("role")}
          className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-foreground hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            Job Role
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expandedSections.role && "rotate-180"
            )}
          />
        </button>

        {expandedSections.role && (
          <div className="mt-3 space-y-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search job roles..."
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                className="h-8 w-full rounded-lg border border-border/80 bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {filteredRoles.map((role) => {
                const isSelected =
                  filters.roleId === role.id ||
                  filters.roleSlug === role.slug ||
                  filters.roleId === role.slug;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        onChange({ ...filters, roleId: "", roleSlug: "" });
                      } else {
                        onChange({ ...filters, roleId: role.id, roleSlug: role.slug });
                      }
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-all cursor-pointer",
                      isSelected
                        ? "bg-brand-50 font-bold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span className="truncate">{role.name}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {availableRoles.length > 6 && !roleSearch && (
              <button
                type="button"
                onClick={() => setShowAllRoles(!showAllRoles)}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline pt-1 block cursor-pointer"
              >
                {showAllRoles ? "Show less" : `Show ${availableRoles.length - 6} more >`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. WORK MODE SECTION */}
      <div className="border-b border-border/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("workMode")}
          className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-foreground hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            Work Mode
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expandedSections.workMode && "rotate-180"
            )}
          />
        </button>

        {expandedSections.workMode && (
          <div className="mt-3 space-y-2">
            {availableWorkModes.map((mode) => {
              const isChecked = filters.workModeId === mode.id || filters.workModeId === mode.name;
              return (
                <label
                  key={mode.id}
                  className="flex items-center gap-3 cursor-pointer select-none group/opt py-1"
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                      isChecked
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-muted-foreground/40 group-hover/opt:border-brand-500"
                    )}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        workModeId: isChecked ? "" : mode.id,
                      })
                    }
                  />
                  <span
                    className={cn(
                      "text-xs sm:text-[13px] transition-colors",
                      isChecked
                        ? "font-bold text-brand-600 dark:text-brand-400"
                        : "text-foreground/90 group-hover/opt:text-foreground"
                    )}
                  >
                    {mode.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. JOB TYPE SECTION */}
      <div className="border-b border-border/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("jobType")}
          className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-foreground hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            Job Type
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expandedSections.jobType && "rotate-180"
            )}
          />
        </button>

        {expandedSections.jobType && (
          <div className="mt-3 space-y-2">
            {availableJobTypes.map((type) => {
              const isChecked = filters.jobTypeId === type.id || filters.jobTypeId === type.name;
              return (
                <label
                  key={type.id}
                  className="flex items-center gap-3 cursor-pointer select-none group/opt py-1"
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                      isChecked
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-muted-foreground/40 group-hover/opt:border-brand-500"
                    )}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        jobTypeId: isChecked ? "" : type.id,
                      })
                    }
                  />
                  <span
                    className={cn(
                      "text-xs sm:text-[13px] transition-colors",
                      isChecked
                        ? "font-bold text-brand-600 dark:text-brand-400"
                        : "text-foreground/90 group-hover/opt:text-foreground"
                    )}
                  >
                    {type.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. WORK SHIFT SECTION */}
      <div className="border-b border-border/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("workShift")}
          className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-foreground hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sun className="h-3.5 w-3.5 text-muted-foreground" />
            Work Shift
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expandedSections.workShift && "rotate-180"
            )}
          />
        </button>

        {expandedSections.workShift && (
          <div className="mt-3 space-y-2">
            {availableWorkShifts.map((shift) => {
              const isChecked = filters.workShiftId === shift.id || filters.workShiftId === shift.name;
              return (
                <label
                  key={shift.id}
                  className="flex items-center gap-3 cursor-pointer select-none group/opt py-1"
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                      isChecked
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-muted-foreground/40 group-hover/opt:border-brand-500"
                    )}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        workShiftId: isChecked ? "" : shift.id,
                      })
                    }
                  />
                  <span
                    className={cn(
                      "text-xs sm:text-[13px] transition-colors",
                      isChecked
                        ? "font-bold text-brand-600 dark:text-brand-400"
                        : "text-foreground/90 group-hover/opt:text-foreground"
                    )}
                  >
                    {shift.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. SALARY RANGE SECTION */}
      <div className="border-b border-border/70 pb-4">
        <button
          type="button"
          onClick={() => toggleSection("salary")}
          className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-foreground hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
            Salary Range
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expandedSections.salary && "rotate-180"
            )}
          />
        </button>

        {expandedSections.salary && (
          <div className="mt-3 space-y-2">
            {availableSalaryRanges.map((sal) => {
              const isChecked = filters.salaryRangeId === sal.id || filters.salaryRangeId === sal.label;
              return (
                <label
                  key={sal.id}
                  className="flex items-center gap-3 cursor-pointer select-none group/opt py-1"
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                      isChecked
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-muted-foreground/40 group-hover/opt:border-brand-500"
                    )}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        salaryRangeId: isChecked ? "" : sal.id,
                      })
                    }
                  />
                  <span
                    className={cn(
                      "text-xs sm:text-[13px] transition-colors",
                      isChecked
                        ? "font-bold text-brand-600 dark:text-brand-400"
                        : "text-foreground/90 group-hover/opt:text-foreground"
                    )}
                  >
                    {sal.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. LOCATION / CITY SECTION */}
      <div className="pb-1">
        <button
          type="button"
          onClick={() => toggleSection("location")}
          className="flex w-full items-center justify-between py-1 text-left text-sm font-bold text-foreground hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            Location & Cities
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expandedSections.location && "rotate-180"
            )}
          />
        </button>

        {expandedSections.location && (
          <div className="mt-3 space-y-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search city..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="h-8 w-full rounded-lg border border-border/80 bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {filteredCities.map((city) => {
                const isChecked = filters.citySlug === city.slug || filters.cityId === city.id;
                return (
                  <label
                    key={city.slug}
                    className="flex items-center gap-2.5 cursor-pointer select-none group/opt py-1"
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                        isChecked
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-muted-foreground/40 group-hover/opt:border-brand-500"
                      )}
                    >
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked}
                      onChange={() =>
                        onChange({
                          ...filters,
                          cityId: isChecked ? "" : city.id,
                          citySlug: isChecked ? "all" : city.slug,
                        })
                      }
                    />
                    <span
                      className={cn(
                        "text-xs transition-colors",
                        isChecked
                          ? "font-bold text-brand-600 dark:text-brand-400"
                          : "text-foreground/90 group-hover/opt:text-foreground"
                      )}
                    >
                      {city.name}
                    </span>
                  </label>
                );
              })}
            </div>

            {availableCities.length > 6 && !citySearch && (
              <button
                type="button"
                onClick={() => setShowAllCities(!showAllCities)}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline pt-1 block cursor-pointer"
              >
                {showAllCities ? "Show less" : `Show more cities >`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="sticky top-28 hidden lg:block rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
        {content}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileDrawer}
          />

          {/* Drawer sheet */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-card p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="text-base font-bold text-foreground">Filter Jobs</span>
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {content}

            {/* Mobile Drawer Apply Action Button */}
            <div className="mt-8 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-500 cursor-pointer"
              >
                Apply Filters {totalJobsCount !== undefined ? `(${totalJobsCount})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
