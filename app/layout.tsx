import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handi House — Slow-cooked, sealed, served at the table",
  description: "A scroll-driven restaurant experience built with Next.js, GSAP and Lenis.",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Caprasimo&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
