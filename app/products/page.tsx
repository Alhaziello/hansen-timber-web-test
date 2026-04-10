import CollectionsView from "@/components/CollectionsView";
import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";

/**
 * Products Page (Server Component)
 * 
 * The route rendered when a user visits `/products`.
 * It acts purely as a data-fetcher. It grabs all the products and all the 
 * different categories from Sanity, and hands them off to the interactive 
 * `CollectionsView` client component to do the heavy lifting (filtering, animations).
 */
export default async function ProductsPage() {
  // Fetching products and categories simultaneously for maximum speed.
  const [{ data: products }, { data: categories }] = await Promise.all([
    sanityFetch({ query: allProductsQuery }),
    sanityFetch({ query: allCategoriesQuery }),
  ]);

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <CollectionsView products={products} categories={categories} />
      </div>
    </main>
  );
}
