'use client'

import { useRef, useState } from 'react'
import { DownloadSimple, TrashSimple, UploadSimple } from '@phosphor-icons/react'
import type { Reading } from './types'
import { downloadCsv, parseReadingsCsv } from './csv'
import { deleteReading, importReadings } from './db'
import WeatherIcon from './WeatherIcon'

interface Props {
  readings: Reading[]
  onImported: () => void
}

function formatDateHeader(ts: number): string {
  const d = new Date(ts)
  return d
    .toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    .replace(/^\w/, (c) => c.toUpperCase())
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })
}

export default function History({ readings, onImported }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importMsg, setImportMsg] = useState<string | null>(null)
  const [trackFilter, setTrackFilter] = useState<string | null>(null)

  // tracks that actually have readings, most recently used first
  const usedTracks: string[] = []
  for (const r of readings) {
    if (!usedTracks.includes(r.track)) usedTracks.push(r.track)
  }

  const filtered = trackFilter ? readings.filter((r) => r.track === trackFilter) : readings

  // group by date (local), newest first (readings already sorted desc by timestamp)
  const groups: { dateKey: string; label: string; items: Reading[] }[] = []
  for (const r of filtered) {
    const dateKey = new Date(r.timestamp).toDateString()
    let group = groups.find((g) => g.dateKey === dateKey)
    if (!group) {
      group = { dateKey, label: formatDateHeader(r.timestamp), items: [] }
      groups.push(group)
    }
    group.items.push(r)
  }

  async function handleDelete(id: string) {
    if (!confirm('Slette denne målingen? Kan ikke angres.')) return
    await deleteReading(id)
    onImported() // reuse the same "refresh readings from db" callback
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text()
      const rows = parseReadingsCsv(text)
      const { imported, skipped } = await importReadings(rows)
      setImportMsg(`${imported} målinger importert, ${skipped} duplikater hoppet over.`)
      onImported()
    } catch (err) {
      setImportMsg(err instanceof Error ? err.message : 'Import feilet.')
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {usedTracks.length > 1 && (
        <div className="flex gap-2 px-4 pt-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setTrackFilter(null)}
            className={`shrink-0 h-9 px-3 rounded-full text-sm font-bold ${
              trackFilter === null ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
            }`}
          >
            Alle baner
          </button>
          {usedTracks.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrackFilter(t)}
              className={`shrink-0 h-9 px-3 rounded-full text-sm font-bold ${
                trackFilter === t ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2 p-4 pb-2">
        <button
          type="button"
          onClick={() => downloadCsv(readings)}
          disabled={readings.length === 0}
          className="flex-1 h-11 rounded-lg bg-neutral-800 disabled:opacity-40 text-white text-sm font-bold flex items-center justify-center gap-2"
        >
          <DownloadSimple size={18} weight="bold" /> Eksporter CSV
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 h-11 rounded-lg bg-neutral-800 text-white text-sm font-bold flex items-center justify-center gap-2"
        >
          <UploadSimple size={18} weight="bold" /> Importer CSV
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleImportFile(file)
            e.target.value = ''
          }}
        />
      </div>

      {importMsg && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-lg bg-neutral-800 text-neutral-200 text-sm">{importMsg}</div>
      )}

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {groups.length === 0 && (
          <p className="text-neutral-500 text-center mt-10">
            {trackFilter ? `Ingen målinger for ${trackFilter}.` : 'Ingen målinger enda.'}
          </p>
        )}
        {groups.map((group) => (
          <div key={group.dateKey} className="mb-6">
            <h2 className="font-conthrax text-white text-lg mb-3">
              {group.label.split(' ').slice(0, -1).join(' ')} <span className="text-neutral-500">{group.label.split(' ').slice(-1)}</span>
            </h2>
            <div className="flex flex-col gap-3">
              {group.items.map((r) => {
                return (
                  <div key={r.id} className="rounded-xl border border-neutral-700 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-lg">{formatTime(r.timestamp)}</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id)}
                            className="text-neutral-500 active:text-red-500 p-1 -m-1"
                            aria-label="Slett måling"
                          >
                            <TrashSimple size={16} weight="bold" />
                          </button>
                        </div>
                        <div className="text-neutral-400 text-sm">{r.track}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {r.weather && (
                          <span className="flex items-center gap-1 text-neutral-400 text-xs">
                            <WeatherIcon symbolCode={r.weather.symbolCode} size={14} />
                            {r.weather.tempC.toFixed(0)}°
                          </span>
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                            r.hotCold === 'hot' ? 'bg-brand-red text-white' : 'bg-blue-500 text-white'
                          }`}
                        >
                          {r.hotCold === 'hot' ? 'Varm' : 'Kald'}
                        </span>
                      </div>
                    </div>
                    {r.note && <p className="text-neutral-400 text-sm mb-3">{r.note}</p>}
                    <div className="grid grid-cols-2 gap-2">
                      <WheelCell label="FL" value={r.fl} />
                      <WheelCell label="FR" value={r.fr} />
                      <WheelCell label="RL" value={r.rl} />
                      <WheelCell label="RR" value={r.rr} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WheelCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between rounded-lg bg-neutral-900 px-3 py-2">
      <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className="text-white text-2xl font-bold">{value.toFixed(1)}</span>
    </div>
  )
}
