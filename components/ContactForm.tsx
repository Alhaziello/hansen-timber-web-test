/**
 * @file ContactForm.tsx
 * @description A robust client-side form component integrating with Formspree for handling customer enquiries.
 * Supports URL pre-filling for contextual enquiries (e.g., specific slab inquiries).
 * @dependencies next/navigation, Formspree (via fetch API)
 * @state Manages form data, submission lifecycle (idle, submitting, error), and error messaging.
 */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Renders the contact form and handles stateful submission logic.
 * Reads optional `subject` and `message` from URL parameters to pre-fill the form.
 */
export default function ContactForm() {
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

    // NOTE: Formspree endpoint integration.
    // WARNING: Ensure `NEXT_PUBLIC_FORMSPREE_ID` is set in the environment variables.
    // Without it, the form will fail to submit in production.
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
          const msg = result.errors.map((error: { field?: string; message: string }) => {
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
      {/* EDGE CASE: Formspree honeypot field to trap spam bots. Hidden from legitimate users via inline styles and attributes. */}
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
