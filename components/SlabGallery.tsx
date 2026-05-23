/**
 * @file SlabGallery.tsx
 * @description A dynamic gallery component designed specifically for browsing unique timber slabs.
 * Features client-side filtering by species and fluid layout animations utilizing Framer Motion.
 * @dependencies react, framer-motion, next/image, next/link
 * @state Client component managing active species filter state (`selectedSpecies`).
 */
/* eslint-disable */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

/**
 * Represents the structure of an individual timber slab within the gallery.
 */
interface Slab {
  name: string;
  slug: string;
  dimensions?: {
    length?: number;
    width?: string | number;
    thickness?: string | number;
  };
  status: string;
  image: any;
  species: {
    name: string;
    slug: string;
  };
}

/**
 * Configuration properties for the SlabGallery component.
 */
interface SlabGalleryProps {
  /** Array of all available slab data objects retrieved from Sanity. */
  slabs: Slab[];
}

/**
 * Renders an interactive, filterable grid of timber slabs.
 */
export default function SlabGallery({ slabs }: SlabGalleryProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  // NOTE: We derive the unique species list dynamically from the provided slabs array
  // to ensure the filter buttons perfectly match the available inventory.
  const speciesList = useMemo(() => {
    const speciesMap = new Map<string, string>();
    slabs.forEach((slab) => {
      if (slab.species) {
        speciesMap.set(slab.species.slug, slab.species.name);
      }
    });
    return Array.from(speciesMap.entries()).map(([slug, name]) => ({ slug, name }));
  }, [slabs]);

  // EDGE CASE: If no species is selected (null), we return the entire array.
  // We use `useMemo` to prevent unnecessary recalculations on re-renders.
  const filteredSlabs = useMemo(() => {
    if (!selectedSpecies) return slabs;
    return slabs.filter((slab) => slab.species?.slug === selectedSpecies);
  }, [slabs, selectedSpecies]);

  return (
    <div className="w-full">
      {/* Species Filter Selection */}
      <div className="flex flex-wrap gap-4 mb-16">
        <button
          onClick={() => setSelectedSpecies(null)}
          className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
            selectedSpecies === null
              ? "bg-charcoal text-white border-charcoal shadow-lg"
              : "bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30"
          }`}
        >
          All Species
        </button>
        {speciesList.map((species) => (
          <button
            key={species.slug}
            onClick={() => setSelectedSpecies(species.slug)}
            className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
              selectedSpecies === species.slug
                ? "bg-charcoal text-white border-charcoal shadow-lg"
                : "bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30"
            }`}
          >
            {species.name}
          </button>
        ))}
      </div>

      {/* Intro Text for selected species (optional, based on screenshot) */}
      <AnimatePresence mode="wait">
        {selectedSpecies && (
          <motion.div
            key={selectedSpecies}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-12 max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal mb-4 uppercase italic">
              {speciesList.find(s => s.slug === selectedSpecies)?.name} Slabs
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Our {speciesList.find(s => s.slug === selectedSpecies)?.name} Timber Slabs have been sourced locally with our MPI certification. 
              Each slab is fillet-dried for optimal quality and durability, ensuring you get the best for your needs.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-muted-oak font-bold mb-8">
          {selectedSpecies ? `${speciesList.find(s => s.slug === selectedSpecies)?.name} Slabs Available` : "All Slabs Available"}
        </h3>
      </div>

      {/* Slabs Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredSlabs.map((slab, index) => {
            const isSold = slab.status === "sold";
            
            return (
              <motion.div
                layout="position"
                key={slab.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  opacity: { duration: 0.2 },
                  layout: { duration: 0.4, ease: "easeOut" }
                }}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-charcoal/5"
              >
                <Link href={`/products/slabs/${slab.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={slab.image ? urlFor(slab.image).url() : "/placeholder.png"}
                      alt={slab.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 4}
                    />
                    {isSold && (
                      <div className="absolute top-4 right-4 bg-charcoal/80 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm font-bold">
                        Sold
                      </div>
                    )}
                    {!isSold && slab.status !== 'available' && (
                      <div className="absolute top-4 right-4 bg-muted-oak/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                        {slab.status}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-lg font-serif text-charcoal mb-2 group-hover:text-muted-oak transition-colors duration-300">
                      {slab.name}
                    </h4>
                    
                    <div className="space-y-1 mb-6 flex-grow">
                      <p className="text-[11px] text-charcoal/40 uppercase tracking-wider font-bold">Dimensions</p>
                      {slab.dimensions?.length ? (
                        <>
                          <p className="text-sm text-charcoal/70 font-sans">
                            {slab.dimensions.length}mm length
                          </p>
                          <p className="text-sm text-charcoal/70 font-sans">
                            {slab.dimensions.width}mm width
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-charcoal/40 font-sans italic">
                          Contact for dimensions
                        </p>
                      )}
                    </div>

                    <div className="w-full bg-muted-oak group-hover:bg-charcoal text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md text-center">
                      View Details
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredSlabs.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-charcoal/40 italic">No slabs currently available for this species.</p>
        </div>
      )}
    </div>
  );
}

