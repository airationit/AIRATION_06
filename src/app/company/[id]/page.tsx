import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import CompanyContent from "./CompanyContent";
import { fetchCompanyById, extractCompanyId, generateCompanySlug } from "@/lib/api/companies";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Deduplicate server API call between generateMetadata and the page component
 */
const getCachedCompany = cache(async (idOrSlug: string) => {
  const cleanId = extractCompanyId(idOrSlug);
  if (!cleanId) return null;
  const res = await fetchCompanyById(cleanId);
  return res.success ? res.data : null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const company = await getCachedCompany(id);

  if (!company) {
    return {
      title: "Company Not Found | Hirance",
      description: "The requested company profile could not be found on Hirance.",
      robots: { index: false, follow: true },
    };
  }

  const canonicalSlug = generateCompanySlug(company.company_name, company.id);
  const canonicalUrl = `${siteConfig.url}/company/${canonicalSlug}`;
  const title = `${company.company_name} - Jobs & Hiring Profile | Hirance`;
  const description = `Explore verified job openings and career opportunities at ${company.company_name} on Hirance. Fast application, verified recruiters.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: company.company_logo
        ? [
            {
              url: company.company_logo,
              width: 400,
              height: 400,
              alt: `${company.company_name} Logo`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: company.company_logo ? [company.company_logo] : undefined,
    },
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params;
  const company = await getCachedCompany(id);

  if (company) {
    const canonicalSlug = generateCompanySlug(company.company_name, company.id);
    // If accessed with raw ID or outdated slug, permanently redirect to canonical slug with company name
    if (id !== canonicalSlug) {
      redirect(`/company/${canonicalSlug}`);
    }
  }

  const cleanId = extractCompanyId(id);

  // Structured Data Schema for Organization & Breadcrumb
  const canonicalSlug = company
    ? generateCompanySlug(company.company_name, company.id)
    : id;
  const canonicalUrl = `${siteConfig.url}/company/${canonicalSlug}`;

  const jsonLd = company
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.company_name,
        url: canonicalUrl,
        logo: company.company_logo || undefined,
        sameAs: [company.website_link, company.linkedin_link].filter(Boolean),
        address: company.address
          ? {
              "@type": "PostalAddress",
              streetAddress: company.address,
              addressLocality: company.city?.name || undefined,
              addressRegion: company.state?.name || undefined,
              addressCountry: "IN",
            }
          : undefined,
      }
    : null;

  const breadcrumbJsonLd = company
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Companies",
            item: `${siteConfig.url}/#partners`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: company.company_name,
            item: canonicalUrl,
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <CompanyContent companyId={cleanId} initialCompany={company} />
    </>
  );
}
