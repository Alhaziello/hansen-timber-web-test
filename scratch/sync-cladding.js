const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberCladding() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const claddingStyles = ['Vertical Shiplap', 'Board and Batten'];

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: claddingStyles,
      notes: 'High-density cladding with a rich red tone. Naturally durable and fire resistant.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: claddingStyles,
      notes: 'Classic silvering heartwood. Ideal for that iconic New Zealand architectural look.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Blackbutt') },
      sizes: claddingStyles,
      notes: 'Premium architectural hardwood cladding. Straight grain and superior durability.'
    }
  ].filter(opt => opt.species._ref !== null);

  const premiumSpecs = [
    'Architectural Shiplap Profiles',
    'Board & Batten Styles',
    'Naturally Weather Resistant',
    'Precision Tongue & Groove',
    'Sustainable Exterior Finish'
  ];

  console.log('Updating Timber Cladding product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Cladding" || slug.current == "timber-cladding-weatherboards")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Timber Cladding product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions, specs: premiumSpecs })
    .commit();

  console.log('Sync complete!');
}

syncTimberCladding().catch(console.error);
