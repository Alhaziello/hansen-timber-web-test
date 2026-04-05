"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// The generated background image name. We'll find exactly what was copied over.
// For now, let's look for hero_timber_home_* inside public or just pass it as prop if we map it out.
export default function Hero({ bgImage }: { bgImage: string }) {
  const [mounted, setMounted] = useState(false);

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
          src={bgImage}
          alt="Hansen Timber Hero"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent"></div>
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
          className="text-sand text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-8"
        >
          Precision in Wood Crafting
        </motion.h1>
        <motion.p 
          variants={itemVariants} 
          className="text-sand/80 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10"
        >
          Discover the natural beauty and unmatched durability of New Zealand grown Eucalyptus and Macrocarpa timber.
        </motion.p>
        <Link href="/products">
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-muted-oak text-charcoal px-8 py-4 font-sans uppercase tracking-widest text-sm hover:bg-charcoal hover:text-white transition-colors duration-300"
          >
            Explore Collection
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
