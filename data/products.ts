/**
 * WARNING: This file is now a MIGRATION SOURCE ONLY.
 * The frontend fetches all live data from Sanity CMS via GROQ queries.
 * To update the site content, modify the data here and run the migration script,
 * or edit the records directly in the Sanity Studio.
 */

export const CATEGORIES = [
  {
    id: "interior",
    title: "Flooring & Interior",
    description: "Premium solid hardwood and SPC flooring for architectural interiors.",
    image: "/images/products/hardwood-flooring.png",
  },
  {
    id: "outdoor",
    title: "Outdoor & Landscaping",
    description: "Durable, high-performance exterior timber for outdoor living.",
    image: "/images/products/decking-timber.png",
  },
  {
    id: "slabs",
    title: "Slabs & Custom Timber",
    description: "Unique, large-scale timber slabs for high-end furniture and features.",
    image: "/images/products/swamp-kauri-slabs.png",
  },
  {
    id: "structural",
    title: "Structural & Cladding",
    description: "Strong, reliable timber beams and cladding for construction projects.",
    image: "/images/products/decking-timber.png",
  },
];

export const SPECIES = [
  {
    slug: "pine",
    name: "Sustainable Pine",
    description: "A versatile and sustainable choice for modern construction.",
    image: "/images/home/hero-home.png",
  },
  {
    slug: "macrocarpa",
    name: "Macrocarpa",
    description: "Naturally durable with a rich golden grain, perfect for decking and exterior use.",
    image: "/images/products/decking-timber.png",
  },
  {
    slug: "kauri",
    name: "Ancient Swamp Kauri",
    description: "Prehistoric timber preserved in peat swamps for millenniums, offering unique history and beauty.",
    image: "/images/products/swamp-kauri-slabs.png",
  },
  {
    slug: "eucalyptus",
    name: "Waitakere Eucalyptus",
    description: "High-density precision-milled hardwood from local sustainable harvests.",
    image: "/images/products/hardwood-flooring.png",
  },
];

