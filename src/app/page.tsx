import { Hero, TrustedBy, Stats, Footer } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col">
      <Hero />
      <TrustedBy />
      <Stats />
      <Footer />
    </main>
  );
}

 