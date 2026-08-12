"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

/* ─── Brand SVG Icons (lucide-react doesn't ship brand logos) ─── */
function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconGithub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const FOOTER_LINKS = {
  product: {
    title: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "For Job Seekers", href: "#seekers" },
      { label: "For Employers", href: "#employers" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers"},
      { label: "Press Kit", href: "#press" },
      { label: "Blog", href: "#blog" },
      { label: "Partners", href: "#partners" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Community", href: "#community" },
      { label: "Status Page", href: "#status" },
      { label: "API Docs", href: "#api" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" },
      { label: "Disclaimer", href: "#disclaimer" },
    ],
  },
};

const SOCIAL_LINKS = [
  {
    id: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com/hirance",
    Icon: IconTwitterX,
    hoverClass:
      "hover:bg-sky-500/15 hover:border-sky-500/40 hover:text-sky-400",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/company/hirance",
    Icon: IconLinkedin,
    hoverClass:
      "hover:bg-blue-600/15 hover:border-blue-600/40 hover:text-blue-400",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/hirance",
    Icon: IconGithub,
    hoverClass:
      "hover:bg-gray-400/15 hover:border-gray-400/40 hover:text-gray-200",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/hirance",
    Icon: IconInstagram,
    hoverClass:
      "hover:bg-pink-500/15 hover:border-pink-500/40 hover:text-pink-400",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@hirance",
    Icon: IconYoutube,
    hoverClass:
      "hover:bg-red-500/15 hover:border-red-500/40 hover:text-red-400",
  },
];

const CONTACT_INFO = [
  {
    id: "email",
    icon: Mail,
    label: "hello@hirance.com",
    href: "mailto:hello@hirance.com",
  },
  {
    id: "phone",
    icon: Phone,
    label: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    id: "address",
    icon: MapPin,
    label: "Bengaluru, Karnataka, India",
    href: "#",
  },
];

const APP_STORES = [
  {
    id: "google-play",
    label: "Google Play",
    sublabel: "Get it on",
    href: "https://play.google.com/store/apps",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
      </svg>
    ),
  },
  {
    id: "app-store",
    label: "App Store",
    sublabel: "Download on the",
    href: "#app-store",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.24 1.31-2.22 3.91.03 3.1 2.72 4.13 2.75 4.15l-.08.56zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
];

const LEGAL_BOTTOM = [
  { label: "Terms", href: "#terms" },
  { label: "Privacy", href: "#privacy" },
  { label: "Cookies", href: "#cookies" },
  { label: "Sitemap", href: "#sitemap" },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function FooterLinkGroup({
  title,
  links,
  delay,
}: {
  title: string;
  links: { label: string; href: string; badge?: string }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="footer-heading">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="footer-link group">
              <ChevronRight
                className="footer-link-chevron"
                aria-hidden="true"
              />
              {link.label}
              {link.badge && (
                <span className="footer-badge">{link.badge}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Main Footer ─────────────────────────────────────────────────────────── */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      {/* Aurora glow blobs */}
      <div
        className="footer-glow footer-glow-left"
        aria-hidden="true"
      />
      <div
        className="footer-glow footer-glow-right"
        aria-hidden="true"
      />

      {/* Top CTA strip */}
      

      {/* ── Main content ────────────────────────────────── */}
      <div className="footer-content-wrapper">

        {/* Brand column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="footer-brand-col"
        >
          {/* Logo */}
          <a href="/" className="footer-logo" aria-label="Hirance home">
            <span className="footer-logo-icon" aria-hidden="true">H</span>
            <span className="footer-logo-wordmark">Hirance</span>
          </a>

          <p className="footer-tagline">
            The modern hiring platform connecting ambitious people with the
            companies building the future.
          </p>

          {/* Social links */}
          <div className="footer-social-row">
            {SOCIAL_LINKS.map((s) => {
              const SocialIcon = s.Icon;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-social-btn ${s.hoverClass}`}
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Link columns */}
        <div className="footer-links-grid">
          {Object.entries(FOOTER_LINKS).map(([key, group], i) => (
            <FooterLinkGroup
              key={key}
              title={group.title}
              links={group.links}
              delay={0.05 * (i + 1)}
            />
          ))}
        </div>

        {/* Contact column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="footer-contact-col"
        >
          <h3 className="footer-heading">Contact Us</h3>

          <ul className="mt-4 space-y-4">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <a href={item.href} className="footer-contact-item">
                    <span className="footer-contact-icon-wrap">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

        </motion.div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div className="footer-bottom-bar">
        <p className="footer-copy">
          © {currentYear}{" "}
          <a href="/" className="hover:text-brand-400 transition-colors">
            Hirance Technologies Pvt. Ltd.
          </a>{" "}
          All rights reserved.
        </p>

        <nav className="footer-legal-links" aria-label="Legal links">
          {LEGAL_BOTTOM.map((link, i) => (
            <span key={link.label} className="flex items-center gap-3">
              {i !== 0 && (
                <span className="h-3 w-px bg-border" aria-hidden="true" />
              )}
              <a href={link.href} className="footer-legal-link">
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        <p className="footer-made-with">
          Made with ❤️ in India
        </p>
      </div>
    </footer>
  );
}
