import { client } from "@/sanity/lib/client";
import { Article } from "../data/articles";

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "date": publishedAt,
    category,
    excerpt,
    "image": mainImage.asset->url
  }`;
  return await client.fetch(query);
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
  return await client.fetch(query, { slug });
}
