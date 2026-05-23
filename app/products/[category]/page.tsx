/**
 * @file page.tsx (Product Category Detail)
 * @description Dynamic route rendering a specific category of products (e.g., Exterior, Interior, Slabs).
 * Determines whether to render a standard `ProductGrid` or a specialized `SlabGallery`.
 * @dependencies framer-motion, sanityFetch, ProductGrid, SlabGallery, ClientMotionDiv
 * @route /products/[category]
 * @state Dynamic Server Component (data fetches based on the category URL parameter).
 */
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { allSlabsQuery, categoryWithProductsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProductGrid from "@/components/ProductGrid";
import SlabGallery from "@/components/SlabGallery";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

const getCategory = cache(async (categoryId: string) => {
  const { data } = await sanityFetch({ 
    query: categoryWithProductsQuery, 
    params: { slug: categoryId } 
  });
  return data as any;
});

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = await getCategory(categoryId);
  
  if (!category) return {};

  return {
    title: `${category.title} Timber | Hansen Timber`,
    description: category.description || `Explore our ${category.title} collection.`,
    openGraph: {
      images: category.image ? [urlFor(category.image).url()] : [],
    },
  };
}

/**
 * Asynchronously renders the category detail page.
 * Acts as a router between standard products and the unique "Slabs" category.
 */
export default async function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  // NOTE: Awaits the route params as required by Next.js 15 before extracting the category ID.
  const { category: categoryId } = await params;
  const category = await getCategory(categoryId);

  if (!category) {
    // EDGE CASE: If the category does not exist, trigger a 404 response immediately.
    notFound();
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  
  // NOTE: "Slabs" have entirely different data structures in Sanity than standard products.
  // If the category is "slabs", we run a completely separate query and render a dedicated component.
  const isSlabsCategory = categoryId === "slabs";
  let slabs = [];

  if (isSlabsCategory) {
    const { data: slabsData } = await sanityFetch({ query: allSlabsQuery }) as any;
    slabs = slabsData;
  }

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <ClientMotionDiv
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="mb-16">
          <Link
            href="/products"
            className="text-muted-oak text-xs uppercase tracking-widest hover:text-charcoal transition-colors duration-300 mb-8 inline-block"
          >
            &larr; Back to hub
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-8xl font-serif text-charcoal mb-4 lowercase italic">
                {category.title}
              </h1>
              <p className="text-charcoal/60 text-lg max-w-xl font-sans">
                {category.description}
              </p>
            </div>
            <div className="text-right">
              {/* index might be hard to get without all categories but let's just keep it simple or fetch index */}
            </div>
          </div>
          <div className="w-24 h-px bg-muted-oak mt-12"></div>
        </div>

        {isSlabsCategory ? (
          <SlabGallery slabs={slabs} />
        ) : (
          <ProductGrid products={category.products} />
        )}
      </ClientMotionDiv>
    </main>
  );
}
