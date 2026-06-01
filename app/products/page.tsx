/**
 * @file page.tsx (Products Hub)
 * @description The main products index page. Serves as a data-fetching wrapper for the interactive `CollectionsView`.
 * @dependencies sanityFetch, CollectionsView
 * @route /products
 * @state Server Component (Data fetching at request time, passes data to client components).
 */
import CollectionsView from "@/components/CollectionsView";
import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic';

/**
 * Asynchronously renders the primary Products Hub page.
 * Fetches all products and categories simultaneously to pass down to the client layout.
 */
export default async function ProductsPage() {
  // NOTE: Fetching products and categories simultaneously using `Promise.all` for maximum server-side speed.
  // EDGE CASE: If Sanity fails to return data, these will default to undefined, which the `CollectionsView` must handle gracefully.
  const [{ data: products }, { data: categories }] = await Promise.all([
    sanityFetch({ query: allProductsQuery }),
    sanityFetch({ query: allCategoriesQuery }),
  ]) as any;

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <CollectionsView products={products} categories={categories} />
      </div>
    </main>
  );
}
