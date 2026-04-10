"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Hero Component
 * 
 * The massive, screen-filling introduction section seen at the very top of the homepage.
 * It displays a background image, a bold headline, and a call-to-action button, all with 
 * a smooth staggered fade-in animation on initial load.
 * 
 * Beginner Note:
 * This component uses `useState` and `useEffect` to ensure it only renders on the client
 * after the component has fully "mounted". This avoids "Hydration Mismatches" (where the 
 * server HTML differs from the client HTML).
 */
export default function Hero({ bgImage }: { bgImage: string }) {
  // `mounted` keeps track of whether the component has loaded in the browser yet
  const [mounted, setMounted] = useState(false);

  // `useEffect` runs right after the component appears in the browser, setting `mounted` to true.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/images/home/hero-high-res.png"
          alt="Hansen Timber Premium NZ Wood Crafting"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-charcoal/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/10"></div>
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
          Precision in Wood Crafting
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-sand/90 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:balance]"
        >
          Discover the natural beauty and unmatched durability of New Zealand grown Eucalyptus and Macrocarpa timber.
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
