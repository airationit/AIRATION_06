"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { BlogPost, BLOG_POSTS } from "@/data/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

interface BlogDetailContentProps {
  post: BlogPost;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  const [copied, setCopied] = useState(false);

  // Find 3 related posts
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.featured)
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render markdown-like sections cleanly
  const paragraphs = post.content
    .trim()
    .split("\n\n")
    .map((block, idx) => {
      if (block.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="mt-8 mb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("1. ") || block.startsWith("- ")) {
        const items = block.split("\n");
        return (
          <ul key={idx} className="my-4 space-y-2.5 pl-2">
            {items.map((item, i) => {
              const cleaned = item.replace(/^(?:\d+\.|\-)\s*/, "");
              const parts = cleaned.split("**");
              return (
                <li key={i} className="flex items-start text-base leading-relaxed text-muted-foreground">
                  <span className="mr-3 font-bold text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    {parts.length > 1 ? (
                      <>
                        <strong className="font-semibold text-foreground">{parts[1]}</strong>
                        {parts[2]}
                      </>
                    ) : (
                      cleaned
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <p
          key={idx}
          className="my-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {block}
        </p>
      );
    });

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Background Interactive Dots Canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Top Header Banner */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.15),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-4xl px-6">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-600/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="inline-flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              Published {post.publishedAt}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground"
          >
            {post.title}
          </motion.h1>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {post.excerpt}
          </p>

          {/* Author info & share bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/60 py-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full ${post.author.avatarBg} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {post.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {post.author.role}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted"
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
          {/* Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="mb-10 relative overflow-hidden rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent p-6 shadow-sm backdrop-blur-md">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/15 blur-2xl" />
              <div className="relative flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                <Sparkles className="h-4 w-4" />
                <span>Key Takeaways</span>
              </div>
              <ul className="relative mt-3 space-y-2 text-sm text-foreground">
                {post.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="mr-2.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Text Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {paragraphs}
          </article>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border/60 pt-6">
            <span className="text-xs font-semibold text-muted-foreground mr-2">
              Tags:
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
        </div>
      </section>

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
              {relatedPosts.map((relPost) => (
                <div
                  key={relPost.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/85 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:bg-card hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 dark:bg-card/40 dark:hover:bg-card/80"
                >
                  {/* Banner Header */}
                  <div className="relative aspect-[16/7] w-full overflow-hidden bg-gradient-to-br from-blue-600/[0.12] via-indigo-600/[0.08] to-sky-500/[0.06] p-3.5 flex items-start justify-between border-b border-border/60">
                    <span className="rounded-full border border-blue-500/20 bg-background/80 px-2.5 py-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 backdrop-blur-md shadow-xs">
                      {relPost.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-md shadow-xs">
                      <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      <span>{relPost.readTime}</span>
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
                    <div className="mt-4 pt-3.5 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="text-[11px] font-medium">{relPost.author.name}</span>
                      <Link
                        href={`/blog/${relPost.slug}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white transition-all duration-200 hover:bg-blue-500 shadow-xs active:scale-[0.95]"
                        aria-label={`Read ${relPost.title}`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="relative border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to experience Hirance?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Join thousands of professionals and hiring managers connecting instantly with zero forms and smart match scoring.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <GooglePlayButton />
            <a
              href="https://employer.hirance.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              Employer Login
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
