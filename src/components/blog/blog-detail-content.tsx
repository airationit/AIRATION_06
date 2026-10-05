"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Briefcase,
  Share2,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Quote,
  TrendingUp,
  Info,
  Eye,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Users,
  FileText,
} from "lucide-react";
import { BlogDetail, BlogSection } from "@/types/blogs";
import { JobListItem } from "@/types/jobs";
import { recordBlogView, formatBlogReadTime } from "@/lib/api/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";
import { siteConfig } from "@/config/site";

interface BlogDetailContentProps {
  post: BlogDetail;
  featuredJobs?: JobListItem[];
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Render individual section blocks with high design polish
 */
function SectionBlockRenderer({ section, index, headingIndex }: { section: BlogSection; index: number; headingIndex?: number }) {
  switch (section.type) {
    case "paragraph":
      return (
        <div key={index} className="my-6 space-y-6">
          {section.content.split("\n\n").map((para, pIdx) => {
            // Check if this paragraph is a "pseudo-list" (multiple short lines)
            const lines = para.split("\n");
            if (lines.length > 2 && lines.every((l) => l.trim().length > 0 && l.length < 100)) {
              return (
                <ul key={pIdx} className="my-6 space-y-3 pl-5 border-l-4 border-blue-500/20">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="text-[17px] sm:text-[19px] leading-relaxed text-foreground/80 flex items-start">
                      <span className="mr-3 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={pIdx} className="text-[17px] sm:text-[19px] leading-8 sm:leading-9 text-slate-700 dark:text-slate-300 whitespace-pre-line tracking-tight">
                {para}
              </p>
            );
          })}
        </div>
      );

    case "heading": {
      const id = section.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      if (section.level === 2) {
        return (
          <div key={index} className="mt-12 mb-6 not-prose">
            <h2
              id={id}
              className="m-0 p-0 text-[24px] sm:text-[26px] font-semibold tracking-tight text-foreground leading-[1.3]"
            >
              {section.content}
            </h2>
          </div>
        );
      }
      return (
        <h3
          key={index}
          id={id}
          className="mt-10 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400 leading-snug"
        >
          {section.content}
        </h3>
      );
    }

    case "image":
      return (
        <figure key={index} className="my-8 overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-sm">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40">
            <img
              src={section.url}
              alt={section.alt || "Article illustration"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {section.caption && (
            <figcaption className="p-3.5 text-center text-xs text-muted-foreground italic border-t border-border/50">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <div
          key={index}
          className="my-7 relative overflow-hidden rounded-2xl border border-blue-500/25 bg-blue-500/[0.05] p-5 sm:p-6 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Info className="h-4 w-4 shrink-0" />
            <span>{section.title}</span>
          </div>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/90 font-medium">
            {section.content}
          </p>
        </div>
      );

    case "list":
      return (
        <ul key={index} className="my-5 space-y-3 pl-2">
          {section.items.map((item, i) => {
            const parts = item.split("**");
            return (
              <li key={i} className="flex items-start text-[17px] sm:text-[19px] leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="mr-3 mt-1 text-blue-600 dark:text-blue-400 text-2xl leading-none">•</span>
                <span>
                  {parts.length > 1 ? (
                    <>
                      <strong className="font-semibold text-foreground">{parts[1]}</strong>
                      {parts.slice(2).join("**")}
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );

    case "table":
      return (
        <div key={index} className="my-10 w-full overflow-x-auto rounded-2xl border border-border/60 shadow-sm">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            {section.headers && (
              <thead className="bg-muted/50 border-b border-border/60">
                <tr>
                  {section.headers.map((header, i) => (
                    <th key={i} className="py-4 px-5 font-bold text-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-border/40">
              {section.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-4 px-5 text-muted-foreground align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="my-8 relative rounded-2xl border-l-4 border-blue-600 bg-muted/40 p-6 sm:p-7 backdrop-blur-sm shadow-xs"
        >
          <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-600/20" />
          <p className="text-base sm:text-lg italic font-medium leading-relaxed text-foreground">
            &ldquo;{section.quote}&rdquo;
          </p>
          {(section.author || section.role) && (
            <footer className="mt-3 text-xs sm:text-sm font-semibold text-muted-foreground">
              — {section.author}
              {section.role && <span className="font-normal opacity-80">, {section.role}</span>}
            </footer>
          )}
        </blockquote>
      );

    case "stat":
      return (
        <div
          key={index}
          className="my-8 flex flex-col items-center justify-center rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/[0.08] via-indigo-600/[0.04] to-transparent p-6 text-center shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <TrendingUp className="h-4 w-4" />
            <span>Key Metric</span>
          </div>
          <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-foreground">
            {section.value}
          </div>
          <p className="mt-1 max-w-md text-xs sm:text-sm text-muted-foreground">
            {section.label}
          </p>
        </div>
      );

    default:
      return null;
  }
}

function FAQItem({ item, isOpen, onToggle }: { item: { question: string; answer: string }, isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="border border-border/60 rounded-2xl mb-4 overflow-hidden bg-white/40 dark:bg-card/40 transition-all hover:border-blue-500/30 shadow-sm">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 sm:px-6 text-left">
        <span className="font-semibold text-[15px] sm:text-[16px] text-slate-900 dark:text-white pr-4">{item.question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3 whitespace-pre-line">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BlogDetailContent({ post, featuredJobs = [] }: BlogDetailContentProps) {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Record view count once per session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionKey = `viewed_blog_${post.slug}`;
      if (!sessionStorage.getItem(sessionKey)) {
        recordBlogView(post.slug);
        sessionStorage.setItem(sessionKey, "1");
      }
    }
  }, [post.slug]);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = post.related_posts || [];

  return (
    
    
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Background Dots Canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      <div className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 lg:flex lg:gap-12 lg:items-start pt-16 sm:pt-24 pb-16">
        
        {/* Left Column (Main Content) */}
        <div className="flex-1 min-w-0">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li>
                <Link href={`/blog`} className="hover:text-blue-600 transition-colors">
                  {post.category?.name || "News"}
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li className="text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-[300px] font-semibold" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Meta Information Row */}
          <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-8">
            <span className="font-bold text-blue-600 tracking-wide uppercase">
              {post.category?.name || "NEWS"}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatBlogReadTime(post.read_time)} read
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {formatDate(post.published_at)}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {((post.views_count || 0) / 1000).toFixed(1)}k views
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[32px] font-bold tracking-tight sm:text-4xl lg:text-[40px] text-slate-900 dark:text-white leading-[1.2] mb-5"
          >
            {post.title}
          </motion.h1>

          <p className="mt-4 text-[17px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[19px] mb-8">
            {post.excerpt}
          </p>

          {/* Author and Share Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-full object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold shadow-sm">
                  {post.author?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
              )}
              <div className="flex flex-col">
                {post.author?.name && (
                  <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight">
                    {post.author.name}
                  </span>
                )}
                {post.author?.role && (
                  <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {post.author.role}
                  </span>
                )}
              </div>
            </div>

            {/* Share this article pill */}
            <div className="flex items-center gap-3 rounded-full border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card p-1.5 shadow-sm">
              <span className="flex items-center gap-2 pl-3 pr-2 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                <Share2 className="h-4 w-4 text-blue-600" />
                Share this article
              </span>
              <div className="flex items-center gap-1.5">
                {/* WhatsApp */}
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20https://hirance.com/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity" title="WhatsApp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://hirance.com/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity" title="LinkedIn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                {/* X */}
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://hirance.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:opacity-90 transition-opacity" title="X (Twitter)">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* Instagram (Copy link) */}
                <button onClick={handleShare} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white hover:opacity-90 transition-opacity" title="Share via Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </button>
              </div>
            </div>
          </div>



          {/* Cover Image */}
          {post.cover_image?.url && (
            <div className="mb-6 w-full overflow-hidden rounded-3xl border border-border shadow-sm">
              <img
                src={post.cover_image.url}
                alt={post.cover_image.alt || post.title}
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
            </div>
          )}

          {/* Topics Block */}
          <div className="hidden mb-8 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 rounded-lg p-1.5">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold text-foreground">Topics</span>
              <span className="text-xs text-muted-foreground ml-2">Read about the things you're most interested in</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {post.tags && post.tags.length > 0 ? (
                post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="rounded-full bg-white dark:bg-card border border-border px-4 py-1.5 text-xs font-medium text-foreground shadow-sm hover:text-blue-600 hover:border-blue-500/30 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/blog?category=hiring" className="rounded-full bg-white dark:bg-card border border-border px-4 py-1.5 text-xs font-medium text-foreground shadow-sm hover:text-blue-600 hover:border-blue-500/30 transition-colors">#Hiring</Link>
                  <Link href="/blog?category=interviews" className="rounded-full bg-white dark:bg-card border border-border px-4 py-1.5 text-xs font-medium text-foreground shadow-sm hover:text-blue-600 hover:border-blue-500/30 transition-colors">#Interviews</Link>
                  <Link href="/blog?category=career" className="rounded-full bg-white dark:bg-card border border-border px-4 py-1.5 text-xs font-medium text-foreground shadow-sm hover:text-blue-600 hover:border-blue-500/30 transition-colors">#CareerGrowth</Link>
                </>
              )}
            </div>
          </div>

          {/* Executive Summary / Key Takeaways Box */}
          {post.key_takeaways && post.key_takeaways.length > 0 && (
            <div className="mb-10 rounded-[20px] bg-[#f8faff] dark:bg-card p-6 sm:p-8 border border-blue-100/50 dark:border-border shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h3 className="text-[20px] font-bold text-foreground">Key Takeaways</h3>
              </div>
              <ul className="space-y-3">
                {post.key_takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start text-[15px] sm:text-[16px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"></span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Section Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {post.sections && post.sections.length > 0 ? (
              (() => {
                let headingCounter = 0;
                return post.sections
                  .filter((section, idx, arr) => {
                    if (section.type !== "image") return true;
                    const firstImageIdx = arr.findIndex(s => s.type === "image");
                    if (idx === firstImageIdx) return false;
                    return true;
                  })
                  .map((section, idx) => {
                    if (section.type === "heading" && section.level === 2) {
                      headingCounter++;
                      return <SectionBlockRenderer key={idx} section={section} index={idx} headingIndex={headingCounter} />;
                    }
                    return <SectionBlockRenderer key={idx} section={section} index={idx} />;
                  });
              })()
            ) : (
              <p className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>
            )}
          </article>

          {/* Find Jobs Section */}
          <div className="mt-16 mb-10 rounded-[24px] bg-gradient-to-r from-[#f5f8ff] to-[#f9fbff] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-100/50 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-white shadow-sm border border-blue-50 text-blue-600">
                <Briefcase className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-slate-900 leading-tight">Find Jobs</h3>
                <p className="text-[14px] text-slate-500 mt-1 max-w-[440px] leading-relaxed">
                  Explore thousands of IT & corporate jobs that match your skills and career goals. Get hired faster with Hirance.
                </p>
              </div>
            </div>
            <Link href="/jobs" className="shrink-0 inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-[15px] font-bold text-white hover:bg-blue-700 transition-colors shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]">
              Explore Jobs <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Post Pagination Block */}
          {(() => {
            // Use explicit next/prev if available, otherwise fallback to related posts for pagination UI
            const prev = post.previous_post || (post.related_posts && post.related_posts[0]) || null;
            const next = post.next_post || (post.related_posts && post.related_posts[1]) || null;

            if (!prev && !next) return null;

            return (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                
                {/* Previous / First Article Block */}
                {!prev ? (
                  <div className="flex items-center gap-4 rounded-[20px] border border-slate-200/60 bg-[#f8fbff] p-5 w-full sm:w-1/2">
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-blue-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-slate-500 mb-0.5">You're at the first article</p>
                      <Link href="/blog" className="text-[15px] font-bold text-blue-600 hover:underline flex items-center group">
                        Browse all articles <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link href={`/blog/${prev.slug}`} className="flex items-center gap-4 rounded-[20px] border border-slate-200/60 bg-white p-4 w-full sm:w-1/2 group hover:shadow-md transition-shadow">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-blue-600 group-hover:bg-blue-50 transition-colors ml-1">
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 px-2 text-right">
                      <p className="text-[13px] font-medium text-slate-500 mb-0.5">Previous Article</p>
                      <h4 className="text-[14.5px] font-bold text-slate-900 truncate leading-snug">{prev.title}</h4>
                    </div>
                    {prev.cover_image?.url ? (
                      <div className="h-[68px] w-[88px] shrink-0 overflow-hidden rounded-[14px]">
                        <img src={prev.cover_image.url} alt={prev.title} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-[68px] w-[88px] shrink-0 rounded-[14px] bg-slate-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-slate-300" />
                      </div>
                    )}
                  </Link>
                )}

                {/* Next Article Block */}
                {next ? (
                  <Link href={`/blog/${next.slug}`} className="flex items-center gap-4 rounded-[20px] border border-slate-200/60 bg-white p-4 w-full sm:w-1/2 group hover:shadow-md transition-shadow">
                    {next.cover_image?.url ? (
                      <div className="h-[68px] w-[88px] shrink-0 overflow-hidden rounded-[14px]">
                        <img src={next.cover_image.url} alt={next.title} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-[68px] w-[88px] shrink-0 rounded-[14px] bg-slate-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-slate-300" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-[13px] font-medium text-slate-500 mb-0.5">Next Article</p>
                      <h4 className="text-[14.5px] font-bold text-slate-900 truncate leading-snug">{next.title}</h4>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-blue-600 group-hover:bg-blue-50 transition-colors mr-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 rounded-[20px] border border-slate-200/60 bg-[#f8fbff] p-5 w-full sm:w-1/2">
                    <div className="flex-1 min-w-0 pr-2 text-right">
                      <p className="text-[13px] font-medium text-slate-500 mb-0.5">You're at the last article</p>
                      <Link href="/blog" className="text-[15px] font-bold text-blue-600 hover:underline flex items-center justify-end group">
                        Browse all articles <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-blue-600">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 mt-16 lg:mt-0 space-y-8 lg:sticky lg:top-24">
          
          {/* On This Page (TOC) */}
          {post.sections && post.sections.some(s => s.type === "heading") && (
            <div className="rounded-2xl border border-border/70 bg-white/50 dark:bg-card/40 p-6 shadow-sm backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                On This Page
              </h3>
              <ul className="space-y-4">
                {post.sections.filter(s => s.type === "heading").map((section, idx) => {
                  const id = section.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  const isSelected = idx === 0;
                  return (
                  <li key={idx} className={`text-[13px] ${section.level === 3 ? "pl-4" : ""}`}>
                    <a href={`#${id}`} onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }} className={`flex items-center gap-3 transition-colors ${
                      isSelected ? "text-blue-700 font-semibold" : "text-slate-600 hover:text-blue-600 font-medium"
                    }`}>
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        isSelected 
                          ? "bg-blue-600 text-white" 
                          : "bg-transparent text-slate-900"
                      }`}>{idx + 1}</span>
                      <span className="truncate leading-relaxed">{section.content}</span>
                    </a>
                  </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Related Articles Mini */}
          {relatedPosts.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-white/50 dark:bg-card/40 p-6 shadow-sm backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-5">
                Related Articles
              </h3>
              <div className="space-y-5">
                {relatedPosts.slice(0, 3).map((rel) => (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} className="group flex gap-4">
                    <div className="h-[3.25rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-muted border border-border/50">
                      {rel.cover_image?.url && (
                        <img src={rel.cover_image.url} alt={rel.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="mt-1 text-[9px] text-muted-foreground uppercase font-medium">
                        {formatBlogReadTime(rel.read_time)} read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Card: "Explore Jobs" */}
          {featuredJobs && featuredJobs.length > 0 && (
            <div className="mt-8 rounded-[24px] border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">
                    Explore Jobs
                  </h3>
                </div>
                <Link
                  href="/jobs"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View all</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {featuredJobs.slice(0, 2).map((job: any) => {
                  const salary = job.salary_range || (job.salary_min ? `₹ ${Math.round(job.salary_min / 1000)}k - ${Math.round(job.salary_max / 1000)}k` : "Best in Industry");
                  const workMode = job.work_mode?.name || job.work_mode || "Full Time";
                  const location = job.location || "India";

                  return (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="group flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-border/40 bg-slate-50/60 dark:bg-muted/20 hover:border-blue-500/40 hover:bg-white dark:hover:bg-card hover:shadow-xs transition-all duration-200"
                    >
                      <div className="h-10 w-10 rounded-xl overflow-hidden bg-white dark:bg-card border border-slate-200/70 dark:border-border/60 p-1 flex items-center justify-center shrink-0">
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt={job.company_name}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xs font-extrabold text-blue-600">
                            {job.company_name?.charAt(0) || "H"}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13px] font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {job.company_name} • {location}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">{salary}</span>
                          <span>•</span>
                          <span>{workMode}</span>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 self-center" />
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/jobs"
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 py-2.5 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Explore All Openings</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {/* Card: "Popular Categories" */}
          <div className="mt-8 rounded-[24px] border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">
                Popular Categories
              </h3>
              <span className="text-[11px] font-medium text-slate-400">
                11 categories
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-border/40">
              {[
                { name: "Career Advice", slug: "career-advice", count: 3, icon: Briefcase, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30" },
                { name: "News", slug: "news", count: 1, icon: Sparkles, color: "bg-sky-50 text-sky-600 dark:bg-sky-900/30" },
                { name: "Interview Advice", slug: "interview-advice", count: 1, icon: Users, color: "bg-orange-50 text-orange-600 dark:bg-orange-900/30" },
                { name: "Fresher Advice", slug: "fresher-advice", count: 1, icon: Sparkles, color: "bg-rose-50 text-rose-600 dark:bg-rose-900/30" },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}`}
                    className="w-full py-3 flex items-center justify-between text-left group cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors truncate">
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-xs font-semibold text-blue-600">
                        {cat.count}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* App Promo Card */}
          <div className="mt-8 rounded-[28px] bg-[#f4f7fc] dark:bg-card p-8 pb-10 text-center border border-transparent shadow-sm">
            <div className="mx-auto w-48 mb-6 flex justify-center">
              <img src="/images/mockup.png" alt="Hirance App" className="w-full max-w-[170px] h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <h3 className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-2">Get Hired Faster</h3>
            <p className="text-[13.5px] text-slate-600 dark:text-slate-400 mb-7 leading-relaxed max-w-[240px] mx-auto">Join thousands of candidates already getting hired faster with Hirance.</p>
            <a href={siteConfig.links.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2962ff] to-[#5138ed] px-6 py-3.5 text-[14.5px] font-bold text-white hover:opacity-95 transition-opacity w-full shadow-[0_8px_20px_-6px_rgba(41,98,255,0.5)]">
              Download App <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        </aside>
      </div>

      {/* Dynamic CTA Section Removed as requested */}
      {/* Dynamic Frequently Asked Questions from Backend */}
      {post.faq && post.faq.length > 0 && (
        <section className="relative border-t border-border/50 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">Quick Answers</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
            </div>
            <div className="mx-auto mt-8">
              {post.faq.map((item, idx) => (
                <FAQItem 
                  key={idx} 
                  item={item} 
                  isOpen={openFaqIndex === idx} 
                  onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="relative border-t border-border/50 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Related Insights
              </h2>
              <Link
                href="/blog"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all articles
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((relPost) => {
                const categoryName =
                  typeof relPost.category === "string"
                    ? relPost.category
                    : relPost.category?.name || "Insights";

                return (
                  <div
                    key={relPost.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-white/80 dark:bg-card/40 shadow-[0_8px_30px_rgb(0,0,0,0.03)] backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1"
                  >
                    {/* Banner Header with Image or Gradient */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/30 border-b border-border/50">
                      {relPost.cover_image?.url ? (
                        <img
                          src={relPost.cover_image.url}
                          alt={relPost.cover_image.alt || relPost.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-sky-500/5" />
                      )}
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {categoryName}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium">
                            <Clock className="h-3 w-3 text-blue-600" />
                            <span>{formatBlogReadTime(relPost.read_time)}</span>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${relPost.slug}`}>
                            {relPost.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {relPost.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="text-[11px] font-medium">
                          {formatDate(relPost.published_at)}
                        </span>
                        <Link
                          href={`/blog/${relPost.slug}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-200 hover:bg-blue-500 shadow-xs"
                          aria-label={`Read ${relPost.title}`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
