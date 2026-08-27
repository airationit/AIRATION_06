import type { Metadata } from "next";
import { Hero, TrustedBy, AppDownload, WantToHire, BrandStatement, SwipePlayground } from "@/components/sections";
import {
  Footer,
  InteractiveDots,
  FloatingAppBanner,
} from "@/components/shared";

export const metadata: Metadata = {
  title: "Hirance — India's 1st Swipe-Based Hiring Platform | Swipe. Match. Get Hired.",
  description:
    "Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting. AI-calculated match scores for candidates and 60-second job postings for employers.",
  openGraph: {
    title: "Hirance — India's 1st Swipe-Based Hiring Platform",
    description:
      "Swipe. Match. Get Hired. Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting.",
  },
};

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip">
      {/* Unified interactive dot canvas spanning all home page sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero section */}
      <Hero />

      {/* Main content sections scrolling normally */}
      <TrustedBy />
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




