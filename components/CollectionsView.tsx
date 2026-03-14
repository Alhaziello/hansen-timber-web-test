"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProductGrid from "./ProductGrid";

interface CollectionsViewProps {
  products: any[];
  categories: any[];
}

export default function CollectionsView({ products, categories }: CollectionsViewProps) {
  const [activeFilter, setActiveFilter] = useState("all");

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
