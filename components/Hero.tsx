/**
 * @file Hero.tsx
 * @description The massive, screen-filling introduction section seen at the top of the homepage.
 * Displays a background image, a bold headline, and a call-to-action button, featuring
 * staggered Framer Motion fade-in animations on initial load.
 * @dependencies framer-motion, next/image, next/link
 * @state Manages a client-side mounting flag to avoid React Hydration Mismatches during animation injection.
 */
/* eslint-disable */
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

/**
 * Configuration properties for the Hero component.
 */
interface HeroProps {
  /** Optional override for the main hero heading. */
  title?: string;
  /** Optional override for the secondary hero text. */
  subtitle?: string;
  /** The background image. Accepts a resolved Sanity image object or a static URL string. */
  bgImage?: any; // Sanity image object or string
}

/**
 * Renders the homepage Hero section with staggered entrance animations.
 */
export default function Hero({ title, subtitle, bgImage }: HeroProps) {
  // NOTE: `mounted` keeps track of whether the component has loaded in the browser yet.
  // EDGE CASE: Returning null before mount prevents hydration mismatches but delays LCP slightly.
  // A better architectural pattern for Next.js 15 is to move animations into a wrapper.
  const [mounted, setMounted] = useState(false);

  // `useEffect` runs right after the browser loads the component, setting `mounted` to true.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use Sanity image URL if bgImage is an object, otherwise fallback to placeholder
  const heroImageUrl = bgImage?.asset
    ? urlFor(bgImage).url()
    : (typeof bgImage === 'string' ? bgImage : "/images/home/HERO-NEW2.png");

  const displayTitle = title || "Precision in Wood Crafting";
  const displaySubtitle = subtitle || "Discover the natural beauty and unmatched durability of New Zealand grown Eucalyptus and Macrocarpa timber.";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
    },
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0 bg-black">
        {/* WARNING: priority=true is essential here. The hero image is the Largest Contentful Paint (LCP) element. 
            Without it, Google Lighthouse scores will tank due to deferred loading. */}
        <Image
          src={heroImageUrl}
          alt={displayTitle}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-charcoal/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-muted-oak tracking-[0.2em] uppercase text-sm font-sans mb-4"
        >
          Since 1874
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-sand text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] mb-8 [text-wrap:balance]"
        >
          {displayTitle}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-sand/90 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:balance]"
        >
          {displaySubtitle}
        </motion.p>
        <Link href="/products">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "rgb(186, 140, 99)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-muted-oak text-charcoal px-10 py-5 font-sans uppercase tracking-[0.25em] text-xs font-semibold hover:shadow-2xl transition-all duration-500"
          >
            Explore Collection
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

