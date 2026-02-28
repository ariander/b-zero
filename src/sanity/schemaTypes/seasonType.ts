import { defineField, defineType } from 'sanity'

export const seasonType = defineType({
    name: 'season',
    title: 'Sesong',
    type: 'document',
    fields: [
        defineField({
            name: 'year',
            title: 'Årstall',
            type: 'number',
            validation: (rule) => rule.required().min(2000).max(2100),
        }),
        defineField({
            name: 'documents',
            title: 'Årlige Dokumenter (F.eks. Poengtabeller)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Tittel (F.eks Poengtabell Totalt)', type: 'string', validation: (rule) => rule.required() },
                        { name: 'file', title: 'PDF / Fil', type: 'file', validation: (rule) => rule.required() }
                    ]
                }
            ]
        })
    ],
    preview: {
        select: {
            title: 'year',
        },
        prepare(selection) {
            return {
                title: `Sesong ${selection.title}`,
            }
        },
    },
})
