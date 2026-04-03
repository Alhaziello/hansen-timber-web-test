import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PRODUCTS, SPECIES, CATEGORIES } from '@/data/products'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Simple .env.local parser
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

loadEnv()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-01-01',
})

async function uploadImage(imagePath: string) {
  try {
    const fullPath = path.resolve(process.cwd(), 'public', imagePath.replace(/^\//, ''))
    const fileStream = fs.createReadStream(fullPath)
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(fullPath),
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error)
    return null
  }
}

const SPECIES_EXTRA_DATA: Record<string, any> = {
  pine: {
    tagline: "Sustainable Versatility",
    features: ["Sustainable Source", "Precision Milled", "Versatile Application"],
  },
  macrocarpa: {
    tagline: "Natural Character and Longevity",
    features: ["Natural Durability", "Chemical-Free", "Rich Golden Grain"],
  },
  "swamp-kauri": {
    tagline: "Ancient Majestic Timber",
    features: ["Ancient Heritage", "Shimmering Grain", "Unique Character"],
  },
  eucalyptus: {
    tagline: "The Strength of the Waitakeres",
    features: ["Class 1 Durability", "High Density (1000kg/m3)", "Sustainable Harvesting"],
  }
};

async function migrate() {
  console.log('Starting migration...')

  const categoryMap: Record<string, string> = {}
  const speciesMap: Record<string, string> = {}

  // 1. Migrate Categories
  console.log('Migrating Categories...')
  for (const category of CATEGORIES) {
    const image = await uploadImage(category.image)
    const doc = {
      _type: 'category',
      _id: `category-${category.id}`,
      title: category.title,
      id: { _type: 'slug', current: category.id },
      description: category.description,
      image,
    }
    const result = await client.createOrReplace(doc)
    categoryMap[category.id] = result._id
    console.log(`Created category: ${category.title}`)
  }

  // 2. Migrate Species
  console.log('Migrating Species...')
  for (const species of SPECIES) {
    const image = await uploadImage(species.image)
    const extra = SPECIES_EXTRA_DATA[species.slug] || {}
    const doc = {
      _type: 'species',
      _id: `species-${species.slug}`,
      name: species.name,
      slug: { _type: 'slug', current: species.slug },
      description: species.description,
      tagline: extra.tagline,
      features: extra.features,
      image,
    }
    const result = await client.createOrReplace(doc)
    speciesMap[species.slug] = result._id
    console.log(`Created species: ${species.name}`)
  }

  // 3. Migrate Products
  console.log('Migrating Products...')
  for (const product of PRODUCTS) {
    const image = await uploadImage(product.image)
    
    // Try to find matching species based on product name or description
    const speciesRef = Object.entries(speciesMap).find(([slug, id]) => 
      product.name.toLowerCase().includes(slug.toLowerCase()) || 
      product.description.toLowerCase().includes(slug.toLowerCase()) ||
      product.specs.some(spec => spec.toLowerCase().includes(slug.toLowerCase()))
    )?.[1]

    const doc = {
      _type: 'product',
      _id: `product-${product.id}`,
      name: product.name,
      slug: { _type: 'slug', current: product.id },
      description: product.description,
      specs: product.specs,
      image,
      category: {
        _type: 'reference',
        _ref: categoryMap[product.category],
      },
      species: speciesRef ? {
        _type: 'reference',
        _ref: speciesRef,
      } : undefined,
    }
    await client.createOrReplace(doc)
    console.log(`Created product: ${product.name}`)
  }

  console.log('Migration complete!')
}

migrate().catch(console.error)
