import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Globe } from "lucide-react";
import { POPULAR_JOB_ROLES, POPULAR_CITIES } from "@/config/jobs-taxonomy";

interface JobSeoLinksProps {
  currentRoleSlug?: string;
  currentCitySlug?: string;
}

export function JobSeoLinks({ currentRoleSlug, currentCitySlug }: JobSeoLinksProps) {
  // Top cities to link
  const topCities = POPULAR_CITIES.filter((c) => c.isPopular).slice(0, 8);
  // Top roles to link
  const topRoles = POPULAR_JOB_ROLES.slice(0, 10);

  return (
    <div className="mt-16 sm:mt-20 border-t border-border/50 pt-12">
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Explore Trending Career Hubs
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover verified opportunities across major tech hubs and remote teams in India.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Column 1: Top Roles */}
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Briefcase className="h-4 w-4 text-blue-500" />
            <span>Popular Roles</span>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            {topRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/jobs/${role.slug}`}
                className="group flex items-center justify-between text-xs text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{role.label} Jobs</span>
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Top Locations */}
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>Jobs by Location</span>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/jobs/jobs-in-${city.slug}`}
                className="group flex items-center justify-between text-xs text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Jobs in {city.name}</span>
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: High Demand Combinations */}
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Globe className="h-4 w-4 text-blue-500" />
            <span>High-Demand Searches</span>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            {[
              { label: "React Developers in Bangalore", slug: "react-developer-in-bangalore" },
              { label: "Remote Frontend Engineers", slug: "remote-frontend-developer" },
              { label: "UI/UX Designers in Mumbai", slug: "ui-ux-designer-in-mumbai" },
              { label: "Backend Engineers in Delhi NCR", slug: "backend-developer-in-delhi-ncr" },
              { label: "Fresher Jobs in Pune", slug: "freshers-jobs-in-pune" },
              { label: "Python & AI Jobs in Hyderabad", slug: "python-developer-in-hyderabad" },
              { label: "Full Stack Developers in Chennai", slug: "full-stack-developer-in-chennai" },
              { label: "Remote Product Designers", slug: "remote-product-designer" },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/jobs/${item.slug}`}
                className="group flex items-center justify-between text-xs text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
