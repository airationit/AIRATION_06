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
                  className="mb-10 rounded-3xl border border-border bg-white dark:bg-card p-5 lg:p-6 shadow-sm hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
                    <div className="order-2 md:order-1 flex flex-col justify-between h-full">
                      <div>
                        <span className="inline-block rounded-md bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-blue-600 mb-4">
                          Featured Story
                        </span>
                        
                        <h2 className="text-[26px] font-bold tracking-tight text-foreground hover:text-blue-600 transition-colors leading-tight">
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
              {totalPages > 1 && (
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
                <div className="flex items-center justify-between mb-6 pb-2">
                  <h3 className="text-[17px] font-bold text-foreground">Latest articles</h3>
                  <button onClick={resetFilters} type="button" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center">
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
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
                        <p className="mt-1 text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
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
                <div className="mb-5 pb-1">
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">Hirance Featured Jobs</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-[18px] border border-border/50 bg-white dark:bg-background p-5 flex justify-between items-center hover:border-blue-500/40 hover:shadow-md transition-all cursor-pointer group">
                    <span className="text-[13px] font-bold text-foreground group-hover:text-blue-600 transition-colors">Lead Python Engineer @ Swiggy</span>
                    <ChevronRight className="h-4 w-4 text-blue-600 transition-colors" strokeWidth={2.5} />
                  </div>
                  
                  <div className="rounded-[18px] border border-border/50 bg-white dark:bg-background p-5 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[13px] font-bold text-foreground group-hover:text-blue-600 transition-colors">Senior Product Designer @ Zomato</span>
                      <ChevronRight className="h-4 w-4 text-blue-600 transition-colors" strokeWidth={2.5} />
                    </div>
                    <div className="flex gap-2.5 mt-4 items-center">
                      {/* Swiggy Logo */}
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0344 24C11.6584 23.589 9.9594 21.416 8.0844 18.487C7.5374 17.571 7.1834 16.857 7.2514 16.673C7.4294 16.193 10.6064 15.93 11.5844 16.365C11.8824 16.497 11.8744 16.672 11.8744 16.774C11.8744 17.214 11.8524 18.393 11.8524 18.393C11.8525 18.451 11.8641 18.5084 11.8864 18.5619C11.9087 18.6154 11.9413 18.664 11.9824 18.7049C12.0235 18.7458 12.0723 18.7782 12.1259 18.8003C12.1795 18.8224 12.2369 18.8336 12.2949 18.8335C12.3529 18.8334 12.4103 18.8218 12.4638 18.7995C12.5173 18.7772 12.5659 18.7446 12.6068 18.7035C12.6477 18.6624 12.6801 18.6137 12.7022 18.56C12.7242 18.5064 12.7355 18.449 12.7354 18.391L12.7304 15.452C12.7304 15.197 12.4524 15.133 12.3994 15.123C11.8884 15.121 10.8514 15.117 9.7384 15.117C7.2814 15.117 6.7324 15.218 6.3154 14.945C5.4114 14.354 3.9324 10.368 3.8984 8.12602C3.8494 4.96402 5.7234 2.22502 8.3624 0.868016C9.49859 0.29488 10.7538 -0.0024873 12.0264 1.56706e-05C16.2034 1.56706e-05 19.6434 3.15302 20.1014 7.20902L20.1024 7.22002C20.1864 8.20102 14.7814 8.40901 13.7124 8.12401C13.5484 8.08001 13.5064 7.91202 13.5064 7.84002L13.5004 4.99602C13.5001 4.87879 13.4533 4.76647 13.3702 4.68377C13.2872 4.60106 13.1746 4.55475 13.0574 4.55502C12.9402 4.55528 12.8279 4.6021 12.7452 4.68518C12.6624 4.76826 12.6161 4.88079 12.6164 4.99802L12.6254 8.86402C12.6264 8.94007 12.6535 9.01346 12.7024 9.07177C12.7512 9.13008 12.8187 9.16973 12.8934 9.18402L16.2474 9.18301C18.0374 9.18301 18.7894 9.39002 19.2894 9.77102C19.6224 10.025 19.7504 10.51 19.6384 11.141C18.6334 16.755 12.2734 23.71 12.0344 24Z" fill="#FC8019"/></svg>
                      {/* Google Logo */}
                      <svg width="26" height="26" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                      {/* Tata Logo */}
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.774 11.5684C9.967 10.2464 9.942 9.55537 8.006 9.66237C5.783 9.78637 3.53 9.92737 0.157 10.6894C0.0531516 11.1187 0.000452066 11.5587 0 12.0004C0 13.5204 0.618 14.9904 1.787 16.2544C2.847 17.3984 4.343 18.3494 6.113 19.0064C6.77028 19.2476 7.44316 19.4441 8.127 19.5944C8.257 19.0674 9.086 15.6874 9.743 11.7714L9.773 11.5694M23.843 10.6894C20.471 9.92737 18.219 9.78737 15.997 9.66337C14.06 9.55637 14.035 10.2474 14.229 11.5694L14.275 11.8674C14.925 15.7154 15.733 19.0274 15.873 19.5874C20.595 18.5084 24 15.5164 24 12.0004C23.9993 11.557 23.947 11.12 23.843 10.6894ZM23.352 9.36537C23.0483 8.77613 22.6647 8.23166 22.212 7.74738C21.152 6.60338 19.657 5.65237 17.887 4.99537C16.103 4.33337 14.067 3.98438 12 3.98438C9.932 3.98438 7.897 4.33437 6.113 4.99437C4.343 5.65237 2.847 6.60438 1.787 7.74738C1.3346 8.23203 0.951316 8.77684 0.648 9.36637C2.952 8.80937 6.893 8.07338 10.552 7.99638C10.905 7.98838 11.148 8.10138 11.308 8.30338C11.504 8.55138 11.488 9.43137 11.483 9.82537L11.379 20.0054C11.7936 20.019 12.2084 20.019 12.623 20.0054L12.519 9.82537C12.514 9.43137 12.499 8.55138 12.694 8.30338C12.854 8.10138 13.097 7.98837 13.45 7.99537C17.108 8.07337 21.047 8.80837 23.352 9.36537Z" fill="#486AAE"/></svg>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://hirance.com/jobs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#0a1128] dark:bg-blue-900 py-3.5 text-[15px] font-semibold text-white hover:bg-black dark:hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Apply Now
                </a>
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
