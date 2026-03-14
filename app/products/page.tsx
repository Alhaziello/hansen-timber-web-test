import CollectionsView from "@/components/CollectionsView";
import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";

export default async function ProductsPage() {
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
