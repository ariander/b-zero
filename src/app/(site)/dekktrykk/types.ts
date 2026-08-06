export type HotCold = 'hot' | 'cold'

export type WheelKey = 'fl' | 'fr' | 'rl' | 'rr'

export interface Reading {
  id: string
  timestamp: number // ms epoch
  track: string
  hotCold: HotCold
  fl: number
  fr: number
  rl: number
  rr: number
  note: string
  weather?: {
    tempC: number
    symbolCode: string
  }
}
