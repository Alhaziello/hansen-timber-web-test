const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberBoards() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: [
        '150mm x 25mm',
        '200mm x 25mm',
        '300mm x 25mm',
        '150mm x 50mm',
        '200mm x 50mm',
        '250mm x 50mm'
      ],
      notes: 'Available in R/S (Rough Sawn)'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: [
        '150mm x 25mm',
        '200mm x 25mm',
        '300mm x 25mm',
        '150mm x 50mm',
        '200mm x 50mm',
        '250mm x 50mm'
      ],
      notes: 'Available in R/S (Rough Sawn)'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Blackbutt') },
      sizes: ['165 x 25mm'],
      notes: 'Available Quarter Sawn or Flat Sawn. Flat Sawn offers a premium product with lots of resin / Kino visible within the timber. Absolute Premium Timber with No Knots!'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Australian Blackwood') },
      sizes: ['150x25mm'],
      notes: 'Premium furniture and joinery timber.'
    }
  ].filter(opt => opt.species._ref !== null);

  console.log('Updating Timber Boards product...');
  
  // Find the Timber Boards product ID
  const product = await client.fetch('*[_type == "product" && (name match "Timber Boards" || slug.current == "timber-boards")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Timber Boards product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions })
    .commit();

  console.log('Sync complete!');
}

syncTimberBoards().catch(console.error);
