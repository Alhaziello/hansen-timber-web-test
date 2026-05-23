import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'General Information' },
    { name: 'visuals', title: 'Visual Assets' },
    { name: 'technical', title: 'Technical Specifications' },
    { name: 'specialized', title: 'Specialized Data (Flooring / Boards)' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      fieldset: 'general',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Home Page',
      type: 'boolean',
      description: 'Check this to show this product in the Featured Collections on the Home Page.',
      initialValue: false,
      fieldset: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      fieldset: 'general',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Short Summary',
      type: 'text',
      description: 'A 1-2 sentence hook for product cards.',
      fieldset: 'general',
    }),
    defineField({
      name: 'image',
      title: 'Main Hero Image',
      type: 'image',
      description: 'For a sharp display across all devices, use a high-resolution photo at least 2000px wide.',
      options: { hotspot: true },
      fieldset: 'visuals',
    }),
    defineField({
      name: 'species',
      title: 'Available Timber Species',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'species' }] }],
      description: 'Which timber species is this product available in?',
      fieldset: 'technical',
    }),
    defineField({
      name: 'specs',
      title: 'Key Attributes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown on product cards (e.g. "Naturally Durable").',
      fieldset: 'technical',
    }),
    defineField({
      name: 'specFiles',
      title: 'Downloadable Spec Files',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Display Title',
              description: 'e.g. "Installation Guide" or "Technical Data Sheet" (falls back to filename if blank)'
            }
          ]
        }
      ],
      description: 'PDFs or Documents for architects (Spec files, user guides, etc.)',
      fieldset: 'technical',
    }),
    defineField({
      name: 'schematics',
      title: 'Technical Drawings / Profiles',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Technical drawings and timber profiles.',
      fieldset: 'visuals',
    }),
    defineField({
      name: 'colorVariants',
      title: 'Color Variants (Flooring Only)',
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
      description: 'Only for products like SPC Hybrid Flooring that use colors instead of timber species.',
      fieldset: 'specialized',
      hidden: ({ document }) => {
        const name = (document?.name as string) || '';
        return !name.toLowerCase().includes('flooring') && !name.toLowerCase().includes('spc');
      }
    }),
    /*
    defineField({
      name: 'boardOptions',
      title: 'Sizing & Pricing Menu (Boards)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'species', title: 'Species', type: 'reference', to: [{ type: 'species' }] },
            { name: 'sizes', title: 'Available Sizes', type: 'array', of: [{ type: 'string' }], description: 'e.g. 150mm x 25mm' },
            { name: 'notes', title: 'Special Notes', type: 'string', description: 'e.g. Absolute Premium with No Knots!' },
            {
              name: 'variantImage',
              title: 'Variant Image Override',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional image override for this specific product/species variant.'
            },
            {
              name: 'variantDescription',
              title: 'Variant Description Override',
              type: 'text',
              description: 'Optional description override for this specific product/species variant.'
            }
          ],
          preview: {
            select: {
              title: 'species.name',
              subtitle: 'notes',
              variantImage: 'variantImage',
              speciesImage: 'species.image'
            },
            prepare({ title, subtitle, variantImage, speciesImage }) {
              return {
                title: title || 'Unnamed Variant',
                subtitle: subtitle || 'No special notes',
                media: variantImage || speciesImage
              }
            }
          }
        }
      ],
      description: 'Enable this to show a structured size/price grid (e.g. for Cladding, Decking, or Kitsets).',
      fieldset: 'specialized',
    */
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions (FAQs)',
      type: 'array',
      fieldset: 'general',
      description: 'Add product-specific FAQs here.',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fieldset: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Overrides the default product name for search engines. Optimal length: 50-60 chars.',
          validation: (Rule) => Rule.max(60).warning('Titles longer than 60 characters will likely be truncated by Google.'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'A compelling summary for search results. Optimal length: 150-160 chars.',
          validation: (Rule) => Rule.max(160).warning('Descriptions longer than 160 characters will likely be truncated in search results.'),
        }),
        defineField({
          name: 'openGraphImage',
          title: 'Social Share Image (Open Graph)',
          type: 'image',
          description: 'Image displayed when sharing the link on social media. Recommended size: 1200x630px.',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
