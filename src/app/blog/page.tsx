import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";
import {
  fetchBlogs,
  fetchBlogCategories,
  fetchBlogTags,
} from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "Blog & Hiring Insights | Hirance - Next-Gen Swipe-Based Hiring Platform",
  description:
    "Explore the latest insights on swipe-based hiring, candidate Smart Scores, 60-second job postings, tech industry salary trends, and recruitment strategies.",
  keywords: [
    "Hirance blog",
    "swipe hiring blog",
    "tech recruitment insights",
    "candidate Smart Score tips",
    "fast hiring platform",
    "recruitment speed strategy",
    "IT jobs trends",
    "software developer career advice",
  ],
  alternates: {
    canonical: "https://hirance.com/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/blog",
    title: "Blog & Hiring Insights | Hirance",
    description:
      "Actionable insights, hiring trends, candidate guides, and tech recruitment strategies on the next-gen swipe-based hiring platform.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance Blog & Hiring Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Hiring Insights | Hirance",
    description:
      "Latest hiring trends, candidate Smart Score guides, and recruitment strategies built for speed.",
  },
};

import { fetchJobs } from "@/lib/api/jobs";

interface BlogPageProps {
  searchParams?: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const page = resolvedParams?.page ? Math.max(1, parseInt(resolvedParams.page, 10) || 1) : 1;
  const category = resolvedParams?.category && resolvedParams.category !== "all" ? resolvedParams.category : undefined;
  const search = resolvedParams?.search || undefined;

  // Pre-fetch initial data server-side for instant SSR & SEO indexing
  const [blogsResponse, categories, tags, jobsRes] = await Promise.all([
    fetchBlogs(
      { page, page_size: 6, category, search },
      { revalidate: 60 }
    ),
    fetchBlogCategories({ revalidate: 60 }),
    fetchBlogTags({ revalidate: 3600 }),
    fetchJobs({ ordering: "-published_at", page_size: 4 }, { revalidate: 3600 }).catch(() => ({ data: [] })),
  ]);

  const blogsList = blogsResponse.data || [];
  const totalCount = blogsResponse.pagination?.count ?? blogsList.length;
  const totalPages =
    blogsResponse.pagination?.total_pages && blogsResponse.pagination.total_pages > 0
      ? blogsResponse.pagination.total_pages
      : Math.max(1, Math.ceil(totalCount / 6));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hirance Blog & Insights",
    url: "https://hirance.com/blog",
    description:
      "Articles, guides, and hiring benchmarks from the next-gen swipe-based recruitment platform.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/og.png",
      slogan: "Swipe. Match. Get Hired.",
    },
    blogPost: blogsList.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://hirance.com/blog/${post.slug}`,
      datePublished: post.published_at,
      author: {
        "@type": "Person",
        name: post.author?.name || "Hirance Editorial",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListContent
        initialBlogs={blogsList}
        totalCount={totalCount}
        initialCategories={categories}
        initialTags={tags}
        currentPage={page}
        totalPages={totalPages}
        featuredJobs={jobsRes?.data || []}
      />
    </>
  );
}
