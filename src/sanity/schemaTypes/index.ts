import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { raceType } from './raceType'
import { driverType } from './driverType'
import { seasonType } from './seasonType'
import { trackType } from './trackType'
import { rentalAdType } from './rentalAdType'
import { youtubeType } from './youtubeType'
import { submittedImageType } from './submittedImageType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [postType, raceType, driverType, seasonType, trackType, rentalAdType, youtubeType, submittedImageType],
}
