import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";
import {
  Currency,
  SalaryRange,
  Country,
  State,
  City,
  ExperienceRange,
  EducationLevel,
  JobType,
  WorkMode,
  WorkShift,
  Industry,
  SkillCategory,
  Skill,
  RoleCategory,
  JobRole,
} from "@/types/masterdata";

/**
 * Fetch all supported currencies
 */
export async function fetchCurrencies(): Promise<Currency[]> {
  try {
    const res = await apiClient<ApiResponse<Currency[]>>("/masterdata/currencies/", {
      revalidate: 86400, // 24 hours
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchCurrencies error:", error);
    return [
      { id: "curr-inr", code: "INR", name: "Indian Rupee" },
      { id: "curr-usd", code: "USD", name: "US Dollar" },
    ];
  }
}

/**
 * Fetch salary ranges
 */
export async function fetchSalaryRanges(): Promise<SalaryRange[]> {
  try {
    const res = await apiClient<ApiResponse<SalaryRange[]>>("/masterdata/salary-ranges/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchSalaryRanges error:", error);
    return [];
  }
}

/**
 * Fetch countries
 */
export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await apiClient<ApiResponse<Country[]>>("/masterdata/countries/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchCountries error:", error);
    return [{ id: "country-in", name: "India" }];
  }
}

/**
 * Fetch states (optionally filtered by country_id)
 */
