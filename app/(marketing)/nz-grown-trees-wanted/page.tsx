import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import Link from "next/link";

/**
 * Trees Wanted Page (Marketing Page)
 * 
 * A static marketing page located in the `(marketing)` folder, meaning it is NOT a product or species.
 * It lives at the route `/nz-grown-trees-wanted`.
 * 
 * Beginner Note:
 * This is a "Server Component" (no "use client"). We define `metadata` directly here.
 * Next.js automatically picks up this `metadata` object to generate the `<title>` and `<meta name="description">` tags 
 * in the HTML header, which helps Google understand what this page is about.
 */
export const metadata = {
  title: "NZ Grown Trees Wanted | Hansen Timber",
  description: "Have premium New Zealand grown timber on your property? Hansen Timber is always looking to sustainably source local wood.",
};

export default function TreesWantedPage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <ClientMotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-oak font-sans font-bold block mb-4">Sustainable Sourcing</span>
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 lowercase italic">Trees Wanted</h1>
        <div className="w-24 h-px bg-muted-oak mb-12 mx-auto"></div>

        <div className="prose prose-lg prose-stone mx-auto">
          <p className="text-xl text-charcoal/80 leading-relaxed mb-6 font-light">
            We are deeply committed to sourcing our timber locally and sustainably.
            If you have mature, high-quality New Zealand grown trees ready for harvest—such as Macrocarpa, Eucalyptus, or Pine—we would love to hear from you.
          </p>

          <div className="mt-16 bg-charcoal/5 p-12 border border-muted-oak/10">
            <h2 className="text-2xl font-serif mb-4 text-charcoal">Have trees to sell?</h2>
            <p className="text-charcoal/60 mb-8">
              Our experts can visit your property to assess the timber, manage the felling process responsibly, and ensure the wood is milled to its highest architectural potential.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-muted-oak text-charcoal text-[10px] uppercase tracking-[0.3em] font-sans font-bold rounded-full text-center hover:bg-charcoal hover:text-sand transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </ClientMotionDiv>
    </main>
  );
}
