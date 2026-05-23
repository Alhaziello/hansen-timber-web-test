import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { productBySlugQuery, slabBySlugQuery } from "@/sanity/lib/queries";
import ProductDisplay from "@/components/ProductDisplay";
import SlabDisplay from "@/components/SlabDisplay";

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, id: string }> }) {
  const { id, category } = await params;
  const isSlabs = category === "slabs";

  // Fetch either slab or product based on category
  const { data: item } = await sanityFetch({ 
    query: isSlabs ? slabBySlugQuery : productBySlugQuery, 
    params: { slug: id } 
  }) as any;

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link 
          href={`/products/${category}`}
          className="inline-flex items-center gap-2 text-muted-oak hover:text-charcoal transition-colors mb-12 group"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:-translate-x-1 transition-transform">
            <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs uppercase tracking-widest font-sans font-semibold">Back to {category}</span>
        </Link>

        {isSlabs ? (
          <SlabDisplay slab={item} />
        ) : (
          <ProductDisplay 
            product={item} 
            category={category} 
          />
        )}
      </div>
    </main>
  );
}
