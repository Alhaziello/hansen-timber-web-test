/**
 * @file page.tsx (Home)
 * @description The main landing page for the Hansen Timber website. Orchestrates multiple client 
 * and server components including the Hero, HeritageSection, ArchitecturalCarousel, and SpeciesGallery.
 * @dependencies sanityFetch, Hero, SpeciesGallery, HeritageSection, ArchitecturalCarousel
 * @route / (Home)
 * @state Server Component (Parallel data fetching).
 */
import Hero from "@/components/Hero";
import SpeciesGallery from "@/components/SpeciesGallery";
import HeritageSection from "@/components/HeritageSection";
import ArchitecturalCarousel from "@/components/ArchitecturalCarousel";

import { sanityFetch } from "@/sanity/lib/live";
import { allSpeciesQuery, homePageQuery, allProductsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";


/**
 * Asynchronously renders the application's Home Page.
 * Pre-fetches necessary homepage CMS content, species, and products in parallel.
 */
export default async function Home() {
  // NOTE: Fetch all required data in parallel to significantly reduce Time to First Byte (TTFB).
  const [
    { data: homeData },
    { data: speciesList },
    { data: productsList }
  ] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: allSpeciesQuery }),
    sanityFetch({ query: allProductsQuery }),
  ]) as any;

  // Map products to matching shape for the carousel items
  // EDGE CASE: If Sanity image resolution fails on a product (e.g. malformed reference), 
  // we catch the error and fallback to a generic placeholder rather than crashing the carousel map loop.
  const productCarouselItems = (productsList || []).slice(0, 5).map((product: any, idx: number) => {
    let imageUrl = "/placeholder.png";
    if (product.image) {
      try {
        imageUrl = urlFor(product.image).url();
      } catch (e) {
        // Fallback gracefully
      }
    }
    return {
      id: product._id || `product-fallback-${idx}`,
      title: product.name || "Specification Timber",
      subtitle: product.category?.title || "Product Range",
      description: product.description || "Premium architectural grade New Zealand wood.",
      imageUrl,
    };
  });


  return (
    <main className="min-h-screen bg-sand">
      <Hero 
        title={homeData?.title} 
        subtitle={homeData?.heroSubtitle}
        bgImage={homeData?.heroImage}
      />



      <HeritageSection />

      <ArchitecturalCarousel 
        items={productCarouselItems} 
        title="featured collections" 
        subtitle="our product range" 
      />

      <SpeciesGallery speciesList={speciesList} />

    </main>
  );
}
