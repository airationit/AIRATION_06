import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";
import {
  fetchBlogs,
  fetchBlogCategories,
  fetchBlogTags,
} from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "Blog & Hiring Insights | Hirance - India's Swipe-Based Hiring Platform",
  description:
    "Explore the latest insights on swipe-based hiring, candidate Smart Scores, 60-second job postings, tech industry salary trends, and recruitment strategies.",
  keywords: [
    "Hirance blog",
    "swipe hiring blog",
    "tech recruitment insights",
    "candidate Smart Score tips",
    "fast hiring platform India",
    "recruitment speed strategy",
    "IT jobs India trends",
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
      "Actionable insights, hiring trends, candidate guides, and tech recruitment strategies on India's swipe-based hiring platform.",
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

export default async function BlogIndexPage() {
  // Pre-fetch initial data server-side for instant SSR & SEO indexing
  const [blogsResponse, categories, tags] = await Promise.all([
    fetchBlogs({ page: 1, page_size: 9, category: "all" }, { revalidate: 60 }),
    fetchBlogCategories({ revalidate: 3600 }),
    fetchBlogTags({ revalidate: 3600 }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hirance Blog & Insights",
    url: "https://hirance.com/blog",
    description:
      "Articles, guides, and hiring benchmarks from India's swipe-based recruitment platform.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/og.png",
      slogan: "Swipe. Match. Get Hired.",
    },
    blogPost: (blogsResponse.data || []).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://hirance.com/blog/${post.slug}`,
      datePublished: post.published_at,
      author: {
        "@type": "Person",
        name: post.author.name,
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
        initialBlogs={blogsResponse.data || []}
        totalCount={blogsResponse.pagination?.count || 0}
        initialCategories={categories}
        initialTags={tags}
        currentPage={blogsResponse.pagination?.current_page || 1}
        totalPages={blogsResponse.pagination?.total_pages || 1}
      />
    </>
  );
}
