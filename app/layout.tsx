import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


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
        url: "/hero_timber_home_1773443975023.png",
        width: 1200,
        height: 630,
        alt: "Hansen Timber Architectural Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hansen Timber | Custom Timber Products",
    description: "Precision in wood crafting with NZ grown timber.",
    images: ["/hero_timber_home_1773443975023.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-muted-oak/30`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
