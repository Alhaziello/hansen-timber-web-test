/**
 * Global TypeScript Interfaces
 * 
 * This file is the "Single Source of Truth" for the shape of our data.
 * Whenever we fetch data from Sanity, we cast it into one of these interfaces 
 * so that our code editor can autocomplete properties (like `product.name`) 
 * and warn us if we try to access something that doesn't exist.
 * 
 * Beginner Note:
 * TS Interfaces don't exist in the final compiled website; they are purely 
 * a developer tool to catch bugs before they happen.
 */

export interface Species {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  tagline?: string;
  features?: string[];
  image?: any;
}

export interface Article {
  _id?: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content?: any;
}

export interface Product {
  _id?: string;
  name: string;
  id: string; // Used for slug in some frontend components
  slug?: string;
  description: string;
  content?: any;
  specs?: string[];
  image?: any;
  category?: {
    id: string;
    title: string;
  };
  species?: Species[];
}

export interface Category {
  _id?: string;
  id: string;
  title: string;
  description?: string;
  image?: any;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  mainImage: any;
  client?: string;
}
