import type { Metadata } from "next";
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
    title: `${categoryName} Articles & Hiring Insights | Hirance`,
    description: `Explore ${categoryName} hiring insights, career growth strategies, and recruitment guides on Hirance.`,
    alternates: {
      canonical: `https://hirance.com/blog/category/${rawCategory}`,
    },
    openGraph: {
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
