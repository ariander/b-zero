import { defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Nyhet',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Publisert',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Hovedbilde',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'body',
            title: 'Innhold',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'relatedRace',
            title: 'Tilhørende Løp (Valgfritt)',
            description: 'Er denne nyheten om et spesifikt løp? Velg løpet her for å koble dem sammen.',
            type: 'reference',
            to: [{ type: 'race' }],
        }),
    ],
})
