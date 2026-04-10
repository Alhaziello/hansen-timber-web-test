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
    }
  }
`)

export const featuredProductsQuery = defineQuery(`
  *[_type == "product" && featured == true] | order(_updatedAt desc)[0...4] {
    _id,
    name,
    "id": slug.current,
    description,
    image,
    category-> {
      "id": id.current,
      title
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
    content,
    specs,
    image,
    category-> {
      "id": id.current,
      title
    },
    species[]-> {
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
      content,
      specs,
      image,
      species[]-> {
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
    tagline,
    features,
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
