import Link from "next/link";

/**
 * Footer Component
 * 
 * The main global footer that appears at the bottom of every page.
 * Contains the brand messaging, social media links, quick navigation to important pages,
 * and contact information. 
 * 
 * Beginner Note:
 * This component is "static" (it doesn't use any hooks or state), which is why we don't 
 * need the "use client" directive at the top. It renders on the server for better performance.
 */
export default function Footer() {
  return (
    <footer className="bg-charcoal text-sand pt-20 pb-10 border-t border-muted-oak/20 mt-22 md:mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 md:gap-24">
        {/* Brand & Socials */}
        <div className="flex-1">
          <Link href="/" className="inline-block mb-6">
            <h2 className="text-3xl font-serif text-white hover:text-muted-oak transition-colors duration-300">
              Hansen Timber
            </h2>
          </Link>
          <p className="text-sand/80 font-light text-lg mb-2">
            Got Wood ideas? We are here to shape them.
          </p>
          <p className="text-sand/60 text-sm mb-8 tracking-wide">
            Precision in wood crafting since 1874.
          </p>

          <div className="flex gap-4 items-center">
            {/* Instagram Icon */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-sand/20 rounded-full hover:bg-muted-oak hover:text-charcoal hover:border-transparent transition-all duration-300"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Facebook Icon */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-sand/20 rounded-full hover:bg-muted-oak hover:text-charcoal hover:border-transparent transition-all duration-300"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="flex gap-16 flex-wrap">
          <div className="flex flex-col gap-4">
            <span className="font-bold tracking-widest uppercase text-xs text-muted-oak mb-2">
              Discover
            </span>
            <Link
              href="/products"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              href="/species"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Species
            </Link>
            <Link
              href="/gallery"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Your Projects
            </Link>
            <Link
              href="/journal"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Journal
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-bold tracking-widest uppercase text-xs text-muted-oak mb-2">
              Company
            </span>
            <Link
              href="/about"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-sand/50 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Hansen Timber. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-sand/70 font-light">
          <span>09 242 3644</span>
          <span className="hidden md:inline">&bull;</span>
          <span>52 Eyres Road, Clevedon 2585, NZ</span>
        </div>
      </div>
    </footer>
  );
}
