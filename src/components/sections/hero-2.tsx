"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

export function Hero2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto play/pause when in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Video time progress calculation
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950 text-white shadow-2xl">
      {/* Background Video (Full focus, clear visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero_video2.mp4"
          className="h-full w-full object-cover object-center transition-opacity duration-700 opacity-95 scale-[1.01]"
          muted={isMuted}
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          aria-label="Next generation hiring intelligence video showcase"
        />

        {/* Minimal Subtle Gradients for legibility without blocking the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60" />
      </div>

      {/* Top Header Bar: Controls on Right */}
      <div className="relative z-20 w-full flex items-center justify-end p-6 sm:p-8">

        {/* Minimal Video Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-lg"
            aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-300" />
            ) : (
              <Volume2 className="h-4 w-4 text-brand-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={togglePlay}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-lg"
            aria-label={isPlaying ? "Pause video" : "Play video"}
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-brand-400 fill-brand-400 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Minimal Overlay: Title & CTA */}
      <div className="relative z-20 w-full p-6 sm:p-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          {/* Minimal Bold Title */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-300">Talent Dynamics</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-medium max-w-md">
              Real-time video evaluation & skill matching at scale.
            </p>
          </motion.div>

          {/* Single Minimalist Action Button */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="shrink-0"
          >
            <Link
              href={siteConfig.links.employer}
              className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-sky-600 px-6 sm:px-7 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
            >
              Explore Platform
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Minimal Timeline Progress Bar */}
        <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-sky-400 transition-all duration-200 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
