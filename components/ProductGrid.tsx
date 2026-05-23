/**
 * @file ProductGrid.tsx
 * @description A responsive CSS grid layout that displays a list of Products using the ProductCard component.
 * Incorporates a cascading "stagger" animation and handles smooth exit animations during list filtering.
 * @dependencies framer-motion, ProductCard
 * @state Stateless client component (relies on Framer Motion for layout animation).
 */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

/**
 * Configuration properties for the ProductGrid component.
 */
interface ProductGridProps {
  /** Array of product objects to render in the grid. */
  products: Product[];
}

/**
 * Renders an animated grid of ProductCards.
 */
export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {/* WARNING: `AnimatePresence` with `mode="popLayout"` ensures that elements leaving the DOM 
          don't take up space during their exit animation, creating a fluid reflow for remaining items. */}
      <AnimatePresence mode="popLayout">
        {(products || []).map((product, index) => (
          <ProductCard 
            // EDGE CASE: Ensure fallback to `_id` if standard `id` mapping is missing from Sanity.
            key={product.id || product._id} 
            product={product} 
            priority={index < 2}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
