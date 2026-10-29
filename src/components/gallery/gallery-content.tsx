"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Video, ArrowUpRight, Camera } from "lucide-react";
import { Footer } from "@/components/shared";

// Replace with your official YouTube launch video ID (e.g. from youtube.com/watch?v=VIDEO_ID)

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "highlights", label: "Highlights" },
  { id: "keynote", label: "Keynote & Demo" },
  { id: "networking", label: "Networking" },
  { id: "team", label: "Team & Media" },
];

interface GalleryItem {
  id: number;
  category: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  date: string;
  aspectRatio: string;
  objectPosition?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 999,
    category: "team",
    src: "https://cdn.hirance.com/library/767fed1f-20e1-4df5-9d1f-56b10bc0a690.webp",
    alt: "Hirance Team",
    title: "Our Team",
    caption: "The passionate builders, engineers, and leaders behind Hirance.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[16/9]",
  },
  {
    id: 14,
    category: "keynote",
    src: "https://cdn.hirance.com/library/02a65975-4e14-4e72-8bb4-c365ea1a5264.webp",
    alt: "Leadership Keynote Address at Hirance Lucknow Launch",
    title: "Leadership Keynote",
    caption: "Unveiling our core vision for direct, instant recruitment.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 3,
    category: "networking",
    src: "https://cdn.hirance.com/library/3f137e9b-1f3f-4b46-9fda-cc98c56e7128.webp",
    alt: "Evening Mixer at Hirance Launch Lucknow",
    title: "Executive Mixer",
    caption: "Informal networking between company leadership and guests.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 21,
    category: "team",
    src: "https://cdn.hirance.com/library/8a083c11-1ce8-48c4-9c89-c6dbcfdf7a4b.webp",
    alt: "Hirance Leadership Presenting Platform Showcase Lucknow",
    title: "Platform Showcase",
    caption: "Highlighting instant candidate matching and direct employer chat features.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 7,
    category: "highlights",
    src: "https://cdn.hirance.com/library/50e272ef-3d70-42a5-990c-528d484556d7.webp",
    alt: "Hirance Official Launch Event in Lucknow",
    title: "Grand Lucknow Launch",
    caption: "Industry leaders gather in Lucknow for the official reveal of Hirance.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 18,
    category: "keynote",
    src: "https://cdn.hirance.com/library/a1702955-8e61-413a-9cd4-ecfc9d5d0687.webp",
    alt: "Tech Recruitment Strategy Discussion Lucknow",
    title: "Recruitment Strategy Talk",
    caption: "Key takeaways on streamlining enterprise hiring pipelines.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 2,
    category: "team",
    src: "https://cdn.hirance.com/library/41ec5cc0-046f-409d-98a9-aa884e8d5658.webp",
    alt: "Behind the Scenes Lucknow Launch Event Prep",
    title: "Behind the Scenes",
    caption: "Our core event team ensuring a seamless launch experience.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 11,
    category: "networking",
    src: "https://cdn.hirance.com/library/b33aaaf7-4b5c-4200-a5bb-ca50b04958a3.webp",
    alt: "Collaborative Hiring Discussions Lucknow",
    title: "Hiring Strategy Session",
    caption: "Exchanging hiring solutions for rapid tech scale-ups.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 19,
    category: "highlights",
    src: "https://cdn.hirance.com/library/939c926f-45bf-4ee8-bafc-3c42b2583873.webp",
    alt: "Innovation Showcase at Lucknow Event",
    title: "Innovation Showcase",
    caption: "Demonstrating friction-free hiring workflows to attendees.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 5,
    category: "team",
    src: "https://cdn.hirance.com/library/e9140143-6501-4a1f-b610-0c5d1e823d9a.webp",
    alt: "Press and Media Session in Lucknow",
    title: "Media Interaction",
    caption: "Addressing leading tech journalists at the Lucknow launch.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 22,
    category: "networking",
    src: "https://cdn.hirance.com/library/b571bb34-2346-47db-819e-bebdf8d317b1.webp",
    alt: "Recruiters and Founders Networking in Lucknow",
    title: "Executive Networking",
    caption: "Connecting with HR directors and industry leaders.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 1,
    category: "highlights",
    src: "https://cdn.hirance.com/library/7b81f7d8-942d-4509-854d-f7deda758279.webp",
    alt: "Lucknow Tech Community at Hirance Launch",
    title: "Community Growth",
    caption: "Engaging regional tech talent and recruiters under one roof.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 16,
    category: "keynote",
    src: "https://cdn.hirance.com/library/3c044775-c345-4bae-80d2-fd149587d661.webp",
    alt: "Live Swipe to Hire Demo on Stage",
    title: "Live Platform Demo",
    caption: "Demonstrating real-time candidate matching live on stage.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 9,
    category: "team",
    src: "https://cdn.hirance.com/library/9e5ed7dc-db75-4a76-b27d-e3c3451b66f2.webp",
    alt: "Hirance Product Specialists Interacting in Lucknow",
    title: "Product Advisory",
    caption: "Guiding enterprise clients on optimizing hiring workflows.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 13,
    category: "team",
    src: "https://cdn.hirance.com/library/e16d9100-94b1-4abb-bf92-d7be2f98a4c6.webp",
    alt: "Hirance Leadership with Team and Attendees at Lucknow Event",
    title: "Leadership Meet",
    caption: "Connecting directly with team members and event guests.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 4,
    category: "highlights",
    src: "https://cdn.hirance.com/library/129dd702-5a6d-4dd6-a845-191eefcb449d.webp",
    alt: "Keynote Highlights in Lucknow",
    title: "Future Vision Address",
    caption: "Outlining the technology roadmap for instant swipe hiring.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 20,
    category: "team",
    src: "https://cdn.hirance.com/library/b1abbb0e-1cb3-4700-9c39-e4256339aaf3.webp",
    alt: "Hirance Core Team at Lucknow Launch",
    title: "Core Team Celebration",
    caption: "Celebrating product launch milestones with engineering leads.",
    date: "Lucknow Event",
    aspectRatio: "aspect-[4/3]",
  },

];

