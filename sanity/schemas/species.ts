import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'species',
  title: 'Species',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
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
      name: 'commonUses',
      title: 'Common Uses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Hardwood Flooring, Decking, Beams',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Species Showcase Image',
      type: 'image',
      description: 'High-quality timber grain close-ups should be at least 1500px wide for a premium architectural look.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
