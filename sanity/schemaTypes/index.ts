import { type SchemaTypeDefinition } from 'sanity'
import post from '../schemas/post'
import blockContent from '../schemas/blockContent'
import product from '../schemas/product'
import species from '../schemas/species'
import category from '../schemas/category'
import project from '../schemas/project'
import siteSettings from '../schemas/siteSettings'
import homePage from '../schemas/homePage'
import slab from '../schemas/slab'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, product, species, category, project, siteSettings, homePage, slab],
}
