import { ClientMotionDiv } from "@/components/ClientMotionDiv";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <ClientMotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8">Architectural Gallery</h1>
        <div className="w-24 h-px bg-muted-oak mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] bg-charcoal/5 border border-muted-oak/10 flex items-center justify-center group overflow-hidden cursor-pointer">
              <span className="text-muted-oak/40 uppercase tracking-widest group-hover:scale-110 transition-transform duration-500">Project {i}</span>
            </div>
          ))}
        </div>
      </ClientMotionDiv>
    </main>
  );
}
