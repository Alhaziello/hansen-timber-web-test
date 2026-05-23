/**
 * @file ProjectCard.tsx
 * @description A visual card component displaying an individual architectural project from the gallery.
 * Implements scroll-triggered, staggered entrance animations.
 * @dependencies framer-motion, next/image, next/link
 * @state Stateless client component (relies on Framer Motion viewport triggers).
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

import { Project } from "@/lib/types";

/**
 * Configuration properties for the ProjectCard component.
 */
interface ProjectCardProps {
  /** The project data object retrieved from Sanity CMS. */
  project: Project;
  /** The index of the card in the gallery grid, used to calculate animation stagger delay. */
  index: number;
}

/**
 * Renders an animated project summary card with hover reveals.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.png";

  return (
    // NOTE: `whileInView` triggers the animation only when the card scrolls into the viewport.
    // EDGE CASE: `viewport={{ once: true }}` prevents the animation from re-playing if the user scrolls up and down rapidly, saving CPU overhead.
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/gallery/${project.slug}`} className="block relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted-oak/10 mb-6">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-serif text-charcoal group-hover:text-muted-oak transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-muted-oak font-sans font-bold mt-2">
              View Project
            </span>
          </div>
          {project.client && (
            <p className="text-xs uppercase tracking-widest text-charcoal/40 font-sans font-semibold">
              {project.client}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
