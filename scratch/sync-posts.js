const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberPosts() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: ['Custom Sizing / Cut to Order'],
      notes: 'We can mill Saligna posts to any custom dimension required for your structural project.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: ['Custom Sizing / Cut to Order'],
      notes: 'Available in any size. Macrocarpa offers natural durability and a beautiful aesthetic for exposed posts.'
    }
  ].filter(opt => opt.species._ref !== null);

  const premiumSpecs = [
    'Custom Cut to Any Size',
    'Structural Grade',
    'Exceptional Native Durability',
    'Precision Squared',
    'Direct from the Mill'
  ];

  console.log('Updating Timber Posts product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Timber Posts" || slug.current == "timber-posts")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Timber Posts product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions, specs: premiumSpecs })
    .commit();

  console.log('Sync complete!');
}

syncTimberPosts().catch(console.error);
