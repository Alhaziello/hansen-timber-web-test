import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { speciesBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProductGrid from "@/components/ProductGrid";

export default async function SpeciesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: species } = await sanityFetch({ 
    query: speciesBySlugQuery, 
    params: { slug } 
  });

  if (!species) {
    notFound();
  }

  const imageUrl = species.image ? urlFor(species.image).url() : "/placeholder.png";

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/species"
          className="text-muted-oak text-xs uppercase tracking-widest hover:text-charcoal transition-colors mb-12 inline-block"
        >
          &larr; All Species
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <ClientMotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-charcoal mb-4 lowercase italic">
              {species.name}
            </h1>
            <p className="text-muted-oak text-xl font-serif mb-8">{species.tagline}</p>
            <p className="text-charcoal/70 text-lg font-sans leading-relaxed mb-12 max-w-xl">
              {species.description}
            </p>
            
            <div className="space-y-4">
              {species.features?.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-px bg-muted-oak"></div>
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-charcoal">{feature}</span>
                </div>
              ))}
            </div>
          </ClientMotionDiv>

          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-square overflow-hidden"
          >
            <Image 
              src={imageUrl} 
              alt={species.name} 
              fill 
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </ClientMotionDiv>
        </div>

        {/* Linked Products */}
        {species.products && species.products.length > 0 && (
          <div className="pt-12 border-t border-muted-oak/10">
            <h2 className="text-3xl font-serif text-charcoal mb-12 lowercase italic">Collections feature {species.name}</h2>
            <ProductGrid products={species.products} />
          </div>
        )}
      </div>
    </main>
  );
}
