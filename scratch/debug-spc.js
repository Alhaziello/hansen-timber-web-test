const { createClient } = require('@sanity/client');
const fs = require('fs');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function debugSPC() {
  const p = await client.fetch('*[_type == "product" && slug.current == "spc-hybrid-flooring"][0]');
  fs.writeFileSync('scratch/spc-debug.json', JSON.stringify(p, null, 2));
  console.log('SPC data written to scratch/spc-debug.json');
}

debugSPC().catch(console.error);
