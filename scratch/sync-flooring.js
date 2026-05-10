const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberFlooring() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const standardSizes = ['85x13mm', '85x19mm', '135x13mm', '135x19mm'];

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Blackbutt') },
      sizes: standardSizes,
      notes: 'Select grade T&G profiles. High fire rating and extreme durability.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: standardSizes,
      notes: 'Stunning red hardwood flooring. Ideal for high-traffic areas.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Globoidea') },
      sizes: standardSizes,
      notes: 'Naturally durable and stable interior flooring.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Globulus') },
      sizes: standardSizes,
      notes: 'High-density Southern Blue Gum. Classic architectural choice.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: standardSizes,
      notes: 'Beautiful golden heartwood. Provides a warm, natural aesthetic.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Australian Blackwood') },
      sizes: ['135x13mm', '135x19mm'],
      notes: 'Rare and decorative furniture-grade flooring. Available in 135mm profiles only.'
    }
  ].filter(opt => opt.species._ref !== null);

  const premiumSpecs = [
    'Precision T&G Profiles',
    'High Density Hardwoods',
    'Natural Color Variation',
    'End Matching Available',
    'Superior Wear Resistance'
  ];

  console.log('Updating Solid Timber Flooring product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Flooring" || slug.current == "hardwood-solid-timber-flooring")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Solid Timber Flooring product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions, specs: premiumSpecs })
    .commit();

  console.log('Sync complete!');
}

syncTimberFlooring().catch(console.error);
