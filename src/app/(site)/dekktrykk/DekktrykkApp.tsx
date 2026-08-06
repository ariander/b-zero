'use client'

import { useEffect, useRef, useState } from 'react'
import { Gauge, ClockCounterClockwise } from '@phosphor-icons/react'
import type { HotCold, Reading } from './types'
import type { WheelValues } from './NewReading'
import NewReading from './NewReading'
import SaveScreen from './SaveScreen'
import History from './History'
import InstallBanner from './InstallBanner'
import ServiceWorkerRegister from './ServiceWorkerRegister'
import { getAllReadings, getTracks, saveReading } from './db'
import { fetchWeatherSnapshot, type WeatherSnapshot } from './weather'

type Screen = 'new' | 'confirm' | 'history'
type Tab = 'new' | 'history'

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function DekktrykkApp() {
  const [tab, setTab] = useState<Tab>('new')
  const [screen, setScreen] = useState<Screen>('new')

  const [track, setTrack] = useState('')
  const [hotCold, setHotCold] = useState<HotCold | null>(null)
  const [values, setValues] = useState<WheelValues>({})
  const [note, setNote] = useState('')

  const [tracks, setTracks] = useState<string[]>([])
  const [readings, setReadings] = useState<Reading[]>([])

  const [weather, setWeather] = useState<WeatherSnapshot | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const weatherPromiseRef = useRef<Promise<WeatherSnapshot | null> | null>(null)

  async function refresh() {
    const [t, r] = await Promise.all([getTracks(), getAllReadings()])
    setTracks(t)
    setReadings(r)
    if (!track && r[0]) setTrack(r[0].track)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (screen !== 'confirm') return
    setWeather(null)
    setWeatherLoading(true)
    const promise = fetchWeatherSnapshot(track)
    weatherPromiseRef.current = promise
    promise.then((w) => {
      if (weatherPromiseRef.current === promise) {
        setWeather(w)
        setWeatherLoading(false)
      }
    })
  }, [screen, track])

  function resetForm() {
    setValues({})
    setHotCold(null)
    setNote('')
    setWeather(null)
    setScreen('new')
  }

  function handleDiscard() {
    setValues({})
    setNote('')
    setWeather(null)
    setScreen('new')
  }

  async function handleSave() {
    if (!hotCold || values.fl === undefined || values.fr === undefined || values.rl === undefined || values.rr === undefined) return
    const reading: Reading = {
      id: uuid(),
      timestamp: Date.now(),
      track,
      hotCold,
      fl: values.fl,
      fr: values.fr,
      rl: values.rl,
      rr: values.rr,
      note,
      ...(weather ? { weather } : {}),
    }
    // Don't block saving on the weather fetch — one-handed logging needs to be instant.
    // If weather is still in flight, patch it into the already-saved reading once it lands.
    const pendingWeather = !weather ? weatherPromiseRef.current : null

    await saveReading(reading)
    await refresh()
    resetForm()
    setTab('history')
    setScreen('history')

    if (pendingWeather) {
      pendingWeather.then(async (w) => {
        if (!w) return
        await saveReading({ ...reading, weather: w })
        await refresh()
      })
    }
  }

  const allFilled = values.fl !== undefined && values.fr !== undefined && values.rl !== undefined && values.rr !== undefined

  return (
    <div className="fixed inset-0 z-100 bg-black text-white flex flex-col overflow-hidden">
      <ServiceWorkerRegister />
      <InstallBanner />

      <div className="flex-1 flex flex-col min-h-0" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        {tab === 'new' && screen === 'new' && (
          <NewReading
            track={track}
            onTrackChange={setTrack}
            tracks={tracks}
            hotCold={hotCold}
            onHotColdChange={setHotCold}
            values={values}
            onValuesChange={setValues}
            onSubmit={() => setScreen('confirm')}
          />
        )}

        {tab === 'new' && screen === 'confirm' && allFilled && hotCold && (
          <SaveScreen
            track={track}
            hotCold={hotCold}
            values={values as Required<WheelValues>}
            note={note}
            onNoteChange={setNote}
            weather={weather}
            weatherLoading={weatherLoading}
            onDiscard={handleDiscard}
            onSave={handleSave}
          />
        )}

        {tab === 'history' && <History readings={readings} onImported={refresh} />}
      </div>

      <nav
        className="grid grid-cols-2 gap-2 p-3 pt-2 bg-neutral-950 border-t border-neutral-800 shrink-0"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={() => {
            setTab('new')
            setScreen('new')
          }}
          className={`h-12 rounded-lg font-bold flex items-center justify-center gap-2 ${
            tab === 'new' ? 'bg-neutral-700 text-white' : 'bg-neutral-900 text-neutral-400'
          }`}
        >
          <Gauge size={20} weight="bold" /> Ny måling
        </button>
        <button
          type="button"
          onClick={() => setTab('history')}
          className={`h-12 rounded-lg font-bold flex items-center justify-center gap-2 ${
            tab === 'history' ? 'bg-neutral-700 text-white' : 'bg-neutral-900 text-neutral-400'
          }`}
        >
          <ClockCounterClockwise size={20} weight="bold" /> Historikk
        </button>
      </nav>
    </div>
  )
}
