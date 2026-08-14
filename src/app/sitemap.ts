import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { POPULAR_JOB_ROLES, POPULAR_CITIES } from "@/config/jobs-taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Programmatic SEO routes: Top Roles in Top Cities
  const topCities = POPULAR_CITIES.filter((c) => c.isPopular);
  const topRoles = POPULAR_JOB_ROLES.slice(0, 12);

  const programmaticRoutes: MetadataRoute.Sitemap = [];

  // 1. Role-only routes
  topRoles.forEach((role) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/${role.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  });

  // 2. City-only routes
  topCities.forEach((city) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/jobs-in-${city.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  });

  // 3. Role + City high priority matrix
  topRoles.slice(0, 6).forEach((role) => {
    topCities.slice(0, 5).forEach((city) => {
      programmaticRoutes.push({
        url: `${baseUrl}/jobs/${role.slug}-in-${city.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.85,
      });
    });
  });

  // 4. Remote Roles
  topRoles.forEach((role) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/remote-${role.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    });
  });

  return [...staticRoutes, ...programmaticRoutes];
}
