import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  Hero,
  TrustedBy,
  AppDownload,
  WantToHire,
  BrandStatement,
  SwipePlayground,
} from "@/components/sections";
import {
  Footer,
  FloatingAppBanner,
} from "@/components/shared";
import { fetchCompanies, fetchJobs } from "@/lib/api";

export const metadata: Metadata = {
  title: "Hirance — Next-Gen Swipe-Based Hiring Platform | Swipe. Match. Get Hired.",
  description:
    "Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting. AI-calculated match scores for candidates and 60-second job postings for employers.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Hirance — Swipe. Match. Get Hired." }],
    title: siteConfig.socialTitle,
    description: siteConfig.socialDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.socialTitle,
    description: siteConfig.socialDescription,
    images: [{ url: siteConfig.ogImage, alt: "Hirance — Swipe. Match. Get Hired." }],
  },
  alternates: { canonical: siteConfig.url },
};

export default async function Home() {
  const [companiesRes, jobsRes] = await Promise.all([
    fetchCompanies({ search: "", page_size: 100 }),
    fetchJobs({ page_size: 10 }),
  ]);

  const liveJobs = jobsRes?.data && Array.isArray(jobsRes.data) && jobsRes.data.length > 0
    ? jobsRes.data
    : undefined;

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip">
      {/* Hero section */}
      <Hero initialJobs={liveJobs} />

      {/* Main content sections scrolling normally */}
      <TrustedBy initialCompanies={companiesRes?.data} />
      <AppDownload initialJobs={liveJobs} />
      <SwipePlayground initialJobs={liveJobs ? liveJobs.slice(0, 5) : undefined} />
      <WantToHire />
      <BrandStatement />
      <Footer />

      {/* Fixed app download banner */}
      <FloatingAppBanner />
    </main>
  );
}
