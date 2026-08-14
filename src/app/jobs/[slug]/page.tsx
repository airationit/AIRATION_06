import type { Metadata } from "next";
import { parseJobSlug, generateJobSeoData, generateJobsJsonLd } from "@/lib/seo-engine";
import { getJobs } from "@/lib/jobs-data";
import { JobsContent } from "@/components/jobs/jobs-content";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "react-developer-in-bangalore" },
    { slug: "remote-frontend-developer" },
    { slug: "ui-ux-designer-in-mumbai" },
    { slug: "backend-developer-in-delhi-ncr" },
    { slug: "freshers-jobs-in-pune" },
    { slug: "python-developer-in-hyderabad" },
    { slug: "full-stack-developer-in-chennai" },
    { slug: "product-manager-in-bangalore" },
    { slug: "remote-product-designer" },
    { slug: "sales-executive-in-delhi-ncr" },
    { slug: "jobs-in-bangalore" },
    { slug: "jobs-in-mumbai" },
    { slug: "jobs-in-delhi-ncr" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseJobSlug(slug);

  const data = await getJobs({
    roleSlug: parsed.roleSlug,
    citySlug: parsed.citySlug,
    experienceSlug: parsed.experienceSlug,
  });

  const seo = generateJobSeoData(parsed, data.totalJobs);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: [
      seo.heading,
      parsed.roleLabel ? `${parsed.roleLabel} jobs` : "jobs in india",
      parsed.cityName ? `jobs in ${parsed.cityName}` : "remote jobs",
      "hirance hiring app",
      "swipe to apply",
    ],
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seo.canonicalUrl,
      title: seo.metaTitle,
      description: seo.metaDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default async function DynamicJobCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseJobSlug(slug);

  const data = await getJobs({
    roleSlug: parsed.roleSlug,
    citySlug: parsed.citySlug,
    experienceSlug: parsed.experienceSlug,
  });

  const seo = generateJobSeoData(parsed, data.totalJobs);
  const jsonLd = generateJobsJsonLd(seo, data.jobs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobsContent
        initialJobs={data.jobs}
        totalJobs={data.totalJobs}
        heading={seo.heading}
        subheading={seo.subheading}
        breadcrumbLabel={seo.breadcrumb}
        roleSlug={parsed.roleSlug}
        citySlug={parsed.citySlug}
        experienceSlug={parsed.experienceSlug}
      />
    </>
  );
}
