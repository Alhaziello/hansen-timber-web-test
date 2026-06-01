/**
 * @file page.tsx (Product Detail Router)
 * @description Dynamic route handling the primary display of a product or a specific slab.
 * It routes the data to either `SlabDisplay` or `ProductDisplay` based on the category.
 * @dependencies next/link, sanityFetch, ProductDisplay, SlabDisplay
 * @route /products/[category]/[id]
 * @state Dynamic Server Component (fetches either product or slab data based on URL params).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { productBySlugQuery, slabBySlugQuery } from "@/sanity/lib/queries";
import ProductDisplay from "@/components/ProductDisplay";
import SlabDisplay from "@/components/SlabDisplay";

/**
 * Dynamic Metadata Generation
 * Next.js automatically executes this before rendering the page component.
 * Request deduplication ensures `sanityFetch` is only executed once across both functions.
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string, id: string }> 
}): Promise<Metadata> {
  const { id, category } = await params;
  const isSlabs = category === "slabs";

  const { data: item } = await sanityFetch({ 
    query: isSlabs ? slabBySlugQuery : productBySlugQuery, 
    params: { slug: id } 
  }) as any;

  if (!item) return {};

  const seo = item.seo || {};
  const title = seo.metaTitle || `${item.name} | Hansen Timber`;

  let description = seo.metaDescription;
  if (!description && item.description) {
    description = item.description.length > 160 
      ? `${item.description.substring(0, 157)}...` 
      : item.description;
  }

  const ogImages = [];
  if (seo.openGraphImage) {
    ogImages.push(urlFor(seo.openGraphImage).width(1200).height(630).url());
  } else if (item.image) {
    ogImages.push(urlFor(item.image).width(1200).height(630).url());
  }

  let canonicalCategory = category;
  if (!isSlabs && item.categories && Array.isArray(item.categories)) {
    const hasExterior = item.categories.some((c: any) => c.id === 'exterior');
    const hasInterior = item.categories.some((c: any) => c.id === 'interior');
    if (hasExterior && hasInterior) {
      canonicalCategory = 'exterior';
    }
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hansentimber.co.nz';
  const canonicalUrl = isSlabs 
    ? `${BASE_URL}/products/slabs/${id}`
    : `${BASE_URL}/products/${canonicalCategory}/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    }
  };
}

/**
 * Asynchronously renders the Product Detail page.
 * Acts as a router to fetch and display either a unique Slab or a standard Product.
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, id: string }> }) {
  // NOTE: Awaits the route params as required by Next.js 15.
  const { id, category } = await params;
  
  // EDGE CASE: "slabs" are a completely different Sanity schema type than regular "products". 
  // We use the URL category to determine which query to run and which component to render.
  const isSlabs = category === "slabs";

  // Fetch either slab or product based on category
  const { data: item } = await sanityFetch({ 
    query: isSlabs ? slabBySlugQuery : productBySlugQuery, 
    params: { slug: id } 
  }) as any;

  if (!item) {
    notFound();
  }

  // Generate Product JSON-LD
  const imageUrl = item.image 
    ? urlFor(item.image).width(1200).height(630).url() 
    : undefined;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": item.name,
    "description": item.description || "",
    ...(imageUrl && { "image": imageUrl }),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
    },
  };

  // Generate FAQ JSON-LD if faqs exist
  let faqJsonLd = null;
  if (item.faqs && Array.isArray(item.faqs) && item.faqs.length > 0) {
    faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": item.faqs.map((faq: any) => {
        let answerText = "";
        if (faq.answer && Array.isArray(faq.answer)) {
          answerText = faq.answer
            .map((block: any) => {
              if (block._type !== "block" || !block.children) return "";
              return block.children.map((child: any) => child.text).join("");
            })
            .join("\n");
        } else if (typeof faq.answer === "string") {
          answerText = faq.answer;
        }

        return {
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answerText
          }
        };
      })
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
    </>
  );
}
