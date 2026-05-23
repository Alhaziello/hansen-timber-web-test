/**
 * @file page.tsx (Thanks)
 * @description A static confirmation page displayed after a user successfully submits a contact or enquiry form.
 * @dependencies next/link, ClientMotionDiv
 * @route /thanks
 * @state Server Component (static HTML rendering).
 */
import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import Link from "next/link";

/**
 * Next.js Metadata configuration for the /thanks route.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata = {
  title: "Thank You | Hansen Timber",
  description: "A professional acknowledgement for your enquiry to Hansen Timber.",
};

/**
 * Renders the static Thank You confirmation page.
 */
export default function ThankYouPage() {
  return (
    // NOTE: This page provides a necessary UX confirmation for successful form submissions.
    // EDGE CASE: If a user navigates here directly without submitting a form, it simply acts as a polite message with a link home.
    <main className="min-h-screen bg-sand flex items-center justify-center px-6">
      <ClientMotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl text-center"
      >
        <span className="text-muted-oak text-xs uppercase tracking-[0.4em] font-sans font-bold mb-8 block">
          Enquiry Received
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8 lowercase italic">
          Thank you for reaching out
        </h1>
        <div className="w-16 h-px bg-muted-oak mx-auto mb-8"></div>
        <p className="text-charcoal/70 text-lg md:text-xl font-sans leading-relaxed mb-12">
          Your enquiry has been successfully delivered. A timber consultant from our Clevedon Mill will review your project and be in touch shortly.
        </p>

        <Link
          href="/"
          className="inline-block bg-charcoal text-sand px-12 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-muted-oak hover:text-charcoal transition-all duration-500"
        >
          Return Home
        </Link>
      </ClientMotionDiv>
    </main>
  );
}
