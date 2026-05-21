# Hansen Timber - Data Lineage & User Journey Mapping

This document serves as the absolute source of truth for content lineage, database schema relationships, and dynamic routing mechanics for the Hansen Timber website. All AI agents must validate their GROQ queries, type contracts, and route generation against this map.

---

## 1. Schema Connection Analysis

The Sanity CMS backend utilizes a combination of uni-directional references (child/related documents pointing back to a parent) and inline object matrices to handle technical timber specifications.

* **`product.ts` → `species.ts`**
    * *Direct Array References:* A product links to multiple species via the `species` field (`type: 'array', of: [{ type: 'reference', to: [{ type: 'species' }] }]`). In GROQ, this is dereferenced via `species[]->`.
    * *Nested Object References:* Within the product sizing grid, each entry in the `boardOptions` array contains a direct reference to a single species (`species: { type: 'reference', to: [{ type: 'species' }] }`). In GROQ, this is dereferenced via `boardOptions[].species->`.
* **`slab.ts` → `species.ts`**
    * *Single Document Reference:* A single slab belongs to exactly one species via the `species` field (`type: 'reference', to: [{ type: 'species' }]`). In GROQ, this is dereferenced via `species->`.
* **`product.ts` → `category.ts`**
    * *Single Document Reference:* A product is assigned to its structural parent category via `category` (`type: 'reference', to: [{ type: 'category' }]`). In GROQ, this is dereferenced via `category->`.

---

## 2. User Click Journey & Data Lineage

### Phase 1: Landing on Species Page (`/species/[slug]`)
1. **Frontend Action:** User visits `/species/macrocarpa`.
2. **Next.js Route Handler:** `app/species/[slug]/page.tsx` captures the dynamic slug parameter and executes the `speciesBySlugQuery`.
3. **Database Query (GROQ):**
```groq
*[_type == "species" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  tagline,
  features,
  commonUses,
  description,
  content,
  image,
  // Reverse-reference lookup: dynamically fetch all products referencing this species ID
  "products": *[_type == "product" && references(^._id)] {
    _id,
    name,
    "id": slug.current,
    description,
    specs,
    image,
    category-> {
      "id": id.current,
      title
    }
  }
}

Rendering Context: Displays the details of the species and sends the dereferenced array of associated products to the <ProductGrid /> component.

Dynamic Link Generation: User clicks on a product card, initiating navigation dynamically based on the category of the item. Slabs route to /products/slabs, while typical products route to /products/${categorySlug}/${productId}.

Phase 2: Drilling Down to Product Detail (/products/[category]/[id])
Frontend Action: User navigates to a detail page (e.g. /products/cladding/vertical-cladding or /products/slabs/swamp-kauri-slab-102).

Next.js Route Handler: app/products/[category]/[id]/page.tsx catches both dynamic params (category and id).

Database Query (GROQ):

If category === "slabs", it runs slabBySlugQuery:
*[_type == "slab" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  dimensions { length, width, thickness },
  status,
  isSold,
  description,
  image,
  gallery,
  species-> {
    name,
    "slug": slug.current
  }
}
Otherwise, it runs productBySlugQuery:
*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "id": slug.current,
  description,
  content,
  specs,
  image,
  specFiles[] {
    asset-> { url, originalFilename }
  },
  schematics[] {
    asset-> { url }
  },
  category-> { "id": id.current, title },
  species[]-> { name, "slug": slug.current, description, image },
  boardOptions[] {
    species-> { name, "slug": slug.current, image },
    sizes,
    notes
  }
}
Rendering Context:

Slab Display: Renders <SlabDisplay slab={item} />, displaying specific length, width, and thickness values.

Product Display: Renders <ProductDisplay product={item} category={category} />. If the product has structured boardOptions, it spins up <BoardMenu /> which shows sizes, specs, and a link to view the species profile (/species/${option.species.slug}), closing the navigational loop.
================================================================================
[ROUTE] /species/[slug] (e.g., /species/macrocarpa)
================================================================================
  └── 🔍 GROQ: references(^._id)
        └── [DOCUMENT] Product (product.ts)
              ├── 🔗 LINK: /products/${product.category.id}/${product.id}
              │     └── [ROUTE] /products/[category]/[id] (Product Detail Page)
              │           ├── 🔍 GROQ: productBySlugQuery
              │           ├── 📄 Field: specs (Key Attribute Strings)
              │           ├── 📂 Field: specFiles (PDF Asset Downloads)
              │           ├── 🎨 Field: schematics (Profile Images)
              │           └── 📊 Field: boardOptions (Sizing Matrix)
              │                 └── 🔄 CROSS-LINK: option.species.slug ──> Loops back to /species/[slug]
              │
              └── 🔗 EXCEPTION LINK: (If category is "slabs") ──> /products/slabs
                    └── [ROUTE] /products/slabs (Slabs Gallery)
                          └── 🔍 GROQ: allSlabsQuery
                                └── [DOCUMENT] Slab (slab.ts)
                                      ├── 🔗 LINK: /products/slabs/[id]
                                      └── [ROUTE] /products/slabs/[id] (Slab Detail Page)
                                            ├── 🔍 GROQ: slabBySlugQuery
                                            ├── 📐 Field: dimensions (length, width, thickness)
                                            └── 🌿 Field: species-> (Dereferences back to Species document)