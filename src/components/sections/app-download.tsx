"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppDownload() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="download-app"
      className="relative w-full overflow-hidden py-6 sm:py-8 lg:py-10 flex items-center justify-center min-h-0"
      aria-labelledby="app-download-heading"
    >
      {/* Dynamic Ambient Mesh Glow Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500/15 via-indigo-500/10 to-sky-500/5 blur-[140px]" />
        <div className="absolute right-10 top-1/4 h-[22rem] w-[22rem] rounded-full bg-blue-600/10 blur-[100px]" />
        
        {/* Subtle geometric grid backdrop */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Modern Headline & Google Play Action */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
          >
            {/* High Impact Headline */}
            <h2
              id="app-download-heading"
              className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              Experience Hirance on{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                Your Smartphone
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Job in your pocket. Connect, chat, and get hired on the go.
            </p>

            {/* Google Play CTA Section */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.hirance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Hirance App on Google Play"
                className={cn(
                  "group relative overflow-hidden flex items-center gap-3.5 rounded-full bg-foreground px-5 py-3.5 text-background shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 border border-white/20 dark:border-white/10"
                )}
              >
                {/* Glossy Shimmer Light Reflection Effect */}
                <div 
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[300%]" 
                  aria-hidden="true"
                />

                {/* Official 3D Vector Google Play Icon */}
                <div className="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-7 w-7" viewBox="0 0 512 512" fill="none" aria-hidden="true">
                    <path
                      d="M47 24.6c-5.2 5.6-8.3 14.2-8.3 25.4v412c0 11.2 3.1 19.8 8.3 25.4l1.4 1.3 230.9-230.9v-5.4L48.4 23.4 47 24.6z"
                      fill="url(#gp-brand-a)"
                    />
                    <path
                      d="M356.4 343.9l-77-77v-5.4l77-77 1.7 1 91.2 51.8c26 14.8 26 39 0 53.8l-91.2 51.8-1.7 1z"
                      fill="url(#gp-brand-b)"
                    />
                    <path
                      d="M358.1 342.9l-78.7-78.7L47 497.3c8.6 9.1 22.7 10.2 38.7 1.1l272.4-155.5z"
                      fill="url(#gp-brand-c)"
                    />
                    <path
                      d="M358.1 185.5L85.7 30C69.7 20.9 55.6 22 47 31.1l232.4 232.4 78.7-78z"
                      fill="url(#gp-brand-d)"
                    />
                    <defs>
                      <linearGradient id="gp-brand-a" x1="47" y1="256" x2="278" y2="256" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00D3FF" />
                        <stop offset="100%" stopColor="#009BFF" />
                      </linearGradient>
                      <linearGradient id="gp-brand-b" x1="279.4" y1="256" x2="480" y2="256" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00F076" />
                        <stop offset="100%" stopColor="#00D95A" />
                      </linearGradient>
                      <linearGradient id="gp-brand-c" x1="47" y1="264" x2="358" y2="500" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFD900" />
                        <stop offset="100%" stopColor="#FFAA00" />
                      </linearGradient>
                      <linearGradient id="gp-brand-d" x1="47" y1="24" x2="358" y2="264" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FF385C" />
                        <stop offset="100%" stopColor="#E0115F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-80">
                    GET IT ON
                  </span>
                  <span className="text-lg font-black leading-tight tracking-tight">
                    Google Play
                  </span>
                </div>

                <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-background/20">
                  <ArrowRight className="h-4 w-4 opacity-90" />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Sleek Direct Mockup Showcase */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            {/* Multi-layered Neon Ambient Aura behind phone */}
            <div
              className="pointer-events-none absolute h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-brand-500/35 via-blue-500/20 to-indigo-500/20 blur-[90px] sm:h-[450px] sm:w-[450px]"
              aria-hidden="true"
            />

            {/* Clean Direct Mockup PNG Display */}
            <div className="relative group max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mockup.png"
                alt="Hirance Mobile App Interface Showcase"
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.4)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

