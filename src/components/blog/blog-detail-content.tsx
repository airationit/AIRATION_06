"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Share2,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Quote,
  TrendingUp,
  Info,
  Eye,
} from "lucide-react";
import { BlogDetail, BlogSection } from "@/types/blogs";
import { recordBlogView } from "@/lib/api/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

interface BlogDetailContentProps {
  post: BlogDetail;
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
        <p key={index} className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {section.content}
        </p>
      );

    case "heading":
      if (section.level === 2) {
        return (
          <h2
            key={index}
            className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {section.content}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          className="mt-8 mb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          {section.content}
        </h3>
      );

    case "image":
      return (
        <figure key={index} className="my-8 overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-sm">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40">
            <Image
              src={section.url}
              alt={section.alt || "Article illustration"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
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
              <li key={i} className="flex items-start text-base leading-relaxed text-muted-foreground">
                <span className="mr-3 font-bold text-blue-600 dark:text-blue-400 text-lg leading-none mt-1">•</span>
                <span>
                  {parts.length > 1 ? (
                    <>
                      <strong className="font-semibold text-foreground">{parts[1]}</strong>
                      {parts[2]}
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

export function BlogDetailContent({ post }: BlogDetailContentProps) {
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

      {/* Top Header Banner */}
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-[15%] h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6">
          {/* Back to All Articles */}
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Link>

          {/* Clean Kicker & Metadata without floating chips */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              {post.category?.name || "Hiring Insights"}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="inline-flex items-center text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5 text-blue-600" />
              {post.read_time}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Published {formatDate(post.published_at)}
            </span>
            {post.views_count > 0 && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  {post.views_count} views
                </span>
              </>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground leading-[1.15]"
          >
            {post.title}
          </motion.h1>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {post.excerpt}
          </p>

          {/* Author info & share bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/60 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold shadow-sm">
                {post.author?.name ? post.author.name.charAt(0) : "H"}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {post.author?.name || "Hirance Editorial"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {post.author?.role || "Talent Researcher"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Link Copied!" : "Share Article"}
            </button>
          </div>
        </div>
      </section>

      {/* Main Body Article */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Executive Summary / Key Takeaways Box */}
          {post.key_takeaways && post.key_takeaways.length > 0 && (
            <div className="mb-10 relative overflow-hidden rounded-3xl border border-blue-500/25 bg-blue-500/[0.04] p-6 sm:p-8 shadow-sm backdrop-blur-md">
              <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>Executive Summary &amp; Key Takeaways</span>
              </div>
              <ul className="relative mt-4 space-y-3 text-sm sm:text-base text-foreground/90">
                {post.key_takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-1" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Section Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {post.sections && post.sections.length > 0 ? (
              post.sections.map((section, idx) => (
                <SectionBlockRenderer key={idx} section={section} index={idx} />
              ))
            ) : (
              <p className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>
            )}
          </article>

          {/* Author Bio Box */}
          {post.author?.bio && (
            <div className="mt-12 rounded-3xl border border-border/70 bg-white/80 dark:bg-card/40 p-6 sm:p-7 backdrop-blur-sm shadow-sm flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-base font-bold">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  About {post.author.name}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border/60 pt-6">
              <span className="text-xs font-semibold text-muted-foreground mr-1">
                Topics:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic CTA Section */}
      {post.cta ? (
        <section className="relative border-t border-border/50 py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-blue-500/25 bg-white/80 dark:bg-card/40 p-8 sm:p-12 text-center shadow-lg backdrop-blur-xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {post.cta.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {post.cta.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={post.cta.button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-7 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{post.cta.button_text}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative border-t border-border/50 py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />
          </div>

          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Ready to experience Hirance?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
              Join thousands of professionals and hiring managers connecting instantly with zero forms and smart match scoring.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <GooglePlayButton />
              <a
                href="https://employer.hirance.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border/80 bg-background/80 px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                Employer Login
              </a>
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
                    {/* Banner Header */}
                    <div className="relative aspect-[16/8] w-full overflow-hidden bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-sky-500/5 p-3.5 flex items-start justify-between border-b border-border/50">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {categoryName}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                        <Clock className="h-3 w-3 text-blue-600" />
                        <span>{relPost.read_time}</span>
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
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

