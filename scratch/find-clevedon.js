const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function findClevedon() {
  const p = await client.fetch('*[title match "Clevedon*" || name match "Clevedon*"]{ title, name, "imgUrl": mainImage.asset->url, "dimensions": mainImage.asset->metadata.dimensions }');
  console.log(JSON.stringify(p, null, 2));
}

findClevedon().catch(console.error);
