import type { HotCold, Reading } from './types'

const HEADER = ['id', 'timestamp', 'track', 'hot_cold', 'fl', 'fr', 'rl', 'rr', 'note', 'weather_temp', 'weather_symbol'] as const

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function readingsToCsv(readings: Reading[]): string {
  const lines = [HEADER.join(',')]
  for (const r of readings) {
    lines.push(
      [
        r.id,
        new Date(r.timestamp).toISOString(),
        csvEscape(r.track),
        r.hotCold,
        r.fl.toFixed(1),
        r.fr.toFixed(1),
        r.rl.toFixed(1),
        r.rr.toFixed(1),
        csvEscape(r.note ?? ''),
        r.weather ? r.weather.tempC.toFixed(1) : '',
        r.weather ? csvEscape(r.weather.symbolCode) : '',
      ].join(',')
    )
  }
  return lines.join('\n')
}

export function downloadCsv(readings: Reading[]) {
  const csv = readingsToCsv(readings)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `dekktrykk-${date}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Minimal CSV line parser handling quoted fields. */
function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cur += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      fields.push(cur)
      cur = ''
    } else {
      cur += ch
    }
  }
  fields.push(cur)
  return fields
}

export function parseReadingsCsv(text: string): Reading[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) return []

  const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase())
  const idx = (name: string) => header.indexOf(name)
  const iId = idx('id')
  const iTs = idx('timestamp')
  const iTrack = idx('track')
  const iHotCold = idx('hot_cold')
  const iFl = idx('fl')
  const iFr = idx('fr')
  const iRl = idx('rl')
  const iRr = idx('rr')
  const iNote = idx('note')
  const iWeatherTemp = idx('weather_temp')
  const iWeatherSymbol = idx('weather_symbol')

  if ([iId, iTs, iTrack, iHotCold, iFl, iFr, iRl, iRr].some((i) => i === -1)) {
    throw new Error('Ugyldig CSV-format: mangler påkrevde kolonner.')
  }

  const rows: Reading[] = []
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i])
    const ts = Date.parse(fields[iTs])
    const hotCold = fields[iHotCold].trim().toLowerCase() as HotCold
    if (!fields[iId] || Number.isNaN(ts) || (hotCold !== 'hot' && hotCold !== 'cold')) {
      continue // skip malformed row
    }
    const weatherTemp = iWeatherTemp !== -1 ? parseFloat(fields[iWeatherTemp]) : NaN
    const weatherSymbol = iWeatherSymbol !== -1 ? fields[iWeatherSymbol] : ''

    rows.push({
      id: fields[iId],
      timestamp: ts,
      track: fields[iTrack],
      hotCold,
      fl: parseFloat(fields[iFl]),
      fr: parseFloat(fields[iFr]),
      rl: parseFloat(fields[iRl]),
      rr: parseFloat(fields[iRr]),
      note: iNote !== -1 ? (fields[iNote] ?? '') : '',
      ...(!Number.isNaN(weatherTemp) && weatherSymbol
        ? { weather: { tempC: weatherTemp, symbolCode: weatherSymbol } }
        : {}),
    })
  }
  return rows
}
