/**
 * TypeScript Type Definitions for Hirance Blogs Public API
 * Base Path: /api/v1/blogs/
 */

export interface BlogCategory {
  id: string | null;
  name: string;
  slug: string;
  post_count?: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}

export interface BlogAuthor {
  id?: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface BlogCoverImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export type BlogSection =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      level: 2 | 3;
      content: string;
    }
  | {
      type: "image";
      url: string;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
    }
  | {
      type: "callout";
      title: string;
      content: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "quote";
      quote: string;
      author?: string;
      role?: string;
    }
  | {
      type: "stat";
      value: string;
      label: string;
    };

export interface BlogSEO {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  keywords?: string[];
}

export interface BlogCTA {
  type: "candidate" | "employer" | string;
  title: string;
  description: string;
  button_text: string;
  button_url: string;
}

export interface BlogRelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | BlogCategory;
  read_time: string;
  published_at: string;
  cover_image?: {
    url: string;
    alt: string;
  } | null;
}

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  read_time: string;
  published_at: string;
  featured: boolean;
  cover_image?: BlogCoverImage | null;
  author: BlogAuthor;
  tags: string[];
  views_count: number;
}

export interface BlogDetail {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  read_time: string;
  published_at: string;
  updated_at?: string;
  featured: boolean;
  views_count: number;
  cover_image?: BlogCoverImage | null;
  author: BlogAuthor;
  tags: string[];
  key_takeaways?: string[];
  sections: BlogSection[];
  seo?: BlogSEO;
  cta?: BlogCTA | null;
  related_posts?: BlogRelatedPost[];
}

export interface BlogSearchParams {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  ordering?: "-published_at" | "published_at" | "-views_count" | string;
  page?: number;
  page_size?: number;
}

export interface BlogSitemapItem {
  slug: string;
  url: string;
  published_at: string;
  updated_at: string;
  change_freq: string;
  priority: number;
}

export interface BlogSitemapData {
  total: number;
  items: BlogSitemapItem[];
}
