Variant Asset Sync Folder Structure
===================================
This directory is generated automatically. Do not manually modify the folder structure.

How to use:
1. Place a single image (.jpg, .jpeg, or .png) inside the leaf folder for a product variant.
   Example: ./assets-to-sync/[productSlug]/[speciesSlug]/image.jpg
2. Run the sync script: node scripts/sync-variant-images.js
   The script will upload the image to Sanity and bind it to the correct boardOption variant.
