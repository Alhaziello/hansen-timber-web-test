import { sanityFetch } from "@/sanity/lib/live";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import ProjectGallery from "@/components/ProjectGallery";

const ptComponents = {
  block: {
    h3: ({ children }: any) => <h3 className="text-3xl font-serif text-charcoal mt-16 mb-6">{children}</h3>,
    normal: ({ children }: any) => <p className="text-charcoal/70 mb-8 leading-relaxed text-lg max-w-2xl">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="space-y-4 mb-10 ml-6 list-disc text-charcoal/70">{children}</ul>,
  },
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({ 
    query: projectBySlugQuery, 
    params: { slug } 
  });

  if (!project) {
    notFound();
  }

  const heroUrl = project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.png";

  return (
    <main className="min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <ClientMotionDiv
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/20" />
        </ClientMotionDiv>

        <div className="absolute inset-0 flex items-end pb-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-4xl"
            >
              <Link 
                href="/gallery"
                className="inline-flex items-center gap-2 text-sand/80 hover:text-sand mb-8 group transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold">Back to Gallery</span>
              </Link>
              <h1 className="text-6xl md:text-9xl font-serif text-sand mb-6 tracking-tight leading-[1] drop-shadow-sm">
                {project.title}
              </h1>
              {project.client && (
                <p className="text-sand/90 text-sm uppercase tracking-[0.5em] font-sans font-bold">
                  {project.client}
                </p>
              )}
            </ClientMotionDiv>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-8">
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="prose-hansen">
                  {project.content ? (
                    <PortableText value={project.content} components={ptComponents} />
                  ) : (
                    <p className="text-charcoal/70 text-xl font-sans leading-relaxed italic">
                      Narrative coming soon...
                    </p>
                  )}
                </div>
              </ClientMotionDiv>
            </div>
            
            <div className="lg:col-span-4 lg:pt-4">
              <ClientMotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-12 border-l border-charcoal/10 pl-12"
              >
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-charcoal/40 mb-4">Project Details</h4>
                  <p className="text-charcoal text-lg font-serif italic">{project.description}</p>
                </div>
                {project.completionDate && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-charcoal/40 mb-4">Completion</h4>
                    <p className="text-charcoal text-lg font-sans">{new Date(project.completionDate).getFullYear()}</p>
                  </div>
                )}
                <div>
                  <button className="bg-charcoal text-sand w-full py-5 uppercase tracking-[0.3em] text-xs font-bold hover:bg-muted-oak hover:text-charcoal transition-all duration-500">
                    Enquire about this style
                  </button>
                </div>
              </ClientMotionDiv>
            </div>
          </div>

          {/* Project Gallery Grid */}
          <div className="mt-32 border-t border-charcoal/5 pt-32">
            <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-24 tracking-tight">Project Details</h2>
            <ProjectGallery images={project.gallery} />
          </div>
        </div>
      </section>
    </main>
  );
}
