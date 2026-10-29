import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery/gallery-content";

export const metadata: Metadata = {
  title: "Team & Culture Gallery | Hirance",
  description: "Explore life at Hirance — the passionate team of builders, engineers, and talent specialists creating India's next-generation hiring platform.",
  keywords: ["Hirance team", "Hirance gallery", "Hirance culture", "life at Hirance", "tech team India", "Hirance team photos"],
  alternates: { canonical: "https://hirance.com/gallery" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/gallery",
    title: "Team & Culture Gallery | Hirance",
    description: "Meet the passionate team behind Hirance — the builders shaping modern hiring in India.",
    siteName: "Hirance",
    images: [{ url: "https://cdn.hirance.com/library/1539226f-d31e-42c2-849a-5f53097cb00a.webp", width: 1200, height: 800, alt: "Hirance Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team & Culture Gallery | Hirance",
    description: "Meet the passionate builders and minds behind Hirance.",
  },
};

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Hirance Team & Culture Gallery",
    url: "https://hirance.com/gallery",
    description: "Photos and moments showcasing the passionate team and culture behind Hirance.",
    publisher: {
      "@type": "Organization",
      name: "Hirance",
      url: "https://hirance.com",
      logo: "https://hirance.com/images/logo.svg",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryContent />
    </>
  );
}
