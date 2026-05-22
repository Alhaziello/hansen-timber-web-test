import { defineQuery } from 'next-sanity'

/**
 * Sanity GROQ Queries
 * 
 * This file contains all the database queries used to fetch data from Sanity CMS.
 * It uses GROQ (Graph-Relational Object Queries), which is Sanity's purpose-built query language.
 * 
 * Beginner Note:
 * A query like `*[_type == "product"]` means: 
 * "Get EVERY document (*) where the type is exactly 'product'".
 * The block following it `{ _id, name, ... }` tells Sanity exactly which fields we want back.
 * The `->` symbol is a "dereference". It takes a reference (like an ID) and automatically expands it into the full object.
 */

export const allProductsQuery = defineQuery(`
  *[_type == "product"] {
    _id,
    name,
    "id": slug.current,
    description,
    content,
    specs,
    image,
    category-> {
      "id": id.current,
      title
    },
    species[]-> {
      name,
      "slug": slug.current
    },
    colorVariants[] {
      name,
      "swatch": swatch.asset->url,
      "image": image.asset->url
    },
    "boardOptions": *[_type == "productVariant" && product._ref == ^._id] {
      species-> {
        name,
        "slug": slug.current,
        image
      },
      sizes,
      notes,
      variantImage,
      variantDescription
    }
  }
`)


export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(completionDate desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    mainImage,
    client
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    mainImage,
    gallery,
    client,
    content,
    completionDate
  }
`)

export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] {
    _id,
    title,
    "id": id.current,
    description,
    image
  }
`)

export const allSpeciesQuery = defineQuery(`
  *[_type == "species"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    image
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "id": slug.current,
    description,
    content,
    specs,
    image,
    specFiles[] {
      asset-> {
        url,
        originalFilename
      }
    },
    schematics[] {
      asset-> {
        url
      }
    },
    category-> {
      "id": id.current,
      title
    },
    species[]-> {
      name,
      "slug": slug.current,
      description,
      image
    },
    colorVariants[] {
      name,
      "swatch": swatch.asset->url,
      "image": image.asset->url
    },
    "boardOptions": *[_type == "productVariant" && product._ref == ^._id] {
      species-> {
        name,
        "slug": slug.current,
        image
      },
      sizes,
      notes,
      variantImage,
      variantDescription
    }
  }
`)

export const categoryWithProductsQuery = defineQuery(`
  *[_type == "category" && id.current == $slug][0] {
    _id,
    title,
    "id": id.current,
    description,
    image,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      "id": slug.current,
      description,
      content,
      specs,
      image,
      species[]-> {
        name,
        "slug": slug.current
      },
      colorVariants[] {
        name,
        "swatch": swatch.asset->url,
        "image": image.asset->url
      },
      "boardOptions": *[_type == "productVariant" && product._ref == ^._id] {
        species-> {
          name,
          "slug": slug.current,
          image
        },
        sizes,
        notes,
        variantImage,
        variantDescription
      }
    }
  }
`)

export const speciesBySlugQuery = defineQuery(`
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
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      "id": slug.current,
      description,
      content,
      specs,
      image,
      category-> {
        "id": id.current,
        title
      }
    }
  }
`)

export const allSlabsQuery = defineQuery(`
  *[_type == "slab"] | order(name asc) {
    name,
    "slug": slug.current,
    dimensions,
    status,
    isSold,
    image,
    species-> {
      name,
      "slug": slug.current
    }
  }
`);

export const slabBySlugQuery = defineQuery(`
  *[_type == "slab" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    dimensions,
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
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "date": publishedAt,
    category,
    excerpt,
    "image": mainImage.asset->url
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "date": publishedAt,
    category,
    excerpt,
    "content": body,
    "image": mainImage.asset->url
  }
`)

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    phoneNumber,
    email,
    address,
    socialLinks
  }
`)

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    title,
    heroSubtitle,
    heroImage,
    featuredSectionTitle,
    featuredSectionDescription
  }
`)

export const productAndSpeciesQuery = defineQuery(`
  {
    "product": *[_type == "product" && slug.current == $id][0] {
      _id,
      name,
      "id": slug.current,
      description,
      content,
      specs,
      image,
      specFiles[] {
        asset-> {
          url,
          originalFilename
        }
      },
      schematics[] {
        asset-> {
          url
        }
      },
      category-> {
        "id": id.current,
        title
      },
      species[]-> {
        name,
        "slug": slug.current,
        description,
        image
      },
      colorVariants[] {
        name,
        "swatch": swatch.asset->url,
        "image": image.asset->url
      },
      "boardOptions": *[_type == "productVariant" && product._ref == ^._id] {
        species-> {
          name,
          "slug": slug.current,
          image
        },
        sizes,
        notes,
        variantImage,
        variantDescription
      }
    },
    "activeSpecies": *[_type == "species" && slug.current == $species][0] {
      _id,
      name,
      "slug": slug.current,
      tagline,
      description,
      image
    }
  }
`)

export const productSpeciesCombinationsQuery = defineQuery(`
  *[_type == "product"] {
    "id": slug.current,
    category-> {
      "id": id.current
    },
    species[]-> {
      "slug": slug.current
    },
    "boardOptions": *[_type == "productVariant" && product._ref == ^._id] {
      species-> {
        "slug": slug.current
      }
    }
  }
`)

