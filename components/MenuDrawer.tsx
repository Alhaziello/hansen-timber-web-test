"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Species", href: "/species" },
  { name: "Journal", href: "/journal" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-screen bg-charcoal z-[101] p-12 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="self-end text-sand hover:text-muted-oak transition-colors duration-300"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Links */}
            <nav className="mt-20 flex flex-col gap-8">
              {navLinks.map((link) => (
                <div key={link.href} className="group relative w-fit">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`text-4xl md:text-5xl font-serif transition-colors duration-300 ${
                      pathname === link.href ? "text-muted-oak" : "text-sand hover:text-muted-oak"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {/* Expanding Underline */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 h-px bg-muted-oak w-0"
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              ))}
            </nav>

            {/* Footer info maybe? */}
            <div className="mt-auto">
              <p className="text-sand/40 text-sm tracking-widest uppercase font-sans">
                Hansen Timber &copy; 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
