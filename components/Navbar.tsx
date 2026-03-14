"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
