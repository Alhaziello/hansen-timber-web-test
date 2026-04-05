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

async function parseToPortableText(text: string) {
  if (!text) return []
  
  const blocks: any[] = []
  const paragraphs = text.split(/\n\n+/)
  
  const generateKey = () => Math.random().toString(36).substring(2, 9)

  for (const para of paragraphs) {
    const lines = para.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length === 0) continue

    // Check if the first line is likely a header
    const firstLine = lines[0]
    const looksLikeHeader = firstLine === firstLine.toUpperCase() && firstLine.length > 5
    
    if (looksLikeHeader) {
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', marks: [], text: firstLine }]
      })
      
      // Process remaining lines in this paragraph
      const remainingLines = lines.slice(1)
      for (const line of remainingLines) {
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: generateKey(), _type: 'span', marks: [], text: line }]
        })
      }
    } else {
      // Process lines as a list if they look like items or species
      const isList = lines.length > 1 && (
        lines.some(l => l.startsWith('-') || l.startsWith('•')) ||
        lines.every(l => l.includes('Eucalyptus') || l.includes('mm'))
      )
      
      for (const line of lines) {
        const cleanLine = line.replace(/^[-•]\s*/, '')
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          listItem: isList ? 'bullet' : undefined,
          level: isList ? 1 : undefined,
          children: [{ _key: generateKey(), _type: 'span', marks: [], text: cleanLine }]
        })
      }
    }
  }
  
  return blocks
}

async function migrate() {
  console.log('Starting migration...')

  const categoryMap: Record<string, string> = {}
  const speciesMap: Record<string, string> = {}

  // 1. Migrate Categories
  console.log('Migrating Categories...')
  for (const category of CATEGORIES) {
    const imageAsset = category.image ? await uploadImage(category.image) : null
    
    const doc = {
      _type: 'category',
      _id: `category-${category.id}`,
      title: category.title,
      id: { _type: 'slug', current: category.id },
      description: category.description,
      image: imageAsset || undefined,
    }
    const result = await client.createOrReplace(doc)
    categoryMap[category.id] = result._id
    console.log(`Updated category: ${category.title}`)
  }

  // 2. Migrate Species
  console.log('Migrating Species...')
  for (const species of SPECIES) {
    const imageAsset = species.image ? await uploadImage(species.image) : null

    const doc = {
      _type: 'species',
      _id: `species-${species.slug}`,
      name: species.name,
      slug: { _type: 'slug', current: species.slug },
      description: species.description,
      image: imageAsset || undefined,
    }
    const result = await client.createOrReplace(doc)
    speciesMap[species.slug] = result._id
    console.log(`Updated species: ${species.name}`)
  }

  // 3. Migrate Products
  console.log('Migrating Products...')
  for (const product of PRODUCTS) {
    const content = await parseToPortableText((product as any).deepContent)
    const imageAsset = product.image ? await uploadImage(product.image) : null
    
    // Try to find matching species based on product name or description
    const speciesRef = Object.entries(speciesMap).find(([slug, id]) => 
      product.name.toLowerCase().includes(slug.toLowerCase()) || 
      product.description.toLowerCase().includes(slug.toLowerCase())
    )?.[1]

    const doc = {
      _type: 'product',
      _id: `product-${product.id}`,
      name: product.name,
      slug: { _type: 'slug', current: product.id },
      description: product.description,
      featured: (product as any).featured === true,
      specs: product.specs,
      category: {
        _type: 'reference',
        _ref: categoryMap[product.category],
      },
      content: content.length > 0 ? content : undefined,
      species: speciesRef ? {
        _type: 'reference',
        _ref: speciesRef,
      } : undefined,
      image: imageAsset || undefined,
    }
    await client.createOrReplace(doc)
    console.log(`Created/Updated product: ${product.name} (${content.length} content blocks)`)
  }

  console.log('Migration complete!')
}

migrate().catch(console.error)
