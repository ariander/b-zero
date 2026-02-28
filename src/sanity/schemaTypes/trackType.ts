import { defineField, defineType } from 'sanity'

export const trackType = defineType({
    name: 'track',
    title: 'Baner',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Banenavn',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Banelogo',
            description: 'Valgfritt. Logo for banen.',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail / Bakgrunnsbilde',
            description: 'Valgfritt. Bilde av banen eller anlegget til bruk i lister/bakgrunner.',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'trackMap',
            title: 'Banekart (SVG / Bilde)',
            description: 'Last opp et banekart (gjerne SVG for best resultat).',
            type: 'image',
        }),
        defineField({
            name: 'mapsLink',
            title: 'Google Maps Lenke / Embed',
            description: 'Valgfritt. Lenke direkte til banen på Google Maps, ELLER lim inn hele <iframe> koden for å bygge inn kartet på siden.',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'websiteUrl',
            title: 'Hjemmeside',
            description: 'Valgfritt. Lenke til banens offisielle hjemmeside.',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo',
        },
    },
})
