import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import Image from "next/image";

export const metadata = {
  title: "About Us | Hansen Timber",
  description:
    "Learn about the rich history of Hansen Timber, dating back to 1874.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-32">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-20 text-center">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-6">
            Build Beautifully with Hansen
          </h1>
          <div className="w-24 h-px bg-muted-oak mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto font-light leading-relaxed">
            We're passionate about helping you create beautiful AND functional
            New Zealand projects. Immerse in our history, dedication, and
            service.
          </p>
          <p className="text-lg text-charcoal/70 max-w-4xl mx-auto mt-6">
            At Hansen Timber, we take pride in being a leading timber processing
            company nestled in the picturesque landscapes of New Zealand. With a
            vast forest of pines and macrocarpa trees at our disposal, we bring
            you an extensive range of top-notch timber products to cater to all
            your needs.
          </p>
        </ClientMotionDiv>
      </section>

      {/* The Hansen Story - Split Layout */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
        {/* Left Column - Sticky Images */}
        <div className="lg:sticky top-28 self-start h-[80vh] lg:h-[80vh] xl:h-[calc(100vh_-_8rem)] flex flex-col gap-6 lg:gap-8 w-full">
          {/* First Image */}
          <div 
            className="relative flex-1 w-full rounded-3xl overflow-hidden shadow-xl group border border-white/10"
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
          >
            <Image
              src="/images/ui/Gemini_Generated_Image_wvbie6wvbie6wvbi.png"
              alt="Hansen Timber Heritage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 border border-white/20 rounded-3xl z-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-charcoal/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <span className="bg-muted-oak text-charcoal px-4 py-2 uppercase tracking-[0.3em] text-[10px] font-bold font-sans rounded-full">
                Heritage
              </span>
              <p className="text-sand font-serif text-2xl mt-4 drop-shadow-md">
                Since 1874
              </p>
            </div>
          </div>

          {/* Second Image */}
          <div 
            className="relative flex-1 w-full rounded-3xl overflow-hidden shadow-xl group border border-white/10"
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
          >
            <Image
              src="/images/ui/Gemini_Generated_Image_6z47ys6z47ys6z47.png"
              alt="Hansen Timber Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/20 rounded-3xl z-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-charcoal/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <span className="bg-muted-oak text-charcoal px-4 py-2 uppercase tracking-[0.3em] text-[10px] font-bold font-sans rounded-full">
                Legacy
              </span>
              <p className="text-sand font-serif text-2xl mt-4 drop-shadow-md">
                Generations of Skill
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - The History */}
        <div className="py-10">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-12 relative">
              The Hansen Story
            </h2>

            <div className="prose prose-lg md:prose-xl prose-stone max-w-none text-charcoal/80 font-light">
              <p className="mb-10">
                <span className="text-6xl md:text-7xl font-serif text-muted-oak float-left mr-6 -mt-3 mb-2 leading-none">
                  1874
                </span>
                Hansen Timber's origins begin when Peder Christian Hansen
                arrived in Gisborne by ship from the Island of Fyn (now called
                Funen) with his wife Maria and five of their children. The
                courage and fortitude of these emigrants leaving their home
                lands and setting off in a smallish sailing ship to go to a new
                and unknown country with a different lifestyle and unknown
                language has to be marvelled at. There were many deaths and
                damaging storms on the journey.
              </p>

              <div className="w-16 h-px bg-muted-oak/30 my-12"></div>

              <p className="mb-10">
                The New Zealand Hansen Milling story begins when Hans Peter
                Christian (son of Peter Christian Hansen) is recorded as being
                one of the earliest pioneer settlers in the Motu District which
                was then in its origin state being covered in dense bush. The
                hardy pioneer and his sons had to make a clearing before they
                could even erect a tent. The timber they milled was used to
                build most of the houses and local buildings in the area.
              </p>

              <div className="w-16 h-px bg-muted-oak/30 my-12"></div>

              <p className="mb-10">
                Jumping several generations Hansen Timber ends up in Clevedon,
                with John Hansen Ryall a direct Danish descendant continuing in
                the milling industry. John's father "Phil" married Judy Hansen
                and from the beginning in the late 1950's, timber was milled on
                the farm in various ways. Firstly backbreaking work by freehand
                chainsaw to produce all the fence posts used on our farm, then
                by Alaskan Mill and later a single large rotary blade bench saw.
              </p>

              <div className="w-16 h-px bg-muted-oak/30 my-12"></div>

              <p className="mb-16">
                More recently newer equipment such as a bandsaw, mortiser
                planer, wide belt sander and a European Weinig Powermat Moulding
                Machine, has been employed to add value to the timber that is
                sawn and processed at Eyres Road in Clevedon.
              </p>

              <div className="bg-charcoal text-sand p-10 md:p-14 rounded-3xl mt-16 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-muted-oak/20 rounded-full blur-[3rem]"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-[3rem]"></div>
                <p className="font-medium text-xl md:text-2xl leading-relaxed m-0 relative z-10 font-serif italic text-white/90">
                  "Hansen Timber is proud to be part of a renewable resource
                  industry and on this Clevedon property has planted more than
                  <span className="text-muted-oak block text-3xl md:text-4xl mt-4 font-normal not-italic tracking-wide">
                    200,000 native trees
                  </span>
                  which are protected and can never be milled to support our
                  environmental conservation efforts."
                </p>
              </div>
            </div>
          </ClientMotionDiv>
        </div>
      </section>
    </main>
  );
}
