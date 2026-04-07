import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import TechnicalTable from "@/components/TechnicalTable";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

const ptComponents = {
  block: {
    h3: ({ children }: any) => <h3 className="text-2xl font-serif text-charcoal mt-10 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-charcoal/70 mb-6 leading-relaxed text-lg">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="space-y-3 mb-8 ml-4">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-charcoal/70">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-oak shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
};

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, id: string }> }) {
  const { id, category } = await params;

  const { data: product } = await sanityFetch({ 
    query: productBySlugQuery, 
    params: { slug: id } 
  });

  if (!product) {
    notFound();
  }

  const imageUrl = product.image ? urlFor(product.image).url() : "/placeholder.png";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Visual Side */}
          <ClientMotionDiv 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-muted-oak/10">
              <Image 
                src={imageUrl} 
                alt={product.name} 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </ClientMotionDiv>

          {/* Data Side */}
          <ClientMotionDiv 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-muted-oak text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4">
              {product.category?.title}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 leading-tight">
              {product.name}
            </h1>
            
            {/* Extended Editorial Content */}
            <div className="prose-hansen max-w-xl">
              {product.content ? (
                <PortableText value={product.content} components={ptComponents} />
              ) : (
                <p className="text-charcoal/70 text-lg font-sans leading-relaxed mb-12">
                  {product.description}
                </p>
              )}
            </div>

            <div className="mt-12">
              <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-charcoal/40 mb-4">Technical Specifications</h2>
              <TechnicalTable specs={product.specs} />
            </div>
            
            <Link href="/contact" className="mt-12 block w-fit">
              <button className="bg-charcoal text-sand px-10 py-5 uppercase tracking-[0.2em] text-sm hover:bg-muted-oak hover:text-charcoal transition-all duration-300">
                Request Sample Pack
              </button>
            </Link>
          </ClientMotionDiv>
        </div>
      </div>
    </main>
  );
}
