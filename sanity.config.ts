import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { nbNOLocale } from '@sanity/locale-nb-no'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '27g9u6ol',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'B-Zero Racing Studio',
  schema: {
    types: schema.types,
  },
  plugins: [structureTool(), nbNOLocale()],
})
