/**
 * @file layout.tsx (Root Layout)
 * @description The ultimate wrapper for the entire Next.js application. Configures global fonts,
 * baseline SEO metadata, and injects global providers (SanityLive, Vercel Analytics).
 * @dependencies next/font/google, @vercel/analytics, SanityLive, ClientLayoutWrapper
 * @route / (Root)
 * @state Server Component (Applies globally to all routes).
 */
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/next";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

/**
 * Global Metadata Configuration
 * 
 * This object tells Next.js how to generate the `<head>` tags (Title, Description, etc.) 
 * which are critical for SEO and social media sharing. 
 * `template: "%s | Hansen Timber"` means if a sub-page sets its title to "About", 
 * the browser tab will read "About | Hansen Timber".
 */
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

/**
 * Root Layout Component
 * 
 * Injects global HTML structure, fonts, analytics, and Sanity real-time updates.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // NOTE: The `scroll-smooth` class enables CSS-based smooth scrolling for anchor links globally.
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (window.sessionStorage && window.sessionStorage.getItem('hasSeenSplash')) {
                    document.documentElement.classList.add('splash-seen');
                  } else {
                    document.documentElement.classList.add('splash-active');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-muted-oak/30 m-0 p-0`}
      >
        {/* WARNING: We use `ClientLayoutWrapper` to conditionally render the Navbar and Footer,
            ensuring they don't break the layout of the Sanity Studio backend (/studio route). */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        
        {/* EDGE CASE: SanityLive enables real-time preview drafting updates across the entire site. */}
        <SanityLive />

        <Analytics />
      </body>
    </html>
  );
}
