"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  ArrowRight,
  ArrowUpRight,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { BlogCategory, BlogListItem, BlogTag } from "@/types/blogs";
import { useBlogsStore } from "@/store/blogs-store";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

interface BlogListContentProps {
  initialBlogs: BlogListItem[];
  totalCount: number;
  initialCategories: BlogCategory[];
  initialTags: BlogTag[];
  currentPage: number;
  totalPages: number;
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

export function BlogListContent({
  initialBlogs,
  totalCount,
  initialCategories,
  initialTags,
  currentPage: serverPage,
  totalPages: serverTotalPages,
}: BlogListContentProps) {
  const [, startTransition] = useTransition();

  // Zustand Store Selectors
  const {
    blogs,
    featuredBlog,
    categories,
    tags,
    totalBlogs,
    currentPage,
    totalPages,
    isLoading,
    filters,
    hydrate,
    setCategory,
    setTag,
    setSearch,
    setOrdering,
    setPage,
    resetFilters,
    loadBlogs,
  } = useBlogsStore();

  const [searchInput, setSearchInput] = useState<string>("");
  const [activeModalPost, setActiveModalPost] = useState<BlogListItem | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // SSR Store Hydration on Mount
  useEffect(() => {
    hydrate(
      initialBlogs,
      totalCount,
      initialCategories,
      initialTags,
      serverPage,
      serverTotalPages
    );
  }, [initialBlogs, totalCount, initialCategories, initialTags, serverPage, serverTotalPages, hydrate]);

  // Debounced search handling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        setSearch(searchInput);
        startTransition(() => {
          loadBlogs();
        });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput, filters.search, setSearch, loadBlogs]);

  // Display list (excluding featured post on first page if default view)
  const isDefaultView =
    filters.category === "all" && !filters.tag && !filters.search && currentPage === 1;

  const displayPosts = isDefaultView && featuredBlog
    ? blogs.filter((b) => b.id !== featuredBlog.id)
    : blogs;

  const handleShare = (post: BlogListItem) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Background Interactive Dots Canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" aria-labelledby="blog-heading">
        {/* Soft Ambient Glows matching Homepage */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-[15%] h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[130px]" />
          <div className="absolute right-[-5%] top-[35%] h-[20rem] w-[24rem] rounded-full bg-sky-400/10 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Clean Uppercase Kicker (No chip pill) */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400"
          >
            Hirance Insights &amp; Research
          </motion.p>

          {/* Primary Headline */}
          <motion.h1
            id="blog-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]"
          >
            Insights on{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Hiring Velocity
            </span>
          </motion.h1>

          {/* Short, Crisp Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Actionable recruitment guides, candidate Smart Score benchmarks, and tech hiring speed strategies from India&apos;s swipe-based platform.
          </motion.p>

          {/* Sleek Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(searchInput);
                startTransition(() => {
                  loadBlogs();
                });
              }}
              className="relative flex items-center w-full"
            >
              {/* Search Icon (explicit z-10 so it renders on top of input background) */}
              <div className="pointer-events-none absolute left-4 z-10 flex items-center justify-center text-muted-foreground">
                <Search className="h-5 w-5 text-muted-foreground/80" aria-hidden="true" />
              </div>

              <input
                type="text"
                placeholder="Search articles, recruitment guides, skills..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-full border border-border/80 bg-white/90 dark:bg-card/70 py-3.5 pl-12 pr-24 text-sm text-foreground shadow-sm backdrop-blur-xl transition-all placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/25"
                aria-label="Search blog articles"
              />

              <div className="absolute right-2 z-10 flex items-center gap-1.5">
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setSearch("");
                      startTransition(() => {
                        loadBlogs();
                      });
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                    aria-label="Clear search input"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="inline-flex h-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 px-3.5 text-xs font-semibold text-white shadow-xs transition-all active:scale-95"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Article Spotlight (Visible on Default View Page 1) */}
      {isDefaultView && featuredBlog && (
        <section className="relative pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-border/70 bg-white/80 dark:bg-card/40 p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)]"
            >
              {/* Subtle ambient light inside card */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  {/* Clean Kicker & Category Metadata */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                      Featured Story
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-medium text-muted-foreground">
                      {featuredBlog.category?.name || "Hiring Insights"}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p className="mt-3.5 text-base leading-relaxed text-muted-foreground line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {featuredBlog.author?.name}
                    </span>
                    <span>•</span>
                    <span>{formatDate(featuredBlog.published_at)}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      {featuredBlog.read_time}
                    </span>
                    {featuredBlog.views_count > 0 && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          {featuredBlog.views_count} views
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-6 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Read full story
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setActiveModalPost(featuredBlog)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background/80 px-5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-muted/80"
                    >
                      Quick Preview
                    </button>
                  </div>
                </div>

                {/* Right Visual Spotlight Banner */}
                <div className="hidden lg:col-span-5 lg:block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent p-6 flex flex-col justify-between backdrop-blur-md shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Trending Topic
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {featuredBlog.read_time}
                      </span>
                    </div>

                    <div className="space-y-2 rounded-xl border border-border/60 bg-background/90 p-4 shadow-sm backdrop-blur-md">
                      <p className="text-xs font-semibold text-foreground">
                        Key Discussion Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {featuredBlog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Blog Listing Section */}
      <section className="relative py-6">
        <div className="mx-auto max-w-6xl px-6">
          {/* Category Tabs & Order Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive =
                  filters.category === cat.slug.toLowerCase() ||
                  (filters.category === "all" && cat.slug === "all");

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setCategory(cat.slug)}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "border border-border/70 bg-background/60 text-muted-foreground hover:border-blue-500/30 hover:text-foreground hover:bg-background"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.post_count !== undefined && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-medium ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {cat.post_count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={filters.ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="rounded-xl border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-blue-500/40 focus:outline-none transition-colors"
                aria-label="Order articles by"
              >
                <option value="-published_at">Latest First</option>
                <option value="published_at">Oldest First</option>
                <option value="-views_count">Most Popular</option>
              </select>

              <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
                {totalBlogs} article{totalBlogs !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Trending Tags Bar */}
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Topics:
              </span>
              {tags.slice(0, 8).map((t) => {
                const isSelected = filters.tag === t.slug || filters.tag === t.name;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setTag(t.slug)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-semibold"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    #{t.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Filter Indicators */}
          {(filters.category !== "all" || filters.tag || filters.search) && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Filtering by:</span>
              {filters.category !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                  Category: {filters.category}
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className="hover:opacity-75"
                    aria-label="Remove category filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.tag && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                  Tag: #{filters.tag}
                  <button
                    type="button"
                    onClick={() => setTag("")}
                    className="hover:opacity-75"
                    aria-label="Remove tag filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.search && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                  Search: &ldquo;{filters.search}&rdquo;
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSearchInput("");
                    }}
                    className="hover:opacity-75"
                    aria-label="Remove search filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2.5">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm font-medium">Updating articles...</span>
            </div>
          )}

          {/* Clean Article Grid */}
          {!isLoading && displayPosts.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-white/80 dark:bg-card/40 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)]"
                >
                  {/* Visual Header Banner */}
                  <div className="relative aspect-[16/8] w-full overflow-hidden bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-sky-500/5 p-4 flex items-start justify-between border-b border-border/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {post.category?.name || "Article"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      <span>{post.read_time}</span>
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                          {post.author?.name ? post.author.name.charAt(0) : "H"}
                        </div>
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-foreground leading-tight">
                            {post.author?.name || "Hirance Editorial"}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {formatDate(post.published_at)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalPost(post)}
                          className="text-xs font-medium text-muted-foreground hover:text-blue-600 transition-colors px-2 py-1"
                          aria-label={`Preview article: ${post.title}`}
                        >
                          Preview
                        </button>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-200 hover:bg-blue-500 shadow-sm shadow-blue-600/20 group-hover:translate-x-0.5"
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
          )}

          {/* Empty State */}
          {!isLoading && displayPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-bold text-foreground">
                No matching articles found
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Try searching for another topic or resetting filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1 || isLoading}
                onClick={() => setPage(currentPage - 1)}
                className="inline-flex h-9 items-center gap-1 rounded-full border border-border/70 bg-background/80 px-4 text-xs font-semibold text-muted-foreground transition-all hover:border-blue-500/40 hover:bg-background hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isCurrent = p === currentPage;
                  return (
                    <button
                      key={p}
                      type="button"
                      disabled={isLoading}
                      onClick={() => setPage(p)}
                      className={`h-9 w-9 rounded-full text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                          : "border border-border/70 bg-background/60 text-muted-foreground hover:border-blue-500/40 hover:bg-background hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage >= totalPages || isLoading}
                onClick={() => setPage(currentPage + 1)}
                className="inline-flex h-9 items-center gap-1 rounded-full border border-border/70 bg-background/80 px-4 text-xs font-semibold text-muted-foreground transition-all hover:border-blue-500/40 hover:bg-background hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section (Matching Homepage WantToHire / AppDownload) */}
      <section className="relative border-t border-border/60 py-16 sm:py-24 mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Experience Swipe-Based Hiring Today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether you are recruiting software engineers or looking for your next career move, Hirance makes hiring instant with zero forms.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GooglePlayButton />
            <a
              href="https://employer.hirance.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border/80 bg-background/80 px-7 text-sm font-semibold text-foreground transition-all hover:bg-muted"
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
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur-2xl"
            >
              <div className="relative flex items-center justify-between border-b border-border/60 px-6 py-4 sm:px-8">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {activeModalPost.category?.name || "Article"}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="inline-flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-3.5 w-3.5 text-blue-600" />
                    {activeModalPost.read_time}
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

              <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground leading-snug">
                  {activeModalPost.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-4">
                  <span className="font-semibold text-foreground">
                    {activeModalPost.author?.name}
                  </span>
                  {activeModalPost.author?.role && (
                    <span>({activeModalPost.author.role})</span>
                  )}
                  <span>•</span>
                  <span>Published {formatDate(activeModalPost.published_at)}</span>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {activeModalPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeModalPost.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-between border-t border-border/60 bg-background/60 px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => handleShare(activeModalPost)}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </button>

                <Link
                  href={`/blog/${activeModalPost.slug}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all duration-200"
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
