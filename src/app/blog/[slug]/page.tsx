import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogBySlug, fetchBlogSitemap } from "@/lib/api/blogs";
import { BlogDetailContent } from "@/components/blog/blog-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const sitemapData = await fetchBlogSitemap({ revalidate: 3600 });
    if (sitemapData?.items && sitemapData.items.length > 0) {
      return sitemapData.items.map((item) => ({
        slug: item.slug,
      }));
    }
  } catch (e) {
    console.warn("generateStaticParams blog fallback:", e);
  }
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchBlogBySlug(resolvedParams.slug, { revalidate: 120 });

  if (!post) {
    return {
      title: "Article Not Found | Hirance Blog",
      description: "The requested article could not be found.",
    };
  }

  const metaTitle = post.seo?.meta_title || `${post.title} | Hirance Blog`;
  const metaDesc = post.seo?.meta_description || post.excerpt;
  const canonicalUrl = post.seo?.canonical_url || `https://hirance.com/blog/${post.slug}`;
  const keywords = post.seo?.keywords && post.seo.keywords.length > 0 ? post.seo.keywords : post.tags;
  const ogImageUrl = post.cover_image?.url || "/og.png";

  return {
    title: metaTitle,
    description: metaDesc,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonicalUrl,
      title: metaTitle,
      description: metaDesc,
      siteName: "Hirance",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author?.name || "Hirance Editorial"],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: post.cover_image?.width || 1200,
          height: post.cover_image?.height || 630,
          alt: post.cover_image?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await fetchBlogBySlug(resolvedParams.slug, { revalidate: 120 });

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Person",
      name: post.author?.name || "Hirance Editorial",
      jobTitle: post.author?.role || "Talent Analyst",
    },
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/og.png",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.seo?.canonical_url || `https://hirance.com/blog/${post.slug}`,
    },
    image: post.cover_image?.url || "https://hirance.com/og.png",
    keywords: (post.tags || []).join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailContent post={post} />
    </>
  );
}
