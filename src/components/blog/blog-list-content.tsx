"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  X,
  Share2,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/data/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

export function BlogListContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const gridPosts = useMemo(() => {
    // If no search or category filter, exclude featured post from general grid to avoid duplicate
    if (selectedCategory === "All" && !searchQuery) {
      return BLOG_POSTS.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredPost]);

  const handleShare = (post: BlogPost) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Interactive Canvas Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.15),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
          >
            Stories & Strategies on{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Hiring Speed
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Actionable insights, hiring trends, candidate guides, and tech industry benchmarks built for modern recruiters and job seekers.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles, skills, recruitment topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border/80 bg-background/80 py-3.5 pl-12 pr-10 text-sm text-foreground shadow-sm backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                aria-label="Search blog articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Spotlight (Only visible when no specific filter query active) */}
      {!searchQuery && selectedCategory === "All" && (
        <section className="relative pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-10 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50"
            >
              {/* Subtle ambient light accents */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 shadow-sm">
                      <Sparkles className="h-3.5 w-3.5" />
                      Featured Article
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {featuredPost.author.name}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.publishedAt}</span>
                    <span>•</span>
                    <span className="inline-flex items-center">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <div className="mt-8 flex items-center gap-3.5">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98]"
                    >
                      Read full story
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    
                    <button
                      type="button"
                      onClick={() => setActiveModalPost(featuredPost)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-border/80 bg-background/80 px-4 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-background hover:border-blue-500/40"
                    >
                      Quick Preview
                    </button>
                  </div>
                </div>

                <div className="hidden lg:col-span-5 lg:block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-blue-600/[0.08] via-indigo-600/[0.05] to-transparent p-6 flex flex-col justify-between backdrop-blur-md shadow-sm">
                    <div className="space-y-3">
                      <div className="h-2 w-20 rounded-full bg-blue-600/40" />
                      <div className="h-4 w-3/4 rounded-full bg-foreground/20" />
                      <div className="h-3 w-1/2 rounded-full bg-foreground/15" />
                    </div>

                    <div className="space-y-2 rounded-xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur-sm">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Key Takeaway
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        "{featuredPost.keyTakeaways[0]}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Blog Listing Section */}
      <section className="relative py-8">
        <div className="mx-auto max-w-6xl px-6">
          {/* Category Tabs Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {BLOG_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "border border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "border border-border/70 bg-background/60 text-muted-foreground hover:border-blue-500/40 hover:text-foreground hover:bg-background"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-medium text-muted-foreground">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Grid Listing */}
          {gridPosts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/85 shadow-lg shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:bg-card hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 dark:bg-card/40 dark:hover:bg-card/80"
                >
                  {/* Card Visual Banner Header */}
                  <div className="relative aspect-[16/7] w-full overflow-hidden bg-gradient-to-br from-blue-600/[0.12] via-indigo-600/[0.08] to-sky-500/[0.06] p-4 flex flex-col justify-between border-b border-border/60">
                    {/* Ambient light blur decoration */}
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/15 blur-xl transition-transform duration-500 group-hover:scale-125" />

                    {/* Top Bar inside Banner */}
                    <div className="relative flex items-center justify-between gap-2">
                      <span className="rounded-full border border-blue-500/20 bg-background/80 px-3 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 backdrop-blur-md shadow-xs">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur-md shadow-xs">
                        <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    {/* Bottom tags */}
                    <div className="relative flex flex-wrap gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-background/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-full ${post.author.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                          {post.author.name.charAt(0)}
                        </div>
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-foreground">
                            {post.author.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {post.publishedAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalPost(post)}
                          className="rounded-xl border border-border/70 bg-background/70 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-blue-500/40 hover:bg-background hover:text-blue-600 shadow-xs"
                          title="Quick preview"
                          aria-label={`Preview article: ${post.title}`}
                        >
                          Preview
                        </button>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white transition-all duration-200 hover:bg-blue-500 shadow-sm shadow-blue-600/20 active:scale-[0.95]"
                          aria-label={`Read full article: ${post.title}`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-foreground">
                No matching articles found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for something else or switch categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative border-t border-border/50 py-16 sm:py-20 mt-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Experience Swipe-Based Hiring Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Whether you are hiring software engineers or searching for your next career move, Hirance makes hiring instant.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GooglePlayButton />
            <a
              href="https://employer.hirance.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              Post a job in 60s
            </a>
          </div>
        </div>
      </section>

      {/* Quick Preview Modal */}
      <AnimatePresence>
        {activeModalPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm"
            onClick={() => setActiveModalPost(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl"
            >
              {/* Top ambient lighting contained inside overflow-hidden */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/15 blur-2xl" />

              {/* Modal Header */}
              <div className="relative flex items-center justify-between border-b border-border/60 px-6 py-4 sm:px-8">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {activeModalPost.category}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="inline-flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    {activeModalPost.readTime}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalPost(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body - Scrollable only in Y direction with zero horizontal overflow */}
              <div className="overflow-y-auto overflow-x-hidden p-6 sm:p-8 space-y-5">
                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight text-foreground leading-snug">
                  {activeModalPost.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-4">
                  <span className="font-semibold text-foreground">
                    {activeModalPost.author.name}
                  </span>
                  <span>({activeModalPost.author.role})</span>
                  <span>•</span>
                  <span>Published {activeModalPost.publishedAt}</span>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {activeModalPost.excerpt}
                </p>

                {/* Key Highlights Card */}
                <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.08] via-indigo-500/[0.04] to-transparent p-5 sm:p-6 space-y-3 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-4 w-4" />
                    <span>Key Highlights</span>
                  </div>
                  <ul className="space-y-2.5">
                    {activeModalPost.keyTakeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="relative flex items-center justify-between border-t border-border/60 bg-card/60 px-6 py-4 sm:px-8 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => handleShare(activeModalPost)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-blue-500/40 hover:bg-background hover:text-foreground"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </button>

                <Link
                  href={`/blog/${activeModalPost.slug}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
