/* eslint-disable */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ClientMotionDiv } from "./ClientMotionDiv";
import TechnicalTable from "./TechnicalTable";
import BoardMenu from "./BoardMenu";
import { urlFor } from "@/sanity/lib/image";

const ptComponents = {
  block: {
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-2xl font-serif text-charcoal mt-10 mb-4">{children}</h3>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="text-charcoal/70 mb-6 leading-relaxed text-lg">{children}</p>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="space-y-3 mb-8 ml-4">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 text-charcoal/70">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-oak shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
};

interface ColorVariant {
  name: string;
  swatch: string;
  image: string;
}

interface ProductDisplayProps {
  product: any;
  category: string;
}

export default function ProductDisplay({ product, category }: ProductDisplayProps) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(
    product.colorVariants && product.colorVariants.length > 0 ? product.colorVariants[0] : null
  );

  // Helper to handle both expanded URLs and raw Sanity image objects
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

        {/* Extended Editorial Content */}
        <div className="prose-hansen max-w-xl">
          {product.content ? (
            <PortableText value={product.content} components={ptComponents} />
          ) : (
            <p className="text-charcoal/70 text-lg font-sans leading-relaxed mb-12">
              {product.description}
            </p>
          )}
        </div>

        {(() => {
          const speciesList = Array.isArray(product.species)
            ? product.species
            : (product.species ? [product.species] : []);

          // Hide this list if we have the Board Menu to avoid redundancy
          if (speciesList.length === 0 || (product.boardOptions && product.boardOptions.length > 0)) return null;

          return (
            <div className="mt-8">
              <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-4">Available Species</h2>
              <div className="flex flex-wrap gap-2">
                {speciesList.map((s: { slug: string, name: string }) => (
                  <Link
                    key={s.slug}
                    href={`/species/${s.slug}`}
                    className="px-4 py-1.5 border border-muted-oak/20 text-xs uppercase tracking-widest text-muted-oak hover:border-charcoal hover:text-charcoal transition-all"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}

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
        {product.schematics && product.schematics.length > 0 && (
          <div className="mt-12 pt-12 border-t border-muted-oak/10">
            <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-8">Technical Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.schematics.map((schematic: any, i: number) => (
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
        {product.specFiles && product.specFiles.length > 0 && (
          <div className="mt-12 pt-12 border-t border-muted-oak/10">
            <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-8">Technical Downloads</h2>
            <div className="space-y-3">
              {product.specFiles.map((file: any, i: number) => (
                <a
                  key={i}
                  href={`${file.asset.url}?dl=`}
                  className="flex items-center gap-4 group p-4 border border-muted-oak/10 hover:border-charcoal transition-colors bg-white/50"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-muted-oak/5 text-muted-oak group-hover:bg-charcoal group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal">Specification File</p>
                    <p className="text-xs text-charcoal/50">Download technical data sheet</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Schematics Section */}
        {product.schematics && product.schematics.length > 0 && (
          <div className="mt-12 pt-12 border-t border-muted-oak/10">
            <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-6">Profiles & Schematics</h2>
            <div className="grid grid-cols-2 gap-4">
              {product.schematics.map((schematic: any, idx: number) => (
                <div key={idx} className="relative aspect-square bg-white border border-muted-oak/10 p-4">
                  <Image
                    src={getImageUrl(schematic)}
                    alt={`Schematic ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-4 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/contact?subject=Sample Request - ${product.name}${selectedColor ? ` (${selectedColor.name})` : ""}&message=I would like to request a sample pack for the ${product.name} product${selectedColor ? ` in the ${selectedColor.name} color variant` : ""}.`}
          className="mt-12 block w-fit"
        >
          <button className="bg-charcoal text-sand px-10 py-5 uppercase tracking-[0.2em] text-sm hover:bg-muted-oak hover:text-charcoal transition-all duration-300">
            Request Sample Pack
          </button>
        </Link>
      </ClientMotionDiv>

      {/* Board Options Menu (Spec Sheet) */}
      {product.boardOptions && product.boardOptions.length > 0 && (
        <div className="lg:col-span-2">
          <BoardMenu options={product.boardOptions} />
        </div>
      )}
    </div>
  );
}

