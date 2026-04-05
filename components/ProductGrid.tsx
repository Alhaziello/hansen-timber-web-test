"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
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
        {products.map((product, index) => (
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
