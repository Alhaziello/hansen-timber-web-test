/**
 * @file template.tsx (Global Page Transitions)
 * @description Next.js 15 template file used to wrap route changes with Framer Motion animations.
 * Unlike `layout.tsx`, `template.tsx` forces a remount on navigation, enabling exit/enter animations.
 * @dependencies framer-motion, next/navigation
 * @route / (Applies to all routes dynamically)
 * @state Client Component.
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Route transition wrapper ensuring components smoothly unmount. 
 * Resolves Framer Motion layout thrashing in Next.js 15 App router.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // EDGE CASE: Sanity Studio handles its own internal routing and animations.
  // WARNING: We must bypass Framer Motion here to prevent the Studio from remounting/flashing on every click.
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
