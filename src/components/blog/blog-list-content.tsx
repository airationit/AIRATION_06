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
  ChevronDown,
  Eye,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { BlogCategory, BlogListItem, BlogTag } from "@/types/blogs";
import { useBlogsStore } from "@/store/blogs-store";
import { formatBlogReadTime } from "@/lib/api/blogs";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

interface BlogListContentProps {
  initialBlogs: BlogListItem[];
  totalCount: number;
  initialCategories: BlogCategory[];
  initialTags: BlogTag[];
  currentPage: number;
  totalPages: number;
  featuredJobs?: any[];
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
  featuredJobs = [],
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

  const isDefaultView =
    filters.category === "all" && !filters.tag && !filters.search && currentPage === 1;

  // In the all tab and category views, show all matching blogs in the grid
  const displayPosts = blogs;

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

      <section className="relative pb-16 pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 xl:gap-14 items-start">
            
            {/* LEFT COLUMN: Main Content */}
            <div className="flex flex-col min-w-0">
              
              {/* COMPACT HERO WITHIN LEFT COLUMN */}
              <div className="mb-10 bg-white dark:bg-card rounded-[32px] p-8 sm:p-10 relative overflow-hidden border border-border/80 shadow-sm">
                <div className="w-full relative z-10">
                  <span className="inline-block rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-blue-600 mb-5">
                    Hirance Insights &amp; Research
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight sm:text-[42px] text-foreground leading-[1.1] whitespace-nowrap">
                    Insights on <span className="text-blue-600">Hiring Velocity</span>
                  </h1>
                  <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
                    Actionable recruitment guides, candidate Smart Score benchmarks, and tech hiring speed strategies from the next-gen swipe-based platform.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSearch(searchInput);
                      startTransition(() => {
                        loadBlogs();
                      });
                    }}
                    className="relative flex items-center w-full mt-8 max-w-xl"
                  >
                    <div className="pointer-events-none absolute left-5 z-10 flex items-center justify-center text-muted-foreground">
                      <Search className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search articles, recruitment guides, skills..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full rounded-full border border-border/70 bg-white dark:bg-background py-4 pl-12 pr-28 text-[13px] text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <div className="absolute right-2 z-10 flex items-center gap-1.5">
                      {searchInput && (
                        <button type="button" onClick={() => { setSearchInput(""); setSearch(""); startTransition(() => { loadBlogs(); }); }} className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors" aria-label="Clear search">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button type="submit" className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 px-6 text-[13px] font-semibold text-white shadow-md transition-all active:scale-95">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Featured Article Spotlight (Visible on Default View Page 1) */}
              {isDefaultView && featuredBlog && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-10 rounded-3xl border border-border bg-white dark:bg-card p-4 lg:px-6 lg:py-5 shadow-sm hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
                    <div className="order-2 md:order-1 flex flex-col justify-between h-full">
                      <div>
                        <span className="inline-block rounded-md bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-blue-600 mb-4">
                          Featured Story
                        </span>
                        
                        <h2 className="text-[26px] font-bold tracking-tight text-foreground hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                          <Link href={`/blog/${featuredBlog.slug}`}>
                            {featuredBlog.title}
                          </Link>
                        </h2>

                        <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-blue-600" />
                            {formatDate(featuredBlog.published_at)}
                          </span>
                          <span>•</span>
                          <span>{formatBlogReadTime(featuredBlog.read_time)}</span>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/blog/${featuredBlog.slug}`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-5 text-xs font-semibold text-white shadow-md transition-all"
                        >
                          Read full story
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setActiveModalPost(featuredBlog)}
                          className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-5 text-xs font-semibold text-foreground hover:bg-muted transition-all"
                        >
                          Quick Preview
                        </button>
                      </div>
                    </div>

                    <div className="order-1 md:order-2 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/20 border border-border/50">
                      {featuredBlog.cover_image?.url && (
                        <img
                          src={featuredBlog.cover_image.url}
                          alt={featuredBlog.cover_image.alt || featuredBlog.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Category Tabs & Order Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5 mb-8">
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
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-border bg-white dark:bg-card text-muted-foreground hover:border-blue-500/30 hover:text-foreground hover:bg-background"
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.post_count !== undefined && (
                          <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-muted-foreground"}`}>
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
                    className="rounded-full border border-border bg-white dark:bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-blue-500/40 focus:outline-none transition-colors"
                    aria-label="Order articles by"
                  >
                    <option value="-published_at">Latest First</option>
                    <option value="published_at">Oldest First</option>
                    <option value="-views_count">Most Popular</option>
                  </select>
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {totalBlogs} article{totalBlogs !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Active Filter Indicators */}
              {(filters.category !== "all" || filters.tag || filters.search) && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Filtering by:</span>
                  {filters.category !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                      Category: {filters.category}
                      <button type="button" onClick={() => setCategory("all")} className="hover:opacity-75"><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {filters.tag && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                      Tag: #{filters.tag}
                      <button type="button" onClick={() => setTag("")} className="hover:opacity-75"><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {filters.search && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400">
                      Search: &ldquo;{filters.search}&rdquo;
                      <button type="button" onClick={() => { setSearch(""); setSearchInput(""); }} className="hover:opacity-75"><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  <button type="button" onClick={resetFilters} className="text-xs font-semibold text-blue-600 hover:underline ml-2">Clear all</button>
                </div>
              )}

              {isLoading && (
                <div className="flex items-center justify-center py-16 text-muted-foreground gap-2.5">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="text-sm font-medium">Updating articles...</span>
                </div>
              )}

              {/* Clean Article Grid */}
              {!isLoading && displayPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {displayPosts.map((post, idx) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white dark:bg-card shadow-[0_4px_20px_rgb(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.1)] transition-all"
                    >
                      <Link href={`/blog/${post.slug}`} className="block relative aspect-video w-full overflow-hidden bg-muted/30 border-b border-border/50">
                        {post.cover_image?.url ? (
                          <img
                            src={post.cover_image.url}
                            alt={post.cover_image.alt || post.title}
                            className="h-full w-full object-cover transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-blue-600/10 to-transparent" />
                        )}
                      </Link>

                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2">
                          {post.category?.name || "Article"}
                        </span>
                        
                        <h3 className="text-[17px] font-bold tracking-tight text-foreground transition-colors line-clamp-2 leading-snug hover:text-blue-600">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-muted-foreground">
                              {post.author?.avatar ? (
                                <img src={post.author.avatar} alt={post.author.name} className="h-5 w-5 rounded-full object-cover" />
                              ) : (
                                <img src="/images/author-avatar.png" alt={post.author?.name || "Author"} className="h-5 w-5 rounded-full object-cover" />
                              )}
                              <span className="text-foreground">{post.author?.name || "Hirance"}</span>
                              <span>•</span>
                              {formatDate(post.published_at)} • {formatBlogReadTime(post.read_time)}
                            </span>
                          </div>
                          
                          <Link
                            href={`/blog/${post.slug}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-500 shadow-sm shadow-blue-600/20"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {!isLoading && displayPosts.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg font-bold text-foreground">No matching articles found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try searching for another topic or resetting filters.</p>
                  <button onClick={resetFilters} className="mt-5 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors">Reset Filters</button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 0 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Page <span className="font-bold text-foreground">{currentPage}</span> of <span className="font-bold text-foreground">{totalPages}</span> 
                    <span className="font-normal text-muted-foreground ml-1">({totalBlogs} total positions)</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage <= 1 || isLoading}
                      onClick={() => setPage(currentPage - 1)}
                      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border/70 bg-white dark:bg-card px-4 text-sm font-medium text-muted-foreground transition-all hover:border-blue-500/40 hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Prev</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                      const isCurrent = p === currentPage;
                      return (
                        <button
                          key={p}
                          type="button"
                          disabled={isLoading}
                          onClick={() => setPage(p)}
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                            isCurrent
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                              : "border border-border/70 bg-white dark:bg-card text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={currentPage >= totalPages || isLoading}
                      onClick={() => setPage(currentPage + 1)}
                      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border/70 bg-white dark:bg-card px-4 text-sm font-medium text-foreground transition-all hover:border-blue-500/40 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar */}
            <aside className="w-full lg:sticky lg:top-28 space-y-6 mt-12 lg:mt-0">
              
              {/* Hiring Now Banner */}
              <div className="rounded-2xl border border-blue-500/10 bg-gradient-to-r from-[#F0F5FF] to-[#FFFFFF] dark:from-blue-950/20 dark:to-background p-2.5 xl:p-5 shadow-sm flex items-center justify-between gap-1.5 xl:gap-3 overflow-hidden">
                <h3 className="text-[11.5px] xl:text-[16px] font-extrabold text-foreground leading-[1.2] tracking-tight shrink-0 whitespace-nowrap">
                  Someone's getting <br /><span className="text-blue-600">hired right now!</span>
                </h3>
                
                <div className="w-px h-10 xl:h-12 bg-blue-500/20 shrink-0"></div>
                
                <a href="https://play.google.com/store/apps/details?id=com.hirance" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center gap-1.5 xl:gap-2 rounded-lg bg-[#0F172A] hover:bg-black px-2 py-1.5 xl:px-3 xl:py-2 transition-colors shadow-md hover:shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="xl:w-[16px] xl:h-[16px]"><path d="M3.193 2.158c-.147.158-.236.38-.236.65v18.384c0 .27.089.492.236.65l.044.037 10.37-10.231v-.154L3.237 2.12l-.044.038z" fill="#00D2FF"/><path d="M13.606 11.493L3.193 22.034a.972.972 0 001.378-.002L18.156 14.5l-4.55-3.007z" fill="#FF3333"/><path d="M18.156 9.5l-13.585-7.53a.972.972 0 00-1.378-.002l10.413 10.54 4.55-3.008z" fill="#FFCE00"/><path d="M18.156 14.5l4.304-2.502a1.002 1.002 0 000-1.996l-4.304-2.502-4.55 3.008 4.55 3.007z" fill="#00E676"/></svg>
                  <div className="h-3 xl:h-3.5 w-px bg-white/20"></div>
                  <div className="flex items-center gap-1 xl:gap-1.5">
                    <span className="text-[8.5px] xl:text-[10px] font-bold text-white tracking-wide uppercase">Apply Now</span>
                    <ArrowRight className="h-2.5 w-2.5 xl:h-3 xl:w-3 text-white" />
                  </div>
                </a>
              </div>
              
              {/* Latest Articles Sidebar Component */}
              <div className="rounded-3xl border border-border bg-white dark:bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[17px] font-bold text-foreground">Latest articles</h3>
                </div>
                
                <div className="space-y-6">
                  {blogs.slice(0, 3).map(post => (
                    <div key={post.id} className="flex gap-4 group">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-800 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        {post.category?.name?.toLowerCase().includes("interview") ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h3l3 -9l5 18l3 -9h5"/></svg>
                        ) : post.category?.name?.toLowerCase().includes("career") ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">{post.category?.name || "Article"}</span>
                        <h4 className="mt-1 text-[13px] font-bold text-foreground line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="mt-1.5 text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                          {formatDate(post.published_at)} • {formatBlogReadTime(post.read_time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hirance Featured Jobs Sidebar Component */}
              <div className="rounded-3xl border border-border bg-[#f6f9fc] dark:bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">Hirance Featured Jobs</h3>
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

                <Link 
                  href="/jobs" 
                  className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#0a1128] dark:bg-blue-900 py-3.5 text-[15px] font-semibold text-white hover:bg-black dark:hover:bg-blue-800 transition-colors shadow-sm"
                >
                  View all
                </Link>
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative border-t border-border/60 py-16 sm:py-24 mt-4 overflow-hidden">
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
            <a href="https://employer.hirance.com/" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white dark:bg-card shadow-sm px-7 text-sm font-semibold text-foreground transition-all hover:bg-muted">
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
                    {formatBlogReadTime(activeModalPost.read_time)}
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

              {activeModalPost.cover_image?.url && (
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-muted/30 border-b border-border/50">
                  <img
                    src={activeModalPost.cover_image.url}
                    alt={activeModalPost.cover_image.alt || activeModalPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground leading-snug">
                  {activeModalPost.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-4">
                  {activeModalPost.author?.avatar ? (
                    <img
                      src={activeModalPost.author.avatar}
                      alt={activeModalPost.author.name}
                      className="h-5 w-5 rounded-full object-cover border border-blue-500/20"
                    />
                  ) : null}
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
