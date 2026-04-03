import { ClientMotionDiv } from "@/components/ClientMotionDiv";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <ClientMotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8">Connect</h1>
        <div className="w-24 h-px bg-muted-oak mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif mb-6">Albany Showroom</h2>
            <p className="text-charcoal/60 mb-8 leading-relaxed">
              123 Timber Lane,<br />
              Albany, Auckland 0632<br />
              New Zealand
            </p>
            <div className="space-y-4">
              <p className="font-serif">0800 HANSEN</p>
              <p className="font-serif">enquiries@hansentimber.co.nz</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors" />
            <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors" />
            <textarea placeholder="Message" rows={4} className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors resize-none"></textarea>
            <button className="bg-charcoal text-sand px-8 py-3 uppercase tracking-widest text-xs hover:bg-muted-oak hover:text-charcoal transition-all duration-300">Send Inquiry</button>
          </div>
        </div>
      </ClientMotionDiv>
    </main>
  );
}
