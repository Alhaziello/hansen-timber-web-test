export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "american-oak-vs-local-blackbutt",
    title: "American Oak vs. Local Blackbutt",
    date: "March 12, 2026",
    category: "Technical Guide",
    excerpt: "Choosing between imports and indigenous species is a critical architectural decision. We compare durability, grain patterns, and environmental impact.",
    content: `
      <p>In the world of luxury timber, the choice between American Oak and New Zealand-grown Eucalyptus Blackbutt is more than just an aesthetic decision—it's a statement about performance and heritage.</p>
      <h2>The Import: American Oak</h2>
      <p>American Oak has long been the gold standard for high-end interiors. Its consistent grain and ability to take stains make it a favorite for architects seeking a predictable, clean finish.</p>
      <h2>The Local Hero: Eucalyptus Blackbutt</h2>
      <p>Grown right here in the Waitakere Ranges, local Blackbutt (Eucalyptus Pilularis) offers a density and durability that few imports can match. With a Class 1 durability rating, it's suitable for both structural and decorative applications where resilience is paramount.</p>
      <h2>The Technical Verdict</h2>
      <p>While American Oak provides classic elegance, our NZ Blackbutt provides the structural integrity required for the challenging New Zealand climate. For those seeking sustainability and longevity, the choice is clear.</p>
    `,
    image: "/hero_timber_home_1773443975023.png"
  },
  {
    slug: "solid-hardwood-beats-engineered",
    title: "Why Solid Hardwood Beats Engineered",
    date: "February 28, 2026",
    category: "Expertise",
    excerpt: "The technical longevity argument: Why the choice of solid timber is an investment in the next century, not just the next decade.",
    content: `
      <p>Engineered timber floors are ubiquitous, but for the discerning architect, nothing replaces the authenticity and longevity of solid hardwood.</p>
      <h2>The Refinishing Advantage</h2>
      <p>Engineered floors often have a thin veneer that can only be sanded once or twice. In contrast, a solid hardwood floor can be refinished multiple times over its lifetime, effectively lasting for generations.</p>
      <h2>Material Integrity</h2>
      <p>Solid timber is a consistent material through and through. It handles humidity transitions with a predictable expansion and contraction cycle that can be managed through expert installation, whereas engineered products rely heavily on glue stability.</p>
    `,
    image: "/eucalyptus_flooring_1773443992042.png"
  },
  {
    slug: "auckland-home-show-2025-recap",
    title: "Auckland Home Show 2025 Recap",
    date: "January 15, 2026",
    category: "Events",
    excerpt: "A look back at the architectural trends we showcased at the 2025 Home Show, from slab furniture to reclaimed giants.",
    content: `
      <p>The 2025 Auckland Home Show was a landmark event for Hansen Timber. We were proud to showcase our latest collection of sustainable hardwoods to the design community.</p>
      <h2>Architectural Slab Focus</h2>
      <p>One of the highlights of our display was the 4-meter Ancient Swamp Kauri slab, which became a centerpiece for discussions on heritage and natural art.</p>
      <h2>Sustainable Sourcing</h2>
      <p>We received overwhelming interest in our local Eucalyptus programs, confirming that the market is shifting toward locally grown, sustainable solutions.</p>
    `,
    image: "/swamp_kauri_slab_1773444102687.png"
  }
];
