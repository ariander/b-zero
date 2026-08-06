export interface WeatherSnapshot {
  tempC: number
  symbolCode: string
}

// Weather is looked up by track, not device GPS — no permission prompt, works every time,
// and avoids iOS Safari's flaky geolocation timeout handling.
// Coordinates are town/circuit-level approximations — plenty precise for a weather grid.
// Keep in sync with DEFAULT_TRACKS in db.ts.
const TRACK_COORDS: Record<string, { lat: number; lon: number }> = {
  // Norge
  'Arctic Circle Raceway': { lat: 66.31, lon: 14.14 }, // Mo i Rana, Nordland
  'Motorcenter Norway': { lat: 58.29, lon: 6.3 }, // Sokndal, Rogaland
  Rudskogen: { lat: 59.36, lon: 11.34 }, // Østfold
  'Vålerbanen': { lat: 60.7, lon: 11.83 }, // Våler, Innlandet
  'Lånkebanen': { lat: 63.405, lon: 10.92 }, // Hell, Stjørdal (rallycross)
  // Sverige
  'Anderstorp Raceway': { lat: 57.26417, lon: 13.60139 },
  'Falkenbergs Motorbana': { lat: 56.975, lon: 12.56806 },
  'Karlskoga Motorstadion': { lat: 59.38333, lon: 14.51611 }, // Gelleråsen
  'Kinnekulle Ring': { lat: 58.54611, lon: 13.39889 },
  'Ljungbyheds Motorbana': { lat: 56.0847, lon: 13.22228 },
  'Mantorp Park': { lat: 58.37194, lon: 15.28278 },
  Mittsverigebanan: { lat: 62.59927, lon: 17.81527 }, // Härnösand
  'Ring Knutstorp': { lat: 55.9875, lon: 13.11472 },
  'Drivecenter Arena': { lat: 65.1075, lon: 20.76111 }, // Skellefteå
  'Sturup Raceway': { lat: 55.53111, lon: 13.35667 },
  'Tierp Arena': { lat: 60.35, lon: 17.45 },
  // Danmark
  Jyllandsringen: { lat: 56.17556, lon: 9.66083 },
  'Padborg Park': { lat: 54.86861, lon: 9.27472 },
  'Ring Djursland': { lat: 56.33722, lon: 10.68333 },
}

function trackCoords(track: string): { lat: number; lon: number } | undefined {
  const key = track.trim().toLowerCase()
  const entry = Object.entries(TRACK_COORDS).find(([name]) => name.toLowerCase() === key)
  return entry?.[1]
}

/** Best-effort fetch of current weather at the track's location. Never throws; null if track is unknown or offline. */
export async function fetchWeatherSnapshot(track: string): Promise<WeatherSnapshot | null> {
  const coords = trackCoords(track)
  if (!coords) return null

  try {
    const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const data = await res.json()
    const first = Array.isArray(data) ? data[0] : null
    if (!first || typeof first.temperature !== 'number') return null
    return { tempC: first.temperature, symbolCode: first.symbolCode ?? 'cloudy' }
  } catch {
    return null
  }
}

export type WeatherCategory = 'sun' | 'partly' | 'cloud' | 'rain' | 'snow' | 'fog'

export function weatherCategory(symbolCode: string): WeatherCategory {
  const s = symbolCode.toLowerCase()
  if (s.includes('snow') || s.includes('sleet')) return 'snow'
  if (s.includes('rain') || s.includes('showers')) return 'rain'
  if (s.includes('fog')) return 'fog'
  if (s.startsWith('clearsky')) return 'sun'
  if (s.startsWith('fair') || s.startsWith('partlycloudy')) return 'partly'
  return 'cloud'
}
