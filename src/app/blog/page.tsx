import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";

export const metadata: Metadata = {
  title: "Blog & Hiring Insights | Hirance - India's 1st Swipe-Based Hiring Platform",
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
      "Actionable insights, hiring trends, candidate guides, and tech recruitment strategies on India's 1st swipe-based hiring platform.",
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

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hirance Blog & Insights",
    url: "https://hirance.com/blog",
    description:
      "Articles, guides, and hiring benchmarks from India's 1st swipe-based recruitment platform.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/og.png",
      slogan: "Swipe. Match. Get Hired.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListContent />
    </>
  );
}
