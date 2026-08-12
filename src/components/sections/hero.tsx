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
import { cn } from "@/lib/utils";

const headlineWords = ["Where", "ambition", "finds", "its", "match."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  // Video 1 controls & progress state
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isMuted1, setIsMuted1] = useState(true);
  const [progress1, setProgress1] = useState(0);

  // Video 2 controls & progress state
  const [isPlaying2, setIsPlaying2] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
  const [progress2, setProgress2] = useState(0);

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
  // 0.20 -> 0.80: Smooth, gradual continuous slide-over from Video 1 (-50%) to Video 2 (0%)
  // 0.80 -> 1.00: Video 2 pinned full screen before passing to next section
  const trackX = useTransform(
    springVideoProgress,
    [0.0, 0.20, 0.50, 0.80, 1.0],
    ["-50%", "-50%", "-25%", "0%", "0%"]
  );

  // Motion depth and blur effects for content inside Slide 1 & Slide 2 text overlays
  const slide1TextY = useTransform(springVideoProgress, [0.20, 0.50], [0, -30]);
  const slide1TextOpacity = useTransform(springVideoProgress, [0.20, 0.45], [1, 0]);
  const slide1BlurNum = useTransform(springVideoProgress, [0.20, 0.45], [0, 8]);
  const slide1TextFilter = useTransform(slide1BlurNum, (v) => `blur(${v}px)`);

  const slide2TextY = useTransform(springVideoProgress, [0.50, 0.80], [40, 0]);
  const slide2TextOpacity = useTransform(springVideoProgress, [0.55, 0.80], [0, 1]);
  const slide2BlurNum = useTransform(springVideoProgress, [0.55, 0.80], [8, 0]);
  const slide2TextFilter = useTransform(slide2BlurNum, (v) => `blur(${v}px)`);

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

  // Manage video 2 auto play/pause when active slide changes
  useEffect(() => {
    const v2 = video2Ref.current;
    if (!v2) return;
    if (activeSlide === 1) {
      v2.play().catch(() => {});
      setIsPlaying2(true);
    } else {
      v2.pause();
      setIsPlaying2(false);
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

  // Track progress of Video 1
  const handleTimeUpdate1 = () => {
    const v = video1Ref.current;
    if (v && v.duration) {
      setProgress1((v.currentTime / v.duration) * 100);
    }
  };

  // Track progress of Video 2
  const handleTimeUpdate2 = () => {
    const v = video2Ref.current;
    if (v && v.duration) {
      setProgress2((v.currentTime / v.duration) * 100);
    }
  };

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

  const toggleMute2 = () => {
    const v = video2Ref.current;
    if (!v) return;
    v.muted = !isMuted2;
    setIsMuted2(!isMuted2);
  };

  const togglePlay2 = () => {
    const v = video2Ref.current;
    if (!v) return;
    if (isPlaying2) {
      v.pause();
      setIsPlaying2(false);
    } else {
      v.play();
      setIsPlaying2(true);
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
                  i >= 3
                    ? "text-gradient mr-[0.22em] inline-block bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-400 bg-clip-text text-transparent"
                    : "mr-[0.22em] inline-block"
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle with soft blur reveal */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.58,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed font-normal"
          >
            Smarter matches, faster hires, and zero noise — connecting exceptional
            people with the companies shaping tomorrow.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: reducedMotion ? 0 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
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
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-slate-950 text-white">
          
          {/* Horizontal Track (200vw width containing Video 1 & Video 2 side by side) */}
          <motion.div
            style={{ x: trackX }}
            className="flex flex-row w-[200vw] h-screen"
          >
            
            {/* SLIDE 2: Full-Screen Video 2 (Positioned on Left, enters from Left on scroll) */}
            <div className="relative w-[100vw] h-screen flex-shrink-0 flex flex-col justify-between overflow-hidden border-r border-white/10">
              <video
                ref={video2Ref}
                src="/videos/hero_video2.mp4"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-100 scale-[1.01]"
                autoPlay
                muted={isMuted2}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate2}
                aria-label="Next generation hiring intelligence video showcase 2"
              />
              {/* Subtle bottom shadow gradient for text contrast */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Slide 2 Header Bar */}
              <div className="relative z-20 w-full flex items-center justify-end p-6 sm:p-10 pt-12 sm:pt-16">

                {/* Video 2 Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute2}
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                    aria-label={isMuted2 ? "Unmute video 2" : "Mute video 2"}
                  >
                    {isMuted2 ? <VolumeX className="h-4 w-4 text-slate-300" /> : <Volume2 className="h-4 w-4 text-brand-400 animate-pulse" />}
                  </button>
                  <button
                    onClick={togglePlay2}
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                    aria-label={isPlaying2 ? "Pause video 2" : "Play video 2"}
                  >
                    {isPlaying2 ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-brand-400 fill-brand-400 ml-0.5" />}
                  </button>
                </div>
              </div>

              {/* Slide 2 Bottom Info (Motion entrance as Slide 2 takes place of Slide 1) */}
              <motion.div
                style={
                  reducedMotion
                    ? {}
                    : {
                        y: slide2TextY,
                        opacity: slide2TextOpacity,
                        filter: slide2TextFilter,
                      }
                }
                className="relative z-20 w-full p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
              >
                <div className="max-w-xl">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300">Talent Dynamics</span>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium max-w-md">
                    Real-time video evaluation & skill matching at scale.
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    href={siteConfig.links.employer}
                    className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-sky-600 px-6 sm:px-7 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
                  >
                    Explore Platform
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              {/* Slide 2 Progress Bar */}
              <div className="relative z-20 w-full px-6 sm:px-10 pb-4">
                <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-md">
                  <div
                    className="h-full bg-gradient-to-r from-brand-400 to-sky-400 transition-all duration-150 ease-out rounded-full"
                    style={{ width: `${progress2}%` }}
                  />
                </div>
              </div>
            </div>

            {/* SLIDE 1: Full-Screen Video 1 (Positioned on Right, shown initially at scroll top) */}
            <div className="relative w-[100vw] h-screen flex-shrink-0 flex flex-col justify-between overflow-hidden">
              <video
                ref={video1Ref}
                src="/videos/hero_video.mp4"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-100 scale-[1.01]"
                autoPlay
                muted={isMuted1}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate1}
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
                    Where Ambition <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300">Finds Its Match</span>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium max-w-md">
                    Smarter matching algorithm & high-performing team scaling.
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

              {/* Slide 1 Progress Bar */}
              <div className="relative z-20 w-full px-6 sm:px-10 pb-4">
                <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-md">
                  <div
                    className="h-full bg-gradient-to-r from-brand-400 to-sky-400 transition-all duration-150 ease-out rounded-full"
                    style={{ width: `${progress1}%` }}
                  />
                </div>
              </div>
            </div>

          </motion.div>

          {/* Floating Video Indicator Pill (Bottom Center - Interactive Clickable Dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-white/20 bg-slate-900/80 px-4 py-2 backdrop-blur-xl shadow-2xl">
            <span className="text-[11px] font-extrabold tracking-wider text-slate-300">
              VIDEO CAROUSEL
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSlide(0)}
                aria-label="Go to video slide 1"
                className="group p-1"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === 0
                      ? "w-7 bg-brand-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                      : "w-2.5 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
              <button
                onClick={() => scrollToSlide(1)}
                aria-label="Go to video slide 2"
                className="group p-1"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === 1
                      ? "w-7 bg-brand-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                      : "w-2.5 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              0{activeSlide + 1} / 02
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