export function GalleryContent() {
  const reducedMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const heroItem = GALLERY_ITEMS.find((i) => i.id === 999);
  const gridItems = GALLERY_ITEMS.filter((i) => i.id !== 999);
  const current = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  const renderItem = (item: GalleryItem, index: number, isHero = false) => {
    const originalIndex = GALLERY_ITEMS.findIndex((i) => i.id === item.id);
    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        className="group relative overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm transition-shadow duration-300 flex flex-col h-full"
      >
        <div
          onClick={() => openLightbox(originalIndex)}
          className={`relative w-full ${isHero ? 'aspect-[16/9]' : item.aspectRatio} overflow-hidden cursor-zoom-in bg-slate-100 dark:bg-slate-800`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            quality={85}
            className={`object-cover ${item.objectPosition || "object-top"} transition-opacity duration-300 hover:opacity-95`}
            sizes={isHero ? "100vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
          />
        </div>
        <div className="px-5 py-4 flex flex-col justify-start h-[104px] shrink-0 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <div className="w-5 h-[2px] bg-brand-600 dark:bg-brand-500 rounded-full my-1.5 shrink-0" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {item.caption}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="min-h-dvh bg-gradient-to-b from-white via-blue-50/70 to-slate-50/40 dark:from-[#060c18] dark:via-[#091124] dark:to-[#060c18] overflow-x-hidden text-slate-900 dark:text-slate-100">

      {/* ── HERO HEADER ─────────────────────────────────────────── */}


      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-4 sm:py-6 space-y-16">

        {/* ── PHOTO GALLERY SHOWCASE ─────────────────────────────── */}
        <section aria-label="Event photo showcase">

          <div className="mb-8 text-center flex flex-col items-center pt-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0f172a] dark:text-white tracking-tight">
              Meet the passionate team behind Hirance.
            </h1>
          </div>

          <div className="space-y-8">
            {/* Top Row: 1 Image */}
            <AnimatePresence mode="popLayout">
              {heroItem && (
                <div className="grid grid-cols-1 gap-6 sm:gap-7">
                  {renderItem(heroItem, 0, true)}
                </div>
              )}
            </AnimatePresence>

            {/* Middle Rows: 4 Images per row */}
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                {gridItems.map((item, index) => renderItem(item, index + 1))}
              </div>
            </AnimatePresence>
          </div>
        </section>

</div>

      {/* ── LIGHTBOX MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-8"
            onClick={closeLightbox}
          >
            {/* Close Button - Top Right */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Main Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex items-center justify-center w-full max-w-7xl h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Image and Content Container */}
              <div className="flex flex-col items-center w-full max-w-5xl">
                {/* Image Container */}
                <div className="relative w-full h-[70vh] mb-6">
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Content Below Image */}
                <div className="w-full max-w-4xl text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">{current.title}</h3>
                  <p className="text-base text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto">
                    {current.caption}
                  </p>

                  {/* Image Counter */}
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm text-white font-medium">
                      {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
