"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  companies,
  hueFromName,
  initials,
  type Company,
} from "@/config/companies"
import { cn } from "@/lib/utils"

const CompanyDisc = ({
  company,
  index,
}: {
  company: Company
  index: number
}) => {
  const [failed, setFailed] = useState(false)
  const reducedMotion = useReducedMotion()
  const hue = hueFromName(company.name)

  const handleImageError = () => {
    setFailed(true)
  }

  return (
    <motion.figure
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{
        duration: 0.4,
        delay: reducedMotion ? 0 : (index % 8) * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-[4.75rem] sm:w-[5.5rem]"
    >
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${company.name} website`}
        tabIndex={0}
        className="group flex flex-col items-center gap-2.5 outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
      >
        <div
          className={cn(
            "relative flex h-[4.75rem] w-[4.75rem] items-center justify-center overflow-hidden rounded-full sm:h-[5.5rem] sm:w-[5.5rem]",
            "border border-border/50 bg-card",
            "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:-translate-y-0.5 group-hover:border-brand-500/30 group-hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.2)]"
          )}
        >
          <span
            className="absolute inset-[6px] rounded-full bg-white ring-1 ring-black/[0.04] dark:bg-white/95 dark:ring-white/10"
            aria-hidden="true"
          />

          {failed ? (
            <span
              aria-hidden
              className="relative z-10 grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm"
              style={{
                backgroundImage: `linear-gradient(135deg, hsl(${hue} 68% 50%), hsl(${
                  (hue + 36) % 360
                } 66% 40%))`,
              }}
            >
              {initials(company.name)}
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logoUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="relative z-10 h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9"
              onError={handleImageError}
            />
          )}
        </div>

        <figcaption className="line-clamp-2 max-w-full text-center text-[10px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground sm:text-[11px]">
          {company.name}
        </figcaption>
      </a>
    </motion.figure>
  )
}

export function TrustedBy() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden py-16 sm:py-24"
      aria-labelledby="trusted-by-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.04] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          <h2
            id="trusted-by-heading"
            className="text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl"
          >
            Trusted by{" "}
            <span className="text-gradient">100+ leading companies</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
            From fast-growing startups to established giants, we help build and
            scale high-performing teams.
          </p>
        </motion.div>

        <ul
          className="flex flex-wrap justify-center gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9"
          aria-label="Companies that trust Hirance"
        >
          {companies.map((company, index) => (
            <li key={company.name}>
              <CompanyDisc company={company} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
