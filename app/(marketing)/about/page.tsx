"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8">Our Heritage</h1>
        <div className="w-24 h-px bg-muted-oak mb-12"></div>
        
        <div className="prose prose-lg prose-stone">
          <p className="text-xl text-charcoal/80 leading-relaxed mb-6 font-light">
            Rooted in the Waitakere Ranges since 1874, Hansen Timber represents over a century of precision in wood crafting. 
            Our commitment to sustainability and architectural excellence defines every piece we mill.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div>
              <h2 className="text-2xl font-serif mb-4">Sustainability</h2>
              <p className="text-charcoal/60">
                Every log is sourced with the future in mind, ensuring New Zealand's forests remain vibrant for generations to come.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif mb-4">Waitakere Pride</h2>
              <p className="text-charcoal/60">
                Our base at the foot of the Waitakeres provides the perfect environment for slow-grown, high-density timber.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
