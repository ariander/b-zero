import { defineField, defineType } from 'sanity'

export const rentalAdType = defineType({
    name: 'rentalAd',
    title: 'Leiebørs Annonse',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
            description: 'F.eks. "Løpsklar C1 leies ut"',
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
                    { title: 'Rally', value: 'rally' },
                    { title: 'Begge deler / Spiller ingen rolle', value: 'both' }
                ],
                layout: 'radio'
            },
            validation: (rule) => rule.required(),
            initialValue: 'racing'
        }),
        defineField({
            name: 'carInfo',
            title: 'Kort info om bilen',
            type: 'string',
            description: 'F.eks. "Citroën C1, 2008-modell"',
        }),
        defineField({
            name: 'description',
            title: 'Beskrivelse',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Betingelser, hva er inkludert, tilstand på bilen, transport, krav til fører, etc...',
        }),
        defineField({
            name: 'price',
            title: 'Pris (Valgfritt)',
            type: 'string',
            description: 'F.eks. "5000 kr pr løp", "Ta kontakt for pris"',
        }),
        defineField({
            name: 'availability',
            title: 'Tilgjengelighet',
            type: 'string',
            description: 'F.eks. "Ledig for hele sesongen", "Ledig NM Vålerbanen"',
        }),
        defineField({
            name: 'contactName',
            title: 'Navn på utleier',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'contactEmail',
            title: 'E-post',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'contactPhone',
            title: 'Telefon (Valgfritt)',
            type: 'string',
        }),
        defineField({
            name: 'images',
            title: 'Bilder av bilen',
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
    ],
})
