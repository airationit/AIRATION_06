import { Hero, TrustedBy, AppDownload, WantToHire, Presentation } from "@/components/sections";
import {
  Footer,
  InteractiveDots,
  StackedPagesContainer,
} from "@/components/shared";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip">
      {/* Unified interactive dot canvas spanning all home page sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero section: Text section above + Video 1 & Video 2 scroll carousel below */}
      <Hero />

      {/* Pages after Hero: Stacked smoothly on scroll */}
      <StackedPagesContainer
        pageMeta={[
          { title: "Partners", badge: "01 · TRUSTED BY 100+ COMPANIES" },
          { title: "App Download", badge: "02 · DOWNLOAD OUR APP" },
          { title: "Want to Hire", badge: "03 · WANT TO HIRE ?" },
          { title: "Metrics", badge: "04 · POWERING SMARTER HIRING" },
        ]}
        pages={[
          <TrustedBy key="trusted-by" />,
          <AppDownload key="app-download" />,
          <WantToHire key="want-to-hire" />,
          <Presentation key="presentation" />,
        ]}
      />

      {/* Always at bottom — normal page footer */}
      <Footer />
    </main>
  );
}



