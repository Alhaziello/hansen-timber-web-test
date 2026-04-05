"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    specs: string[];
    image: any;
    category?: {
      id: string;
      title: string;
    };
  };
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const imageUrl = product.image ? urlFor(product.image).url() : "/placeholder.png";
  const categorySlug = product.category?.id || "interior";

  return (
    <motion.div
      layout
      variants={itemVariants}
      className="group relative bg-white/5 border border-muted-oak/10 p-8 flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden mb-8">
        {product.image ? (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={priority}
            />
        ) : (
          <div className="w-full h-full bg-charcoal/5 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
            <span className="text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">Image Coming Soon</span>
          </div>
        )}
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors duration-500"></div>
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-serif text-charcoal mb-4 group-hover:text-muted-oak transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-charcoal/70 text-sm leading-relaxed mb-6 line-clamp-2">
          {product.description}
        </p>

        <ul className="space-y-2 mb-8">
          {product.specs?.slice(0, 3).map((spec, idx) => (
            <li key={idx} className="text-[10px] uppercase tracking-widest text-muted-oak font-bold flex items-center gap-2">
              <span className="w-1 h-1 bg-muted-oak rounded-full"></span>
              {spec}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Link
          href={`/products/${categorySlug}/${product.id}`}
          className="inline-block px-10 py-3 bg-muted-oak text-charcoal text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full hover:bg-charcoal hover:text-sand transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
