import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { speciesBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProductGrid from "@/components/ProductGrid";
import { PortableText } from "@portabletext/react";

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

/**
 * Memoized fetch function
 * 
 * Beginner Note:
 * `cache` is a React function that remembers the result of this data fetch. 
 * Because we need the species data TWICE (once to generate the `<title>` tags for SEO, 
 * and once to actually build the page html), this cache ensures we only make ONE request to Sanity CMS.
 */
const getSpecies = cache(async (slug: string) => {
  const { data } = await sanityFetch({
    query: speciesBySlugQuery,
    params: { slug }
  });
  return data as any;
});

/**
 * generateMetadata
 * Next.js automatically looks for this exact function name to build out SEO logic for dynamic pages!
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const species = await getSpecies(slug);

  if (!species) return {};

  return {
    title: `${species.name} Timber | Hansen Timber`,
    description: species.description || `Discover our premium ${species.name} timber products.`,
    openGraph: {
      images: species.image ? [urlFor(species.image).url()] : [],
    },
  };
}

/** 
 * Species Detail Page (Dynamic Server Component)
 * 
 * Resolves URLs like `/species/macrocarpa`. 
 * Displays deep information about the wood type and maps out which products use it.
 */
export default async function SpeciesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const species = await getSpecies(slug);

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
            {species.tagline && (
              <p className="text-muted-oak text-xl font-serif mb-8">{species.tagline}</p>
            )}
            <p className="text-charcoal/70 text-lg font-sans leading-relaxed mb-12 max-w-xl">
              {species.description}
            </p>

            {species.features && species.features.length > 0 && (
              <div className="space-y-4">
                {species.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-px bg-muted-oak"></div>
                    <span className="text-xs uppercase tracking-widest font-sans font-bold text-charcoal">{feature}</span>
                  </div>
                ))}
              </div>
            )}
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
              loading="eager"
            />
          </ClientMotionDiv>
        </div>

        {/* Deep Content / Story & History */}
        {species.content && species.content.length > 0 && (
          <div className="mb-24 pt-16 border-t border-muted-oak/10 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-serif text-charcoal lowercase italic leading-tight">
                Hitory &amp; Heritage
              </h2>
              <p className="text-muted-oak text-sm font-sans mt-4">
                The history, sourcing, and architectural significance of {species.name} timber.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="prose prose-charcoal-hansen max-w-none">
                <PortableText value={species.content} components={ptComponents} />
              </div>
            </div>
          </div>
        )}

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
