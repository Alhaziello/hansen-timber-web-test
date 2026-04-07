import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { categoryWithProductsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProductGrid from "@/components/ProductGrid";
import { ClientMotionDiv } from "@/components/ClientMotionDiv"; // I will create this or use a client wrapper

const getCategory = cache(async (categoryId: string) => {
  const { data } = await sanityFetch({ 
    query: categoryWithProductsQuery, 
    params: { slug: categoryId } 
  });
  return data;
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

export default async function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params;
  const category = await getCategory(categoryId);

  if (!category) {
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

        <ProductGrid products={category.products} />
      </ClientMotionDiv>
    </main>
  );
}
