/**
 * @file HeritageSection.tsx
 * @description A premium landing page section highlighting the company's long history and connection to the land.
 * Features a large image, elegant typography, and scroll-triggered animations.
 * @dependencies framer-motion, next/image, next/link
 * @state Stateless client component (relies on Framer Motion viewport triggers).
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Renders the Heritage & Trust section with animated image reveals and typography.
 * NOTE: Uses `whileInView` for scroll-triggered animations.
 */
export default function HeritageSection() {
  return (
    <section className="bg-sand py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column - Left on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
          >
            {/* EDGE CASE: Ensure `sizes` prop is accurate to prevent Next.js Image component from downloading unnecessarily large images on mobile. */}
            <Image
              src="/images/about/IMG_2022.jpg"
              alt="The Hansen Timber Farm and Operations"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-700"></div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 p-8">
              <div className="bg-sand/90 backdrop-blur-sm p-4 rounded-tl-2xl shadow-lg border-t border-l border-white/20">
                <p className="text-charcoal font-serif italic text-sm">Our Roots in Clevedon</p>
              </div>
            </div>
          </motion.div>

          {/* Text Column - Right on Desktop */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-muted-oak uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-6 block">
                Heritage & Trust
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal mb-8 leading-[1.1]">
                A Legacy in Every Grain <br className="hidden md:block" />
                <span className="italic">Since 1874</span>
              </h2>
              <div className="w-20 h-px bg-muted-oak mb-8"></div>

              <div className="space-y-6 text-charcoal/80 text-lg font-light leading-relaxed mb-12 max-w-xl">
                <p>
                  From Peder Christian Hansen&apos;s arrival by ship in 1874 to our modern
                  operations in Clevedon, we have been crafting more than just timber.
                  We have been building a legacy of quality and resilience.
                </p>
                <p>
                  As a family-owned business spanning generations, we blend traditional
                  milling expertise with a deep commitment to New Zealand&apos;s environment,
                  having planted over 200,000 native trees on our property.
                </p>
              </div>

              <Link href="/about" className="group inline-flex items-center gap-6">
                <div className="relative">
                  {/* Animated glow */}
                  <div className="absolute inset-0 bg-muted-oak/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full blur-xl"></div>

                  {/* The Text (No underline, just clean typography) */}
                  <span className="relative text-charcoal font-semibold uppercase tracking-[0.2em] text-xs transition-colors group-hover:text-muted-oak">
                    Explore Our History
                  </span>
                </div>

                {/* The trailing line */}
                <div className="w-12 h-px bg-charcoal/30 relative overflow-hidden group-hover:bg-muted-oak transition-colors">
                  <motion.div
                    className="absolute inset-0 bg-charcoal"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
