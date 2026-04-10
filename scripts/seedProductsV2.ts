import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";

// Simple .env parser
function loadEnv() {
  let envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    envPath = path.resolve(process.cwd(), '.env')
  }
  
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8')
    envFile.split('\n').forEach((line) => {
      const [key, value] = line.split('=')
      if (key && value) {
        process.env[key.trim()] = value.trim()
      }
    })
  }
}

loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1m8r87we",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-04-03",
});

async function uploadImage(imagePath: string) {
  try {
    const fullPath = path.resolve(process.cwd(), "public", imagePath.replace(/^\//, ""));
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return null;
    }
    const imageData = fs.readFileSync(fullPath);
    const asset = await client.assets.upload("image", imageData, {
      filename: path.basename(fullPath),
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Failed to upload ${imagePath}:`, error);
    return null;
  }
}

const speciesData = [
    { id: "species-eucalyptus", name: "Eucalyptus", slug: "eucalyptus" },
    { id: "species-macrocarpa", name: "Macrocarpa", slug: "macrocarpa" },
    { id: "species-blackwood", name: "Australian Blackwood", slug: "blackwood" },
    { id: "species-kauri", name: "Swamp Kauri", slug: "swamp-kauri" },
    { id: "species-spc", name: "SPC (Hybrid)", slug: "spc-hybrid" },
];

const products = [
  {
    name: "Hardwood Flooring",
    slug: "hardwood-flooring",
    category: "category-interior",
    species: ["species-eucalyptus", "species-blackwood"],
    image: "images/products/hardwood-flooring.png",
    description: "Premium hardwood flooring in distinctive species. NZ-grown Eucalyptus and Australian Blackwood, precision-milled for durability and timeless beauty."
  },
  {
    name: "Superior SPC Flooring",
    slug: "superior-spc-flooring",
    category: "category-interior",
    species: ["species-spc"],
    image: "images/products/superior-spc-flooring.png",
    description: "Premium Hybrid SPC Waterproof Flooring available in a range of colours and styles."
  },
  {
    name: "Timber Panelling & Sarking",
    slug: "timber-panelling-sarking",
    category: "category-interior",
    species: ["species-eucalyptus"],
    image: "images/products/timber-panelling-sarking.png",
    description: "Enhance any space with durable, NZ-grown Eucalyptus timber panelling & sarking. Hardwearing, locally sourced."
  },
  {
    name: "Decking Timber",
    slug: "decking-timber",
    category: "category-outdoor",
    species: ["species-macrocarpa", "species-eucalyptus"],
    image: "images/products/decking-timber.png",
    description: "Beautifully crafted Hardwood Solid Timber Decking locally grown in NZ and milled onsite. Experience Macrocarpa and Eucalyptus decking."
  },
  {
    name: "Macrocarpa Sleepers",
    slug: "macrocarpa-sleepers",
    category: "category-outdoor",
    species: ["species-macrocarpa"],
    image: "images/products/macrocarpa-sleepers.png",
    description: "Perfect for garden projects, landscaping, or as sturdy support in your outdoor spaces. Durable and natural."
  },
  {
    name: "MacBox S Series Kitset Garden Box",
    slug: "macbox-s-series-kitset-garden-box",
    category: "category-outdoor",
    species: ["species-macrocarpa"],
    image: "images/products/macbox-s-series-kitset-garden-box.png",
    description: "Modular timber garden box providing an elegant and easy-to-assemble solution for any gardener."
  },
  {
    name: "Timber Beams",
    slug: "timber-beams",
    category: "category-structural",
    species: ["species-macrocarpa", "species-eucalyptus"],
    image: "images/products/timber-beams.png",
    description: "Strong structural beams for building or decorating projects. Available in Macrocarpa and Eucalyptus."
  },
  {
    name: "Timber Boards",
    slug: "timber-boards",
    category: "category-structural",
    species: ["species-macrocarpa", "species-eucalyptus"],
    image: "images/products/timber-boards.png",
    description: "Available in Macrocarpa R/S and Blackbutt Eucalyptus R/S across a range of standard sizes."
  },
  {
    name: "Macrocarpa Cladding",
    slug: "macrocarpa-cladding",
    category: "category-structural",
    species: ["species-macrocarpa"],
    image: "images/products/macrocarpa-cladding.png",
    description: "Macrocarpa Board and Batten providing a modern cladding alternative for your next architectural project."
  },
  {
    name: "Swamp Kauri Slabs",
    slug: "swamp-kauri-slabs",
    category: "category-slabs",
    species: ["species-kauri"],
    image: "images/products/swamp-kauri-slabs.png",
    description: "Ancient Kauri Timber Slabs sourced locally from Ardmore swamp land, perfect for unique furniture."
  },
  {
    name: "Eucalyptus Slabs",
    slug: "eucalyptus-slabs",
    category: "category-slabs",
    species: ["species-eucalyptus"],
    image: "images/products/eucalyptus-slabs.png",
    description: "Eucalyptus pilularis (Blackbutt) hardwood timber. Locally sourced with distinctive tones and natural resins."
  },
  {
    name: "Macrocarpa Slabs",
    slug: "macrocarpa-slabs",
    category: "category-slabs",
    species: ["species-macrocarpa"],
    image: "images/products/macrocarpa-slabs.png",
    description: "Natural beauty and durability. Wide wood slabs perfect for unique furniture and bespoke projects."
  },
  {
    name: "Other Timber Products",
    slug: "other-timber-products",
    category: "category-outdoor",
    species: ["species-macrocarpa", "species-eucalyptus"],
    image: "images/products/other-timber-products.png",
    description: "Garden stakes, fence batons, timber sawdust, and firewood available for purchase."
  }
];

async function seed() {
  console.log("Starting full Product migration...");

  // 1. Ensure Species exist
  console.log("Syncing Species...");
  for (const s of speciesData) {
      await client.createOrReplace({
          _id: s.id,
          _type: "species",
          name: s.name,
          slug: { _type: "slug", current: s.slug }
      });
  }

  // 2. Sync Products
  for (const p of products) {
    console.log(`Processing ${p.name}...`);
    const mainImage = await uploadImage(p.image);

    const doc = {
      _type: 'product',
      _id: `product-${p.slug}`,
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      description: p.description,
      featured: false,
      category: {
        _type: 'reference',
        _ref: p.category
      },
      species: p.species.map(sId => ({
        _key: sId,
        _type: 'reference',
        _ref: sId
      })),
      image: mainImage || undefined
    };

    await client.createOrReplace(doc);
    console.log(`✅ Success: ${p.name}`);
  }

  console.log("\n🚀 Migration Complete! 13 Products and Species synchronized.");
}

seed().catch(console.error);
