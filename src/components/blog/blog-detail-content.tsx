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
} from "lucide-react";
import { BlogDetail, BlogSection } from "@/types/blogs";
import { JobListItem } from "@/types/jobs";
import { recordBlogView, formatBlogReadTime } from "@/lib/api/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

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
function SectionBlockRenderer({ section, index }: { section: BlogSection; index: number }) {
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
          <h2
            key={index}
            id={id}
            className="mt-14 mb-6 text-[26px] sm:text-[32px] font-extrabold tracking-tight text-foreground leading-[1.2] pb-3 border-b border-border/40"
          >
            {section.content}
          </h2>
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

function FAQItem({ item }: { item: { question: string; answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-2xl mb-4 overflow-hidden bg-white/40 dark:bg-card/40 transition-all hover:border-blue-500/30 shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-bold text-sm sm:text-base text-foreground">{item.question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
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
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/60">/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/60">/</li>
              {post.category?.name && (
                <>
                  <li>
                    <Link href={`/blog`} className="hover:text-blue-600 transition-colors">
                      {post.category.name}
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-muted-foreground/60">/</li>
                </>
              )}
              <li className="text-foreground truncate max-w-[200px] sm:max-w-[300px] font-semibold" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium mb-5">
            <span className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {post.category?.name || "Hiring & Recruitment"}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="inline-flex items-center text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {formatBlogReadTime(post.read_time)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {formatDate(post.published_at)}
            </span>
            {post.views_count > 0 && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  {(post.views_count / 1000).toFixed(1)}k views
                </span>
              </>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground leading-[1.15]"
          >
            {post.title}
          </motion.h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg mb-8">
            {post.excerpt}
          </p>

          {/* Author Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8">
            <div className="flex items-center gap-3">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover border border-border shadow-sm"
                />
              ) : (
                <img
                  src="/images/author-avatar.png"
                  alt={post.author?.name || "Author"}
                  className="h-10 w-10 rounded-full object-cover border border-border shadow-sm"
                />
              )}
              <div>
                <p className="text-sm font-bold text-foreground">
                  {post.author?.name || "Alice Carter"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {post.author?.role || "Talent Analyst"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-border bg-white dark:bg-card px-4 py-2.5 shadow-sm">
              <span className="text-xs font-bold text-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4 text-blue-600" /> Share this article
              </span>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2.5">
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${encodeURIComponent(`https://hirance.com/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-6 w-6 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform shadow-sm" title="WhatsApp">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://hirance.com/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-6 w-6 rounded-full bg-[#0A66C2] text-white hover:scale-110 transition-transform shadow-sm" title="LinkedIn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://hirance.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-6 w-6 rounded-full bg-black text-white dark:bg-white dark:text-black hover:scale-110 transition-transform shadow-sm" title="X (Twitter)">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleShare(); }} className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:scale-110 transition-transform shadow-sm" title="Instagram">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
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
          <div className="mb-8 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
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
            <div className="mb-10 relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#f8fbff] dark:bg-blue-950/20 p-6 sm:p-8 shadow-sm">
              <div className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>Executive Summary &amp; Key Takeaways</span>
              </div>
              <ul className="relative mt-5 space-y-4 text-sm text-foreground/90 font-medium">
                {post.key_takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Section Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {post.sections && post.sections.length > 0 ? (
              post.sections
                .filter((section, idx, arr) => {
                  if (section.type !== "image") return true;
                  const firstImageIdx = arr.findIndex(s => s.type === "image");
                  if (idx === firstImageIdx) return false;
                  return true;
                })
                .map((section, idx) => (
                  <SectionBlockRenderer key={idx} section={section} index={idx} />
              ))
            ) : (
              <p className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>
            )}
          </article>

          {/* CTA Redirection Block */}
          {post.cta && (
            <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 sm:p-12 text-white shadow-xl relative">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-xl">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                    {post.cta.type || "Action"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    {post.cta.title}
                  </h3>
                  <p className="text-blue-100 text-base sm:text-lg">
                    {post.cta.description}
                  </p>
                </div>
                <a
                  href={post.cta.button_url}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  {post.cta.button_text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {/* Post Pagination Block */}
          {(() => {
            // Use explicit next/prev if available, otherwise fallback to related posts for pagination UI
            const prev = post.previous_post || (post.related_posts && post.related_posts[0]) || null;
            const next = post.next_post || (post.related_posts && post.related_posts[1]) || null;

            if (!prev && !next) return null;

            return (
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/60 pt-8">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-col justify-center rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6 transition-colors hover:border-blue-500/40 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 shadow-sm"
                  >
                    <span className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-blue-600 transition-colors">
                      <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Previous
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-bold text-foreground line-clamp-2 leading-snug">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex flex-col justify-center text-right rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6 transition-colors hover:border-blue-500/40 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 shadow-sm"
                  >
                    <span className="mb-2 flex items-center justify-end text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-blue-600 transition-colors">
                      Next <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-bold text-foreground line-clamp-2 leading-snug">
                      {next.title}
                    </span>
                  </Link>
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
                  return (
                  <li key={idx} className={`text-xs ${section.level === 3 ? "pl-4" : ""}`}>
                    <a href={`#${id}`} onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }} className="flex gap-3 text-muted-foreground hover:text-blue-600 transition-colors">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-blue-500/10 text-[10px] font-bold text-blue-600">{idx + 1}</span>
                      <span className="line-clamp-2 leading-relaxed font-medium">{section.content}</span>
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

          {/* Dynamic Featured Jobs */}
          {featuredJobs && featuredJobs.length > 0 && (
            <div className="rounded-3xl border border-border bg-[#f6f9fc] dark:bg-card p-6 shadow-sm">
              <div className="mb-5 pb-1">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-5">
                  Hirance Featured Jobs
                </h3>
              </div>
              <div className="space-y-4">
                {featuredJobs && featuredJobs.slice(0, 3).map((job) => (
                  <Link href={`/jobs/${job.id}`} key={job.id} className="rounded-[18px] border border-border/50 bg-white dark:bg-background p-4 flex items-center gap-3 hover:border-blue-500/40 hover:shadow-md transition-all group">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-white dark:bg-muted/20 flex items-center justify-center shadow-xs">
                      {job.company_logo ? (
                        <img src={job.company_logo} alt={job.company_name} className="h-full w-full object-contain p-1.5" />
                      ) : (
                        <span className="text-[14px] font-extrabold text-muted-foreground">{job.company_name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[12.5px] font-bold text-foreground group-hover:text-blue-600 transition-colors truncate">{job.title}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mt-0.5 truncate">{job.company_name}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-blue-600 transition-colors shrink-0" strokeWidth={2.5} />
                  </Link>
                ))}
              </div>
              <Link href="/jobs" className="mt-6 flex w-full items-center justify-center rounded-[18px] bg-[#0f172a] dark:bg-blue-900 py-3.5 text-[15px] font-semibold text-white hover:bg-black dark:hover:bg-blue-800 transition-colors shadow-sm">
                View all
              </Link>
            </div>
          )}
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
                <FAQItem key={idx} item={item} />
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
