import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hansentimber.co.nz'),
  title: {
    default: "Hansen Timber | Custom Timber Products",
    template: "%s | Hansen Timber",
  },
  description: "Precision in wood crafting with NZ grown timber. Discover our range of premium flooring, decking, slabs, and architectural timber.",
  keywords: ["Timber", "New Zealand", "Macrocarpa", "Eucalyptus", "Hardwood Flooring", "Custom Timber", "Waitakere", "Architectural Slabs"],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://www.hansentimber.co.nz",
    siteName: "Hansen Timber",
    title: "Hansen Timber | Premium New Zealand Timber",
    description: "Discover our range of premium, sustainably sourced NZ timber products.",
    images: [
      {
        url: "/images/home/hero-high-res.png",
        width: 1200,
        height: 630,
        alt: "Hansen Timber Premium NZ Wood Crafting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hansen Timber | Custom Timber Products",
    description: "Precision in wood crafting with NZ grown timber.",
    images: ["/images/home/hero-high-res.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-muted-oak/30 flex flex-col min-h-screen`}
      >
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <SanityLive />
        <Analytics />
      </body>
    </html>
  );
}
