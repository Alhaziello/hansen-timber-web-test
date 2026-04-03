import { ClientMotionDiv, ClientMotionArticle } from "@/components/ClientMotionDiv";
import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/api";

export default async function JournalPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <ClientMotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-oak font-sans font-bold block mb-4">Architectural Perspective</span>
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal mb-8 lowercase italic">The Journal</h1>
          <div className="w-12 h-px bg-muted-oak mx-auto"></div>
        </ClientMotionDiv>

        <div className="space-y-32">
          {articles.map((article, index) => (
            <ClientMotionArticle 
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/journal/${article.slug}`} className="block space-y-12 group">
                {article.image && (
                  <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted-oak/5">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-muted-oak/10 pb-4">
                    <span className="text-xs font-sans text-muted-oak tracking-widest uppercase">{article.category}</span>
                    <span className="text-xs font-sans text-charcoal/40 tracking-widest uppercase">{article.date ? new Date(article.date).toLocaleDateString() : article.date}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-serif text-charcoal group-hover:text-muted-oak transition-colors duration-500 leading-tight">
                    {article.title}
                  </h2>
                  
                  <p className="text-charcoal/60 text-lg font-sans leading-relaxed max-w-2xl text-balance">
                    {article.excerpt}
                  </p>

                  <div className="pt-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-charcoal border-b border-charcoal/20 pb-2 group-hover:border-muted-oak group-hover:text-muted-oak transition-all">
                      Read Narrative
                    </span>
                  </div>
                </div>
              </Link>
            </ClientMotionArticle>
          ))}
        </div>
      </div>
    </main>
  );
}
