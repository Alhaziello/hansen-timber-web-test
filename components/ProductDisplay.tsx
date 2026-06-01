/**
 * @file ProductDisplay.tsx
 * @description The primary presentation layer for individual product pages (e.g., Exterior Cladding).
 * Orchestrates the display of imagery, technical specifications, color swatches, and deep-link routing
 * to specific species variants.
 * @dependencies framer-motion, next/image, SpeciesCardGrid, FaqAccordion, TechnicalDownloads
 * @state Manages localized state for the currently selected visual color swatch variant.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClientMotionDiv } from "./ClientMotionDiv";
import SpeciesCardGrid from "./SpeciesCardGrid";
import { urlFor } from "@/sanity/lib/image";
import FaqAccordion from "./FaqAccordion";
import TechnicalDownloads from "./TechnicalDownloads";

/**
 * Defines the structure for an interactive color swatch variant.
 */
interface ColorVariant {
  name: string;
  swatch: string;
  image: string;
}

/**
 * Configuration properties for the ProductDisplay component.
 */
interface ProductDisplayProps {
  /** The heavily populated product data object retrieved from Sanity CMS. */
  product: any;
  /** The routing category slug (e.g., "exterior", "interior"). */
  category: string;
}

/**
 * Renders the comprehensive product details, dynamically adapting to the presence 
 * of color swatches, technical schematics, and species variants.
 */
export default function ProductDisplay({ product, category }: ProductDisplayProps) {
  // NOTE: Initial state gracefully falls back to the first available color variant if defined.
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(
    product.colorVariants && product.colorVariants.length > 0 ? product.colorVariants[0] : null
  );

  // EDGE CASE: Image sources from Sanity can be raw strings (URLs), direct asset objects, 
  // or fully qualified Sanity Image objects requiring `urlFor` resolution. This helper handles all three.
  const getImageUrl = (source: any) => {
    if (!source) return "/placeholder.png";
    if (typeof source === 'string') return source;
    if (source.asset?.url) return source.asset.url;
    try {
      return urlFor(source).url();
    } catch (e) {
      return "/placeholder.png";
    }
  };

  const mainImageUrl = selectedColor ? getImageUrl(selectedColor.image) : getImageUrl(product.image);

  // WARNING: We must filter out empty or malformed asset records before rendering
  // to prevent crashes inside the mapping loops.
  const validSchematics = product.schematics?.filter((s: any) => s?.asset?.url) || [];
  const validSpecFiles = product.specFiles?.filter((f: any) => f?.asset?.url) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
      {/* Visual Side */}
      <ClientMotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="relative aspect-[4/5] overflow-hidden border border-muted-oak/10 bg-white">
          <Image
            src={mainImageUrl}
            alt={selectedColor ? `${product.name} - ${selectedColor.name}` : product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-700"
            priority
          />
        </div>

        {/* Swatches (Visual Side) */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40">Select Color Range</h2>
            <div className="flex flex-wrap gap-3">
              {product.colorVariants.map((variant: ColorVariant) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedColor(variant)}
                  className={`group relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${selectedColor?.name === variant.name ? "border-charcoal scale-110" : "border-transparent hover:border-muted-oak/50"
                    }`}
                  title={variant.name}
                >
                  <Image
                    src={getImageUrl(variant.swatch)}
                    alt={variant.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="text-sm font-sans text-muted-oak tracking-wide">
                Selected: <span className="text-charcoal font-bold uppercase tracking-widest">{selectedColor.name}</span>
              </p>
            )}
          </div>
        )}
      </ClientMotionDiv>

      {/* Data Side */}
      <ClientMotionDiv
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col"
      >
        <span className="text-muted-oak text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4">
          {product.category?.title}
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 leading-tight">
          {product.name}
        </h1>

        {/* Short Product Description */}
        <div className="prose-hansen max-w-xl">
          <p className="text-charcoal/70 text-lg font-sans leading-relaxed mb-12">
            {product.description}
          </p>
        </div>

        {/* Global Premium Feature List (Key Attributes) */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-8">Key Attributes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {product.specs.map((spec: string, i: number) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-8 h-px bg-muted-oak group-hover:w-12 transition-all duration-500"></div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-charcoal/80">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profiles & Schematics Section */}
        {validSchematics.length > 0 && (
          <div className="mt-12 pt-12 border-t border-muted-oak/10">
            <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-8">Technical Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {validSchematics.map((schematic: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-lg border border-muted-oak/10 flex items-center justify-center">
                  <Image
                    src={urlFor(schematic).url()}
                    alt={`Profile Schematic ${i + 1}`}
                    width={500}
                    height={300}
                    className="max-w-full h-auto object-contain mix-blend-multiply opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Downloads Section */}
        <div className="mt-12 pt-12 border-t border-muted-oak/10">
          <TechnicalDownloads
            downloads={validSpecFiles.length > 0 ? validSpecFiles.map((file: any) => ({
              id: file._key || file.asset?._id || Math.random().toString(),
              title: file.title || "Specification File",
              filename: file.asset?.originalFilename || "Download file",
              url: file.asset?.url ? `${file.asset.url}?dl=` : "#",
            })) : undefined}
            sampleRequestUrl={`/contact?subject=Sample Request - ${product.name}${selectedColor ? ` (${selectedColor.name})` : ""}&message=I would like to request a sample pack for the ${product.name} product${selectedColor ? ` in the ${selectedColor.name} color variant` : ""}.&source=Product Page - ${product.name}${selectedColor ? ` (${selectedColor.name})` : ""}`}
          />
        </div>
      </ClientMotionDiv>

      {/* Interactive Species Specification Cards */}
      {((product.boardOptions && product.boardOptions.length > 0) || (product.species && product.species.length > 0)) && (
        <div className="lg:col-span-2">
          <SpeciesCardGrid
            boardOptions={product.boardOptions}
            species={product.species}
            categorySlug={category}
            productSlug={product.id}
          />
        </div>
      )}

      {/* Dynamic Product-Level FAQ Section */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="lg:col-span-2 mt-16 pt-16 border-t border-muted-oak/10">
          <FaqAccordion
            title={`frequently asked questions about ${product.name}`}
            subtitle="Product FAQ"
            items={product.faqs}
          />
        </div>
      )}
    </div>
  );
}

