import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'species',
  title: 'Species',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'General Information' },
    { name: 'visuals', title: 'Visual Assets' },
    { name: 'technical', title: 'Technical Details' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Species Name',
      type: 'string',
      fieldset: 'general',
    }),
    defineField({
      name: 'showOnSpeciesPage',
      title: 'Show on Species Page',
      type: 'boolean',
      description: 'Uncheck to hide this species from the public /species listing (e.g. placeholder species used only for slab tagging).',
      initialValue: true,
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
      name: 'tagline',
      title: 'Marketing Tagline',
      type: 'string',
      description: 'A punchy one-liner for the header (e.g. "The King of Durability").',
      fieldset: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Short Summary',
      type: 'text',
      description: 'Used in grids and list views.',
      fieldset: 'general',
    }),
    defineField({
      name: 'image',
      title: 'Showcase Image (Logs/Grain)',
      type: 'image',
      description: 'High-quality timber grain close-ups should be at least 1500px wide for a premium architectural look.',
      options: {
        hotspot: true,
      },
      fieldset: 'visuals',
    }),
    defineField({
      name: 'content',
      title: 'Deep Content (Story & History)',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'general',
    }),
    defineField({
      name: 'commonUses',
      title: 'Typical Applications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Hardwood Flooring, Decking, Beams',
      fieldset: 'technical',
    }),
    defineField({
      name: 'features',
      title: 'Key Technical Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Class 1 Durability", "Termite Resistant"',
      fieldset: 'technical',
    }),
  ],
})
