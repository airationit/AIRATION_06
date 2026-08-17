import { Hero, TrustedBy, AppDownload, WantToHire, Presentation } from "@/components/sections";
import {
  Footer,
  InteractiveDots,
} from "@/components/shared";

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
      <WantToHire />
      <Presentation />
      <Footer />
    </main>
  );
}




