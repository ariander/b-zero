import { defineField, defineType } from 'sanity'

export const driverType = defineType({
    name: 'driver',
    title: 'Sjåfør',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Navn',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'profileImage',
            title: 'Profilbilde',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternativ tekst',
                }
            ]
        }),
        defineField({
            name: 'startNumber',
            title: 'Startnummer',
            type: 'string',
        }),
        defineField({
            name: 'carMake',
            title: 'Bil (Merke og modell)',
            type: 'string',
            description: 'F.eks: Peugeot 107',
        }),
        defineField({
            name: 'carImage',
            title: 'Bilde av bilen',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternativ tekst for bilbildet',
                }
            ]
        }),
        defineField({
            name: 'debutYear',
            title: 'Debutår',
            type: 'number',
            description: 'Året de begynte med asfaltracing',
        }),
        defineField({
            name: 'bio',
            title: 'Bio / Om sjåføren',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'profileImage',
            subtitle: 'startNumber',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                subtitle: subtitle ? `Startnummer: ${subtitle}` : 'Ingen startnummer',
                media,
            }
        }
    }
})
