const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function findMessyLinks() {
  console.log('Scanning all products for external links...');
  const products = await client.fetch('*[_type == "product"]');
  
  let found = 0;
  products.forEach(p => {
    const stringified = JSON.stringify(p);
    // Look for http or https links that aren't sanity.io links
    const externalLinks = stringified.match(/https?:\/\/(?!(cdn\.sanity\.io))[^\s"']+/g);
    
    if (externalLinks) {
      console.log(`\nProduct: ${p.name} (${p.slug?.current})`);
      externalLinks.forEach(link => {
        console.log(`  - Found external link: ${link}`);
        found++;
      });
    }
  });

  if (found === 0) {
    console.log('\nNo external messy links found in products! All images seem to be native assets.');
  } else {
    console.log(`\nFound ${found} external links total.`);
  }
}

findMessyLinks().catch(console.error);
