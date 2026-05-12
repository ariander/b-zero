import { defineField, defineType } from 'sanity'

export const submittedImageType = defineType({
    name: 'submittedImage',
    title: 'Innsendt Bilde (Publikum)',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Bilde',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'race',
            title: 'Tilhørende Løp',
            type: 'reference',
            to: [{ type: 'race' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'submitterName',
            title: 'Innsenders navn',
            description: 'Navn på personen som sendte inn bildet (valgfritt)',
            type: 'string',
        }),
        defineField({
            name: 'approved',
            title: 'Godkjent for visning?',
            description: 'Bildet vil ikke vises på nettsiden før denne er slått PÅ.',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'race.title',
            subtitle: 'submitterName',
            media: 'image',
            approved: 'approved'
        },
        prepare(selection) {
            const { title, subtitle, media, approved } = selection
            return {
                title: title ? `Bilde fra: ${title}` : 'Innsendt bilde',
                subtitle: `${approved ? '✅ GODKJENT' : '⏳ VENTER PÅ GODKJENNING'} ${subtitle ? `- Innsender: ${subtitle}` : ''}`,
                media: media,
            }
        },
    },
})
