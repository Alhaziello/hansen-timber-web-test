const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncTimberFence() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  const boardOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Pine') },
      sizes: ['H3.2 Treated Interlocking Profiles'],
      notes: 'Standard H3.2 treatment for long-term ground contact and exterior durability.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: ['Natural Hardwood Interlocking'],
      notes: 'Premium naturally durable hardwood option. No chemical treatment required.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: ['Natural Heartwood Interlocking'],
      notes: 'Beautiful, naturally durable heartwood. Ideal for a high-end architectural finish.'
    }
  ].filter(opt => opt.species._ref !== null);

  const premiumSpecs = [
    'Precision Interlocking Design',
    'H3.2 Exterior Grade Pine',
    'Naturally Durable Hardwoods',
    'Modular Installation System',
    'Superior Longevity'
  ];

  console.log('Updating Timber Interlocking Fence product...');
  
  const product = await client.fetch('*[_type == "product" && (name match "Interlocking Fence" || slug.current == "timber-interlocking-fence")][0]{ _id }');
  
  if (!product) {
    console.error('Could not find Interlocking Fence product!');
    return;
  }

  await client
    .patch(product._id)
    .set({ boardOptions, specs: premiumSpecs })
    .commit();

  console.log('Sync complete!');
}

syncTimberFence().catch(console.error);
