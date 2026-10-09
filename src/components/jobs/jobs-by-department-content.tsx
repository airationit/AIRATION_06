"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";

interface DepartmentItem {
  name: string;
  slug: string;
}

// Full directory of major Indian hiring departments matching reference design
const DEFAULT_INDIAN_DEPARTMENTS: DepartmentItem[] = [
  { name: "Admin / Back Office / Computer Operator", slug: "admin-back-office-computer-operator" },
  { name: "Advertising / Communication", slug: "advertising-communication" },
  { name: "Aviation & Aerospace", slug: "aviation-aerospace" },
  { name: "Banking / Insurance / Financial Services", slug: "banking-insurance-financial-services" },
  { name: "Beauty, Fitness & Personal Care", slug: "beauty-fitness-personal-care" },
  { name: "Civil Engineering", slug: "civil-engineering" },
  { name: "Cloud / Infrastructure", slug: "cloud-infrastructure" },
  { name: "Construction & Engineering", slug: "construction-engineering" },
  { name: "Construction & Site Engineering", slug: "construction-site-engineering" },
  { name: "Consulting", slug: "consulting" },
  { name: "Content, Editorial & Journalism", slug: "content-editorial-journalism" },
  { name: "CSR & Social Service", slug: "csr-social-service" },
  { name: "Customer Support", slug: "customer-support" },
  { name: "Data / AI", slug: "data-ai" },
  { name: "Data Science & Analytics", slug: "data-science-analytics" },
  { name: "Delivery / Driver / Logistics", slug: "delivery-driver-logistics" },
  { name: "Design & Creative", slug: "design-creative" },
  { name: "Domestic Worker", slug: "domestic-worker" },
  { name: "Education", slug: "education" },
  { name: "Electrical", slug: "electrical" },
  { name: "Energy & Mining", slug: "energy-mining" },
  { name: "Engineering - Hardware & Networks", slug: "engineering-hardware-networks" },
  { name: "Environment Health & Safety", slug: "environment-health-safety" },
  { name: "Facility Management", slug: "facility-management" },
  { name: "Finance & Accounting", slug: "finance-accounting" },
  { name: "Healthcare / Doctor / Hospital", slug: "healthcare-doctor-hospital" },
  { name: "Hospitality", slug: "hospitality" },
  { name: "Human Resources", slug: "human-resources" },
  { name: "IT & Software", slug: "it-software" },
  { name: "IT & Information Security", slug: "it-information-security" },
  { name: "Legal & Regulatory", slug: "legal-regulatory" },
  { name: "Logistics / Supply Chain", slug: "logistics-supply-chain" },
  { name: "Maintenance Services", slug: "maintenance-services" },
  { name: "Manufacturing", slug: "manufacturing" },
  { name: "Marketing / Brand / Digital Marketing", slug: "marketing-brand-digital-marketing" },
  { name: "Mechanical / HVAC", slug: "mechanical-hvac" },
  { name: "Media Production & Entertainment", slug: "media-production-entertainment" },
  { name: "Operations", slug: "operations" },
  { name: "Product Management", slug: "product-management" },
  { name: "Production / Manufacturing / Maintenance", slug: "production-manufacturing-maintenance" },
  { name: "Project & Program Management", slug: "project-program-management" },
  { name: "Purchase & Supply Chain", slug: "purchase-supply-chain" },
  { name: "Quality Assurance", slug: "quality-assurance" },
  { name: "Research & Development", slug: "research-development" },
  { name: "Restaurant / Hospitality / Tourism", slug: "restaurant-hospitality-tourism" },
  { name: "Retail & eCommerce", slug: "retail-ecommerce" },
  { name: "Risk Management & Compliance", slug: "risk-management-compliance" },
  { name: "Sales & BD", slug: "sales-bd" },
  { name: "Security Services", slug: "security-services" },
  { name: "Shipping & Maritime", slug: "shipping-maritime" },
  { name: "Software Engineering", slug: "software-engineering" },
  { name: "Strategic & Top Management", slug: "strategic-top-management" },
];

export function JobsByDepartmentContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departments] = useState<DepartmentItem[]>(DEFAULT_INDIAN_DEPARTMENTS);

  // Filter departments by live search query
  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return departments;
    const q = searchQuery.toLowerCase().trim();
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(q) || dept.slug.includes(q)
    );
  }, [departments, searchQuery]);

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
        </div>

        {/* Departments Grid: Comprehensive 4-column directory layout matching reference screenshot */}
        {filteredDepartments.length > 0 ? (
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
                : "No departments available."}
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
