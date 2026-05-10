import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Home Page',
      type: 'boolean',
      description: 'Check this to show this product in the Featured Collections on the Home Page.',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'species',
      title: 'Available Species',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'species' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Deep Content (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      description: 'For a sharp display across all devices, use a high-resolution photo at least 2000px wide.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specFiles',
      title: 'Downloadable Spec Files',
      type: 'array',
      of: [{ type: 'file' }],
      description: 'PDFs or Documents for architects (Spec files, user guides, etc.)'
    }),
    defineField({
      name: 'schematics',
      title: 'Profiles & Schematics',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Technical drawings and timber profiles. Use high-contrast images at least 1500px wide for crisp line detail.'
    }),
    defineField({
      name: 'colorVariants',
      title: 'Color Variants (for SPC Flooring)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Color Name', type: 'string' },
            { name: 'swatch', title: 'Color Swatch', type: 'image', options: { hotspot: true } },
            { name: 'image', title: 'Product Image for this Color', type: 'image', options: { hotspot: true } },
          ]
        }
      ],
      description: 'Add color variants for products like SPC Hybrid Flooring that have a color range instead of timber species.'
    }),
    defineField({
      name: 'boardOptions',
      title: 'Board Specifications (The Menu)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'species', title: 'Species', type: 'reference', to: [{ type: 'species' }] },
            { name: 'sizes', title: 'Available Sizes', type: 'array', of: [{ type: 'string' }], description: 'e.g. 150mm x 25mm' },
            { name: 'notes', title: 'Special Notes', type: 'string', description: 'e.g. Absolute Premium with No Knots!' }
          ],
          preview: {
            select: {
              title: 'species.name',
              subtitle: 'notes'
            }
          }
        }
      ],
      description: 'Use this for Timber Boards to list available sizes grouped by species.'
    }),
  ],
})
