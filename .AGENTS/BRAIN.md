# Hansen Timber - Project Brain

## Core Architecture
* **Stack:** Next.js 15 (App Router), React 19, Sanity CMS (embedded in `/studio`), Tailwind CSS, Framer Motion.
* **Deployment:** Vercel.
* **Purpose:** High-performance, SEO-optimized e-commerce and gallery site for timber slabs.

## Architectural Decisions & Rules
* **Caching:** We aggressively cache Sanity data. Webhooks are used to invalidate the Next.js cache on content updates.
* **Styling:** Tailwind is the standard. No CSS modules. 
* **State:** Keep global state minimal. Pass data from Server Components to Client Components via props. 
* **Deep Routing Strategy (SEO Focus):** To maximize search engine visibility, avoid storing configuration options (like timber species variants) in modals or interactive drawers. Instead, utilize a Deep Routing Strategy where every product/option combination is pre-rendered at build time on its own dedicated URL (e.g., `/products/[category]/[id]/[species]`) using Next.js `generateStaticParams` and raw Sanity `client.fetch` to ensure successful static generation without build-time draftMode errors.
* **Relational Schema Migration:** Species variant cards (`boardOptions` array inside `product` documents) have been migrated into standalone, first-class `productVariant` documents. All frontend queries retrieve variant data dynamically using subqueries (resolved by `product._ref == ^._id`), keeping the JSON response contract backward-compatible and ensuring zero UI regressions.
* **UI Animation & Transitions:** Favor native CSS transitions and standard animations for page transitions. Avoid layoutId morphing transitions on critical components to maintain route-change performance. Use portal-based wrappers when overlays or menus are necessary.

## Agentic Tools & Verification Protocols
To prevent build failures and broken deployments on Vercel, you must utilize the following local terminal tools to verify your work before finalizing tasks:
* **UI Verification:** Run `npm run build` locally whenever modifying files inside `app/` or `components/` to catch React Server/Client boundary leaks or TypeScript errors.
* **CMS Schema Verification:** Run `npx sanity schema validate` whenever structural changes are made inside `sanity/schemas/`.
* **Query Verification:** Run `node scripts/test-groq.js` before wiring up a new GROQ query to ensure it retrieves the exact expected JSON data shape.

* **Data Lineage:** Documented in `.AGENTS/data-lineage.md`—all GROQ queries and dynamic route generation must adhere to this structural hierarchy.

## Current Status & Roadmap
* **Completed:** 
  * Initial Next.js 15 routing, basic Sanity schema setup, and `.AGENTS` workspace configuration.
  * Replaced legacy `BoardMenu.tsx` with `<SpeciesCardGrid />` and refactored the grid to a lightweight routing menu.
  * Implemented the Product-Species Deep Routing Strategy (`● (SSG)`) generating 45+ static deep paths.
  * Upgraded schemas and queries to support species-specific variant image/description overrides.
  * Converted the inline `boardOptions` array into first-class `productVariant` documents with custom initial-value templates (`productVariant-by-product`).
  * Implemented a hierarchical, folder-like navigation structure in Sanity Studio (`sanity/structure.ts`), separating product metadata editing from its variants list.
  * Migrated 29 variants in the database and bulk-synced 28 e-commerce descriptions via automated Node.js transaction pipelines.
  * Repaired database content mix-ups (Macrocarpa/Blackbutt description swap) and resolved frontend Portable Text rendering for "History & Heritage" on individual species pages.
  * Cleaned up database transaction and content synchronization scripts after verifying migrations.
* **In Progress:** Integrating advanced transitions across other gallery layouts (`SlabDisplay.tsx`, `SpeciesGallery.tsx`).
* **Known Issues:** None. Local and production Vercel builds compile completely clean.
