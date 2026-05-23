import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { allProductsQuery, allCategoriesQuery, allSpeciesQuery, allPostsQuery } from '@/sanity/lib/queries';
import { Category, Product, Species } from '@/lib/types';

const BASE_URL = 'https://www.hansentimber.co.nz';

interface SanitySitemapArticle {
  slug: string;
  date: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/journal',
    '/products',
    '/species',
    '/nz-grown-trees-wanted'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch Dynamic Data
  const [postsResponse, categoriesResponse, productsResponse, speciesResponse] = await Promise.all([
    sanityFetch({ query: allPostsQuery }),
    sanityFetch({ query: allCategoriesQuery }),
    sanityFetch({ query: allProductsQuery }),
    sanityFetch({ query: allSpeciesQuery }),
  ]) as any[];

  const articles = (postsResponse?.data || []) as SanitySitemapArticle[];

  // Create article routes
  const articleRoutes = articles.map((article: SanitySitemapArticle) => ({
    url: `${BASE_URL}/journal/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Create category routes
  const categoryRoutes = (categoriesResponse?.data || []).map((cat: Category) => ({
    url: `${BASE_URL}/products/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Create product routes
  const productRoutes = (productsResponse?.data || []).map((product: Product) => {
    const categorySlug = product.category?.id || 'other';
    return {
      url: `${BASE_URL}/products/${categorySlug}/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  // Create species routes
  const speciesRoutes = (speciesResponse?.data || []).map((speciesItem: Species) => ({
    url: `${BASE_URL}/species/${speciesItem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...speciesRoutes,
    ...articleRoutes,
  ];
}
