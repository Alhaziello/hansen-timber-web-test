const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-14',
});

async function syncDeckingAndBeams() {
  console.log('Fetching species...');
  const species = await client.fetch('*[_type == "species"]{ _id, name }');
  
  const getSpeciesId = (name) => {
    const found = species.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found._id : null;
  };

  // --- DECKING ---
  const deckingOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Blackbutt') },
      sizes: ['90 x 19mm', '140 x 19mm'],
      notes: 'Premium hardwood decking with exceptional fire resistance and durability.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: ['90 x 19mm', '140 x 19mm'],
      notes: 'Stunning red-toned hardwood decking. High density and wear resistance.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: ['90 x 32mm', '140 x 32mm'],
      notes: 'Naturally durable "chunky" profile decking. Ideal for a rustic or coastal aesthetic.'
    }
  ].filter(opt => opt.species._ref !== null);

  // --- BEAMS ---
  const beamSizes = [
    '200mm x 50mm',
    '200mm x 100mm',
    '300mm x 200mm',
    '300mm x 300mm',
    '400mm x 300mm',
    '400mm x 400mm'
  ];

  const beamOptions = [
    {
      species: { _type: 'reference', _ref: getSpeciesId('Saligna') },
      sizes: beamSizes,
      notes: 'Structural R/S Beams. Exceptional strength-to-weight ratio.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Macrocarpa') },
      sizes: beamSizes,
      notes: 'Naturally durable architectural beams. Perfect for exposed exterior structures.'
    },
    {
      species: { _type: 'reference', _ref: getSpeciesId('Blackbutt') },
      sizes: beamSizes,
      notes: 'Absolute premium structural timber. High fire rating and beautiful straight grain.'
    }
  ].filter(opt => opt.species._ref !== null);

  console.log('Updating Decking...');
  const decking = await client.fetch('*[_type == "product" && (name match "Decking" || slug.current == "decking-timber")][0]{ _id }');
  if (decking) {
    await client.patch(decking._id).set({ 
      boardOptions: deckingOptions, 
      specs: ['Precision Profiled', 'Natural Durability', 'Stable & Hardwearing', 'Architectural Finish'] 
    }).commit();
  }

  console.log('Updating Beams...');
  const beams = await client.fetch('*[_type == "product" && (name match "Beams" || slug.current == "timber-beams")][0]{ _id }');
  if (beams) {
    await client.patch(beams._id).set({ 
      boardOptions: beamOptions, 
      specs: ['Structural Integrity', 'Custom R/S Finish', 'Large Cross-Sections', 'High Load Bearing'] 
    }).commit();
  }

  console.log('Sync complete!');
}

syncDeckingAndBeams().catch(console.error);
