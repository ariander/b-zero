import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { raceType } from './raceType'
import { driverType } from './driverType'
import { seasonType } from './seasonType'
import { trackType } from './trackType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [postType, raceType, driverType, seasonType, trackType],
}
