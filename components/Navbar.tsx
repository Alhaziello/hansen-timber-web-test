"use client"; // Marks this component to be rendered on the client-side, allowing the use of React hooks like useState and useEffect.

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuDrawer from "./MenuDrawer";

/**
 * Navbar Component
 * 
 * The main fixed navigation bar for the Hansen Timber website.
 * It features a transparent to solid background transition when scrolling,
 * and controls the state of the full-screen MenuDrawer.
 * 
 * Beginner Note:
 * - We use `useState` to track if the menu is open (`isOpen`) and if the user has scrolled down (`scrolled`).
 * - `useEffect` attaches a scroll listener to the browser window so we can change the navbar styling smoothly.
 */
export default function Navbar() {
  // `isOpen` tracks whether the full-screen hamburger menu is visible
  const [isOpen, setIsOpen] = useState(false);
  // `scrolled` tracks if the user has scrolled down the page, changing the navbar from transparent to a solid color
  const [scrolled, setScrolled] = useState(false);
  
  // `usePathname` gets the current URL path. We use this to hide the Navbar on the Sanity Studio backend.
  const pathname = usePathname();

  // If the user happens to be in the /studio route (the Sanity CMS interface), don't render the frontend navbar at all.
  if (pathname?.startsWith("/studio")) return null;

  // The useEffect hook runs once when the component mounts because the dependency array `[]` is empty.
  useEffect(() => {
    // This function checks the scroll position. If it's more than 20 pixels, we set `scrolled` to true.
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Add the event listener to the browser window
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup function: React runs this when the component unmounts to prevent memory leaks.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 border-b ${
          scrolled
            ? "bg-charcoal/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-serif text-sand hover:text-muted-oak transition-colors duration-300"
          >
            Hansen Timber
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
