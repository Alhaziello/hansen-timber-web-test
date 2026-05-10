const { createClient } = require('@sanity/client');
require('dotenv').config();
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-14',
});

async function runFullAudit() {
  console.log('Running Master Data Audit...');
  
  const species = await client.fetch('*[_type == "species"]{ name, image }');
  const products = await client.fetch('*[_type == "product"]{ name, image, schematics, boardOptions, colorVariants }');
  const slabs = await client.fetch('*[_type == "slab"]{ name, image }');

  let report = '# HANSEN TIMBER DATA AUDIT REPORT\n\n';
  report += `*Generated on: ${new Date().toLocaleString()}*\n\n`;

  // --- SPECIES AUDIT ---
  report += '## 1. Species Assets\n';
  const missingSpecies = species.filter(s => !s.image);
  if (missingSpecies.length > 0) {
    report += 'The following species are missing their main display image:\n';
    missingSpecies.forEach(s => report += `- [ ] ${s.name}\n`);
  } else {
    report += '✅ All species have images!\n';
  }
  report += '\n---\n\n';

  // --- PRODUCT AUDIT ---
  report += '## 2. Product Assets\n';
  products.forEach(p => {
    let status = [];
    if (!p.image) status.push('Main Image');
    if (!p.schematics || p.schematics.length === 0) status.push('Technical Schematic');
    
    // Check if it's a Board Menu product and if we have any specific needs
    if (p.boardOptions && p.boardOptions.length > 0) {
      // Boards usually need schematics
    }

    if (status.length > 0) {
      report += `### ${p.name}\n`;
      report += 'Missing:\n';
      status.forEach(s => report += `- [ ] ${s}\n`);
      report += '\n';
    }
  });
  
  if (!products.some(p => !p.image || !p.schematics)) {
    report += '✅ All products are fully asset-complete!\n';
  }
  report += '\n---\n\n';

  // --- SLAB AUDIT ---
  report += '## 3. Timber Slabs Audit\n';
  const missingSlabs = slabs.filter(s => !s.image);
  if (missingSlabs.length > 0) {
    report += 'The following slabs are missing their unique photo:\n';
    missingSlabs.forEach(s => report += `- [ ] ${s.name}\n`);
  } else {
    report += '✅ All slabs have images!\n';
  }

  fs.writeFileSync('DATA_AUDIT_REPORT.md', report);
  console.log('Audit complete! See DATA_AUDIT_REPORT.md');
}

runFullAudit().catch(console.error);
