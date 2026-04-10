import { ClientMotionDiv } from "@/components/ClientMotionDiv";

/**
 * Privacy Policy Page (Marketing Page)
 * 
 * A static marketing page located in the `(marketing)` folder, meaning it is NOT a product or species.
 * It lives at the route `/privacy-policy`.
 * 
 * Beginner Note:
 * This is a "Server Component" (no "use client"). We define `metadata` directly here.
 * Next.js automatically picks up this `metadata` object to generate the `<title>` and `<meta name="description">` tags 
 * in the HTML header, which helps Google understand what this page is about.
 */
export const metadata = {
  title: "Privacy Policy | Hansen Timber",
  description: "Our commitment to the privacy and security of your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-sand pt-32 pb-24 px-6 md:px-12">
      <ClientMotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-oak font-sans font-bold block mb-4">Legal</span>
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-8">Privacy Policy</h1>
          <div className="w-16 h-px bg-muted-oak mx-auto"></div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-8 md:p-16 rounded-3xl shadow-sm border border-black/5 prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/80 prose-p:font-light prose-a:text-muted-oak hover:prose-a:text-charcoal transition-colors">

          <h2>Respecting your privacy</h2>
          <p>
            Our company is committed to complying with the Privacy Amendment (Private Sector) Act 2020, and the privacy provisions of all applicable legislation.
          </p>
          <p>
            The Act sets clear standards for the collection, access, storage and use of personal information that we obtain as part of our business operations. This includes information we have collected from people in person, via email, from our web site, over the phone and on work sites.
          </p>

          <h2>Your information</h2>
          <p>
            We will only collect information that is necessary for us to establish a trading account for you and provide products and services. As well as individual details of personnel, we may require information regarding your business operations.
          </p>
          <p>
            We will not give out any of your information to any third parties except in compliance with a request of a law enforcement or government department. Under no circumstances will your name, e-mail, phone number or address or any other personal information be sold to, or given to any other parties. We will never willfully sell, lease, or rent any of your or your business' personally identifiable information to any third party.
          </p>

          <h2>Access to your personal information</h2>
          <p>
            We will provide you with access to any of your personal information we hold (except in the limited circumstances recognised by privacy law).
          </p>
          <p>
            If you require access or need to update your information (eg. if you change your address), please contact us so we can make the change.
          </p>

          <h2>More information</h2>
          <p>
            More information about Privacy law and the National Privacy Principles is available from the following website: <a href="https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23223.html" target="_blank" rel="noopener noreferrer">Privacy Act 2020 Framework</a>.
          </p>

          <h2>Availability and review of policy</h2>
          <p>
            We will make our privacy policy available on request and will provide a link to this policy from our Internet site. This policy will be reviewed from time to time and any amendments will be incorporated in the updated policy.
          </p>

          <h2>Contact Details</h2>
          <p>
            If you have any questions relating to this Privacy Policy please contact our team by emailing <a href="mailto:ashlea@hansentimber.co.nz">ashlea@hansentimber.co.nz</a> or calling 09 242 3644.
          </p>
        </div>
      </ClientMotionDiv>
    </main>
  );
}
