const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberSarking() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const standardSizes = ['85x13mm', '85x19mm', '135x13mm', '135x19mm'];

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Globoidea') },
      sizes: standardSizes,
      notes: 'Available in T&GV + Negative Square Detail profiles.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Globulus') },
      sizes: standardSizes,
      notes: 'Available in T&GV + Negative Square Detail profiles.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: standardSizes,
      notes: 'Available in T&GV + Negative Square Detail profiles.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Blackbutt') },
      sizes: standardSizes,
      notes: 'Available in T&GV + Negative Square Detail profiles.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: standardSizes,
      notes: 'Available in T&GV + Negative Square Detail profiles.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Australian Blackwood') },
      sizes: ['135x13mm', '135x19mm'],
      notes: 'Premium furniture-grade sarking. Available in 135mm profiles only.'
    }
  ].filter(opt => opt.species._ref !== null);

  const premiumSpecs = [
    'T&GV + Negative Square Detail',
    'Precision Tongue & Groove',
    'Architectural Shadow Line',
    'Interior Sarking & Panelling',
    'Select Grade Hardwoods'
  ];

  console.log('Updating Sarking & Panelling product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Sarking" || slug.current == "hardwood-solid-timber-sarking-and-panelling-t-gv")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Sarking & Panelling product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions, specs: premiumSpecs })
    .commit();

  console.log('Sync complete!');
}

syncTimberSarking().catch(console.error);
