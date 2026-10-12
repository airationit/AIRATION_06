import { Metadata } from "next";
import { fetchJobs } from "@/lib/api/jobs";
import { siteConfig } from "@/config/site";
import CompaniesContent from "./CompaniesContent";

export const metadata: Metadata = {
  title: "Discover Top Companies Hiring in India | Hirance",
  description:
    "Explore leading startups, product companies, and enterprises hiring on Hirance. Find verified company profiles, culture, open jobs, and connect directly with hiring managers.",
  alternates: {
    canonical: `${siteConfig.url}/companies`,
  },
  openGraph: {
    title: "Discover Top Companies Hiring Now | Hirance",
    description:
      "Explore leading startups and enterprises hiring on Hirance. Find the right company for your next career move with zero spam.",
    url: `${siteConfig.url}/companies`,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Top Companies Hiring Now | Hirance",
    description:
      "Explore leading startups and enterprises hiring on Hirance. Find the right company for your next career move.",
  },
};

export default async function CompaniesPage() {
  // Fetch real active hiring jobs & companies: https://prod.hirance.com/jobs/?ordering=-published_at&page=1&page_size=12
  const initialRes = await fetchJobs(
    { ordering: "-published_at", page: 1, page_size: 12 },
    { revalidate: 60 }
  );

  const initialJobs = initialRes?.success && Array.isArray(initialRes.data) ? initialRes.data : [];
  const initialPagination = initialRes?.pagination || {
    count: initialJobs.length,
    total_pages: Math.max(1, Math.ceil(initialJobs.length / 12)),
    current_page: 1,
    next: null,
    previous: null,
  };

  // Structured Data (JSON-LD ItemList for SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Companies Hiring on Hirance",
    description:
      "Explore leading startups and verified enterprises hiring talent on Hirance.",
    numberOfItems: initialPagination.count,
    itemListElement: initialJobs.slice(0, 10).map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: job.company_name,
        image: job.company_logo || undefined,
        url: `${siteConfig.url}/company/${job.company_id || job.id}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompaniesContent
        initialJobs={initialJobs}
        initialPagination={initialPagination}
      />
    </>
  );
}
