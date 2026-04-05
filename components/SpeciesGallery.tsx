"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface SpeciesGalleryProps {
  speciesList?: any[];
}

export default function SpeciesGallery({ speciesList = [] }: SpeciesGalleryProps) {
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-sand text-charcoal overflow-hidden border-t border-muted-oak/10">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Architectural Species</h2>
          <div className="w-24 h-px bg-muted-oak mx-auto md:mx-0"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speciesList.map((species) => {
            const imageUrl = species.image ? urlFor(species.image).url() : "/placeholder.png";
            return (
              <motion.div
                key={species.slug}
                variants={itemVariants}
                className="group flex flex-col h-full bg-white/40 border border-muted-oak/10 backdrop-blur-sm"
              >
                <Link href={`/species/${species.slug}`} className="block flex-1">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={species.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500"></div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-serif mb-4 group-hover:text-muted-oak transition-colors duration-300">
                      {species.name}
                    </h3>
                    <p className="text-charcoal/70 text-sm font-sans leading-relaxed mb-8 flex-1">
                      {species.description}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-block px-6 py-2 border border-muted-oak text-muted-oak text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full group-hover:bg-muted-oak group-hover:text-charcoal transition-all duration-300">
                        Learn More
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
