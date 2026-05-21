import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { productAndSpeciesQuery, productSpeciesCombinationsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import SpeciesCardGrid from "@/components/SpeciesCardGrid";

// Next.js 15 dynamic routing types
interface PageProps {
  params: Promise<{
    category: string;
    id: string;
    species: string;
  }>;
}

// Helper to handle Sanity image resolution
const getImageUrl = (source: any) => {
  if (!source) return "/placeholder.png";
  if (typeof source === "string") return source;
  if (source.asset?.url) return source.asset.url;
  try {
    return urlFor(source).url();
  } catch (e) {
    return "/placeholder.png";
  }
};

// SEO Pre-build parameter mapping for Next.js 15 Static Site Generation (SSG)
export async function generateStaticParams() {
  try {
    const products = await client.fetch(productSpeciesCombinationsQuery);

    if (!products) return [];

    const paramsList: Array<{ category: string; id: string; species: string }> = [];

    for (const product of products) {
      const categorySlug = product.category?.id;
      const productSlug = product.id;
      if (!categorySlug || !productSlug) continue;

      // Extract unique species slugs from both direct species refs and boardOptions list
      const speciesSlugs = new Set<string>();
      product.species?.forEach((s: any) => {
        if (s?.slug) speciesSlugs.add(s.slug);
      });
      product.boardOptions?.forEach((opt: any) => {
        if (opt.species?.slug) speciesSlugs.add(opt.species.slug);
      });

      for (const speciesSlug of speciesSlugs) {
        paramsList.push({
          category: categorySlug,
          id: productSlug,
          species: speciesSlug,
        });
      }
    }

    return paramsList;
  } catch (error) {
    console.error("Error in generateStaticParams for product species page:", error);
    return [];
  }
}

export default async function ProductSpeciesPage({ params }: PageProps) {
  const { category, id, species } = await params;

  // Combined fetch of parent product and specific active species info
  const { data } = await sanityFetch({
    query: productAndSpeciesQuery,
    params: { id, species },
  });

  if (!data || !data.product || !data.activeSpecies) {
    notFound();
  }

  const { product, activeSpecies } = data;

  // Filter sizing data specifically for the active species from boardOptions
  const activeOption = product.boardOptions?.find(
    (opt: any) => opt.species?.slug === activeSpecies.slug
  );
  const activeSizes: string[] = activeOption?.sizes || [];

  // Coalescing: prefer variant override images/descriptions, fallback to generic species data
  const heroImage = activeOption?.variantImage || activeSpecies.image;
  const activeDescription = activeOption?.variantDescription || activeSpecies.description;
  const activeNotes: string = activeOption?.notes || activeDescription || "";

  // Set up carousel images
  const carouselImages = [
    getImageUrl(heroImage),
    getImageUrl(product.image),
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted-oak/10 pb-6">
          <Link
            href={`/products/${category}/${id}`}
            className="inline-flex items-center gap-2 text-muted-oak hover:text-charcoal transition-colors group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform group-hover:-translate-x-1 transition-transform"
            >
              <path
                d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs uppercase tracking-widest font-sans font-semibold">
              Back to {product.name}
            </span>
          </Link>

          <div className="text-xs uppercase tracking-widest text-muted-oak/60 font-sans">
            <Link href="/products" className="hover:text-charcoal transition-colors">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${category}`} className="hover:text-charcoal transition-colors">
              {product.category?.title || category}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${category}/${id}`} className="hover:text-charcoal transition-colors">
              {product.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal font-semibold">{activeSpecies.name}</span>
          </div>
        </div>

        {/* Core Product-Species Content Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Visual Gallery / Carousel Side */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden border border-muted-oak/10 bg-white">
              {carouselImages.length > 0 ? (
                <Image
                  src={carouselImages[0]}
                  alt={`${product.name} - ${activeSpecies.name} Timber Option`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <Image
                  src="/placeholder.png"
                  alt="Timber Profile Placeholder"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* If product image differs from species grain image, show side-by-side or quick secondary image */}
            {carouselImages.length > 1 && (
              <div className="grid grid-cols-2 gap-6">
                {carouselImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[16/10] overflow-hidden border border-muted-oak/10 bg-white">
                    <Image
                      src={img}
                      alt={`${product.name} variant view ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details / Specifications Side */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <span className="text-muted-oak text-xs uppercase tracking-[0.3em] font-sans font-bold block mb-2">
                  Timber Option Specification
                </span>
                <h1 className="text-5xl font-serif text-charcoal lowercase italic leading-none mb-4">
                  {product.name} <span className="text-3xl font-sans not-italic text-muted-oak block mt-2">in {activeSpecies.name}</span>
                </h1>
                {activeSpecies.tagline && (
                  <p className="text-muted-oak font-serif italic text-lg mt-2">
                    {activeSpecies.tagline}
                  </p>
                )}
              </div>

              {/* Description Profile */}
              <div className="prose-hansen text-charcoal/70 leading-relaxed text-base font-sans space-y-4">
                {activeDescription ? (
                  <p>{activeDescription}</p>
                ) : activeNotes ? (
                  <p>{activeNotes}</p>
                ) : (
                  <p>
                    Premium locally harvested timber milled at our MPI-certified site. Sourced using strict sustainable forestry processes and air-dried/kiln-finished to perfection.
                  </p>
                )}
              </div>

              {/* Sizes Matrix */}
              <div className="space-y-4 pt-4 border-t border-muted-oak/10">
                <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 pb-2">
                  Standard Available Mill Sizes
                </h4>
                {activeSizes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {activeSizes.map((size, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between p-4 bg-white/40 border border-charcoal/5 rounded-md hover:bg-white/60 transition-colors"
                      >
                        <span className="text-charcoal/80 font-sans text-sm font-semibold">
                          {size}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-muted-oak font-bold">
                          In Stock
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white/30 border border-charcoal/5 rounded-md text-xs italic text-charcoal/50">
                    Custom sizing cuts and profile layouts available on order. Please contact our sales mill.
                  </div>
                )}
              </div>

              {/* Downloadable Spec Files */}
              {product.specFiles && product.specFiles.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-muted-oak/10">
                  <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 pb-2">
                    Technical Specifications
                  </h4>
                  <div className="space-y-2">
                    {product.specFiles.map((file: any, fIdx: number) => (
                      <a
                        key={fIdx}
                        href={`${file.asset.url}?dl=`}
                        className="flex items-center gap-3 p-3 bg-white/50 border border-muted-oak/10 hover:border-charcoal transition-all rounded-md group"
                      >
                        <div className="w-8 h-8 rounded bg-muted-oak/10 text-muted-oak flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal truncate">
                            {file.asset.originalFilename || "Specification PDF"}
                          </p>
                          <p className="text-[10px] text-charcoal/40">Technical Download</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Call to Actions */}
            <div className="pt-8 border-t border-muted-oak/10 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
              <Link
                href={`/species/${activeSpecies.slug}`}
                className="text-muted-oak hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest transition-colors self-start sm:self-center"
              >
                Deep Species History &rarr;
              </Link>

              <Link
                href={`/contact?subject=Enquiry - ${product.name} (${activeSpecies.name})`}
                className="w-full sm:w-auto px-8 py-4 bg-charcoal hover:bg-muted-oak hover:text-charcoal text-white text-xs uppercase tracking-widest font-bold rounded-none transition-all duration-300 shadow-md text-center"
              >
                Enquire for Spec Profile
              </Link>
            </div>
          </div>

        </div>

        {/* Other Species Options Section (Crucial for Internal Cross-Linking / SEO Crawling) */}
        {((product.boardOptions && product.boardOptions.length > 0) || (product.species && product.species.length > 0)) && (
          <div className="pt-16 border-t border-muted-oak/10">
            <h3 className="text-xl font-serif text-charcoal mb-4">
              Other Species Options for {product.name}
            </h3>
            <p className="text-sm text-charcoal/60 mb-8 font-sans">
              Compare this timber profile with other sustainably sourced species available for {product.name.toLowerCase()}.
            </p>
            <SpeciesCardGrid
              boardOptions={product.boardOptions}
              species={product.species}
              categorySlug={category}
              productSlug={id}
            />
          </div>
        )}

      </div>
    </main>
  );
}
