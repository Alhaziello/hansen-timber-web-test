const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function updateBoardAttributes() {
  console.log('Finding Timber Boards product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Timber Boards" || slug.current == "timber-boards")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Timber Boards product!');
    return;
  }

  const premiumSpecs = [
    'Precision Milled',
    'Air Dried for Stability',
    'Architectural Grade',
    'Custom Dimensions Available',
    'Sustainably Harvested'
  ];

  console.log('Updating attributes to premium set...');
  
  await client
    .patch(product._id)
    .set({ specs: premiumSpecs })
    .commit();

  console.log('Update complete!');
}

updateBoardAttributes().catch(console.error);
