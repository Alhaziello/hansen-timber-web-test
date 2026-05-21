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
  const baseDir = path.join(__dirname, 'assets-to-sync');
  
  if (!fs.existsSync(baseDir)) {
    console.error(`Error: Directory ${baseDir} does not exist. Run scaffold-asset-folders.js first.`);
    process.exit(1);
  }

  const results = [];
  
  try {
    const productSlugs = fs.readdirSync(baseDir).filter(file => {
      const fullPath = path.join(baseDir, file);
      return fs.statSync(fullPath).isDirectory();
    });

    const syncTargets = [];

    for (const productSlug of productSlugs) {
      const productPath = path.join(baseDir, productSlug);
      const speciesSlugs = fs.readdirSync(productPath).filter(file => {
        const fullPath = path.join(productPath, file);
        return fs.statSync(fullPath).isDirectory();
      });

      for (const speciesSlug of speciesSlugs) {
        const speciesPath = path.join(productPath, speciesSlug);
        const files = fs.readdirSync(speciesPath);

        // Find the first image file in the directory (case-insensitive extensions)
        const imageFile = files.find(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
        });

        if (imageFile) {
          syncTargets.push({
            productSlug,
            speciesSlug,
            fileName: imageFile,
            filePath: path.join(speciesPath, imageFile),
          });
        }
      }
    }

    if (syncTargets.length === 0) {
      console.log('No images found in any variant folders to sync.');
      return;
    }

    console.log(`Found ${syncTargets.length} images to sync. Processing...`);

    for (const target of syncTargets) {
      const { productSlug, speciesSlug, fileName, filePath } = target;
      console.log(`Syncing ${productSlug} -> ${speciesSlug} using ${fileName}...`);
      
      try {
        // 1. Upload the image file to Sanity Assets
        const fileStream = fs.createReadStream(filePath);
        const asset = await client.assets.upload('image', fileStream, {
          filename: fileName,
        });
        
        const assetId = asset._id;

        // 2. Fetch the product document to locate the boardOptions key
        const query = `*[_type == "product" && slug.current == $productSlug][0] {
          _id,
          boardOptions[] {
            _key,
            "speciesSlug": species->slug.current
          }
        }`;
        
        const productDoc = await client.fetch(query, { productSlug });

        if (!productDoc) {
          results.push({
            Product: productSlug,
            Species: speciesSlug,
            Image: fileName,
            Status: 'Failed',
            Reason: 'Product document not found in Sanity',
          });
          continue;
        }

        if (!productDoc.boardOptions || productDoc.boardOptions.length === 0) {
          results.push({
            Product: productSlug,
            Species: speciesSlug,
            Image: fileName,
            Status: 'Failed',
            Reason: 'Product has no boardOptions configured',
          });
          continue;
        }

        // 3. Find the specific boardOption that matches the speciesSlug
        const matchedOption = productDoc.boardOptions.find(
          opt => opt.speciesSlug === speciesSlug
        );

        if (!matchedOption || !matchedOption._key) {
          results.push({
            Product: productSlug,
            Species: speciesSlug,
            Image: fileName,
            Status: 'Failed',
            Reason: `No boardOption found matching species: ${speciesSlug}`,
          });
          continue;
        }

        // 4. Patch the variantImage field on that specific array item
        await client.patch(productDoc._id)
          .set({
            [`boardOptions[_key == "${matchedOption._key}"].variantImage`]: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetId,
              },
            },
          })
          .commit();

        results.push({
          Product: productSlug,
          Species: speciesSlug,
          Image: fileName,
          Status: 'Success',
          Reason: 'Image uploaded and variant patched successfully',
        });

      } catch (err) {
        results.push({
          Product: productSlug,
          Species: speciesSlug,
          Image: fileName,
          Status: 'Failed',
          Reason: err.message || err.toString(),
        });
      }
    }
  } catch (err) {
    console.error('An unexpected error occurred during sync process:', err);
  } finally {
    console.log('\n--- Sync Summary Table ---');
    console.table(results);
  }
}

main();
