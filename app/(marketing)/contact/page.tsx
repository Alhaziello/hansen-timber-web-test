import { Suspense } from "react";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery });

  const displayPhone = settings?.phoneNumber || "09 242 3644";
  const displayEmail = settings?.email || "enquiries@hansentimber.co.nz";
  const displayAddress = settings?.address || "52 Eyres Road, Clevedon 2585, New Zealand";

  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <ClientMotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 lowercase italic">Connect</h1>
        <div className="w-24 h-px bg-muted-oak mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-12">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-muted-oak mb-6 text-center md:text-left">Clevedon Mill</h2>
              <p className="text-charcoal/70 text-lg font-serif italic mb-8 leading-relaxed text-center md:text-left whitespace-pre-line">
                {displayAddress}
              </p>
              <div className="space-y-4 text-center md:text-left">
                <p className="font-sans text-charcoal text-sm tracking-widest">{displayPhone}</p>
                <p className="font-sans text-charcoal text-sm tracking-widest">{displayEmail}</p>
              </div>
            </div>

            {/* Elegant Map Integration */}
            <div className="pt-8 border-t border-muted-oak/10">
              <div className="relative w-full h-80 bg-charcoal/5 border border-muted-oak/10 overflow-hidden mb-6 group">
                <iframe
                  src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(displayAddress)}+(Hansen%20Timber)&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing location of Hansen Timber"
                  className="grayscale contrast-125 opacity-70 group-hover:opacity-90 group-hover:grayscale-[50%] transition-all duration-700 pointer-events-none md:pointer-events-auto"
                ></iframe>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(displayAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-charcoal hover:text-muted-oak transition-colors font-sans group"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Get Directions</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <Suspense fallback={<div className="font-serif italic text-charcoal/40">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </ClientMotionDiv>
    </main>
  );
}
