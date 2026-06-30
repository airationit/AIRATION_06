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
      <div className="mx-auto flex min-h-[7svh] max-w-5xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:pt-36">
       

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
