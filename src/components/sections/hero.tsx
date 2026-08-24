"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GooglePlayButton } from "@/components/shared";
import { JobPostDemo } from "./job-post-demo";
import { cn } from "@/lib/utils";

const headlineWords = ["Swipe.", "Match.", "Get", "Hired."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  // Video 1 controls state
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isMuted1, setIsMuted1] = useState(true);

  // Smooth scroll animations for Copy Text section (natural scale, elevation, fade & blur, 0% pinning jitter)
  const { scrollYProgress: copyScrollProgress } = useScroll({
    target: copyRef,
    offset: ["start start", "end start"],
  });

  const copyScale = useTransform(copyScrollProgress, [0, 0.8], [1, 0.88]);
  const copyOpacity = useTransform(copyScrollProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(copyScrollProgress, [0, 0.8], [0, -50]);
  const copyBlurNum = useTransform(copyScrollProgress, [0, 0.75], [0, 10]);
  const copyFilter = useTransform(copyBlurNum, (v) => `blur(${v}px)`);

  // Track scroll progress across the 2-video horizontal carousel section (320vh height for ultra-smooth scroll travel)
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start start", "end end"],
  });

  const springVideoProgress = useSpring(videoScrollProgress, {
    stiffness: 65,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  // Ultra-Smooth Continuous Horizontal Carousel Translation:
  // 0.00 -> 0.20: Video 1 pinned full screen for comfortable reading
  // 0.20 -> 0.80: Smooth, gradual continuous slide-over from Video 1 (-50%) to Slide 2 (0%)
  // 0.80 -> 1.00: Slide 2 pinned full screen before passing to next section
  const trackX = useTransform(
    springVideoProgress,
    [0.0, 0.20, 0.50, 0.80, 1.0],
    ["-50%", "-50%", "-25%", "0%", "0%"]
  );

  // Motion depth and blur effects for content inside Slide 1
  const slide1TextY = useTransform(springVideoProgress, [0.20, 0.50], [0, -30]);
  const slide1TextOpacity = useTransform(springVideoProgress, [0.20, 0.45], [1, 0]);
  const slide1BlurNum = useTransform(springVideoProgress, [0.20, 0.45], [0, 8]);
  const slide1TextFilter = useTransform(slide1BlurNum, (v) => `blur(${v}px)`);

  // Manage video 1 auto play/pause when active slide changes or component mounts
  useEffect(() => {
    const v1 = video1Ref.current;
    if (!v1) return;
    if (activeSlide === 0) {
      v1.play().catch(() => {});
      setIsPlaying1(true);
    } else {
      v1.pause();
      setIsPlaying1(false);
    }
  }, [activeSlide]);

  // Update active slide state based on scroll
  useMotionValueEvent(springVideoProgress, "change", (latest) => {
    if (latest >= 0.5 && activeSlide !== 1) {
      setActiveSlide(1);
    } else if (latest < 0.5 && activeSlide !== 0) {
      setActiveSlide(0);
    }
  });

  const toggleMute1 = () => {
    const v = video1Ref.current;
    if (!v) return;
    v.muted = !isMuted1;
    setIsMuted1(!isMuted1);
  };

  const togglePlay1 = () => {
    const v = video1Ref.current;
    if (!v) return;
    if (isPlaying1) {
      v.pause();
      setIsPlaying1(false);
    } else {
      v.play();
      setIsPlaying1(true);
    }
  };

  // Scroll smoothly to Video 1 or Video 2
  const scrollToSlide = (slideIndex: number) => {
    const container = videoSectionRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalHeight = container.offsetHeight - window.innerHeight;

    const targetFraction = slideIndex === 0 ? 0.1 : 0.9;
    const targetScroll = containerTop + targetFraction * totalHeight;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[18%] h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-[42%] h-[24rem] w-[28rem] rounded-full bg-sky-300/12 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* HERO COPY TEXT SECTION (Natural smooth Framer Motion scaling, elevation, fade & blur) */}
      <div
        className={cn(
          "relative z-0 flex items-center justify-center px-6 py-16 sm:py-24",
          reducedMotion ? "min-h-auto" : "min-h-[85dvh]"
        )}
      >
        <motion.div
          ref={copyRef}
          style={
            reducedMotion
              ? {}
              : {
                  scale: copyScale,
                  opacity: copyOpacity,
                  y: copyY,
                  filter: copyFilter,
                }
          }
          className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center will-change-transform"
        >
          {/* Clean Kicker (No chip pill, pure crisp typography) */}
          <motion.p
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 16, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              delay: reducedMotion ? 0 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400"
          >
            India&apos;s 1st Swipe-Based Hiring Platform
          </motion.p>

          {/* Headline Words with 3D perspective entrance */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.75rem] [perspective:1000px]">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 40, rotateX: -25, filter: "blur(10px)" }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: reducedMotion ? 0 : 0.12 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  i >= 2
                    ? "text-gradient mr-[0.22em] inline-block bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600 dark:from-brand-400 dark:via-sky-400 dark:to-indigo-300 bg-clip-text text-transparent"
                    : "mr-[0.22em] inline-block"
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Key Differentiator Subheading */}
          <motion.p
            initial={
              reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.48,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg sm:text-xl font-semibold text-foreground/90 leading-snug"
          >
            Fastest way to Post &amp; Apply for jobs—
            <span className="text-brand-600 dark:text-brand-400 font-bold">
              No forms, No scrolling, No waiting.
            </span>
          </motion.p>

          {/* Crisp, Humanized Platform Description */}
          {/* <motion.p
            initial={
              reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.62,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-2xl text-pretty text-sm sm:text-base text-muted-foreground leading-relaxed font-normal"
          >
            Hirance is India&apos;s first swipe-based hiring platform, built to solve the
            biggest problem in job hunting and recruitment—speed. No more long forms,
            resume uploads, or endless job scrolling. Candidates swipe right to apply and
            left to skip, based on an AI-calculated match score for every job. Employers
            post jobs in under a minute and get only relevant, pre-filtered candidates.
            Smarter hiring starts here.
          </motion.p> */}

          {/* Action Buttons Row */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: reducedMotion ? 0 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 sm:mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href={siteConfig.links.employer}
              className="group inline-flex h-12 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_0_24px_rgba(37,99,235,0.4)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Start hiring today"
              tabIndex={0}
            >
              Start hiring today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <GooglePlayButton animate={!reducedMotion} />
          </motion.div>
        </motion.div>
      </div>

      {/* FULL-SCREEN HORIZONTAL VIDEO CAROUSEL SECTION (Side-by-Side Track: Slide 1 moves left, Slide 2 takes its place) */}
      <div
        ref={videoSectionRef}
        className={cn(
          "relative w-full",
          reducedMotion ? "min-h-screen" : "h-[320vh]"
        )}
      >
        {/* Pinned Sticky Viewport (100vh x 100vw) */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent text-white">
          
          {/* Horizontal Track (200% width containing Video 1 & Video 2 side by side) */}
          <motion.div
            style={{ x: trackX }}
            className="flex flex-row w-[200%] h-full"
          >
            
            {/* SLIDE 2: Job Post Demo Simulation (Positioned on Left, enters from Left on scroll) */}
            <div className="relative w-1/2 h-full flex-shrink-0 p-2 sm:p-3 md:p-3.5 pt-16 sm:pt-20 pb-3">
              <JobPostDemo className="w-full h-full" />
            </div>

            {/* SLIDE 1: Video 1 (Positioned on Right, shown initially at scroll top) */}
            <div className="relative w-1/2 h-full flex-shrink-0 p-2 sm:p-3 md:p-3.5 pt-16 sm:pt-20 pb-3">
              <div className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-black/30 backdrop-blur-sm shadow-2xl">
                <video
                  ref={video1Ref}
                  src="/videos/hero_video.mp4"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-100 scale-[1.01]"
                  autoPlay
                  muted={isMuted1}
                  loop
                  playsInline
                  aria-label="Hirance platform showcase video 1"
                />
                {/* Subtle bottom shadow gradient for text contrast */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Slide 1 Header Bar */}
                <div className="relative z-20 w-full flex items-center justify-end p-6 sm:p-10 pt-12 sm:pt-16">

                  {/* Video 1 Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMute1}
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                      aria-label={isMuted1 ? "Unmute video 1" : "Mute video 1"}
                    >
                      {isMuted1 ? <VolumeX className="h-4 w-4 text-slate-300" /> : <Volume2 className="h-4 w-4 text-brand-400 animate-pulse" />}
                    </button>
                    <button
                      onClick={togglePlay1}
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                      aria-label={isPlaying1 ? "Pause video 1" : "Play video 1"}
                    >
                      {isPlaying1 ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-brand-400 fill-brand-400 ml-0.5" />}
                    </button>
                  </div>
                </div>

                {/* Slide 1 Bottom Info */}
                <motion.div
                  style={
                    reducedMotion
                      ? {}
                      : {
                          opacity: slide1TextOpacity,
                          y: slide1TextY,
                          filter: slide1TextFilter,
                        }
                  }
                  className="relative z-20 w-full p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
                >
                  <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      Swipe. Match.{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300">
                        Get Hired.
                      </span>
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium max-w-md">
                      India&apos;s 1st swipe-based hiring platform. Instant AI match scoring with zero forms.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={siteConfig.links.employer}
                      className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 sm:px-7 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
