/**
 * @file ArchitecturalCarousel.tsx
 * @description A high-performance, continuously draggable image carousel with hardware-accelerated parallax effects.
 * Designed specifically for architectural showcases, providing fluid motion and precise scroll progress tracking.
 * @dependencies embla-carousel-react, framer-motion (implicitly via architecture), next/image
 * @state Manages scroll progress (0-1), active slide index, and dynamic parallax translation offsets per slide.
 */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

/**
 * Represents a single slide within the architectural carousel.
 */
export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  imageUrl: string;
}

/**
 * Configuration properties for the ArchitecturalCarousel component.
 */
interface ArchitecturalCarouselProps {
  items?: CarouselItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_SLIDES: CarouselItem[] = [
  {
    id: "commercial-fitout",
    title: "Commercial Fitout",
    subtitle: "Clevedon, NZ",
    description: "Architectural detailing featuring sustainable, locally-milled Macrocarpa boards.",
    imageUrl: "/images/about/sawmill.jpg",
  },
  {
    id: "coastal-residence",
    title: "Coastal Residence",
    subtitle: "Coromandel, NZ",
    description: "Premium cedar cladding engineered for harsh marine environments and natural weathering.",
    imageUrl: "/images/ui/Gemini_Generated_Image_6z47ys6z47ys6z47.png",
  },
  {
    id: "architectural-pavilion",
    title: "Architectural Pavilion",
    subtitle: "Auckland, NZ",
    description: "Structural Eucalyptus posts forming a seamless canopy that bridges indoor and outdoor spaces.",
    imageUrl: "/images/about/sawmill.jpg",
  },
  {
    id: "forest-retreat",
    title: "Forest Retreat",
    subtitle: "Queenstown, NZ",
    description: "Deep rustic timber slabs integrated into modern high-country framing and interior joinery.",
    imageUrl: "/images/ui/Gemini_Generated_Image_6z47ys6z47ys6z47.png",
  },
];

export default function ArchitecturalCarousel({
  items,
  title = "featured ",
  subtitle = "curated spaces",
  className = "",
}: ArchitecturalCarouselProps) {
  const slides = items && items.length > 0 ? items : DEFAULT_SLIDES;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    // WARNING: dragFree allows fluid momentum scrolling instead of rigid slide snapping.
    // This breaks standard pagination semantics but drastically improves architectural feel.
    dragFree: true, // Enables fluid, continuous drag physics without rigid snapping
    loop: false,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>([]);

  const onScroll = useCallback((api: EmblaCarouselType) => {
    // 1. Calculate general progress (0 to 1) for the progress bar
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress);

    // 2. Parallax Calculation
    // NOTE: Compares each slide's snap position against the current scroll progress
    // EDGE CASE: Rapid scrolling can cause visual tearing if translation isn't hardware accelerated.
    const snaps = api.scrollSnapList();
    const currentScroll = api.scrollProgress();

    const offsets = snaps.map((snap: number) => {
      const diff = snap - currentScroll;
      // Adjust factor to control parallax intensity (-12% relative shift works beautifully)
      return diff * -12;
    });
    setParallaxOffsets(offsets);
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setActiveIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handleScroll = () => onScroll(emblaApi);
    const handleSelect = () => onSelect(emblaApi);

    // Trigger initial calculations
    handleScroll();
    handleSelect();

    // Subscribe to Embla events
    emblaApi.on("scroll", handleScroll);
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleScroll);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleScroll);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, onScroll, onSelect]);

  return (
    <section className={`py-16 md:py-20 bg-sand overflow-hidden ${className}`}>
      {/* Optional Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-left">
        {subtitle && (
          <span className="text-muted-oak text-xs uppercase tracking-[0.3em] font-sans font-semibold block mb-3">
            {subtitle}
          </span>
        )}
        {title && (
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal italic lowercase tracking-tight">
            {title}
          </h2>
        )}
      </div>

      {/* Embla Viewport */}
      <div className="embla cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex select-none touch-pan-y">
          {slides.map((item, index) => {
            const isFirst = index === 0;
            const translateOffset = parallaxOffsets[index] || 0;

            return (
              <div
                key={item.id}
                className="flex-[0_0_55%] md:flex-[0_0_35%] min-w-0 pr-6 md:pr-10 relative group"
              >
                {/* Slide Card */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden border border-muted-oak/10 bg-charcoal/5">
                  {/* Parallax Wrapper: Scale ensures safety margin so translation doesn't peek behind container */}
                  <div
                    className="absolute inset-0 w-[120%] -left-[10%] max-w-none"
                    style={{
                      transform: `translateX(${translateOffset}%) scale(1.05)`,
                      willChange: "transform",
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 70vw"
                      className="object-cover"
                      priority={isFirst} // Prevent LCP warning on landing page load
                    />
                  </div>
                  {/* Elegant architectural vignette overlay */}
                  <div className="absolute inset-0 bg-charcoal/10 transition-colors duration-500 group-hover:bg-charcoal/5 pointer-events-none" />
                </div>

                {/* Minimalist Meta Details below each slide */}
                <div className="mt-6 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-muted-oak">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-charcoal group-hover:text-muted-oak transition-colors duration-300 italic lowercase">
                      {item.title}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-xs text-charcoal/60 font-sans max-w-sm md:max-w-md leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress & Fractional Counter Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 flex items-center justify-between gap-8">
        {/* Sleek, ultra-thin progress bar indicator */}
        <div className="flex-1 h-[1px] bg-charcoal/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-charcoal w-full origin-left"
            style={{
              transform: `scaleX(${scrollProgress})`,
              willChange: "transform",
            }}
          />
        </div>

        {/* Minimalist fractional slide counter */}
        <div className="text-xs font-sans font-bold tracking-widest text-charcoal/50 shrink-0">
          {(activeIndex + 1).toString().padStart(2, "0")} / {slides.length.toString().padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
