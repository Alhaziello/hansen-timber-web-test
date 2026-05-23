import Hero from "@/components/Hero";
import SpeciesGallery from "@/components/SpeciesGallery";
import HeritageSection from "@/components/HeritageSection";
import ArchitecturalCarousel from "@/components/ArchitecturalCarousel";

import { sanityFetch } from "@/sanity/lib/live";
import { allSpeciesQuery, homePageQuery, allProductsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";


export default async function Home() {
  // Fetch all required data in parallel
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
