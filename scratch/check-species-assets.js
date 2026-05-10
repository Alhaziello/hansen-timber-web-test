const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function checkSpeciesAssets() {
  const species = await client.fetch('*[_type == "species"]{ name, "assetName": image.asset->originalFilename }');
  console.log(JSON.stringify(species, null, 2));
}

checkSpeciesAssets().catch(console.error);
