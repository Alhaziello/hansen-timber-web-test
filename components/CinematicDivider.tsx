"use client";

/**
 * @file CinematicDivider.tsx
 * @description A premium full-width video divider component designed for the homepage.
 * Renders a slow-moving, muted, looping background video of the Clevedon sawmill.
 */
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const PLAYLIST = [
  "/videos/sawmillaction.mp4",
  "/videos/sawmillaction1.mp4",
];

export default function CinematicDivider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Safe autoplay catch
      });
    }
  }, [currentIdx]);

  const handleEnded = () => {
    setCurrentIdx((prev) => (prev + 1) % PLAYLIST.length);
  };

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden border-y border-muted-oak/10 bg-charcoal">
      {/* Background Video */}
      <video
        ref={videoRef}
        key={PLAYLIST[currentIdx]}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src={PLAYLIST[currentIdx]} type="video/mp4" />
      </video>

      {/* Elegant overlays to fit the Hansen design palette */}
      <div className="absolute inset-0 bg-charcoal/20 mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sand/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sand/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="space-y-4"
        >
          <span className="text-sand/60 text-xs uppercase tracking-[0.4em] font-sans font-bold block">
            Clevedon Sawmill
          </span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-sand lowercase italic tracking-tight leading-none">
            milling premium local timber daily.
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
