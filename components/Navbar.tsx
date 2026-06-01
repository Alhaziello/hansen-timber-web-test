/**
 * @file Navbar.tsx
 * @description The main fixed global navigation bar. Orchestrates the transition from a transparent
 * to a solid background based on scroll position and route context, and controls the MenuDrawer state.
 * @dependencies next/link, next/navigation, MenuDrawer
 * @state Manages scroll threshold boolean (`scrolled`) and drawer visibility (`isOpen`).
 */
"use client"; // NOTE: Marks this component to be rendered on the client-side, allowing the use of React hooks like useState and useEffect.

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuDrawer from "./MenuDrawer";
import { TreeIcon } from '@/components/TreeIcon';
/**
 * Renders the responsive global navigation header.
 */
export default function Navbar() {
  // `isOpen` tracks whether the full-screen hamburger menu is visible
  const [isOpen, setIsOpen] = useState(false);
  // `scrolled` tracks if the user has scrolled down the page, changing the navbar from transparent to a solid color
  const [scrolled, setScrolled] = useState(false);

  // NOTE: `usePathname` gets the current URL path.
  // EDGE CASE: If the navbar background remains transparent on internal pages, text might blend into light backgrounds.
  // We force a solid background on all routes EXCEPT the homepage.
  const pathname = usePathname();

  // The useEffect hook runs once when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if we should show the solid background
  // If we are NOT on the homepage, or if we have scrolled, make it solid.
  const isHomePage = pathname === "/";
  const showSolidNav = !isHomePage || scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 border-b ${showSolidNav
          ? "bg-charcoal/90 backdrop-blur-md border-white/10 py-4 shadow-2xl"
          : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl md:text-3xl font-serif text-sand hover:text-muted-oak transition-colors duration-300"
          >
            Hansen Timber
            <TreeIcon className="w-6 h-6 md:w-8 md:h-8" />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="text-sm font-sans text-sand tracking-[0.3em] uppercase hover:text-muted-oak transition-colors duration-300 flex items-center gap-4"
          >
            <span className="hidden md:inline">Menu</span>
            <div className="flex flex-col gap-1.5">
              <div className="w-6 h-px bg-current"></div>
              <div className="w-6 h-px bg-current"></div>
            </div>
          </button>
        </div>
      </nav>

      <MenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
