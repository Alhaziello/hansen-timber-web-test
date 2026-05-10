const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

client.fetch('*[_type == "product" && slug.current == "spc-hybrid-flooring"][0]').then(p => {
  console.log(JSON.stringify(p, null, 2));
});
