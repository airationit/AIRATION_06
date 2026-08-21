import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { fetchJobSitemapList } from "@/lib/api/jobs";
import { fetchBlogSitemap } from "@/lib/api/blogs";
import { generateJobSlug } from "@/lib/jobs-data";
import { POPULAR_JOB_ROLES, POPULAR_CITIES } from "@/config/jobs-taxonomy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // 1. Static Core Routes
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
      priority: 0.95,
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

  // 2. Programmatic SEO Routes (Roles, Cities, Combinations, Freshers, and Remote)
  const popularCities = POPULAR_CITIES.filter((c) => c.isPopular && c.slug !== "remote");
  const programmaticRoutes: MetadataRoute.Sitemap = [];

  // All Role hubs
  POPULAR_JOB_ROLES.forEach((role) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/${role.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    });
  });

  // All City hubs
  POPULAR_CITIES.forEach((city) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/jobs-in-${city.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    });
  });

  // High-Intent Role + City matrix (Top 20 roles in Top 10 cities)
  POPULAR_JOB_ROLES.slice(0, 20).forEach((role) => {
    popularCities.slice(0, 10).forEach((city) => {
      programmaticRoutes.push({
        url: `${baseUrl}/jobs/${role.slug}-in-${city.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
  });

  // Remote roles
  POPULAR_JOB_ROLES.forEach((role) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/remote-${role.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  });

  // Freshers city hubs
  popularCities.forEach((city) => {
    programmaticRoutes.push({
      url: `${baseUrl}/jobs/freshers-jobs-in-${city.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  });

  // 3. Dynamic Live Job Postings from Sitemap List API
  let liveJobRoutes: MetadataRoute.Sitemap = [];
  try {
    const sitemapData = await fetchJobSitemapList();
    if (sitemapData && sitemapData.jobs && sitemapData.jobs.length > 0) {
      liveJobRoutes = sitemapData.jobs.map((job) => {
        const jobSlug = generateJobSlug(job.title, "", job.city || "india", job.id);
        return {
          url: `${baseUrl}/jobs/view/${jobSlug}`,
          lastModified: job.updatedAt ? new Date(job.updatedAt) : now,
          changeFrequency: "daily",
          priority: 0.75,
        };
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap from jobs API:", error);
  }

  // 4. Dynamic Live Blog Articles from Blog Sitemap API
  let liveBlogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogSitemapData = await fetchBlogSitemap();
    if (blogSitemapData && blogSitemapData.items && blogSitemapData.items.length > 0) {
      liveBlogRoutes = blogSitemapData.items.map((item) => ({
        url: `${baseUrl}/blog/${item.slug}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : (item.published_at ? new Date(item.published_at) : now),
        changeFrequency: (item.change_freq as MetadataRoute.Sitemap[number]["changeFrequency"]) || "monthly",
        priority: item.priority || 0.8,
      }));
    }
  } catch (error) {
    console.error("Error generating dynamic blog sitemap:", error);
  }

  return [...staticRoutes, ...programmaticRoutes, ...liveJobRoutes, ...liveBlogRoutes];
}
