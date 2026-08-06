'use client'

import type { HotCold, WheelKey } from './types'
import type { WheelValues } from './NewReading'
import type { WeatherSnapshot } from './weather'
import WeatherIcon from './WeatherIcon'

interface Props {
  track: string
  hotCold: HotCold
  values: Required<WheelValues>
  note: string
  onNoteChange: (note: string) => void
  weather: WeatherSnapshot | null
  weatherLoading: boolean
  onDiscard: () => void
  onSave: () => void
}

const WHEEL_LABELS: { key: WheelKey; label: string }[] = [
  { key: 'fl', label: 'FL' },
  { key: 'fr', label: 'FR' },
  { key: 'rl', label: 'RL' },
  { key: 'rr', label: 'RR' },
]

export default function SaveScreen({ track, hotCold, values, note, onNoteChange, weather, weatherLoading, onDiscard, onSave }: Props) {
  return (
    <div className="flex-1 flex flex-col p-4 gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-conthrax uppercase tracking-wider text-lg text-white">{track}</h2>
          <span
            className={`inline-block mt-1 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
              hotCold === 'hot' ? 'bg-brand-red text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {hotCold === 'hot' ? 'Varm' : 'Kald'}
          </span>
        </div>
        {weatherLoading && <span className="text-xs text-neutral-500">Henter vær…</span>}
        {!weatherLoading && weather && (
          <span className="flex items-center gap-1.5 text-neutral-300 text-sm bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5">
            <WeatherIcon symbolCode={weather.symbolCode} />
            {weather.tempC.toFixed(0)}°
          </span>
        )}
        {!weatherLoading && !weather && <span className="text-xs text-neutral-600">Vær utilgjengelig</span>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {WHEEL_LABELS.map(({ key, label }) => (
          <div key={key} className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-center">
            <div className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
            <div className="text-3xl font-bold text-white">{values[key].toFixed(1)}</div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Notat (valgfritt)</label>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Legg til notat"
          rows={3}
          className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-white text-base focus:border-brand-red focus:outline-none resize-none"
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 pb-2">
        <button
          type="button"
          onClick={onDiscard}
          className="h-14 rounded-xl border-2 border-red-600 text-red-500 font-bold uppercase tracking-wider active:bg-red-950"
        >
          Forkast
        </button>
        <button
          type="button"
          onClick={onSave}
          className="h-14 rounded-xl bg-green-500 text-black font-bold uppercase tracking-wider active:bg-green-400"
        >
          Lagre
        </button>
      </div>
    </div>
  )
}
