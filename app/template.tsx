"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Route transition wrapper ensuring components smoothly unmount. 
 * Resolves Framer Motion layout thrashing in Next.js 15 App router.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Sanity Studio handles its own internal routing and animations.
  // We must bypass Framer Motion here to prevent the Studio from remounting/flashing on every click.
  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
