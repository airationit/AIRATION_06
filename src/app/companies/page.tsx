import { Metadata } from "next";
import { fetchCompanies, deduplicateCompanies, fetchCompanyById } from "@/lib/api/companies";
import { fetchJobs } from "@/lib/api/jobs";
import { CompanyDetail } from "@/types/companies";
import { siteConfig } from "@/config/site";
import { faqs } from "@/components/jobs/jobs-faq-data";
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
  // Fetch registered companies and active jobs in parallel using standard API functions
  const [companiesRes, jobsRes] = await Promise.all([
    fetchCompanies({ page: 1, page_size: 100 }, { revalidate: 60 }),
    fetchJobs({ ordering: "-published_at", page: 1, page_size: 100 }, { revalidate: 60 }),
  ]);

  const rawCompanies = companiesRes?.success && Array.isArray(companiesRes.data) ? companiesRes.data : [];
  const initialJobs = jobsRes?.success && Array.isArray(jobsRes.data) ? jobsRes.data : [];

  // Build server-side job lookup for vacancy counts and categories
  const serverJobMap = new Map<string, { openings: number; city: string; industry: string }>();
  for (const j of initialJobs) {
    const key = (j.company_id || j.company_name).toLowerCase().trim();
    const curr = serverJobMap.get(key) || {
      openings: 0,
      city: j.city?.name || j.location || j.state?.name || "",
      industry: j.role_category?.name || j.job_role?.name || "",
    };
    curr.openings += j.number_of_openings || 1;
    serverJobMap.set(key, curr);
    if (j.company_name) {
      serverJobMap.set(j.company_name.toLowerCase().trim(), curr);
    }
  }

  // Deduplicate companies first by name and job data
  const deduplicated = deduplicateCompanies(rawCompanies, undefined, serverJobMap);

  // Prioritize verified companies with logos or active jobs so richest candidates are fetched first
  deduplicated.sort((a, b) => {
    const aJob = serverJobMap.get(a.id.toLowerCase()) || serverJobMap.get(a.company_name.toLowerCase().trim());
    const bJob = serverJobMap.get(b.id.toLowerCase()) || serverJobMap.get(b.company_name.toLowerCase().trim());
    const aScore = (aJob?.openings ? 10 : 0) + (a.company_logo ? 5 : 0);
    const bScore = (bJob?.openings ? 10 : 0) + (b.company_logo ? 5 : 0);
    return bScore - aScore;
  });

  // Fetch individual company details safely for the top 24 companies to avoid 429 rate limits
  const targetCompanies = deduplicated.slice(0, 24);
  const detailsResults = await Promise.all(
    targetCompanies.map((c) =>
      fetchCompanyById(c.id, { revalidate: 300 })
        .then((res) => (res.success && res.data ? res.data : null))
        .catch(() => null)
    )
  );

  const initialCompanyDetails: Record<string, CompanyDetail> = {};
  for (const detail of detailsResults) {
    if (detail && detail.id) {
      initialCompanyDetails[detail.id] = detail;
    }
  }

  // Re-deduplicate with populated details so the richest profiles are chosen
  const initialCompanies = deduplicateCompanies(rawCompanies, initialCompanyDetails, serverJobMap);

  const initialPagination = {
    count: initialCompanies.length,
    total_pages: Math.max(1, Math.ceil(initialCompanies.length / 12)),
    current_page: 1,
    next: null,
    previous: null,
  };

  // Structured Data (JSON-LD ItemList for SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Companies on Hirance",
    description:
      "Explore leading startups and verified enterprises on Hirance.",
    numberOfItems: initialPagination.count,
    itemListElement: initialCompanies.slice(0, 10).map((company, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: company.company_name,
        image: company.company_logo || undefined,
        url: `${siteConfig.url}/company/${company.id}`,
      },
    })),
  };

  // FAQ Structured Data (JSON-LD FAQPage for SEO)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CompaniesContent
        initialCompanies={initialCompanies}
        initialJobs={initialJobs}
        initialCompanyDetails={initialCompanyDetails}
        initialPagination={initialPagination}
      />
    </>
  );
}
