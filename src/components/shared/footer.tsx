"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

/* ─── Social SVG Icons ─── */
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

/* ─── Social Links Data ─── */
const socialIcons = [
  { label: "LinkedIn", Icon: IconLinkedin, href: "https://linkedin.com/company/hirance" },
  { label: "Instagram", Icon: IconInstagram, href: "https://instagram.com/hirance" },
  { label: "X", Icon: IconTwitterX, href: "https://x.com/hirance" },
  { label: "Facebook", Icon: IconFacebook, href: "https://facebook.com/hirance" },
]

/* ─── Link Columns Data ─── */
const platformLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Download the App", href: "https://play.google.com/store/apps/details?id=com.hirance" },
  { label: "Browse Jobs", href: "#browse-jobs" },
]

const employerLinks = [
  { label: "Post a Job", href: "https://employer.hirance.com/" },
  { label: "Dashboard Login", href: "https://employer.hirance.com/" },
  { label: "Request a Demo", href: "/request-demo" },
]

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
]

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Grievance Redressal", href: "/grievance" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full overflow-hidden bg-[#0B1528] text-slate-200 antialiased selection:bg-blue-500/30 selection:text-white">
      {/* Ambient Radial Blue Glow */}
      <div 
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]"
        aria-hidden="true"
      />

      {/* Background Orbital Arcs (concentric rings from design) */}
      <div 
        className="pointer-events-none absolute -right-36 -top-36 h-[650px] w-[650px] rounded-full border border-blue-400/15 opacity-50 md:opacity-75"
        aria-hidden="true"
      >
        <div className="absolute inset-12 rounded-full border border-blue-400/15">
          <div className="absolute inset-12 rounded-full border border-blue-400/10">
            <div className="absolute inset-12 rounded-full border border-blue-500/10">
              <div className="absolute inset-12 rounded-full border border-blue-600/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Top blue glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12 lg:py-14">
        
        {/* ── TOP SECTION: Brand Info (Left) & 4 Columns (Right) ── */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Logo & Tagline (Left) */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo2.png"
                alt="Hirance"
                className="h-8 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>

            <p className="font-sans text-xs md:text-sm font-bold tracking-[0.15em] text-blue-400 uppercase">
              Swipe • Match • Get Hired
            </p>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400 md:text-sm">
              India&apos;s 1st swipe-based hiring platform, built for the IT sector.
            </p>
          </div>

          {/* Navigation Columns (Right Grid) */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:col-span-2 lg:col-span-8 lg:gap-6">
            
            {/* PLATFORM */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Platform
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300 md:text-sm">
                {platformLinks.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* EMPLOYERS */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Employers
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300 md:text-sm">
                {employerLinks.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-300 md:text-sm">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* GET IN TOUCH */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Get In Touch
              </h4>
              <div className="flex flex-col gap-3 text-xs md:text-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Email
                  </span>
                  <a
                    href="mailto:hello@hirance.com"
                    className="font-medium text-white transition-colors hover:text-blue-400"
                  >
                    hello@hirance.com
                  </a>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Phone
                  </span>
                  <a
                    href="tel:+919793780913"
                    className="font-medium text-white transition-colors hover:text-blue-400"
                  >
                    +91 9793780913
                  </a>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Office
                  </span>
                  <span className="font-medium text-slate-300 block leading-snug">
                    Janki Puram Extension
                    <br />
                    Lucknow-226021, India
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── MIDDLE SECTION: App Download Widget (Left) & Social Pill Box (Right) ── */}
        <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          
          {/* App Store & QR Download Widget (Bottom Left) */}
          <div className="flex items-center gap-3.5">
            {/* QR Code Container */}
            <div className="flex shrink-0 items-center justify-center border border-white/10 bg-white/5 p-1 shadow-inner overflow-hidden">
              <Image
                src="/images/qr.png"
                alt="Scan to download Hirance app"
                width={96}
                height={96}
                className="h-20 w-20 object-contain md:h-24 md:w-24"
              />
            </div>

            {/* Text + Side-by-side Download Buttons */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium tracking-wide text-slate-400">
                Scan to download the app
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.hirance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-1.5 text-left transition-all duration-200 hover:border-brand-500/50 hover:bg-white/[0.08]"
                  id="footer-google-play-btn"
                >
                  <svg className="h-4 w-4 fill-white transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-medium leading-none text-slate-400 uppercase">Get it on</span>
                    <span className="text-xs font-bold leading-tight text-white">Google Play</span>
                  </div>
                </a>

                {/* App Store */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 text-left opacity-75">
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.24 1.31-2.22 3.91.03 3.1 2.72 4.13 2.75 4.15l-.08.56zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-medium leading-none text-slate-400 uppercase">Coming to</span>
                    <span className="text-xs font-bold leading-tight text-white">App Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons Container (Bottom Right Card) */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-900/40 p-2.5 backdrop-blur-md">
            {socialIcons.map((social) => {
              const Icon = social.Icon;
              return (
                <motion.a
                  key={social.label}
                  id={`footer-social-${social.label.toLowerCase()}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-slate-300 transition-colors hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-400"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ── Middle Metric Highlight Bar ── */}
        <div className="my-6 border-y border-white/[0.08] py-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm md:text-base font-medium">
            <span className="font-bold text-blue-400 text-sm sm:text-base md:text-lg">500+</span>
            <span className="text-slate-300">Employers</span>
            <span className="text-slate-600 font-light" aria-hidden="true">/</span>

            <span className="font-bold text-blue-400 text-sm sm:text-base md:text-lg">220+</span>
            <span className="text-slate-300">Categories</span>
            <span className="text-slate-600 font-light" aria-hidden="true">/</span>

            <span className="font-bold text-blue-400 text-sm sm:text-base md:text-lg">100+</span>
            <span className="text-slate-300">Cities across India</span>
          </div>
        </div>

        {/* ── Bottom Legal Bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <p>© {currentYear} Hirance. All rights reserved. Made in India</p>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5" aria-label="Legal footer navigation">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  )
}


