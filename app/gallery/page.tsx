import { sanityFetch } from "@/sanity/lib/live";
import { allProjectsQuery } from "@/sanity/lib/queries";
import ProjectCard from "@/components/ProjectCard";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

/**
 * Gallery Index Page (Server Component)
 * 
 * Located at `/gallery`. It queries all architectural projects from Sanity
 * and sets up the primary grid view.
 * 
 * Beginner Note:
 * This IS a "Server Component" (because it has no "use client" directive at the top). 
 * By default, Next.js 13+ App Router components are rendered on the server. 
 * We define `metadata` directly here, which Next.js uses to generate the `<title>` tags for SEO.
 */
export const metadata = {
  title: "Architectural Gallery | Hansen Timber",
  description: "Explore our portfolio of high-end architectural projects featuring premium New Zealand timber.",
};

export default async function GalleryPage() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });

  return (
    <main className="min-h-screen bg-sand pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <span className="text-muted-oak text-xs uppercase tracking-[0.4em] font-sans font-bold mb-6 block">
            Portfolio
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-charcoal mb-4 tracking-tight leading-[1.1]">
            Architectural Gallery
          </h1>
          <p className="text-charcoal/60 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            A curation of high-end projects showcasing the natural beauty and structural integrity of Hansen Timber in professional architectural applications.
          </p>
        </ClientMotionDiv>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {projects.map((project: any, index: number) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border-t border-charcoal/5">
            <p className="text-charcoal/30 font-serif text-2xl italic">Gallery is being curated. Check back soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
