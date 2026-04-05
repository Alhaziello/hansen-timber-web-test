"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

export default function ContactPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  
  const actionUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || "PLACEHOLDER"}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("idle");
        router.push("/thanks");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

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
              <p className="text-charcoal/70 text-lg font-serif italic mb-8 leading-relaxed">
                52 Eyres Road,<br />
                Clevedon 2585<br />
                New Zealand
              </p>
              <div className="space-y-4 text-center md:text-left">
                <p className="font-sans text-charcoal text-sm tracking-widest">09 242 3644</p>
                <p className="font-sans text-charcoal text-sm tracking-widest">enquiries@hansentimber.co.nz</p>
              </div>
            </div>
          </div>
          
          <div>
            <form 
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Hidden Subject Field for Formspree */}
              <input type="hidden" name="_subject" value="New Enquiry from Hansen Timber Website" />
              
              <div className="space-y-1">
                <label htmlFor="fullName" className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-oak ml-1">Full Name</label>
                <input 
                  id="fullName"
                  name="fullName" 
                  type="text" 
                  required
                  placeholder="Theodore Hansen" 
                  className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors font-serif placeholder:text-charcoal/20" 
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-oak ml-1">Email Address</label>
                <input 
                  id="email"
                  name="email" 
                  type="email" 
                  required
                  placeholder="enquiries@hansentimber.co.nz" 
                  className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors font-serif placeholder:text-charcoal/20" 
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-oak ml-1">Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  required
                  placeholder="Tell us about your project..." 
                  rows={4} 
                  className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors resize-none font-serif placeholder:text-charcoal/20"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === "submitting"}
                className={`w-full md:w-auto bg-charcoal text-sand px-12 py-4 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-muted-oak hover:text-charcoal transition-all duration-500 shadow-sm ${
                  status === "submitting" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {status === "submitting" ? "Sending..." : "Send Inquiry"}
              </button>

              {status === "error" && (
                <p className="text-[10px] text-red-500 font-sans tracking-tight italic mt-4">
                  Sorry, there was an error sending your enquiry. Please check your connection and try again.
                </p>
              )}

              {(process.env.NEXT_PUBLIC_FORMSPREE_ID || "PLACEHOLDER") === "PLACEHOLDER" && (
                <p className="text-[10px] text-red-500/60 font-sans tracking-tight italic mt-4">
                  Note: Formspree ID not set. Please add NEXT_PUBLIC_FORMSPREE_ID to your .env file.
                </p>
              )}
            </form>
          </div>
        </div>
      </ClientMotionDiv>
    </main>
  );
}
