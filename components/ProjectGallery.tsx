"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProjectGalleryProps {
  images: any[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-muted-oak/10 shadow-sm transition-all duration-700 hover:shadow-xl group"
        >
          <Image
            src={urlFor(image).url()}
            alt={`Project detail ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
}