export async function fetchStates(countryId?: string): Promise<State[]> {
  try {
    const res = await apiClient<ApiResponse<State[]>>("/masterdata/states/", {
      params: countryId ? { country_id: countryId } : undefined,
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchStates error:", error);
    return [];
  }
}

/**
 * Fetch cities (optionally filtered by state_id)
 */
export async function fetchCities(stateId?: string): Promise<City[]> {
  try {
    const res = await apiClient<ApiResponse<City[]>>("/masterdata/cities/", {
      params: stateId ? { state_id: stateId } : undefined,
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchCities error:", error);
    return [
      { id: "city-bangalore", name: "Bangalore", state: "Karnataka" },
      { id: "city-mumbai", name: "Mumbai", state: "Maharashtra" },
      { id: "city-delhi", name: "Delhi NCR", state: "Delhi" },
      { id: "city-pune", name: "Pune", state: "Maharashtra" },
      { id: "city-hyderabad", name: "Hyderabad", state: "Telangana" },
      { id: "city-chennai", name: "Chennai", state: "Tamil Nadu" },
      { id: "city-gurgaon", name: "Gurgaon", state: "Haryana" },
      { id: "city-noida", name: "Noida", state: "Uttar Pradesh" },
    ];
  }
}

/**
 * Fetch experience ranges
 */
export async function fetchExperienceRanges(): Promise<ExperienceRange[]> {
  try {
    const res = await apiClient<ApiResponse<ExperienceRange[]>>("/masterdata/experience-ranges/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchExperienceRanges error:", error);
    return [
      { id: "exp-0-1", label: "0-1 yrs (Freshers)", min_experience: 0, max_experience: 1 },
      { id: "exp-1-3", label: "1-3 yrs (Entry Level)", min_experience: 1, max_experience: 3 },
      { id: "exp-3-5", label: "3-5 yrs (Mid Level)", min_experience: 3, max_experience: 5 },
      { id: "exp-5-8", label: "5-8 yrs (Senior Level)", min_experience: 5, max_experience: 8 },
      { id: "exp-8-plus", label: "8+ yrs (Lead / Executive)", min_experience: 8, max_experience: 20 },
    ];
  }
}

/**
 * Fetch education levels
 */
export async function fetchEducationList(): Promise<EducationLevel[]> {
  try {
    const res = await apiClient<ApiResponse<EducationLevel[]>>("/masterdata/education_list/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchEducationList error:", error);
    return [];
  }
}

/**
 * Fetch job types (Full-Time, Part-Time, Remote, Internship, etc.)
 */
export async function fetchJobTypes(): Promise<JobType[]> {
  try {
    const res = await apiClient<ApiResponse<JobType[]>>("/masterdata/job-types/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchJobTypes error:", error);
    return [
      { id: "c2e13590-f69f-4bd4-9545-09cf81daae9e", name: "Full Time", display_order: 1 },
      { id: "fdde7c2d-88e6-4ecf-9fb5-596ca7f81c69", name: "Part Time", display_order: 2 },
      { id: "28ecf748-85c0-4deb-9133-8f24ec85fc11", name: "Both (Full-Time/Part-Time)", display_order: 3 },
    ];
  }
}

/**
 * Fetch work modes (On-site, Hybrid, Remote)
 */
export async function fetchWorkModes(): Promise<WorkMode[]> {
  try {
    const res = await apiClient<ApiResponse<WorkMode[]>>("/masterdata/work-modes/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchWorkModes error:", error);
    return [
      { id: "585ed3ae-c9eb-4f89-a715-33544efa1c07", name: "Work from Office", display_order: 1 },
      { id: "8c974af2-6d8b-49c8-b891-0a5ce9847024", name: "Field Job", display_order: 2 },
      { id: "bf5f80ba-b651-47c0-be52-9978569789d7", name: "Work from Home", display_order: 3 },
    ];
  }
}

/**
 * Fetch work shifts
 */
export async function fetchWorkShifts(): Promise<WorkShift[]> {
  try {
    const res = await apiClient<ApiResponse<WorkShift[]>>("/masterdata/work-shifts/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchWorkShifts error:", error);
    return [
      { id: "f7d70b0b-57c0-4014-8002-7d170de4c299", name: "Day Shift", display_order: 1 },
      { id: "6e9a009a-35af-4bfe-baa9-a77b56ca443b", name: "Night Shift", display_order: 2 },
      { id: "8a5eafb2-daef-4246-9e58-5331a2c94dcd", name: "Hybrid", display_order: 3 },
    ];
  }
}

/**
 * Fetch industries
 */
export async function fetchIndustries(): Promise<Industry[]> {
  try {
    const res = await apiClient<ApiResponse<Industry[]>>("/masterdata/industries/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchIndustries error:", error);
    return [];
  }
}

/**
 * Fetch skill categories
 */
export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  try {
    const res = await apiClient<ApiResponse<SkillCategory[]>>("/masterdata/skill-categories/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchSkillCategories error:", error);
    return [];
  }
}

/**
 * Fetch skills (optionally filtered by category_id)
 */
export async function fetchSkills(categoryId?: string): Promise<Skill[]> {
  try {
    const res = await apiClient<ApiResponse<Skill[]>>("/masterdata/skills/", {
      params: categoryId ? { category_id: categoryId } : undefined,
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchSkills error:", error);
    return [];
  }
}

/**
 * Fetch recommended skills for a job role
 */
export async function fetchRecommendedSkills(roleId: string): Promise<Skill[]> {
  try {
    const res = await apiClient<ApiResponse<Skill[]>>("/masterdata/recommended-skills/", {
      params: { role_id: roleId },
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchRecommendedSkills error:", error);
    return [];
  }
}

/**
 * Fetch role categories
 */
export async function fetchRoleCategories(): Promise<RoleCategory[]> {
  try {
    const res = await apiClient<ApiResponse<RoleCategory[]>>("/masterdata/role-categories/", {
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchRoleCategories error:", error);
    return [];
  }
}

/**
 * Fetch job roles (optionally filtered by category_id)
 */
export async function fetchJobRoles(categoryId?: string): Promise<JobRole[]> {
  try {
    const res = await apiClient<ApiResponse<JobRole[]>>("/masterdata/job-roles/", {
      params: categoryId ? { category_id: categoryId } : undefined,
      revalidate: 86400,
    });
    return res.data || [];
  } catch (error) {
    console.error("fetchJobRoles error:", error);
    return [
      { id: "role-frontend", name: "Frontend Developer" },
      { id: "role-backend", name: "Backend Developer" },
      { id: "role-fullstack", name: "Full Stack Developer" },
      { id: "role-react", name: "React Developer" },
      { id: "role-python", name: "Python Developer" },
      { id: "role-uiux", name: "UI/UX Designer" },
      { id: "role-pm", name: "Product Manager" },
      { id: "role-sales", name: "Sales Executive" },
      { id: "role-marketing", name: "Digital Marketing Specialist" },
      { id: "role-telecaller", name: "Telecaller / Inside Sales" },
    ];
  }
}
