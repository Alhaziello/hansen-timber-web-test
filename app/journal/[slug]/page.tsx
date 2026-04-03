import { ClientMotionDiv, ClientMotionHeader, ClientMotionFooter } from "@/components/ClientMotionDiv";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/components/ShareButton";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/journal"
          className="text-muted-oak text-[10px] uppercase tracking-widest hover:text-charcoal transition-colors mb-16 inline-block no-underline"
        >
          &larr; Back to Journal
        </Link>
        
        <ClientMotionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-muted-oak/10 pb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-oak font-sans font-bold block mb-6">
            {article.category} / {new Date(article.date).toLocaleDateString()}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 leading-tight lowercase italic">
            {article.title}
          </h1>
        </ClientMotionHeader>

        {article.image && (
          <ClientMotionDiv 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-16 relative aspect-video w-full overflow-hidden"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover grayscale"
            />
          </ClientMotionDiv>
        )}

        <ClientMotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-charcoal max-w-none font-sans text-charcoal/80 leading-relaxed text-lg"
        >
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </ClientMotionDiv>

        {/* Footer CTAs */}
        <ClientMotionFooter 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-16 border-t border-muted-oak/20 flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-charcoal">Inspired by this narrative?</h3>
            <p className="text-charcoal/60 text-sm">Discuss your architectural requirements with our timber specialists.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <Link 
              href="/contact"
              className="px-12 py-4 bg-muted-oak text-charcoal text-[10px] uppercase tracking-[0.3em] font-sans font-bold rounded-full text-center hover:bg-charcoal hover:text-sand transition-all duration-300"
            >
              Request Quote
            </Link>
            <ShareButton
              className="px-12 py-4 bg-transparent border border-muted-oak text-muted-oak text-[10px] uppercase tracking-[0.3em] font-sans font-bold rounded-full text-center hover:bg-muted-oak hover:text-charcoal transition-all duration-300"
            >
              Share Article
            </ShareButton>
          </div>
        </ClientMotionFooter>
      </div>
    </main>
  );
}
