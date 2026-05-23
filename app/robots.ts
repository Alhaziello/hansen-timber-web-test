/**
 * @file robots.ts
 * @description Next.js standard file for generating the `robots.txt` configuration for search engine crawlers.
 * @route /robots.txt
 * @state Static (build time execution).
 */
import { MetadataRoute } from 'next';
/**
 * Generates the robots.txt rules.
 * Allows crawling of the public site while explicitly blocking the Sanity Studio backend.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // WARNING: It is critical that we disallow `/studio/` to prevent Google from indexing 
      // our CMS login pages or exposing internal content management structures.
      disallow: ['/studio/'],
    },
    sitemap: 'https://www.hansentimber.co.nz/sitemap.xml',
  };
}
