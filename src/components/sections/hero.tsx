"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GooglePlayButton, InteractiveDots, Magnetic } from "@/components/shared";

const headlineWords = ["Where", "ambition", "finds", "its", "match."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pointer-driven 3D tilt + spotlight for the video card.
  const rotX = useSpring(useMotionValue(0), {
    stiffness: 150,
    damping: 18,
  });
  const rotY = useSpring(useMotionValue(0), {
    stiffness: 150,
    damping: 18,
  });
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOpacity = useSpring(useMotionValue(0), {
    stiffness: 120,
    damping: 20,
  });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.22), transparent 60%)`;

  const handleCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotY.set((px - 0.5) * 9);
    rotX.set(-(py - 0.5) * 9);
    spotX.set(px * 100);
    spotY.set(py * 100);
    spotOpacity.set(1);
  };

  const handleCardLeave = () => {
    rotX.set(0);
    rotY.set(0);
    spotOpacity.set(0);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const wrap = videoWrapRef.current;
      if (!wrap) return;

      // Pop / bounce the video into view as it's scrolled to.
      gsap.fromTo(
        wrap,
        { scale: 0.78, yPercent: 14, opacity: 0, filter: "blur(6px)" },
        {
          scale: 1,
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "elastic.out(1, 0.65)",
          duration: 1.6,
          scrollTrigger: {
            trigger: wrap,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Play only while visible to save resources.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-brand-400/30 blur-[130px]" />
        <div className="animate-aurora absolute right-[-15%] top-[6%] h-[38rem] w-[38rem] rounded-full bg-violet-400/25 blur-[130px] [animation-delay:-6s]" />
      </div>
      {/* Subtle dot grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      {/* Reactive dot field — lights up and ripples around the pointer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-background to-transparent" />

      {/* Hero copy */}
      <div className="mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-500/15 bg-brand-500/5 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 sm:text-sm"
        >
          <Sparkles className="h-4 w-4 text-brand-500" />
          The modern hiring platform — for talent &amp; teams
        </motion.div>

        <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.75rem]">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                i >= 3
                  ? "text-gradient mr-[0.25em] inline-block"
                  : "mr-[0.25em] inline-block"
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg font-medium text-muted-foreground/90 sm:text-xl"
        >
          {siteConfig.name} connects exceptional people with the companies
          shaping tomorrow. Smarter matches, faster hires, and zero noise — all
          in one beautifully simple place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href={siteConfig.links.employer}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-700 shadow-md shadow-brand-600/15"
          >
            Start hiring today
            <ArrowRight className="h-4 w-4" />
          </Link>
          <GooglePlayButton animate={false} />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground/70"
        >
          <MousePointerClick className="h-4 w-4 text-brand-500/80" />
          Scroll to explore
        </motion.div>
      </div>

      {/* Full-screen video that pops / bounces into view on scroll */}
      <div className="px-3 pb-24 sm:px-6">
        {/* Outer wrapper is the GSAP target (scale / bounce); inner handles tilt */}
        <div
          ref={videoWrapRef}
          className="mx-auto w-full max-w-[110rem] will-change-transform"
          style={{ perspective: 1200 }}
        >
          <motion.div
            onPointerMove={handleCardMove}
            onPointerLeave={handleCardLeave}
            style={{
              rotateX: rotX,
              rotateY: rotY,
              transformStyle: "preserve-3d",
            }}
            className="glow-hover relative aspect-video w-full overflow-hidden rounded-3xl border border-border shadow-[0_50px_120px_-40px_rgba(37,99,235,0.4)]"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/videos/hero_video.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${siteConfig.name} product showcase`}
            />
            {/* Cinematic overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            {/* Cursor-following spotlight */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight, opacity: spotOpacity }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-6 text-left sm:p-10">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
                Built for momentum
              </span>
              <p className="max-w-xl text-pretty text-lg font-medium text-white sm:text-2xl">
                One platform. Every hire. From first hello to signed offer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