export const PRODUCTS = [
  {
    id: "hardwood-flooring",
    name: "Hardwood Flooring",
    description: "Premium hardwood flooring in five distinctive species. NZ-grown Eucalyptus and Australian Blackwood, precision-milled for durability and timeless beauty.",
    specs: ["85/135/139 x 19mm T&G", "NZ Grown Eucalyptus", "Australian Blackwood"],
    image: "/images/products/hardwood-flooring.png",
    category: "interior",
    featured: true,
    deepContent: `Our premium hardwood flooring range features locally grown Eucalyptus species and Australian Blackwood, all proudly milled onsite at Hansen Timber using world-class seven-headed moulding machinery sourced from Europe. Each hardwood flooring option delivers exceptional durability and natural beauty to transform any residential or commercial space.

All our hardwood flooring undergoes careful shed drying before kiln treatment at our Clevedon facility, ensuring guaranteed moisture content for optimal performance. This meticulous process ensures your hardwood flooring remains stable and beautiful for generations.

Eucalyptus and Australian Blackwood hardwood flooring provides unmatched durability, wear resistance, and impact protection, which is ideal for any living or work space. The natural hardness of these species combined with our precision milling creates hardwood flooring that enhances any home or office with its modern, beautiful finish.

OUR HARDWOOD FLOORING SPECIES INCLUDE:
Eucalyptus Pilularis (Blackbutt) - Premium hardwood flooring with pale tones
Eucalyptus Saligna (Blue Gum) - Distinctive rose-toned hardwood flooring
Eucalyptus Globoidea (White Stringybark) - Versatile hardwood flooring option
Eucalyptus Globulus (Southern Blue Gum) - Durable hardwood flooring choice
Australian Blackwood - Luxury hardwood flooring with rich chocolate tones
Blackbutt Eucalyptus and Globoidea Eucalyptus we group in a similar colouring to American Oak and Spotted Gum.

STANDARD HARDWOOD FLOORING DIMENSIONS:
85 x 19 mm Tongue & Groove
135 x 19 mm Tongue & Groove
139 x 19 mm Tongue & Groove
Custom hardwood flooring dimensions can be milled to order subject to lead times and minimum quantities.

Choosing Hansen Timber hardwood flooring means selecting a sustainable and ethical product. Our hardwood flooring is grown and milled entirely in New Zealand, significantly reducing carbon emissions compared to imported alternatives. Plus, no koala habitats are impacted in producing our Eucalyptus hardwood flooring!

Contact Hansen Timber today for a comprehensive hardwood flooring quotation tailored to your project requirements.

Frequently Asked Questions About Hardwood Flooring

What makes Hardwood Flooring different from other flooring options?
Hardwood flooring is solid wood throughout its entire thickness, typically 19mm in our range. Unlike engineered or laminate alternatives, hardwood flooring can be sanded and refinished multiple times, lasting 100+ years with proper maintenance.

Do we offer American Oak Hardwood Flooring?
We do not import logs into the country so do not have American Oak as an option however we have a brilliant alternative being our Blackbutt Eucalyptus Hardwood Flooring which is a locally grown alternative timber. See a blog on this alternative option here: American Oak Flooring in New Zealand: A Better Local Alternative

Which Hardwood Flooring species is best for high-traffic areas?
Blackbutt (Eucalyptus Pilularis) hardwood flooring offers exceptional hardness and durability, making it ideal for high-traffic zones. With a Janka rating around 2,000, it surpasses many imported hardwoods in wear resistance.

How should I maintain my Hardwood Flooring?
Regular sweeping and occasional damp mopping with pH-neutral cleaner keeps hardwood flooring beautiful. Avoid excess moisture and use felt pads under furniture. Professional recoating every 3-5 years extends the life of your hardwood flooring finish.

Is Hardwood Flooring suitable for the Auckland climate?
Our locally grown hardwood flooring is perfectly adapted to New Zealand's climate. The natural movement of hardwood flooring with seasonal humidity changes is minimal when properly installed with expansion gaps.`
  },
  {
    id: "superior-spc-flooring",
    name: "Superior SPC Flooring",
    description: "Premium Hybrid SPC Waterproof Flooring available in a range of colours and styles.",
    specs: ["228 x 1830 mm", "8mm thickness", "Uniclic® system"],
    image: "/images/products/hardwood-flooring.png",
    category: "interior",
    featured: true,
    deepContent: `Hansen Timber are proud to offer the NZ market our very own range of designed SPC Flooring at an exclusive price of $50.00 + GST per sqm - Purchase Direct from the Mill and SAVE!

Contact Hansen Timber today for samples, a free quote for our SPC Flooring Range or call 09 610 6215 to speak to us today. 

What is SPC Hybrid Flooring?                  

SPC hybrid flooring is the evolution of traditional vinyl and laminate flooring, combining the best properties of both into a single high-performance floor. The name comes from its construction: a Stone Polymer Composite (SPC) rigid core is fused with a realistic timber or stone print layer and a protective wear layer above, and a cushioning backing layer below. SPC flooring tends to be more durable than either laminate or standard LVT on its own.    

Waterproof from the core out making SPC an ideal solution for any room including Kitchens, Laundries, Mudrooms and Bathrooms. 

Hansen Superior SPC Flooring features the patented Uniclic® drop and lock installation method that makes installation simpler, faster and more reliable. No Glue or Nails needed and DIY Friendly! 

Our SPC Flooring Range is available in a range of versatile styles to meet your personal style and make your vision come to life. 

Superior SPC Hansen Flooring specifications:

228mm width x 1830mm length 
8mm thickness in total with a 6mm core, 0.5mm wear layer and 1.5mm backing layer 
Micro Bevel edges 
Planks per Box = 5 lengths 
2.08m2 per Box  
Choosing Hansen SPC Flooring you can have confidence in a beautiful hybrid solution with a 15 year warranty.*

Contact Hansen Timber today for a comprehensive SPC flooring quotation tailored to your project requirements or feel free to visit our showroom in Clevedon to see the SPC in person. 

*Warranty is subject to Hansen Terms and Conditions. 

FREQUENTLY ASKED QUESTIONS ABOUT SPC FLOORING
What does SPC stand for?
Stone Plastic Composite flooring. SPC offers clients with a flooring construction that is highly durable, stable and waterproof - ideal for any residential or commercial space.  

Is SPC Flooring really Waterproof?

SPC is waterproof in terms of the material the plank is made of which means the boards will not swell, warp or rot from water exposure as the rigid core is made of stone-plastic composite that will not absorb moisture.

SPC flooring is extremely water resistant meaning small amounts of water sitting on top of the board will not damage the boards and every day spills, wet shoes and occasional water exposure is absolutely fine.

However SPC Flooring is not able to act as a waterproof barrier for your subfloor or home structure.

It is important to note if a floor is completely flooded water can still get under the board through the seams and edges of the floor and  under skirtings which and if this occurs water may soak into the substrate or surrounding materials. Meaning a major water leak or flood situation would impact the SPC Flooring.

What are the differences between SPC vs Laminate or LVT?
Compared to laminate, SPC is fully waterproof and provides a dimensionally stable floor 

Compared to LVT (Luxury Vinyl Tile), SPC features a rigid core allowing it to handle temperature changes and provide a stronger more durable floor. 

How does installation work?
Hansen's SPC Flooring features the patented Uniclic® drop and lock system which is fast, simple and does not require nails or glue. 

We have installation guides available for clients to refer to (perfect for any DIY'er) and/or we have a number of recommended floor installers as a reference guide. 

Is SPC comfortable under foot?
Our SPC Flooring features a backing layer providing additional comfort and sound absorption.

Where is Hansen's SPC produced?
The Hansen SPC Flooring is produced in Vietnam from a world class manufacturer of SPC and proudly utilise the patented Uniclic® drop and lock system. 

Is SPC Flooring safe for indoor use?
Our flooring is perfectly safe for Indoor Use.  

How do I maintain SPC Flooring?
SPC Flooring is a very low maintenance and worry-free. Simple sweeping or light vaccum along with occasional damp mopping is all it takes to keep your floors looking fresh and beautiful. 

Will it work with Pets?
Absolutely! SPC is waterproof and scratch resistant along with being super easy to clean so it really is the perfect option for a home with pets. 

Expected lifespan of SPC Flooring?
A well looked after SPC Floor will deliver a quality long lasting floor for 15-25 years or more providing long term value.`
  },
  {
    id: "timber-panelling-sarking",
    name: "Timber Panelling & Sarking",
    description: "Eucalyptus is a hardwood timber providing a durable, hard-wearing option while providing a warmth and sophisticated feature to any space.",
    specs: ["85/135/139 x 19mm T&G", "NZ Grown Eucalyptus", "Precision Milled"],
    image: "/images/products/hardwood-flooring.png",
    category: "flooring",
    featured: true,
    deepContent: `Eucalyptus is a hardwood timber providing a durable, hard wearing option while providing a warmth and sophisticated feature to any space.

Hansen Timber have a range of T&GV Panelling / Sarking available from our range of Eucalyptus species all of which have been locally grown and proudly milled onsite at Hansen Timber using world class seven headed moulding machinery sourced from Europe. 

All our timber is shed dried prior to placing in our Kiln onsite before being processed and dispatched with a guaranteed moisture content.

Species we have available are: 

Eucalyptus Pilularis - commonly known as Blackbutt 
Eucalyptus Saligna - commonly known as Sydney Blue Gum or Blue Gum
Eucalyptus Globoidea - commonly known as White Stringybark
Eucalyptus Globulus - commonly known as Southern Blue Gum
Blackbutt Eucalyptus and Globoidea Eucalyptus we group in a similar colouring to American Oak and Spotted Gum. 

Standard sizing for Timber Panelling / Sarking precut and available on hand: 

85 x 19 mm T&GV
135 x 19 mm T&GV
139 x 19 mm T&GV 

Transform your space today with a stunning Timber Feature that will have everyone in awe!`
  },
  {
    id: "decking-timber",
    name: "Decking Timber",
    description: "Check out our range of beautifully crafted Hardwood Solid Timber Decking which is all locally grown in NZ and milled / processed onsite at Hansen Timber.",
    specs: ["Macrocarpa & Eucalyptus", "Locally grown & milled"],
    image: "/images/products/decking-timber.png",
    category: "outdoor",
    featured: true,
    deepContent: `A Kiwi Deck is one of the most important features of any home where memories and celebrations take place. Check out our range of beautifully crafted Hardwood Solid Timber Decking which is all locally grown in NZ and milled / processed onsite at Hansen Timber.

Our range of premium Decking Timber is available in a range of Eucalyptus species along with Macrocarpa in standard and custom profiles. All our timber is shed dried prior to placing in our Kiln onsite before being processed and dispatched with a guaranteed moisture content.

Standard sizing for Smooth Decking Timber (precut and available on hand):
- Eucalyptus: 90 x 19 mm & 140 x 19 mm
- Macrocarpa: 90 x 32 mm & 140 x 32 mm

Eucalyptus Species available for decking include Eucalyptus Pilularis (Blackbutt), Eucalyptus Saligna (Blue Gum), Eucalyptus Globoidea (White Stringybark), and Eucalyptus Globulus (Southern Blue Gum). Saligna is also available as H3.2 treated decking timber for enhanced durability.

Add value to your home and outdoor space today by reaching out to the Hansen Timber team for a quotation.`
  },
  {
    id: "macrocarpa-sleepers",
    name: "Macrocarpa Sleepers",
    description: "Our Macrocarpa Sleepers are perfect for garden projects, landscaping, or as sturdy support in your outdoor spaces.",
    specs: ["Retaining & Gardening", "Naturally Durable"],
    image: "/images/products/decking-timber.png",
    category: "outdoor",
    deepContent: `Macrocarpa sleepers are a durable and natural solution for many garden projects and landscaping requirements. From garden edging and retaining walls to fencing and pergolas, these sleepers offer a rustic yet premium aesthetic that blends seamlessly with the New Zealand landscape.

Naturally durable and resistant to decay, Macrocarpa is an ideal choice for ground-contact applications without the need for heavy chemical treatments found in traditional tanalised timber.

Common Sizing for Macrocarpa Sleepers on hand:
- 200 x 50 mm
- 200 x 75 mm
- 200 x 100 mm
- 150 x 50 mm
- 150 x 75 mm
- 100 x 100 mm 
- 100 x 75 mm

Whether you are building a raised vegetable garden or a sophisticated structural landscape feature, our sleepers provide the reliability and beauty your project deserves.`
  },
  {
    id: "macbox-s-series",
    name: "MacBox S Series Kitset Garden Box",
    description: "Transform your garden with a MacBox S Series Garden Kitset Box today! Easy to assemble solution for any keen gardener.",
    specs: ["Kitset format", "Macrocarpa timber"],
    image: "/images/products/decking-timber.png",
    category: "outdoor",
    deepContent: `Transform your garden with a MacBox S Series Garden Kitset Box today! Providing an elegant and easy-to-assemble solution for a versatile range of uses, these boxes are perfect for any keen gardener looking for a professional finish.

The MacBox S Series features:
- Proudly NZ Made onsite at our Clevedon Mill
- Manufactured from locally grown Macrocarpa R/S
- Available in lengths of 1.2m, 1.8m, and 2.4m
- Available in heights of 400mm (2 boards high) or 600mm (3 boards high)
- All boxes are 1.2m wide

Each kitset includes all the timber components required, including internal corner posts, precut to size and ready for quick assembly. Macrocarpa is naturally durable, making it the perfect chemical-free choice for growing vegetables and flowers.`
  },
  {
    id: "timber-beams",
    name: "Timber Beams",
    description: "Our Timber beams are strong, look great, and work well for all sorts of building or decorating projects. Available in Mac and Eucalyptus.",
    specs: ["Structural & Decorative", "Custom Cuts Available"],
    image: "/images/products/decking-timber.png",
    category: "structural",
    deepContent: `Hansen Timber Beams are strong, reliable, and provide a stunning natural aesthetic for both structural and decorative applications. Available in both Macrocarpa and Eucalyptus, our beams are locally grown and milled right here in Clevedon.

Whether you are looking for exposed internal rafters, heavy-duty lintels, or decorative outdoor pergolas, we provide precision-milled beams that showcase the natural strength and character of New Zealand timber.

Our beams can be supplied in a Rough Sawn (R/S) finish for a rustic look, or we can assist with custom milling to meet your specific architectural requirements. Reach out to the team today to discuss lengths and dimensions for your next build.`
  },
  {
    id: "timber-boards",
    name: "Timber Boards",
    description: "Available in Macrocarpa R/S and Blackbutt Pilularis Eucalyptus R/S across a range of standard sizes.",
    specs: ["Random lengths", "R/S Finish"],
    image: "/images/products/decking-timber.png",
    category: "structural",
    deepContent: `Standard stock of Timber Boards is available in Macrocarpa R/S and Blackbutt Pilularis Eucalyptus R/S across a range of versatile sizes. These boards are perfect for fencing, structural components, or custom joinery projects where a high-quality Rough Sawn finish is desired.

Common sizes available on hand include:
- 100 x 25 mm
- 150 x 25 mm
- 200 x 25 mm
- 100 x 50 mm
- 150 x 50 mm

If custom cuts or specific dimensions are required for your project, please reach out to us. We mill onsite and can often accommodate bespoke requests subject to lead times and timber availability.`
  },
  {
    id: "macrocarpa-cladding",
    name: "Macrocarpa Cladding",
    description: "A range of Macrocarpa R/S Board and Batons available to provide you with a modern cladding alternative for your next project.",
    specs: ["Board & Batten", "Modern Aesthetic"],
    image: "/images/products/decking-timber.png",
    category: "structural",
    deepContent: `Macrocarpa Cladding offers a beautiful, modern, and naturally durable alternative for residential and commercial exteriors. Our most popular profile is the traditional Board and Batten system, which provides excellent weather protection and a striking silhouette.

Standard Cladding components:
- 150 x 25 mm R/S Boards
- 50 x 25 mm R/S Battens

Macrocarpa is prized for its ability to weather to a beautiful silver-grey patina over time if left uncoated, or it can be stained to maintain its rich golden hues. Being naturally resistant to decay, it is a sustainable choice that supports local NZ milling.`
  },
  {
    id: "swamp-kauri-slabs",
    name: "Swamp Kauri Slabs",
    description: "Ancient Kauri Timber Slabs sourced locally from Ardmore swamp land perfect for unique furniture and bespoke projects.",
    specs: ["45,000+ Years Old", "Museum Quality"],
    image: "/images/products/swamp-kauri-slabs.png",
    category: "slabs",
    deepContent: `Own a piece of New Zealand history with our Ancient Swamp Kauri Slabs. Sourced locally from the Ardmore swamp lands, this timber has been preserved in peat for over 45,000 years. It is one of the oldest workable timbers in the world and offers a unique aesthetic that cannot be replicated.

Our Swamp Kauri slabs are ideal for:
- One-of-a-kind dining tables
- Executive boardroom tables
- High-end furniture and feature art pieces

Characterized by its deep golden hues and "shimmer" (iridescence), these slabs are limited in availability. Each piece is a unique natural sculpture waiting to be transformed into a masterpiece.`
  },
  {
    id: "eucalyptus-slabs",
    name: "Eucalyptus Slabs",
    description: "Wide range of Slabs available with some also featuring beautiful colouring with an increase in resin / kino visible.",
    specs: ["Hardwood Durability", "Rich Character"],
    image: "/images/products/swamp-kauri-slabs.png",
    category: "slabs",
    deepContent: `Eucalyptus Slabs (primarily Blackbutt and Saligna/Blue Gum) provide an incredibly hard-wearing and visually striking option for furniture and architectural features. Known for their high density and durability, these hardwood slabs are perfect for heavy-use surfaces.

Many of our Eucalyptus slabs feature distinctive "kino" (resin) lines and deep rose or pale honey tones, providing a raw and sophisticated look. Common uses include kitchen island tops, heavy-duty bench tops, and outdoor tables that need to withstand the elements while looking refined.`
  },
  {
    id: "macrocarpa-slabs",
    name: "Macrocarpa Slabs",
    description: "Discover the natural beauty and durability of our Macrocarpa wood slabs, perfect for unique furniture and bespoke projects.",
    specs: ["Golden Grain", "Naturally Durable"],
    image: "/images/products/swamp-kauri-slabs.png",
    category: "slabs",
    deepContent: `Macrocarpa wood slabs are celebrated for their rich golden tones and natural durability. Milled from large-diameter logs at our Clevedon location, these slabs provide a warm and inviting feel to any project.

Whether you are crafting a rustic bar top, a personalized sign, or a contemporary coffee table, Macrocarpa slabs are easy to work with and finish beautifully. They offer the perfect balance of affordability and luxury for bespoke timber furniture.`
  },
  {
    id: "other-timber-products",
    name: "Other Timber Products",
    description: "Garden Macrocarpa and Hardwood Stakes, Fence Batons, Timber Sawdust & Firewood.",
    specs: ["Zero Waste Focus", "Garden & Utility"],
    image: "/images/home/hero-home.png",
    category: "outdoor",
    deepContent: `At Hansen Timber, we are committed to utilizing as much of our timber as possible to reduce waste. Our "Other Products" range provides essential utility items for gardeners, farmers, and homeowners.

Our utility range includes:
- Garden Macrocarpa and Hardwood Stakes
- Fence Batons
- Clean Timber Sawdust (perfect for animal bedding or composting)
- High-quality Firewood (Macrocarpa and Gum mixtures)

Bring your trailer down to our Clevedon mill and stock up on these high-quality, locally produced timber essentials.`
  }
];
