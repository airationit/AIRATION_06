"use client";

import { create } from "zustand";
import {
  Currency,
  SalaryRange,
  State,
  City,
  ExperienceRange,
  JobType,
  WorkMode,
  WorkShift,
  JobRole,
  RoleCategory,
  Skill,
} from "@/types/masterdata";
import {
  fetchCurrencies,
  fetchSalaryRanges,
  fetchCities,
  fetchStates,
  fetchExperienceRanges,
  fetchJobTypes,
  fetchWorkModes,
  fetchWorkShifts,
  fetchJobRoles,
  fetchRoleCategories,
  fetchSkills,
} from "@/lib/api/masterdata";

interface MasterdataState {
  currencies: Currency[];
  salaryRanges: SalaryRange[];
  states: State[];
  cities: City[];
  experienceRanges: ExperienceRange[];
  jobTypes: JobType[];
  workModes: WorkMode[];
  workShifts: WorkShift[];
  jobRoles: JobRole[];
  roleCategories: RoleCategory[];
  skills: Skill[];
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadMasterdata: (force?: boolean) => Promise<void>;
}

export const useMasterdataStore = create<MasterdataState>((set, get) => ({
  currencies: [],
  salaryRanges: [],
  states: [],
  cities: [],
  experienceRanges: [],
  jobTypes: [],
  workModes: [],
  workShifts: [],
  jobRoles: [],
  roleCategories: [],
  skills: [],
  isLoaded: false,
  isLoading: false,
  error: null,

  loadMasterdata: async (force = false) => {
    if (get().isLoaded && !force) return;
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const [
        currencies,
        salaryRanges,
        cities,
        states,
        experienceRanges,
        jobTypes,
        workModes,
        workShifts,
        jobRoles,
        roleCategories,
        skills,
      ] = await Promise.all([
        fetchCurrencies(),
        fetchSalaryRanges(),
        fetchCities(),
        fetchStates(),
        fetchExperienceRanges(),
        fetchJobTypes(),
        fetchWorkModes(),
        fetchWorkShifts(),
        fetchJobRoles(),
        fetchRoleCategories(),
        fetchSkills(),
      ]);

      set({
        currencies,
        salaryRanges,
        cities,
        states,
        experienceRanges,
        jobTypes,
        workModes,
        workShifts,
        jobRoles,
        roleCategories,
        skills,
        isLoaded: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load masterdata in store:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load masterdata",
      });
    }
  },
}));
