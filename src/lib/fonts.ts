import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

export const fontSans = localFont({
  src: [
    {
      path: "../app/fonts/GoogleSansFlex-latin.woff2",
      style: "normal",
    },
    {
      path: "../app/fonts/GoogleSansFlex-latin-ext.woff2",
      style: "normal",
    },
  ],
  variable: "--font-google-sans-flex",
  display: "swap",
  weight: "100 900",
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
