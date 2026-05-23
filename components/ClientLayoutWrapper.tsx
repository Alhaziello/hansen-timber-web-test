/**
 * @file ClientLayoutWrapper.tsx
 * @description A dynamic layout wrapper that intercepts routing to conditionally render the storefront UI or the embedded Sanity CMS.
 * @dependencies next/navigation
 * @state Derives current routing path to determine UI boundary context.
 */
'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Configuration properties for the ClientLayoutWrapper component.
 */
interface ClientLayoutWrapperProps {
  /** The child React nodes representing the page content. */
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // NOTE: If we are in the Studio, do not render the storefront UI.
  // This allows Sanity to take over the entire viewport correctly.
  // EDGE CASE: If global CSS conflicts occur inside the Studio, ensure tailwind resets are scoped.
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
