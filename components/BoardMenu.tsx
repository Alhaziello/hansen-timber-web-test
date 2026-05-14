"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { ClientMotionDiv } from "./ClientMotionDiv";

interface BoardOption {
  species: {
    name: string;
    slug: string;
    image?: any;
  };
  sizes: string[];
  notes?: string;
}

interface BoardMenuProps {
  options: BoardOption[];
}

export default function BoardMenu({ options }: BoardMenuProps) {
  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-20 pt-16">
      <div className="flex items-center gap-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-charcoal lowercase italic">Availability Menu</h2>
        <div className="h-px flex-1 bg-muted-oak/20"></div>
      </div>

      <div className="space-y-32">
        {options.map((option, idx) => {
          const speciesImage = option.species.image ? urlFor(option.species.image).url() : null;
          
          return (
            <ClientMotionDiv
              key={option.species.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Species Info & Image */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl font-serif text-charcoal">{option.species.name}</h3>
                  <Link 
                    href={`/species/${option.species.slug}`}
                    className="text-muted-oak text-[10px] uppercase tracking-widest font-bold hover:text-charcoal transition-colors inline-block"
                  >
                    View Species Profile &rarr;
                  </Link>
                </div>
                
                {speciesImage && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-charcoal/5 shadow-inner">
                    <Image 
                      src={speciesImage} 
                      alt={option.species.name} 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover opacity-90"
                    />
                  </div>
                )}

                {option.notes && (
                  <div className="p-6 bg-sand border-l-2 border-muted-oak/30 italic text-charcoal/60 text-sm font-serif">
                    "{option.notes}"
                  </div>
                )}
              </div>

              {/* Sizes Table */}
              <div className="lg:col-span-7">
                <div className="bg-white/40 backdrop-blur-sm border border-charcoal/5 rounded-sm overflow-hidden">
                  <div className="grid grid-cols-1 divide-y divide-charcoal/5">
                    {option.sizes.map((size, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="flex items-center justify-between p-6 hover:bg-white/60 transition-colors group"
                      >
                        <span className="text-charcoal/80 font-sans text-lg tracking-tight">
                          {size}
                        </span>
                        <span className="text-[10px] uppercase tracking-tighter text-charcoal/20 group-hover:text-muted-oak transition-colors font-bold">
                          Standard Stock
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ClientMotionDiv>
          );
        })}
      </div>

      <div className="mt-24 p-12 bg-charcoal text-sand rounded-sm text-center space-y-6">
        <h3 className="text-2xl font-serif italic">Custom Cuts Required?</h3>
        <p className="text-sand/60 max-w-xl mx-auto text-sm leading-relaxed font-sans">
          If you require custom dimensions or a specific grade of timber not listed above, our mill is fully equipped to handle bespoke architectural requirements.
        </p>
        <div className="pt-4">
          <Link 
            href="/contact"
            className="inline-block px-12 py-4 bg-muted-oak hover:bg-white hover:text-charcoal text-white rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300"
          >
            Enquire for Custom Order
          </Link>
        </div>
      </div>
    </div>
  );
}
