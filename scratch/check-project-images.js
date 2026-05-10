const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function checkProjectImages() {
  const posts = await client.fetch('*[_type == "post"]{ title, "imgUrl": mainImage.asset->url, "dimensions": mainImage.asset->metadata.dimensions }');
  console.log(JSON.stringify(posts, null, 2));
}

checkProjectImages().catch(console.error);
