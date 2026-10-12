import type { Metadata } from "next";
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
  InteractiveDots,
  FloatingAppBanner,
} from "@/components/shared";
import { fetchCompanies } from "@/lib/api";

export const metadata: Metadata = {
  title: "Hirance — Next-Gen Swipe-Based Hiring Platform | Swipe. Match. Get Hired.",
  description:
    "Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting. AI-calculated match scores for candidates and 60-second job postings for employers.",
  openGraph: {
    title: "Hirance — Next-Gen Swipe-Based Hiring Platform",
    description:
      "Swipe. Match. Get Hired. Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting.",
  },
};

export default async function Home() {
  const companiesRes = await fetchCompanies({ search: "", page_size: 100 });

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip">
      {/* Unified interactive dot canvas spanning all home page sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero section */}
      <Hero />

      {/* Main content sections scrolling normally */}
      <TrustedBy initialCompanies={companiesRes?.data} />
      <AppDownload />
      <SwipePlayground />
      <WantToHire />
      <BrandStatement />
      <Footer />

      {/* Fixed app download banner */}
      <FloatingAppBanner />
    </main>
  );
}
