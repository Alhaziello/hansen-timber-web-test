/**
 * @file CollectionsView.tsx
 * @description The primary interactive layout for browsing the architectural timber inventory. 
 * Provides client-side filtering capabilities across loaded product and category data.
 * @dependencies framer-motion, ProductGrid
 * @state Manages active category filter ID to dynamically derive the rendered product list.
 */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { Product, Category } from "@/lib/types";

/**
 * Configuration properties for the CollectionsView component.
 */
interface CollectionsViewProps {
  /** Full inventory of statically generated product items. */
  products: Product[];
  /** Available architectural categories for filtering. */
  categories: Category[];
}

export default function CollectionsView({ products, categories }: CollectionsViewProps) {
  // NOTE: `activeFilter` tracks the ID of the currently selected category. Defaults to "all".
  // Because `activeFilter` changes, React re-renders this component.
  // During re-render, `filteredProducts` is dynamically recalculated using the `.filter()` method.
  const [activeFilter, setActiveFilter] = useState("all");

  // EDGE CASE: Ensure type safety for `p.category?.id` to prevent crashes on products missing a category mapping.
  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter((p: any) => p.category?.id === activeFilter);

  const filterOptions = [
    { label: "All", id: "all" },
    ...categories.map(c => ({ label: c.title, id: c.id }))
  ];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 lowercase italic">Our Collections</h1>
        <p className="text-charcoal/60 text-lg font-sans max-w-2xl mb-12 leading-relaxed">
          Explore our complete inventory of architectural timber. From precision-milled flooring to ancient slabs, every piece is selected for its unique character and structural integrity.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-20 border-b border-muted-oak/10 pb-8">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-8 py-2 text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-charcoal text-sand"
                  : "bg-transparent text-muted-oak border border-muted-oak/30 hover:border-muted-oak hover:text-charcoal"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      <ProductGrid products={filteredProducts} />
    </>
  );
}
