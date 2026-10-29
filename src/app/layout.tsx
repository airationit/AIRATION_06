import type { Metadata, Viewport } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import { Providers } from "@/providers";
import { Navbar, GradientBackground, LaunchWrapper } from "@/components/shared";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/images/icon.png", sizes: "958x888", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "any" },
    ],
    shortcut: "/images/icon.png",
    apple: [
      { url: "/images/icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/images/icon.png",
      },
      {
        rel: "android-chrome-192x192",
        url: "/images/icon.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/images/icon.png",
      },
    ],
  },
  manifest: "/favicons/site.webmanifest",
  verification: {
    google: "HP5f-A9xsE3BbEcZivBbpi8Y216lFE5NdibG1AOnPF8",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    title: "Hirance | Swipe. Match. Get Hired.",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Hirance ",
        type: "image/png",
      },
      {
        url: "/hirance-social.png",
        width: 1200,
        height: 630,
        alt: "Hirance | Swipe. Match. Get Hired.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hirance | Swipe. Match. Get Hired.",
    description: siteConfig.description,
    images: ["/og.png"],
    creator: "@hiranceapp",
    site: "@hiranceapp",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F9F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F1A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="hirance-launch-check"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=localStorage.getItem("hirance_web_date");if(d){var t=Date.parse(d.trim().replace(" ","T"));if(t&&Date.now()>=t){document.documentElement.classList.add("hirance-launched");}}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-dvh overflow-x-clip antialiased"
        suppressHydrationWarning
      >
        <Providers>
            <GradientBackground />
            <Navbar />
            {children}
        </Providers>
      </body>
    </html>
  );
}
