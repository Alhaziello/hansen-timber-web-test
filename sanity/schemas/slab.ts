import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'slab',
  title: 'Timber Slab',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Slab Name / ID',
      type: 'string',
      description: 'e.g. Swamp Kauri Slab #102',
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
      name: 'species',
      title: 'Species',
      type: 'reference',
      to: [{ type: 'species' }],
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        { name: 'length', title: 'Length (mm)', type: 'number' },
        { name: 'width', title: 'Width (mm)', type: 'string' },
        { name: 'thickness', title: 'Thickness (mm)', type: 'string' },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price (Optional)',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Slab Photo',
      type: 'image',
      description: 'Unique slab photos should be high resolution (at least 2000px wide) to capture the natural grain detail.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      species: 'species.name',
      media: 'image',
    },
    prepare(selection) {
      const { title, species, media } = selection
      return {
        title: title,
        subtitle: species ? `Species: ${species}` : 'No species assigned',
        media: media,
      }
    },
  },
})
