import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant / Spec Card',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Parent Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'species',
      title: 'Timber Species',
      type: 'reference',
      to: [{ type: 'species' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. 150mm x 25mm',
    }),
    defineField({
      name: 'notes',
      title: 'Special Notes',
      type: 'string',
      description: 'e.g. Absolute Premium with No Knots!',
    }),
    defineField({
      name: 'variantImages',
      title: 'Variant Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload one or more images specific to this product/species variant. These replace the species image on the card.',
    }),
    defineField({
      name: 'variantDescription',
      title: 'Variant Description Override',
      type: 'text',
      description: 'Optional description override for this specific product/species variant.',
    }),
  ],
  preview: {
    select: {
      productName: 'product.name',
      speciesName: 'species.name',
      notes: 'notes',
      firstImage: 'variantImages.0',
      speciesImage: 'species.image',
    },
    prepare({ productName, speciesName, notes, firstImage, speciesImage }) {
      return {
        title: speciesName ? `${speciesName} (for ${productName || 'Unknown Product'})` : 'Unnamed Variant',
        subtitle: notes || 'No special notes',
        media: firstImage || speciesImage,
      }
    },
  },
})
