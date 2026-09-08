import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/shared";
import {
  FileText,
  Eye,
  Sparkles,
  Zap,
  Star,
  Award,
  Crown,
  FileCheck,
  BarChart,
  Layout,
  MailCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Career & Resume Growth Services | Hirance",
  description:
    "Accelerate your job search with Hirance's professional resume writing, recruiter spotlight display, priority applicant status, and free AI resume score tools.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Career & Resume Growth Services | Hirance",
    description:
      "Professional resume writing, recruiter visibility tools, and free AI resume builders designed to get you hired faster.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
  },
};

const serviceGroups = [
  {
    title: "Resume Writing & Design",
    description: "Tailored by industry experts and optimized for ATS keyword parsers.",
    items: [
      {
        icon: FileText,
        title: "Text Resume",
        description: "ATS-compliant professional resume crafted to land top-tier interview callbacks.",
        href: "/services/text-resume",
      },
      {
        icon: Eye,
        title: "Visual Resume",
        description: "Modern graphical resume designed for creative, design, and executive roles.",
        href: "/services/visual-resume",
      },
      {
        icon: Sparkles,
        title: "Resume Critique",
        description: "In-depth review and scoring report by senior HR recruiters.",
        href: "/services/resume-critique",
      },
    ],
  },
  {
    title: "Recruiter Spotlight & Job Match",
    description: "Get your profile highlighted to verified hiring managers actively sourcing talent.",
    items: [
      {
        icon: Zap,
        title: "Jobs4u Match",
        description: "AI-matched relevant vacancies pushed straight to your inbox and app feed.",
        href: "/services/jobs4u",
      },
      {
        icon: Star,
        title: "Priority Applicant",
        description: "Pin your application to the top of recruiter application dashboards.",
        href: "/services/priority-applicant",
      },
      {
        icon: Award,
        title: "Resume Display",
        description: "3x higher profile views from active corporate recruiters.",
        href: "/services/resume-display",
      },
      {
        icon: Crown,
        title: "Basic & Premium Plans",
        description: "Flexible monthly subscriptions for dedicated candidate success.",
        href: "/services/subscription-plans",
      },
    ],
  },
  {
    title: "Free Candidate Resources",
    description: "100% free self-service tools, templates, and resume checkers.",
    items: [
      {
        icon: FileCheck,
        title: "Resume Maker",
        description: "Free online resume builder with 1-click PDF download.",
        href: "/services/resume-maker",
      },
      {
        icon: BarChart,
        title: "Resume Quality Score",
        description: "Instant AI scanner evaluating readability, keywords, and impact.",
        href: "/services/resume-score",
      },
      {
        icon: Layout,
        title: "Resume Samples",
        description: "Proven resume templates across 50+ job roles and experience levels.",
        href: "/services/resume-samples",
      },
      {
        icon: MailCheck,
        title: "Job Letter Samples",
        description: "Winning cover letter examples ready to customize.",
        href: "/services/cover-letter-samples",
      },
    ],
  },
];

export default function ServicesHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hirance Career Growth Services",
    description: "Professional resume services, recruiter spotlight solutions, and candidate tools.",
    itemListElement: serviceGroups.flatMap((group) => group.items).map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      url: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-dvh bg-white dark:bg-background text-foreground pt-24 sm:pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50/80 dark:bg-brand-950/40 px-3.5 py-1 text-xs font-bold text-brand-700 dark:text-brand-300">
              <ShieldCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <span>Hirance Career Growth Services</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Accelerate Your Job Search &{" "}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Get Recruiter Attention
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Stand out to verified hiring managers with professional resume writing, recruiter spotlight visibility, and AI-powered job matching.
            </p>
          </div>

          {/* Groups */}
          <div className="space-y-12">
            {serviceGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {group.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item, iIdx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={iIdx}
                        href={item.href}
                        className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-xs transition-all hover:border-brand-500/40 hover:shadow-md"
                      >
                        <div className="space-y-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                          <span>Explore Service</span>
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Banner */}
          <div className="rounded-2xl border border-brand-500/20 bg-brand-50/50 dark:bg-brand-950/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground">Need Guidance Selecting a Service?</h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Our candidate success team is available 6 days a week to assist you in boosting your profile response rate.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
            >
              Talk to Career Advisor
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
