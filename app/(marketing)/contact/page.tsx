"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "validation_error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    _subject: "New Enquiry from Hansen Timber Website"
  });

  useEffect(() => {
    const subject = searchParams.get("subject");
    const message = searchParams.get("message");

    if (subject || message) {
      setFormData(prev => ({
        ...prev,
        _subject: subject || prev._subject,
        message: message || prev.message
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const actionUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || "PLACEHOLDER"}`;

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("idle");
        router.push("/thanks");
      } else {
        if (result.errors) {
          setStatus("validation_error");
          // Formspree returns an array of error objects
          const msg = result.errors.map((error: any) => {
            if (error.field) {
              return `${error.field.charAt(0).toUpperCase() + error.field.slice(1)} ${error.message}`;
            }
            return error.message;
          }).join(". ");
          setErrorMessage(msg);
        } else {
          setStatus("error");
          setErrorMessage("Sorry, there was an error sending your enquiry. Please check your connection and try again.");
        }
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Sorry, there was an error sending your enquiry. Please check your connection and try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input type="hidden" name="_subject" value={formData._subject} />
      {/* Honeypot field for spam prevention */}
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="false" />

      <div className="space-y-1">
        <label htmlFor="fullName" className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-oak ml-1">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
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
          value={formData.email}
          onChange={handleChange}
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
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={4}
          className="w-full bg-transparent border-b border-muted-oak/30 py-3 focus:outline-none focus:border-muted-oak transition-colors resize-none font-serif placeholder:text-charcoal/20"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full md:w-auto bg-charcoal text-sand px-12 py-4 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-muted-oak hover:text-charcoal transition-all duration-500 shadow-sm ${status === "submitting" ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>

      {(status === "error" || status === "validation_error") && (
        <p className="text-[10px] text-red-500 font-sans tracking-tight italic mt-4">
          {errorMessage}
        </p>
      )}

      {(process.env.NEXT_PUBLIC_FORMSPREE_ID || "PLACEHOLDER") === "PLACEHOLDER" && (
        <p className="text-[10px] text-red-500/60 font-sans tracking-tight italic mt-4">
          Note: Formspree ID not set. Please add NEXT_PUBLIC_FORMSPREE_ID to your .env file.
        </p>
      )}
    </form>
  );
}

export default function ContactPage() {
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
            <Suspense fallback={<div className="font-serif italic text-charcoal/40">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </ClientMotionDiv>
    </main>
  );
}
