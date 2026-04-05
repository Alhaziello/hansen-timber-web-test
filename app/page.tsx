import Hero from "@/components/Hero";
import SpeciesGallery from "@/components/SpeciesGallery";
import ProductGrid from "@/components/ProductGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { featuredProductsQuery, allSpeciesQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const [{ data: featuredProducts }, { data: speciesList }] = await Promise.all([
    sanityFetch({ query: featuredProductsQuery }),
    sanityFetch({ query: allSpeciesQuery }),
  ]);

  return (
    <main className="min-h-screen bg-sand">
      <Hero bgImage="/images/home/hero-home.png" />

      {/* Featured Collections */}
      <section className="bg-sand py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Featured Collections</h2>
            <p className="text-charcoal/60 text-lg font-sans max-w-2xl mb-8 leading-relaxed">
              Precision-milled timber solutions for refined architectural interiors and enduring landscapes.
            </p>
            <div className="w-20 h-px bg-muted-oak"></div>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <SpeciesGallery speciesList={speciesList} />
    </main>
  );
}
