import { Hero, Partners, Presentation } from "@/components/sections";
import { InteractiveDots } from "@/components/shared";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* Unified interactive dot canvas spanning all home page sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>
      <Hero />
      <Partners />
      <Presentation />
    </main>
  );
}

