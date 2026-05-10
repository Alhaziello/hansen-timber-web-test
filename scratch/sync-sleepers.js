const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberSleepers() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: ['150x50mm', '200x50mm', '200x100mm'],
      notes: 'Standard profiles listed above. However, we can cut any custom dimension required for your landscaping project.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: ['150x50mm', '200x50mm', '200x100mm'],
      notes: 'Available in standard and custom sizes. Naturally durable heartwood ideal for garden beds and retaining.'
    }
  ].filter(opt => opt.species._ref !== null);

  const premiumSpecs = [
    'Heavy Duty Landscaping Grade',
    'Naturally Durable (No Chemicals)',
    'Standard & Custom Profiles',
    'Ideal for Retaining & Garden Beds',
    'Ground Contact Rated'
  ];

  console.log('Updating Landscaping Sleepers product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Sleepers" || slug.current == "landscaping-sleepers")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Landscaping Sleepers product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions, specs: premiumSpecs })
    .commit();

  console.log('Sync complete!');
}

syncTimberSleepers().catch(console.error);
