import { defineField, defineType } from 'sanity'

const currentYear = new Date().getFullYear();
const seasonList = Array.from(
    { length: Math.max(2032, currentYear + 4) - 2019 + 1 },
    (_, i) => Math.max(2032, currentYear + 4) - i
);

export const raceType = defineType({
    name: 'race',
    title: 'Løp',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tittel (F.eks. NM Vålerbanen)',
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
            name: 'raceCategory',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: 'Racing (Asfalt)', value: 'racing' },
                    { title: 'Rally', value: 'rally' }
                ],
                layout: 'radio'
            },
            validation: (rule) => rule.required(),
            initialValue: 'racing'
        }),
        defineField({
            name: 'isNM',
            title: 'Er dette et NM-løp?',
            description: 'Kryss av her for å vise Racing NM logoen på dette løpet',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'season',
            title: 'Sesong (Årstall)',
            type: 'number',
            description: 'Året dette løpet ble kjørt.',
            options: {
                list: seasonList,
                layout: 'dropdown'
            },
            initialValue: currentYear,
            validation: (rule) => rule.required().min(2000).max(2100),
        }),
        defineField({
            name: 'track',
            title: 'Bane',
            description: 'Velg hvilken bane løpet kjøres på.',
            type: 'reference',
            to: [{ type: 'track' }],
        }),
        defineField({
            name: 'date',
            title: 'Startdato',
            type: 'date',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'Sluttdato',
            description: 'Valgfritt. La stå tom om løpet kun er én dag.',
            type: 'date',
        }),
        defineField({
            name: 'mainImage',
            title: 'Hovedbilde (Cover for løpet)',
            description: 'Valgfritt. Hvis tomt, brukes banens thumbnail-bilde.',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'report',
            title: 'Løpsrapport',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'gallery',
            title: 'Bildegalleri',
            description: 'Last opp alle bildefilene fra løpet her.',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    }
                }
            ],
            options: {
                layout: 'grid',
            }
        }),
        defineField({
            name: 'eventSupportRaceId',
            title: 'EventSupport Race ID',
            description: 'Race ID fra eventsupport.se (f.eks. "3788" fra url https://www.eventsupport.se/entre/public/registrations.php?race=3788). Gir "Påmeldte B-Zero"- og "Alle påmeldte"-lenker på løpssiden.',
            type: 'string',
        }),
        defineField({
            name: 'speedhiveEventId',
            title: 'Speedhive (MYLAPS) Event ID',
            description: 'Event ID fra speedhive.mylaps.com. Gir en "Se resultater"-lenke på løpssiden.',
            type: 'string',
        }),
        defineField({
            name: 'links',
            title: 'Nyttige lenker & Filer',
            description: 'Legg til lenker eller last opp filer (f.eks PDF) for tilleggsregler, innbydelser, resultatlister etc.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Tittel (knappetekst)', type: 'string', validation: rule => rule.required() },
                        { name: 'url', title: 'URL (hvis du bare skal lenke til en nettside)', type: 'url' },
                        { name: 'file', title: 'Filopplasting (hvis du vil laste opp et dokument/PDF)', type: 'file' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'relatedPosts',
            title: 'Relaterte Nyheter (Valgfritt)',
            description: 'Nyhetsartikler som handler om dette løpet.',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'post' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            season: 'season',
            media: 'mainImage',
        },
        prepare(selection) {
            const { title, season, media } = selection
            return {
                title: title,
                subtitle: `Sesong: ${season}`,
                media: media,
            }
        },
    },
})
