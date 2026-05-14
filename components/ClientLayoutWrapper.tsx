'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // If we are in the Studio, do not render the storefront UI.
  // This allows Sanity to take over the entire viewport correctly.
  if (isStudio) {
    return (
      <div className="h-screen w-screen overflow-hidden">
        {children}
      </div>
    );
  }

  // Otherwise, render the normal storefront layout
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
