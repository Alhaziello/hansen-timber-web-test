import Hero from "@/components/Hero";
import SpeciesGallery from "@/components/SpeciesGallery";
import HeritageSection from "@/components/HeritageSection";

import { sanityFetch } from "@/sanity/lib/live";
import { allSpeciesQuery, homePageQuery } from "@/sanity/lib/queries";


export default async function Home() {
  // Fetch all required data in parallel
  const [
    { data: homeData },
    { data: speciesList }
  ] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: allSpeciesQuery }),
  ]);


  return (
    <main className="min-h-screen bg-sand">
      <Hero 
        title={homeData?.title} 
        subtitle={homeData?.heroSubtitle}
        bgImage={homeData?.heroImage}
      />



      <HeritageSection />

      <SpeciesGallery speciesList={speciesList} />

    </main>
  );
}
