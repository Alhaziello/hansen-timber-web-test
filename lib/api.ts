import { Article } from "./types";
import { sanityFetch } from "@/sanity/lib/live";

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "date": publishedAt,
    category,
    excerpt,
    "image": mainImage.asset->url
  }`;
  const { data } = await sanityFetch({ query });
  return data;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    "date": publishedAt,
    category,
    excerpt,
    "content": body,
    "image": mainImage.asset->url
  }`;
  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}
