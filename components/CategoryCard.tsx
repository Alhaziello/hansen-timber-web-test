"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function CategoryCard({ category }: { category: any }) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const imageUrl = category.image ? urlFor(category.image).url() : "/placeholder.png";

  return (
    <motion.div
      variants={cardVariants}
      className="group relative h-[450px] overflow-hidden bg-charcoal"
    >
      <Link href={`/products/${category.id}`} className="block w-full h-full">
        {/* Background Image */}
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={imageUrl}
            alt={category.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent"></div>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col justify-end">
          <h3 className="text-3xl font-serif text-sand mb-3 transform group-hover:-translate-y-2 transition-transform duration-500">
            {category.title}
          </h3>
          
          <p className="text-sand/70 text-sm font-sans mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-2">
            {category.description}
          </p>

          <div className="overflow-hidden">
            <button className="flex items-center gap-2 text-muted-oak text-xs uppercase tracking-[0.2em] font-sans font-semibold border-b border-transparent hover:border-muted-oak pb-1 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-200">
              Learn More
              <svg 
                width="16" 
                height="8" 
                viewBox="0 0 16 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M1 4H15M15 4L12 1M15 4L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
