# Hansen Timber Data Models Analysis

Based on a review of the current live website (https://www.hansentimber.co.nz) and the existing Sanity CMS schemas in this repository, here is an analysis of how the website's data models are managed.

## Current Setup & Models in Sanity

The existing codebase manages structured content via Sanity CMS (`sanity/schemas`), containing the following main entities:

### 1. `product`
- **Purpose**: Represents individual product offerings.
- **Fields**: Name, Slug, Category (Reference), Species (Reference), Description (Text), Specifications (Array of Strings), Image.
- **Mapping to Live Site**: Maps accurately to the "Products" dropdown (e.g., Hardwood Flooring, Decking Timber, Timber Beams).

### 2. `species` (Types of Wood)
- **Purpose**: Represents the different types of wood the company offers.
- **Fields**: Name, Slug, Description, Tagline, Features (Array of strings), Image.
- **Mapping to Live Site**: Maps precisely to the "Types of Wood" navigation section (e.g., Pine, Macrocarpa, Swamp Kauri, Eucalyptus).

### 3. `category`
- **Purpose**: A generic categorization system used primarily to group products.
- **Fields**: Title, Internal ID, Description, Image.
- **Usage**: Typically used to categorize products like "outdoor" or "interior", allowing flexible associations on the frontend.

### 4. `post` (Blog/Journal)
- **Purpose**: Represents news, articles, and blog entries.
- **Fields**: Title, Slug, Main Image, Category (String instead of reference here), Published At, Excerpt, Body (Portable Text `blockContent`).
- **Mapping to Live Site**: Powers the "Blog" section.

---

## Gaps Between Live Site and Current Models

While the core models are well-defined, scraping the live site reveals some areas that are not completely covered by the current Sanity schemas.

### 1. "Your Projects" (Case Studies / Portfolio)
The live website features a "Your Projects" page, which typically acts as a gallery or portfolio of successfully completed work.
- **Missing Model**: There is currently no `project` or `caseStudy` schema.
- **Recommendation**: Create a `project.ts` schema with fields for:
  - Title & Slug
  - Client / Location (optional)
  - Main Image & Gallery (Array of Images)
  - Description / Body (`blockContent`)
  - Featured Products (Array of References to `product`)
  - Featured Species (Array of References to `species`)

### 2. Site Settings & Basic Pages
Basic pages like "About Us", "Contact Us", "NZ Grown Trees Wanted", and overarching site data (like phone numbers, addresses, social media links) are present on the website.
- **Missing Model**: There are no singleton documents for `siteSettings` or a flexible `page` builder schema.
- **Recommendation**: 
  - Add a singleton `siteSettings.ts` for managing the global phone number (e.g. `09 242 3644`), physical address, and global SEO metadata.
  - Add a generic `page.ts` schema to allow admins to edit content on "About Us" and "Contact Us" pages without developer intervention.

### 3. Hero / Homepage Promotions
The homepage features promotional banners ("Got Wood ideas? We are here to shape them.") and top-level entry points.
- **Recommendation**: Create a `homePage.ts` singleton to manage hero text, featured products, and call-to-action links.

## Summary

The core structural entities (Products, Species, and Posts) are well-modeled and relational (e.g., Products referencing Species and Categories). Moving forward, the primary focus should be extending the schemas to include **Projects** and global **Site/Page Settings** to give content editors full control over the website experience.
