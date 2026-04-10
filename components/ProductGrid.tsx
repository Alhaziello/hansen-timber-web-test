"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

/**
 * ProductGrid Component
 * 
 * A responsive CSS grid layout that displays a list of Products using the ProductCard component.
 * It incorporates a cascading "stagger" animation so the products appear one by one instead of all at once.
 * 
 * Beginner Note:
 * - `AnimatePresence` allows products to animate out smoothly when the `products` array changes (like when filtering).
 * - `staggerChildren: 0.1` means each child component waits an extra 0.1s before playing its animation.
 */
interface ProductGridProps {
  products: Product[];
}

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
      <AnimatePresence mode="popLayout">
        {(products || []).map((product, index) => (
          <ProductCard 
            key={product.id || product._id} 
            product={product} 
            priority={index < 2}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
