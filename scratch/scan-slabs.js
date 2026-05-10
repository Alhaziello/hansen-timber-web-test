const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function findMessySlabLinks() {
  console.log('Scanning all slabs for external links...');
  const slabs = await client.fetch('*[_type == "slab"]');
  
  let found = 0;
  slabs.forEach(s => {
    const stringified = JSON.stringify(s);
    const externalLinks = stringified.match(/https?:\/\/(?!(cdn\.sanity\.io))[^\s"']+/g);
    
    if (externalLinks) {
      console.log(`\nSlab: ${s.name} (${s.slug?.current})`);
      externalLinks.forEach(link => {
        console.log(`  - Found external link: ${link}`);
        found++;
      });
    }
  });

  if (found === 0) {
    console.log('\nNo external messy links found in slabs! All slab images are native assets.');
  } else {
    console.log(`\nFound ${found} external links total.`);
  }
}

findMessySlabLinks().catch(console.error);
