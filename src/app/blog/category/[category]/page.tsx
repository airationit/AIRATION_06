import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo/page-metadata";
import BlogIndexPage from "@/app/blog/page";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolved = await params;
  const rawCategory = resolved?.category || "";
  const categoryName = rawCategory
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    ...pageMetadata(
      `${categoryName} Articles & Hiring Insights | Hirance`,
      `Explore ${categoryName} hiring insights, career growth strategies, and recruitment guides on Hirance.`,
      `/blog/category/${rawCategory}`,
    ),
    title: `${categoryName} Articles & Hiring Insights | Hirance`,
    description: `Explore ${categoryName} hiring insights, career growth strategies, and recruitment guides on Hirance.`,
    alternates: {
      canonical: `https://hirance.com/blog/category/${rawCategory}`,
    },
    openGraph: {
      locale: "en_IN",
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${categoryName} hiring insights on Hirance` }],
      title: `${categoryName} Hiring Insights | Hirance`,
      description: `Explore ${categoryName} hiring insights, career growth strategies, and recruitment guides on Hirance.`,
      url: `https://hirance.com/blog/category/${rawCategory}`,
    },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = searchParams ? await searchParams : {};

  return BlogIndexPage({
    searchParams: Promise.resolve({
      ...resolvedSearch,
      category: resolvedParams.category,
    }),
  });
}
