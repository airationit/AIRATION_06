"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GooglePlayButton } from "@/components/shared";

const headlineWords = ["Where", "ambition", "finds", "its", "match."];

export function HeroVideoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  // Video 1 controls state
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isMuted1, setIsMuted1] = useState(true);

  // Video 2 controls state
  const [isPlaying2, setIsPlaying2] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);

  // Progress bar state for active video
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  // Track scroll progress across the 2-slide carousel container (320vh height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  // Slide 2 transforms horizontally from -100% (left edge) to 0% (center)
  const slide2X = useTransform(springProgress, [0.20, 0.80], ["-100%", "0%"]);

  // Slide 1 transforms slightly to right for depth effect
  const slide1X = useTransform(springProgress, [0.20, 0.80], ["0%", "30%"]);
  const slide1Opacity = useTransform(springProgress, [0.40, 0.80], [1, 0.3]);

  // Update active slide index based on scroll
  useMotionValueEvent(springProgress, "change", (latest) => {
    if (latest >= 0.5 && activeSlide !== 1) {
      setActiveSlide(1);
    } else if (latest < 0.5 && activeSlide !== 0) {
      setActiveSlide(0);
    }
  });

  // Manage video 1 auto play/pause
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

  // Manage video 2 auto play/pause
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

  const toggleMute1 = () => {
    const v = video1Ref.current;
    if (!v) return;
    v.muted = !isMuted1;
    setIsMuted1(!isMuted1);
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

  const toggleMute2 = () => {
    const v = video2Ref.current;
    if (!v) return;
    v.muted = !isMuted2;
    setIsMuted2(!isMuted2);
  };

  return (
    <section ref={containerRef} className="relative w-full h-[320vh]">
      {/* Sticky Full-Screen Viewport (100vh) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-slate-950 text-white">
        
        {/* SLIDE 1 (Video 1 Showcase - hero_video.mp4) */}
        <motion.div
          style={{ x: slide1X, opacity: slide1Opacity }}
          className="absolute inset-0 z-10 w-full h-full flex flex-col justify-between overflow-hidden"
        >
          {/* Slide 1 Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={video1Ref}
              src="/videos/hero_video.mp4"
              className="h-full w-full object-cover object-center opacity-90 scale-[1.02]"
              autoPlay
              muted={isMuted1}
              loop
              playsInline
              onTimeUpdate={() => {
                const v = video1Ref.current;
                if (v && v.duration) setProgress1((v.currentTime / v.duration) * 100);
              }}
              aria-label="Hirance platform showcase video 1"
            />
            {/* Dark Gradients for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/70" />
          </div>

          {/* Slide 1 Header Bar */}
          <div className="relative z-20 w-full flex items-center justify-end p-6 sm:p-8 pt-20 sm:pt-24">

            {/* Video 1 Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute1}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                aria-label={isMuted1 ? "Unmute video 1" : "Mute video 1"}
              >
                {isMuted1 ? (
                  <VolumeX className="h-4 w-4 text-slate-300" />
                ) : (
                  <Volume2 className="h-4 w-4 text-brand-400 animate-pulse" />
                )}
              </button>
              <button
                onClick={togglePlay1}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                aria-label={isPlaying1 ? "Pause video 1" : "Play video 1"}
              >
                {isPlaying1 ? (
                  <Pause className="h-4 w-4 text-white" />
                ) : (
                  <Play className="h-4 w-4 text-brand-400 fill-brand-400 ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Slide 1 Center Text & Messaging */}
          <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center px-6 my-auto">
            <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              {headlineWords.map((word, i) => (
                <span
                  key={word}
                  className={
                    i >= 3
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300 mr-[0.22em] inline-block"
                      : "mr-[0.22em] inline-block text-white"
                  }
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-sm text-slate-300 sm:text-lg">
              Smarter matches, faster hires, and zero noise — connecting exceptional people with the companies shaping tomorrow.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={siteConfig.links.employer}
                className="group inline-flex h-12 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-[0_0_24px_rgba(37,99,235,0.5)]"
              >
                Start hiring today
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <GooglePlayButton animate={!reducedMotion} />
            </div>
          </div>

          {/* Slide 1 Bottom Bar Progress */}
          <div className="relative z-20 w-full p-6 sm:p-8 flex flex-col gap-3">
            <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-md">
              <div
                className="h-full bg-gradient-to-r from-brand-400 to-sky-400 transition-all duration-200 ease-out rounded-full"
                style={{ width: `${progress1}%` }}
              />
            </div>
          </div>
        </motion.div>


        {/* SLIDE 2 (Video 2 Showcase - hero_video2.mp4, Slides in from Left) */}
        <motion.div
          style={{ x: slide2X }}
          className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between overflow-hidden bg-slate-950 shadow-2xl border-r border-white/10"
        >
          {/* Slide 2 Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={video2Ref}
              src="/videos/hero_video2.mp4"
              className="h-full w-full object-cover object-center opacity-95 scale-[1.01]"
              autoPlay
              muted={isMuted2}
              loop
              playsInline
              onTimeUpdate={() => {
                const v = video2Ref.current;
                if (v && v.duration) setProgress2((v.currentTime / v.duration) * 100);
              }}
              aria-label="Next generation hiring intelligence video showcase 2"
            />
            {/* Minimal Subtle Gradients for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60" />
          </div>

          {/* Slide 2 Header Bar */}
          <div className="relative z-20 w-full flex items-center justify-end p-6 sm:p-8 pt-20 sm:pt-24">

            {/* Video 2 Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute2}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                aria-label={isMuted2 ? "Unmute video 2" : "Mute video 2"}
              >
                {isMuted2 ? (
                  <VolumeX className="h-4 w-4 text-slate-300" />
                ) : (
                  <Volume2 className="h-4 w-4 text-brand-400 animate-pulse" />
                )}
              </button>
              <button
                onClick={togglePlay2}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 shadow-lg"
                aria-label={isPlaying2 ? "Pause video 2" : "Play video 2"}
              >
                {isPlaying2 ? (
                  <Pause className="h-4 w-4 text-white" />
                ) : (
                  <Play className="h-4 w-4 text-brand-400 fill-brand-400 ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Slide 2 Bottom Minimal Overlay */}
          <div className="relative z-20 w-full p-6 sm:p-10 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
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
            </div>

            {/* Video 2 Timeline Progress Bar */}
            <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-md">
              <div
                className="h-full bg-gradient-to-r from-brand-400 to-sky-400 transition-all duration-200 ease-out rounded-full"
                style={{ width: `${progress2}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Floating Carousel Navigation Pill (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-white/20 bg-slate-900/80 px-4 py-2 backdrop-blur-xl shadow-2xl">
          <span className="text-[11px] font-extrabold tracking-wider text-slate-300">
            VIDEO SHOWCASE
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === 0
                  ? "w-6 bg-brand-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  : "w-2 bg-white/30"
              }`}
            />
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === 1
                  ? "w-6 bg-brand-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  : "w-2 bg-white/30"
              }`}
            />
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            0{activeSlide + 1} / 02
          </span>
        </div>

      </div>
    </section>
  );
}
