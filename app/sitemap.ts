/**
 * @file sitemap.ts
 * @description Next.js standard file for dynamic sitemap generation. Ensures SEO indexability
 * by automatically mapping all static routes and fetching all dynamic routes
 * (products, slabs, product species variants, species, categories, and journal posts) from Sanity.
 * @dependencies sanityFetch, next-sanity
 * @route /sitemap.xml
 * @state Dynamic Server Component (fetches all CMS routes at request time).
 */
import { MetadataRoute } from 'next';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hansentimber.co.nz';

// TypeScript interfaces for Sanity results to ensure type safety
interface SanitySitemapData {
  products: Array<{
    slug: string | null;
    categories?: Array<{ id: string | null }> | null;
    _updatedAt: string;
    species?: Array<{ slug: string | null }> | null;
    boardOptions?: Array<{ species?: { slug: string | null } | null }> | null;
  }>;
  slabs: Array<{
    slug: string | null;
    _updatedAt: string;
  }>;
  species: Array<{
    slug: string | null;
    _updatedAt: string;
  }>;
  posts: Array<{
    slug: string | null;
    _updatedAt: string;
  }>;
  categories: Array<{
    id: string | null;
    _updatedAt: string;
  }>;
}

// Single aggregated sitemap query for optimal data fetching performance (single DB hit)
const sitemapQuery = defineQuery(`
  {
    "products": *[_type == "product" && isArchived != true] {
      "slug": slug.current,
      categories[]-> {
        "id": id.current
      },
      _updatedAt,
      species[]-> {
        "slug": slug.current
      },
      "boardOptions": *[_type == "productVariant" && product._ref == ^._id] {
        species-> {
          "slug": slug.current
        }
      }
    },
    "slabs": *[_type == "slab"] {
      "slug": slug.current,
      _updatedAt
    },
    "species": *[_type == "species"] {
      "slug": slug.current,
      _updatedAt
    },
    "posts": *[_type == "post"] {
      "slug": slug.current,
      _updatedAt
    },
    "categories": *[_type == "category"] {
      "id": id.current,
      _updatedAt
    }
  }
`);

/**
 * Asynchronously generates the sitemap XML structure for search engines.
 * Fetches all dynamic route paths directly from the CMS in a single query.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Hardcoded static routes of the application (as required)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/species`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/nz-grown-trees-wanted`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];

  // Fetch dynamic content from Sanity
  const response = await sanityFetch({ query: sitemapQuery });
  const data = (response?.data || {}) as SanitySitemapData;

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  // 1. Process Product & Product Species Variant Routes
  if (data.products && Array.isArray(data.products)) {
    data.products.forEach((product) => {
      if (!product.slug) return;
      const categorySlugs = product.categories && product.categories.length > 0 
        ? product.categories.map(c => c.id || 'other') 
        : ['other'];

      categorySlugs.forEach((categorySlug) => {
        // Base product detail route
        dynamicRoutes.push({
          url: `${BASE_URL}/products/${categorySlug}/${product.slug}`,
          lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });

        // Extract unique species slugs from both direct species references and board options (deep routing variants)
        const speciesSlugs = new Set<string>();
        product.species?.forEach((s) => {
          if (s?.slug) speciesSlugs.add(s.slug);
        });
        product.boardOptions?.forEach((opt) => {
          if (opt.species?.slug) speciesSlugs.add(opt.species.slug);
        });

        // Product + Species variant route combinations
        speciesSlugs.forEach((speciesSlug) => {
          dynamicRoutes.push({
            url: `${BASE_URL}/products/${categorySlug}/${product.slug}/${speciesSlug}`,
            lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
           });
        });
      });
    });
  }

  // 2. Process Slab Routes
  if (data.slabs && Array.isArray(data.slabs)) {
    data.slabs.forEach((slab) => {
      if (!slab.slug) return;
      dynamicRoutes.push({
        url: `${BASE_URL}/products/slabs/${slab.slug}`,
        lastModified: slab._updatedAt ? new Date(slab._updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // 3. Process Species Routes
  if (data.species && Array.isArray(data.species)) {
    data.species.forEach((spec) => {
      if (!spec.slug) return;
      dynamicRoutes.push({
        url: `${BASE_URL}/species/${spec.slug}`,
        lastModified: spec._updatedAt ? new Date(spec._updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  }

  // 4. Process Categories Routes
  if (data.categories && Array.isArray(data.categories)) {
    data.categories.forEach((category) => {
      if (!category.id) return;
      dynamicRoutes.push({
        url: `${BASE_URL}/products/${category.id}`,
        lastModified: category._updatedAt ? new Date(category._updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // 5. Process Journal Post Routes
  if (data.posts && Array.isArray(data.posts)) {
    data.posts.forEach((post) => {
      if (!post.slug) return;
      dynamicRoutes.push({
        url: `${BASE_URL}/journal/${post.slug}`,
        lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  }

  return [...staticRoutes, ...dynamicRoutes];
}
