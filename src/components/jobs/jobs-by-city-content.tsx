"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";

interface CityItem {
  name: string;
  canonicalSlug: string;
}

// Full directory of major Indian cities matching reference design
const DEFAULT_INDIAN_CITIES: CityItem[] = [
  { name: "New Delhi", canonicalSlug: "delhi-ncr" },
  { name: "Bengaluru", canonicalSlug: "bangalore" },
  { name: "Mumbai", canonicalSlug: "mumbai" },
  { name: "Hyderabad", canonicalSlug: "hyderabad" },
  { name: "Pune", canonicalSlug: "pune" },
  { name: "Chennai", canonicalSlug: "chennai" },
  { name: "Lucknow", canonicalSlug: "lucknow" },
  { name: "Kolkata", canonicalSlug: "kolkata" },
  { name: "Ahmedabad", canonicalSlug: "ahmedabad" },
  { name: "Surat", canonicalSlug: "surat" },
  { name: "Jaipur", canonicalSlug: "jaipur" },
  { name: "Chandigarh", canonicalSlug: "chandigarh" },
  { name: "Gurgaon", canonicalSlug: "gurgaon" },
  { name: "Noida", canonicalSlug: "noida" },
  { name: "Greater Noida", canonicalSlug: "greater-noida" },
  { name: "Indore", canonicalSlug: "indore" },
  { name: "Kochi", canonicalSlug: "kochi" },
  { name: "Coimbatore", canonicalSlug: "coimbatore" },
  { name: "Bhubaneswar", canonicalSlug: "bhubaneswar" },
  { name: "Vadodara", canonicalSlug: "vadodara" },
  { name: "Nagpur", canonicalSlug: "nagpur" },
  { name: "Visakhapatnam", canonicalSlug: "visakhapatnam" },
  { name: "Bhopal", canonicalSlug: "bhopal" },
  { name: "Patna", canonicalSlug: "patna" },
  { name: "Kanpur", canonicalSlug: "kanpur" },
  { name: "Ludhiana", canonicalSlug: "ludhiana" },
  { name: "Nashik", canonicalSlug: "nashik" },
  { name: "Rajkot", canonicalSlug: "rajkot" },
  { name: "Varanasi", canonicalSlug: "varanasi" },
  { name: "Agra", canonicalSlug: "agra" },
  { name: "Madurai", canonicalSlug: "madurai" },
  { name: "Guwahati", canonicalSlug: "guwahati" },
  { name: "Meerut", canonicalSlug: "meerut" },
  { name: "Jodhpur", canonicalSlug: "jodhpur" },
  { name: "Vijayawada", canonicalSlug: "vijayawada" },
  { name: "Gwalior", canonicalSlug: "gwalior" },
  { name: "Ranchi", canonicalSlug: "ranchi" },
  { name: "Jabalpur", canonicalSlug: "jabalpur" },
  { name: "Raipur", canonicalSlug: "raipur" },
  { name: "Prayagraj (Allahabad)", canonicalSlug: "allahabad" },
  { name: "Amritsar", canonicalSlug: "amritsar" },
  { name: "Thiruvananthapuram", canonicalSlug: "thiruvananthapuram" },
  { name: "Dehradun", canonicalSlug: "dehradun" },
  { name: "Mysore", canonicalSlug: "mysore" },
  { name: "Bhilai", canonicalSlug: "bhilai" },
  { name: "Gorakhpur", canonicalSlug: "gorakhpur" },
  { name: "Anantapur", canonicalSlug: "anantapur" },
  { name: "Kadapa", canonicalSlug: "kadapa" },
  { name: "Tirupati", canonicalSlug: "tirupati" },
  { name: "Tiruppur", canonicalSlug: "tiruppur" },
  { name: "Hubli", canonicalSlug: "hubli" },
  { name: "Madanapalli", canonicalSlug: "madanapalli" },
  { name: "Durgapur", canonicalSlug: "durgapur" },
  { name: "Aligarh", canonicalSlug: "aligarh" },
  { name: "Kannur", canonicalSlug: "kannur" },
  { name: "Guntur", canonicalSlug: "guntur" },
  { name: "Vijayapura", canonicalSlug: "vijayapura" },
  { name: "Salem", canonicalSlug: "salem" },
  { name: "Chapra", canonicalSlug: "chapra" },
  { name: "Anand", canonicalSlug: "anand" },
  { name: "Darbhanga", canonicalSlug: "darbhanga" },
  { name: "Durg", canonicalSlug: "durg" },
  { name: "Hisar", canonicalSlug: "hisar" },
  { name: "Firozabad", canonicalSlug: "firozabad" },
  { name: "Patiala", canonicalSlug: "patiala" },
  { name: "Nanded-Waghala", canonicalSlug: "nanded-waghala" },
  { name: "Muzaffarpur", canonicalSlug: "muzaffarpur" },
  { name: "Vellore", canonicalSlug: "vellore" },
  { name: "Sangli", canonicalSlug: "sangli" },
  { name: "Ajmer", canonicalSlug: "ajmer" },
  { name: "Ujjain", canonicalSlug: "ujjain" },
  { name: "Solapur", canonicalSlug: "solapur" },
  { name: "Pathankot", canonicalSlug: "pathankot" },
  { name: "Bhadrak", canonicalSlug: "bhadrak" },
  { name: "Batala", canonicalSlug: "batala" },
  { name: "Panvel", canonicalSlug: "panvel" },
  { name: "Hajipur", canonicalSlug: "hajipur" },
  { name: "Bhagalpur", canonicalSlug: "bhagalpur" },
  { name: "Akola", canonicalSlug: "akola" },
  { name: "Moradabad", canonicalSlug: "moradabad" },
];

export function JobsByCityContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cities] = useState<CityItem[]>(DEFAULT_INDIAN_CITIES);

  // Filter cities by live search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    const q = searchQuery.toLowerCase().trim();
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(q) || city.canonicalSlug.includes(q)
    );
  }, [cities, searchQuery]);

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
          </div>
        </div>

        {/* Cities Grid: Comprehensive 4-column directory layout matching reference screenshot */}
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3.5 gap-x-6">
            {filteredCities.map((city) => (
              <Link
                key={city.canonicalSlug}
                href={`/jobs/jobs-in-${city.canonicalSlug}`}
                className="group flex items-center text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors py-1.5"
                title={`Jobs in ${city.name}`}
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
              {searchQuery
                ? `No cities found matching "${searchQuery}"`
                : "No cities available."}
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
