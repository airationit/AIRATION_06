/**
 * Masterdata Type Definitions (Hirance Public API)
 */

export interface Currency {
  id: string;
  code: string;
  name: string;
}

export interface SalaryRange {
  id: string;
  label: string;
  min_salary: number;
  max_salary: number;
  currency?: Currency;
}

export interface Country {
  id: string;
  name: string;
}

export interface State {
  id: string;
  name: string;
  country: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface ExperienceRange {
  id: string;
  label: string;
  min_experience: number;
  max_experience: number;
}

export interface EducationLevel {
  id: string;
  level: string;
  display_order: number;
}

export interface JobType {
  id: string;
  name: string;
  display_order?: number;
}

export interface WorkMode {
  id: string;
  name: string;
  display_order?: number;
}

export interface WorkShift {
  id: string;
  name: string;
  display_order?: number;
}

export interface Industry {
  id: string;
  name: string;
  display_order?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface RoleCategory {
  id: string;
  name: string;
}

export interface JobRole {
  id: string;
  name: string;
  category?: string;
}

export interface MasterdataCache {
  currencies: Currency[];
  salaryRanges: SalaryRange[];
  countries: Country[];
  states: State[];
  cities: City[];
  experienceRanges: ExperienceRange[];
  educationLevels: EducationLevel[];
  jobTypes: JobType[];
  workModes: WorkMode[];
  workShifts: WorkShift[];
  industries: Industry[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  roleCategories: RoleCategory[];
  jobRoles: JobRole[];
}
