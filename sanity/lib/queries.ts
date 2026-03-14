import { defineQuery } from 'next-sanity'

export const allProductsQuery = defineQuery(`
  *[_type == "product"] {
    _id,
    name,
    "id": slug.current,
    description,
    specs,
    image,
    category-> {
      "id": id.current,
      title
    },
    species-> {
      name,
      "slug": slug.current
    }
  }
`)

export const featuredProductsQuery = defineQuery(`
  *[_type == "product" && slug.current in ["hardwood-flooring", "spc-flooring", "panelling-sarking", "decking"]] {
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
  *[_type == "species"] {
    _id,
    name,
    "slug": slug.current,
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
    specs,
    image,
    category-> {
      "id": id.current,
      title
    },
    species-> {
      name,
      "slug": slug.current,
      description,
      image
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
      specs,
      image,
      species-> {
        name,
        "slug": slug.current
      }
    }
  }
`)

export const speciesBySlugQuery = defineQuery(`
  *[_type == "species" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
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
`)
