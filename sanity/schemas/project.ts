import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Architectural Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Architect',
      type: 'string',
      description: 'Who was this project for or designed by? (e.g. Tony Gifford @Slabstudiosnz)',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief teaser for the gallery grid.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Feature Image',
      type: 'image',
      description: 'The hero image for this project. Must be high resolution (at least 2500px wide) to look sharp on all screen sizes.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional shots to showcase the project details. For best results, use images at least 2000px wide.',
    }),
    defineField({
      name: 'content',
      title: 'Project Narrative',
      type: 'blockContent',
      description: 'The story behind the project and the wood choices.',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'mainImage',
    },
  },
})
