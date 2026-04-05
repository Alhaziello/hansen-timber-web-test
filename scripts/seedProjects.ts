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

const projects = [
  {
    title: "The Clevedon Residence",
    slug: "clevedon-residence",
    client: "Martin & Miranda's",
    description: "A stunning application of Eucalyptus Blackbutt Hardwood Flooring in a local Clevedon home.",
    mainImage: "/images/products/hardwood-flooring.png",
    gallery: ["/images/products/hardwood-flooring.png", "/images/products/hardwood-flooring.png"],
    content: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "This project showcases the warmth and durability of our locally grown Eucalyptus Blackbutt. Milled onsite at Hansen Timber, the 135x19mm boards provide a sophisticated feature to this family home." }],
      },
      {
        _type: "block",
        style: "h3",
        markDefs: [],
        children: [{ _type: "span", text: "Timber Specification" }],
      },
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "The clients chose Eucalyptus Pilularis for its unique color variations and high Janka hardness rating, ensuring the floor remains beautiful for generations." }],
      },
    ],
    completionDate: "2024-01-15",
  },
  {
    title: "Slab Studio Vanity",
    slug: "slab-studio-vanity",
    client: "Tony Gifford @Slabstudiosnz",
    description: "Handcrafted vanity masterpiece utilizing Ancient Swamp Kauri slabs.",
    mainImage: "/images/products/swamp-kauri-slabs.png",
    gallery: ["/images/products/swamp-kauri-slabs.png", "/images/products/swamp-kauri-slabs.png"],
    content: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "Tony Gifford of Slab Studios NZ transformed a raw 45,000-year-old Swamp Kauri slab into a stunning bathroom vanity that highlights the natural 'shimmer' and history of the wood." }],
      },
    ],
    completionDate: "2023-11-20",
  },
];

async function seed() {
  console.log("Seeding Architectural Gallery...");
  for (const p of projects) {
    const mainImage = await uploadImage(p.mainImage);
    const gallery = await Promise.all(p.gallery.map(uploadImage));

    const doc = {
      _type: "project",
      _id: `project-${p.slug}`,
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      client: p.client,
      description: p.description,
      mainImage,
      gallery: gallery.filter(Boolean),
      content: p.content,
      completionDate: p.completionDate,
    };

    await client.createOrReplace(doc);
    console.log(`Updated project: ${p.title}`);
  }
  console.log("Seeding complete!");
}

seed().catch(console.error);
