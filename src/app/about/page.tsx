import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/shared"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hirance—the modern hiring platform connecting ambitious people with the companies building the future.",
}

const VALUES = [
  {
    title: "Clarity over noise",
    body: "Hiring should feel focused. We design every surface to reduce clutter and surface the signal that matters.",
  },
  {
    title: "Ambition, matched",
    body: "Great careers and great companies find each other faster when intent, skills, and culture actually align.",
  },
  {
    title: "Built for both sides",
    body: "Employers and job seekers share one platform—with workflows that respect time on both ends of the table.",
  },
] as const

export default function AboutPage() {
  return (
    <PageShell
      title="Hiring, reimagined."
      description={siteConfig.description}
    >
      <div className="space-y-16">
        <section className="max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Our story
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Hirance started from a simple frustration: hiring tools were
              either too loud or too shallow. Job boards flooded candidates
              with noise. Applicant systems slowed employers down. Neither
              side felt seen.
            </p>
            <p>
              We are building a modern hiring platform where ambitious people
              meet the companies shaping what comes next—with clearer
              discovery, faster matching, and a product experience that feels
              calm, human, and precise.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            What we stand for
          </h2>
          <ul className="mt-8 grid gap-10 sm:grid-cols-3">
            {VALUES.map((value) => (
              <li key={value.title}>
                <h3 className="text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border/60 pt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Based in India, building for the world
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Hirance Private Limited is headquartered in Bengaluru. We are
            shipping for employers and seekers who want hiring to feel as
            modern as the work they do.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Contact Hirance"
              tabIndex={0}
            >
              Get in touch
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Back to home"
              tabIndex={0}
            >
              Back to home
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
