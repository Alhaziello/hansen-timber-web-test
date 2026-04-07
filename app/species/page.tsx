import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { allSpeciesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

// Interface for the data returned from allSpeciesQuery
interface Species {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: any;
}

export default async function SpeciesPage() {
  const { data: speciesList } = await sanityFetch({ query: allSpeciesQuery });

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <ClientMotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-serif text-charcoal mb-6 lowercase italic">Our Species</h1>
          <p className="text-charcoal/60 text-lg font-sans max-w-2xl leading-relaxed">
            From the strength of indigenous hardwoods to the versatility of sustainable softwoods, our species are selected for their architectural excellence and enduring performance.
          </p>
          <div className="w-24 h-px bg-muted-oak mt-12"></div>
        </ClientMotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {speciesList.map((s: Species, index: number) => {
            const imageUrl = s.image ? urlFor(s.image).url() : "/placeholder.png";
            return (
              <ClientMotionDiv
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/species/${s.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-charcoal mb-8 border border-muted-oak/10">
                    <Image 
                      src={imageUrl} 
                      alt={s.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-3xl md:text-4xl font-serif text-charcoal group-hover:text-muted-oak transition-colors">
                        {s.name}
                      </h2>
                      <div className="h-px flex-1 bg-muted-oak/20"></div>
                    </div>
                    
                    <p className="text-charcoal/70 text-base font-sans leading-relaxed max-w-xl">
                      {s.description}
                    </p>

                    <div className="pt-4">
                      <span className="inline-block px-10 py-3 bg-muted-oak text-charcoal text-[10px] uppercase tracking-[0.2em] font-sans font-bold rounded-full hover:bg-charcoal hover:text-sand transition-all duration-300">
                        View Deep Dive
                      </span>
                    </div>
                  </div>
                </Link>
              </ClientMotionDiv>
            );
          })}
        </div>
      </div>
    </main>
  );
}
