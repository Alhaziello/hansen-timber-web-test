const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-14',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  try {
    console.log('Fetching products with board options from Sanity...');
    const products = await client.fetch(`
      *[_type == "product" && defined(boardOptions)] {
        "slug": slug.current,
        boardOptions[] {
          "speciesSlug": species->slug.current
        }
      }
    `);

    console.log(`Found ${products.length} products with board options.`);

    const baseDir = path.join(__dirname, 'assets-to-sync');

    // Create root assets-to-sync directory
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    // Write README.txt in the root assets-to-sync folder
    const readmeContent = `Variant Asset Sync Folder Structure
===================================
This directory is generated automatically. Do not manually modify the folder structure.

How to use:
1. Place a single image (.jpg, .jpeg, or .png) inside the leaf folder for a product variant.
   Example: ./assets-to-sync/[productSlug]/[speciesSlug]/image.jpg
2. Run the sync script: node scripts/sync-variant-images.js
   The script will upload the image to Sanity and bind it to the correct boardOption variant.
`;
    fs.writeFileSync(path.join(baseDir, 'README.txt'), readmeContent, 'utf-8');
    console.log('Created README.txt');

    let folderCount = 0;

    for (const product of products) {
      if (!product.slug) continue;
      const productSlug = product.slug;

      if (!product.boardOptions || product.boardOptions.length === 0) continue;

      for (const option of product.boardOptions) {
        if (!option.speciesSlug) continue;
        const speciesSlug = option.speciesSlug;
        const targetPath = path.join(baseDir, productSlug, speciesSlug);
        
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
          folderCount++;
        }
      }
    }

    console.log(`Scaffolding complete. Created ${folderCount} variant directories.`);
  } catch (error) {
    console.error('An error occurred during scaffolding:', error);
    process.exit(1);
  }
}

main();
