"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { ClientMotionDiv } from "./ClientMotionDiv";

interface SlabDisplayProps {
  slab: {
    name: string;
    slug: string;
    dimensions: {
      length: number;
      width: number;
      thickness: number;
    };
    status: string;
    isSold?: boolean;
    description?: string;
    image: any;
    gallery?: any[];
    species?: {
      name: string;
      slug: string;
    };
  };
}

export default function SlabDisplay({ slab }: SlabDisplayProps) {
  const imageUrl = slab.image ? urlFor(slab.image).url() : "/images/placeholders/slab-placeholder.jpg";
  const isSold = slab.isSold || slab.status === "sold";

  return (
    <div className="space-y-24">
      {/* Hero Section: Image & Key Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Main Image */}
        <ClientMotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden bg-charcoal group"
        >
          <Image
            src={imageUrl}
            alt={slab.name}
            fill
            className="object-cover"
            priority
          />
          {isSold && (
            <div className="absolute top-8 left-8 bg-charcoal text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold shadow-2xl backdrop-blur-md">
              Sold
            </div>
          )}
        </ClientMotionDiv>

        {/* Content Side */}
        <div className="space-y-12">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 mb-8">
              <span className="text-muted-oak text-xs uppercase tracking-[0.3em] font-sans font-bold">
                Unique Timber Slab
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-charcoal lowercase italic leading-tight">
                {slab.name}
              </h1>
            </div>

            <p className="text-charcoal/70 text-lg leading-relaxed font-sans max-w-xl">
              {slab.description || `A stunning ${slab.species?.name || "premium"} timber slab, precision-milled and carefully dried for architectural use.`}
            </p>
          </ClientMotionDiv>

          {/* Dimensions Table */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-sm border border-muted-oak/10 p-8 md:p-10 space-y-8"
          >
            <h3 className="text-xs uppercase tracking-widest font-bold text-muted-oak border-b border-muted-oak/10 pb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">Length</p>
                <p className="text-2xl font-serif text-charcoal">{slab.dimensions.length}mm</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">Width</p>
                <p className="text-2xl font-serif text-charcoal">{slab.dimensions.width}mm</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">Thickness</p>
                <p className="text-2xl font-serif text-charcoal">{slab.dimensions.thickness}mm</p>
              </div>
            </div>
          </ClientMotionDiv>

          {/* Action Area */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 space-y-8"
          >
            {isSold && (
              <p className="text-charcoal/50 text-sm italic font-serif leading-relaxed max-w-md">
                This unique piece has been sold. However, we specialize in sourcing and custom-milling similar slabs to meet your specific requirements.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href={`/contact?subject=${isSold ? 'Request Similar Slab to ' : 'Enquiry for '}${slab.name}`}
                className="flex-1 bg-charcoal hover:bg-muted-oak text-white py-6 px-12 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
              >
                {isSold ? 'Enquire for Similar' : 'Enquire Now'}
              </Link>

              {slab.species && (
                <Link
                  href={`/species/${slab.species.slug}`}
                  className="flex-1 border border-charcoal/10 hover:border-muted-oak py-6 px-12 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 text-center hover:text-muted-oak whitespace-nowrap flex items-center justify-center"
                >
                  Timber Profile
                </Link>
              )}
            </div>
          </ClientMotionDiv>
        </div>
      </div>

      {/* Gallery Section */}
      {slab.gallery && slab.gallery.length > 0 && (
        <div className="space-y-12">
          <div className="flex items-center gap-8">
            <h2 className="text-3xl font-serif text-charcoal italic">Gallery</h2>
            <div className="h-px flex-1 bg-muted-oak/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {slab.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative aspect-square overflow-hidden bg-charcoal group"
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`${slab.name} view ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
